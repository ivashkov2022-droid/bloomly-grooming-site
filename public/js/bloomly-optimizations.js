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

  var fontChoices = [
    {
      id: 'nunito',
      name: 'Nunito',
      note: 'мягкий и дружелюбный',
      family: "'Nunito'",
    },
    {
      id: 'comfortaa',
      name: 'Comfortaa',
      note: 'самый округлый',
      family: "'Comfortaa'",
    },
    {
      id: 'rubik',
      name: 'Rubik',
      note: 'плотный и современный',
      family: "'Rubik'",
    },
    {
      id: 'golos',
      name: 'Golos Text',
      note: 'спокойный базовый',
      family: "'Golos Text'",
    },
  ];

  function findFontChoice(id) {
    return fontChoices.find(function (choice) {
      return choice.id === id;
    }) || fontChoices[0];
  }

  function loadFontLabStyles() {
    if (document.getElementById('bloomly-font-lab-fonts')) return;

    var link = document.createElement('link');
    link.id = 'bloomly-font-lab-fonts';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;600&family=Rubik:wght@400;500;600&display=swap';
    document.head.appendChild(link);
  }

  function readStoredFontChoice() {
    try {
      return window.localStorage.getItem('bloomly-font-choice');
    } catch (error) {
      return null;
    }
  }

  function storeFontChoice(id) {
    try {
      window.localStorage.setItem('bloomly-font-choice', id);
    } catch (error) {
      // The live switch still works when storage is unavailable.
    }
  }

  function applyFontChoice(id) {
    var choice = findFontChoice(id);
    if (choice.id === 'comfortaa' || choice.id === 'rubik') loadFontLabStyles();
    document.body.classList.add('bloomly-font-preview');
    document.body.style.setProperty('--bloomly-preview-font', choice.family);
    storeFontChoice(choice.id);
    return choice;
  }

  function installFontLab() {
    if (document.querySelector('.bloomly-font-button')) return;

    var storedChoice = readStoredFontChoice() || 'nunito';
    var activeChoice = applyFontChoice(storedChoice);
    var options = fontChoices.map(function (choice) {
      var isChecked = choice.id === activeChoice.id ? ' checked' : '';
      return '<label class="bloomly-font-option" style="--option-font:' + choice.family + '">' +
        '<input type="radio" name="bloomly-font" value="' + choice.id + '"' + isChecked + '>' +
        '<span class="bloomly-font-option__copy"><strong>' + choice.name + '</strong><span>' + choice.note + '</span></span>' +
        '<span class="bloomly-font-option__sample" aria-hidden="true">Аа</span>' +
      '</label>';
    }).join('');

    document.body.insertAdjacentHTML('beforeend',
      '<button class="bloomly-font-button" type="button" aria-haspopup="dialog" aria-expanded="false">' +
        '<span class="bloomly-font-button__mark" aria-hidden="true">Aa</span><span>Шрифты</span>' +
      '</button>' +
      '<div class="bloomly-font-overlay" aria-hidden="true">' +
        '<section class="bloomly-font-panel" role="dialog" aria-modal="true" aria-labelledby="bloomly-font-title">' +
          '<div class="bloomly-font-panel__top"><div><p class="bloomly-font-panel__eyebrow">Конструктор шрифта</p>' +
          '<h2 id="bloomly-font-title">Выберите характер сайта</h2></div>' +
          '<button class="bloomly-font-close" type="button" aria-label="Закрыть">×</button></div>' +
          '<div class="bloomly-font-preview-card"><strong>Пространство для комфорта</strong>' +
          '<span>Бережный уход, спокойная атмосфера и внимание к каждому питомцу.</span></div>' +
          '<fieldset class="bloomly-font-options" aria-label="Варианты шрифта">' + options + '</fieldset>' +
          '<button class="bloomly-font-reset" type="button">Вернуть Nunito</button>' +
        '</section>' +
      '</div>'
    );

    var trigger = document.querySelector('.bloomly-font-button');
    var overlay = document.querySelector('.bloomly-font-overlay');
    var panel = document.querySelector('.bloomly-font-panel');
    var closeButton = document.querySelector('.bloomly-font-close');
    var resetButton = document.querySelector('.bloomly-font-reset');

    function openLab() {
      loadFontLabStyles();
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      closeButton.focus();
    }

    function closeLab() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    }

    trigger.addEventListener('click', openLab);
    closeButton.addEventListener('click', closeLab);
    overlay.addEventListener('click', function (event) {
      if (event.target === overlay) closeLab();
    });
    panel.addEventListener('change', function (event) {
      if (event.target.name === 'bloomly-font') applyFontChoice(event.target.value);
    });
    resetButton.addEventListener('click', function () {
      applyFontChoice('nunito');
      var radio = panel.querySelector('input[value="nunito"]');
      if (radio) radio.checked = true;
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && overlay.classList.contains('is-open')) closeLab();
    });
  }

  function init() {
    installSectionAnchors();
    tuneImages();
    tuneVideos();
    activatePrivacyLinks();
    installFontLab();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
