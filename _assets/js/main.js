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




/* this bit of script wraps some h3 text in span so we can give them fancy red underlines */
const allH3s = [...document.getElementsByTagName('h3')];
allH3s.forEach((H3) => { 
	if(H3.childNodes.length === 1 && H3.childNodes[0].nodeName === '#text'){
		let node = H3.childNodes[0],
			text = node.textContent,
			s = document.createElement('span');
		s.textContent = text;
		H3.insertBefore(s, node);
		node.remove();
	}
	
});	

