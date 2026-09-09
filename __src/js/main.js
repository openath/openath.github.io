/*
import codeURL from "../../assets/code.png"
// Used to test webpack asset management
const img = document.createElement("img")
img.src = codeURL
img.style = "background: #2B3A42; padding: 2px"
img.width = 64
document.body.appendChild(img)
*/

import AOS from 'aos';

import './components/homemast';
import './components/lightbox';
import './components/competitions';

AOS.init();

/* In-page section nav highlighting. A plain scroll listener that reads live
   section positions every frame — no Bootstrap scrollspy, so there are no
   cached offsets to go stale when the Typekit (proxima-soft) font swaps in and
   reflows the page after load. */
const sectionNav = document.getElementById('section-nav');
if (sectionNav) {
  const items = [...sectionNav.querySelectorAll('.nav-link')]
    .map(link => ({
      link,
      section: document.getElementById(link.hash.slice(1))
    }))
    .filter(item => item.section);

  const TRIGGER = 80; // px below the viewport top; clears the sticky nav
  let activeLink = null;
  let ticking = false;

  const update = () => {
    ticking = false;

    // Active = the last section whose top has crossed the trigger line.
    let index = 0;
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].section.getBoundingClientRect().top - TRIGGER <= 0) {
        index = i;
      } else {
        break;
      }
    }

    const { link } = items[index];
    if (link !== activeLink) {
      if (activeLink) {
        activeLink.classList.remove('active');
      }
      link.classList.add('active');
      activeLink = link;
    }
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

/* this checks if we can add monochrome effect to photos */
const supportsMixBlendMode = window.getComputedStyle(document.body)
  .mixBlendMode;
if (supportsMixBlendMode) {
  const root = document.documentElement;
  root.className += ' has-blendmode';
}

/* this bit of script wraps some h3 text in span so we can give them fancy red underlines */
const allH3s = [...document.getElementsByTagName('h3')];
allH3s.forEach(H3 => {
  if (H3.childNodes.length === 1 && H3.childNodes[0].nodeName === '#text') {
    const node = H3.childNodes[0];

    const text = node.textContent;

    const s = document.createElement('span');
    s.textContent = text;
    H3.insertBefore(s, node);
    node.remove();
  }
});
