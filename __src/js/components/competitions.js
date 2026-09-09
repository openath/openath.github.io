/* "In Action" meeting cards → detail modal.
   Entries with several images (data-images) show a Bootstrap carousel in both
   the tile and the modal; single-image entries (data-image) show a plain img.
   With no JS the cards still render (as inert buttons) and the modal stays hidden. */

import $ from 'jquery';

const reducedMotion =
  !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const CAROUSEL_INTERVAL = reducedMotion ? false : 2000;

// tile carousels are rendered without data-ride so we own the interval here
document.querySelectorAll('.competition-card__carousel').forEach(el => {
  $(el).carousel({ interval: CAROUSEL_INTERVAL });
});

const modal = document.querySelector('.competition-modal');
const cards = [...document.querySelectorAll('.competition-card')];

if (modal && cards.length) {
  const panel = modal.querySelector('.competition-modal__panel');
  const closeBtn = modal.querySelector('.competition-modal__close');
  const media = modal.querySelector('.competition-modal__media');
  const title = modal.querySelector('.competition-modal__title');
  const blurb = modal.querySelector('.competition-modal__blurb');
  const link = modal.querySelector('.competition-modal__link');

  let lastFocused = null;
  let modalCarousel = null;

  const fillMedia = card => {
    const name = card.getAttribute('data-name') || '';
    const logoClass = card.hasAttribute('data-logo')
      ? ' competition-modal__image--logo'
      : '';
    const images = (card.getAttribute('data-images') || '')
      .split('|')
      .filter(Boolean);

    if (images.length > 1) {
      const slides = images
        .map(
          (src, i) =>
            `<div class="carousel-item${i === 0 ? ' active' : ''}">` +
            `<img src="${src}" alt="${i === 0 ? name : ''}"></div>`
        )
        .join('');
      media.innerHTML = `<div class="competition-modal__carousel carousel slide carousel-fade${
        card.hasAttribute('data-logo')
          ? ' competition-modal__carousel--logo'
          : ''
      }"><div class="carousel-inner">${slides}</div></div>`;
      modalCarousel = media.querySelector('.carousel');
      $(modalCarousel).carousel({ interval: CAROUSEL_INTERVAL });
    } else {
      const src = card.getAttribute('data-image') || images[0] || '';
      media.innerHTML = `<img class="competition-modal__image${logoClass}" src="${src}" alt="${name}">`;
    }
  };

  const clearMedia = () => {
    if (modalCarousel) {
      $(modalCarousel).carousel('dispose');
      modalCarousel = null;
    }
    media.innerHTML = '';
  };

  const open = card => {
    lastFocused = document.activeElement;

    fillMedia(card);
    title.textContent = card.getAttribute('data-name') || '';
    blurb.innerHTML = card.getAttribute('data-blurb') || '';

    const url = card.getAttribute('data-url');
    if (url) {
      link.href = url;
      link.hidden = false;
    } else {
      link.removeAttribute('href');
      link.hidden = true;
    }

    modal.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    panel.scrollTop = 0;
    closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    clearMedia();
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  };

  cards.forEach(card => {
    card.addEventListener('click', () => open(card));
  });

  closeBtn.addEventListener('click', close);

  modal.addEventListener('click', event => {
    if (event.target === modal) {
      close();
    }
  });

  document.addEventListener('keydown', event => {
    if (!modal.classList.contains('is-open')) {
      return;
    }
    if (event.key === 'Escape') {
      close();
      return;
    }
    if (event.key === 'Tab') {
      const focusable = [closeBtn, link.hidden ? null : link].filter(Boolean);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}
