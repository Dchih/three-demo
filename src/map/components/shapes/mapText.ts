import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

function createCss2DRenderer() {
  const css2DRenderer = new CSS2DRenderer()
  css2DRenderer.setSize(window.innerWidth, window.innerHeight)
  css2DRenderer.domElement.style.position = 'absolute'
  css2DRenderer.domElement.style.top = '0'
  css2DRenderer.domElement.style.pointerEvents = 'none'
  document.body.appendChild(css2DRenderer.domElement)
  // css2DRenderer.render(scene, camera)
  // const tag = new CSS2DObject(dom)
  return css2DRenderer
}

export { createCss2DRenderer }