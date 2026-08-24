(function () {
  'use strict';

  var sectionRecords = {
    services: 'rec3264806601',
    about: 'rec3264805201',
    offers: 'rec3264805401',
    reviews: 'rec3264807101',
    gallery: 'rec3264806901',
    faq: 'rec3264806501',
    contact: 'rec3264805801',
  };

  function addRecordAnchor(record, id) {
    if (!record || document.getElementById(id)) return;

    var anchor = document.createElement('span');
    anchor.id = id;
    anchor.className = 'bloomly-section-anchor';
    anchor.setAttribute('aria-hidden', 'true');
    anchor.style.cssText = 'display:block;position:relative;top:-80px;visibility:hidden;';
    record.insertAdjacentElement('beforebegin', anchor);
  }

  function installSectionAnchors() {
    Object.keys(sectionRecords).forEach(function (id) {
      addRecordAnchor(document.getElementById(sectionRecords[id]), id);
    });
  }

  function tuneImages() {
    var images = document.querySelectorAll('img');

    images.forEach(function (image, index) {
      image.decoding = 'async';

      var record = image.closest('.t-rec');
      var isPriority = index < 3 || (record && record.id === 'rec3264804301');

      if (isPriority) {
        image.loading = 'eager';
        image.fetchPriority = 'high';
      } else {
        image.loading = 'lazy';
        image.fetchPriority = 'low';
      }
    });
  }

  function tuneVideo(video) {
    video.preload = 'metadata';
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
  }

  function tuneVideos() {
    document.querySelectorAll('video').forEach(tuneVideo);

    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (!(node instanceof Element)) return;
          if (node.matches('video')) tuneVideo(node);
          node.querySelectorAll('video').forEach(tuneVideo);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function activatePrivacyLinks() {
    document.querySelectorAll('a[href="privacy/"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.assign(new URL('privacy/', document.baseURI).href);
      });
    });
  }

  function init() {
    installSectionAnchors();
    tuneImages();
    tuneVideos();
    activatePrivacyLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
