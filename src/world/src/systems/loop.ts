import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

class Loop {
  #camera: PerspectiveCamera
  #scene: Scene
  #renderer: WebGLRenderer
  updatables: Object[]
  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer) {
    this.#camera = camera
    this.#scene = scene
    this.#renderer = renderer
    this.updatables = []
  }
  start() {
    this.#renderer.setAnimationLoop(() => {
      this.tick()
      this.#renderer.render(this.#scene, this.#camera)
    })
  }
  stop() {
    this.#renderer.setAnimationLoop(null)
  }
  tick() {
    for(const object  of this.updatables) {
      (object as any).tick()
    }
  }
}

export { Loop }