import { Clock, Camera, WebGLRenderer, Scene } from "three"
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
interface LoopOptions {
  camera: Camera,
  renderer: WebGLRenderer,
  scene: Scene,
  cssRenderer: CSS2DRenderer
}

const clock = new Clock()

class Loop {
  private options: LoopOptions
  public updatables: Object[]
  constructor(options: LoopOptions) {
    this.options = options
    this.updatables = []
  }

  start() {
    const { renderer, scene, camera, cssRenderer } = this.options
    console.log('调用start')
    console.log('scene: ', scene)
    console.log('camera: ', camera)
    console.log(renderer)
    renderer.setAnimationLoop(() => {
      this.tick()
      renderer.render(scene, camera)
      cssRenderer.render(scene, camera)
    })
  }

  stop() {
    const { renderer } = this.options
    renderer.setAnimationLoop(null)
  }

  tick() {
    const delta = clock.getDelta()
    for(const object  of this.updatables) {
      (object as any).tick(delta)
    }
  }
}

export { Loop }