import { PerspectiveCamera, WebGLRenderer } from "three"
class Resizer {
  constructor(container: HTMLCanvasElement, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    console.log(container.clientWidth, container.clientHeight)

    camera.aspect = container.clientWidth / container.clientHeight

    camera.updateProjectionMatrix()

    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
  }
}

export { Resizer }