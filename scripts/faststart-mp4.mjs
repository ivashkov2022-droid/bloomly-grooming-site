import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const defaultVideos = [
  join(projectRoot, 'public', 'images', 'vide3962-3239-4639-b835-333538633161____2025-11-19__104916.mp4'),
  join(projectRoot, 'public', 'images', 'vide3665-6135-4435-a635-333838393831__dog2.mp4'),
];

const containerAtoms = new Set([
  'moov', 'trak', 'mdia', 'minf', 'stbl', 'edts', 'dinf', 'udta',
  'meta', 'ilst', 'moof', 'traf', 'mfra',
]);

function readAtom(buffer, offset, limit) {
  if (offset + 8 > limit) throw new Error(`Incomplete MP4 atom at ${offset}`);

  const size32 = buffer.readUInt32BE(offset);
  const type = buffer.toString('ascii', offset + 4, offset + 8);
  let headerSize = 8;
  let size = size32;

  if (size32 === 1) {
    if (offset + 16 > limit) throw new Error(`Incomplete extended MP4 atom at ${offset}`);
    size = Number(buffer.readBigUInt64BE(offset + 8));
    headerSize = 16;
  } else if (size32 === 0) {
    size = limit - offset;
  }

  if (size < headerSize || offset + size > limit) {
    throw new Error(`Invalid ${type} atom at ${offset}`);
  }

  return { offset, size, type, headerSize, end: offset + size };
}

function listAtoms(buffer, start = 0, end = buffer.length) {
  const atoms = [];
  let offset = start;

  while (offset < end) {
    const atom = readAtom(buffer, offset, end);
    atoms.push(atom);
    offset = atom.end;
  }

  return atoms;
}

function shiftChunkOffsets(buffer, start, end, shift) {
  for (const atom of listAtoms(buffer, start, end)) {
    const payloadStart = atom.offset + atom.headerSize;

    if (atom.type === 'stco') {
      const entryCount = buffer.readUInt32BE(payloadStart + 4);
      const tableStart = payloadStart + 8;

      for (let index = 0; index < entryCount; index += 1) {
        const entryOffset = tableStart + index * 4;
        const shifted = buffer.readUInt32BE(entryOffset) + shift;
        if (shifted > 0xffffffff) throw new Error('stco offset overflow');
        buffer.writeUInt32BE(shifted, entryOffset);
      }
    } else if (atom.type === 'co64') {
      const entryCount = buffer.readUInt32BE(payloadStart + 4);
      const tableStart = payloadStart + 8;

      for (let index = 0; index < entryCount; index += 1) {
        const entryOffset = tableStart + index * 8;
        buffer.writeBigUInt64BE(
          buffer.readBigUInt64BE(entryOffset) + BigInt(shift),
          entryOffset,
        );
      }
    } else if (containerAtoms.has(atom.type)) {
      const childStart = payloadStart + (atom.type === 'meta' ? 4 : 0);
      if (childStart < atom.end) shiftChunkOffsets(buffer, childStart, atom.end, shift);
    }
  }
}

async function makeFastStart(path) {
  const input = await readFile(path);
  const atoms = listAtoms(input);
  const ftyp = atoms.find((atom) => atom.type === 'ftyp');
  const moov = atoms.find((atom) => atom.type === 'moov');
  const mdat = atoms.find((atom) => atom.type === 'mdat');

  if (!ftyp || !moov || !mdat) throw new Error(`Required MP4 atoms are missing in ${path}`);
  if (moov.offset < mdat.offset) return { path, changed: false, bytes: input.length };

  const adjustedMoov = Buffer.from(input.subarray(moov.offset, moov.end));
  shiftChunkOffsets(adjustedMoov, moov.headerSize, adjustedMoov.length, moov.size);

  const parts = [];
  for (const atom of atoms) {
    if (atom.type === 'moov') continue;
    parts.push(input.subarray(atom.offset, atom.end));
    if (atom === ftyp) parts.push(adjustedMoov);
  }

  const output = Buffer.concat(parts);
  if (output.length !== input.length) throw new Error(`File size changed for ${path}`);

  const outputAtoms = listAtoms(output);
  const outputMoov = outputAtoms.find((atom) => atom.type === 'moov');
  const outputMdat = outputAtoms.find((atom) => atom.type === 'mdat');
  if (!outputMoov || !outputMdat || outputMoov.offset > outputMdat.offset) {
    throw new Error(`Fast-start validation failed for ${path}`);
  }

  await writeFile(path, output);
  return { path, changed: true, bytes: output.length };
}

const videos = process.argv.slice(2);
const results = await Promise.all((videos.length ? videos : defaultVideos).map(makeFastStart));
console.log(JSON.stringify(results, null, 2));
