import { PerspectiveCamera, WebGLRenderer } from "three"
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';


const setSize = (container: HTMLCanvasElement, camera: PerspectiveCamera, renderer: WebGLRenderer, css2DRenderer: CSS2DRenderer) => {
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
  css2DRenderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  // renderer.setPixelRatio(.5)
}
class Resizer {
  constructor(container: HTMLCanvasElement, camera: PerspectiveCamera, renderer: WebGLRenderer, css2DRenderer: CSS2DRenderer) {
    setSize(container, camera, renderer, css2DRenderer)
    window.addEventListener('resize', () => {
      setSize(container, camera, renderer, css2DRenderer)
      this.onResize()
    })
  }
  onResize() {}
}

export { Resizer }