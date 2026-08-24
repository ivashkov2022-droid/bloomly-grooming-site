import bloomlyPage from '../reference/page203266409.html?raw';

export const dynamic = 'force-static';

export function GET() {
  return new Response(bloomlyPage, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
