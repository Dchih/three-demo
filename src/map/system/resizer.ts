import { PerspectiveCamera, WebGLRenderer } from "three"
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

interface ResizeOptions {
  container: HTMLElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  css2DRenderer: CSS2DRenderer
}

const setSize = (options: ResizeOptions) => {
  const { container, camera, renderer, css2DRenderer } = options
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
  css2DRenderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
}
class Resizer {
  constructor(options: ResizeOptions) {
    setSize(options)
    window.addEventListener('resize', () => {
      setSize(options)
      this.onResize()
    })
  }
  onResize() {}
}

export { Resizer }