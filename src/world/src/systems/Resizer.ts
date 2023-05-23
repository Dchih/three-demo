import { PerspectiveCamera, WebGLRenderer } from "three"

const setSize = (container: HTMLCanvasElement, camera: PerspectiveCamera, renderer: WebGLRenderer) => {
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  // renderer.setPixelRatio(.5)
}
class Resizer {
  constructor(container: HTMLCanvasElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    setSize(container, camera, renderer)
    window.addEventListener('resize', () => {
      setSize(container, camera, renderer)
      this.onResize()
    })
  }
  onResize() {}
}

export { Resizer }