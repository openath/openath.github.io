/* Click-to-enlarge for screenshots in long-form product pages.
   Progressive enhancement: with no JS the figure just renders inline as before. */

// Plain in-page screenshots only — skip the device-mockup figures whose image
// is positioned inside an SVG frame.
const triggers = [
  ...document.querySelectorAll('article.product figure img')
].filter(
  img =>
    !img.closest(
      '.phone-demo, .phone-landscape-demo, .tablet-demo, .browser-demo'
    )
);

if (triggers.length) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Enlarged image');
  overlay.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Close">×</button>' +
    '<figure class="lightbox__figure">' +
    '<img class="lightbox__img" alt="">' +
    '<figcaption class="lightbox__caption"></figcaption>' +
    '</figure>';
  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector('.lightbox__close');
  const bigImg = overlay.querySelector('.lightbox__img');
  const caption = overlay.querySelector('.lightbox__caption');

  let lastFocused = null;

  const open = img => {
    lastFocused = document.activeElement;

    bigImg.src = img.currentSrc || img.src;
    bigImg.alt = img.alt || '';

    const fig = img.closest('figure');
    const figCaption = fig && fig.querySelector('figcaption');
    const text = figCaption ? figCaption.textContent.trim() : '';
    caption.textContent = text;
    caption.hidden = !text;

    overlay.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const close = () => {
    overlay.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  };

  triggers.forEach(img => {
    img.classList.add('lightbox-trigger');
    img.setAttribute('role', 'button');
    img.setAttribute('tabindex', '0');

    img.addEventListener('click', () => open(img));
    img.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(img);
      }
    });
  });

  closeBtn.addEventListener('click', close);

  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      close();
    }
  });

  document.addEventListener('keydown', event => {
    if (!overlay.classList.contains('is-open')) {
      return;
    }
    if (event.key === 'Escape') {
      close();
    } else if (event.key === 'Tab') {
      // The close button is the only focusable control inside the dialog.
      event.preventDefault();
      closeBtn.focus();
    }
  });
}
