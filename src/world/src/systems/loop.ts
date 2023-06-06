import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js"


const clock = new Clock()

class Loop {
  #camera: PerspectiveCamera
  #scene: Scene
  #renderer: WebGLRenderer
  #css2drenderer: CSS2DRenderer
  #css3drenderer: CSS3DRenderer
  updatables: Object[]
  constructor(camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer,  cssRenderer: CSS2DRenderer, css3dRenderer: CSS3DRenderer) {
    this.#camera = camera
    this.#scene = scene
    this.#renderer = renderer
    this.updatables = []
    this.#css2drenderer = cssRenderer
    this.#css3drenderer = css3dRenderer
  }
  start() {
    this.#renderer.setAnimationLoop(() => {
      this.tick()
      this.#renderer.render(this.#scene, this.#camera)
      this.#css2drenderer.render(this.#scene, this.#camera)
      this.#css3drenderer.render(this.#scene, this.#camera)
    })
  }
  stop() {
    this.#renderer.setAnimationLoop(null)
  }
  tick() {
    const delta = clock.getDelta()
    for(const object  of this.updatables) {
      (object as any).tick(delta)
    }
  }
}

export { Loop }