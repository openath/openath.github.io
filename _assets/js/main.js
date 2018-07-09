// import codeURL from "../img/code.png"
//
// const img = document.createElement("img")
// img.src = codeURL
// img.style = "background: #2B3A42; padding: 2px"
// img.width = 64
// document.body.appendChild(img)

import AOS from 'AOS';

import './components/homemast';

AOS.init();

/* this checks if we can add monochrome effect to photos */
const supportsMixBlendMode = window.getComputedStyle(document.body)
  .mixBlendMode;
if (supportsMixBlendMode) {
  const root = document.documentElement;
  root.className += ' has-blendmode';
}
