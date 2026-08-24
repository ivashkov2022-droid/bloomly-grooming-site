(function () {
  'use strict';

  var sectionNames = {
    services: ['Услуги'],
    about: ['О нас', 'Почему Bloomly'],
    offers: ['Акции', 'Предложения'],
    reviews: ['Отзывы'],
    gallery: ['Пространство для комфорта'],
    faq: ['FAQ', 'Частые вопросы'],
    contact: ['Контакты'],
  };

  function normalize(value) {
    return (value || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

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
    Object.keys(sectionNames).forEach(function (id) {
      if (document.getElementById(id)) return;

      var expected = sectionNames[id].map(normalize);
      var nodes = document.querySelectorAll('.tn-atom');

      for (var index = 0; index < nodes.length; index += 1) {
        var text = normalize(nodes[index].textContent);
        if (!expected.some(function (label) { return text === label || text.indexOf(label) === 0; })) continue;

        var record = nodes[index].closest('.t-rec');
        if (record) {
          addRecordAnchor(record, id);
          break;
        }
      }
    });

    var form = document.querySelector('form');
    addRecordAnchor(form && form.closest('.t-rec'), 'form');
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

  function init() {
    installSectionAnchors();
    tuneImages();
    tuneVideos();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
