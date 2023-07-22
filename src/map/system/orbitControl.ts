import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Camera } from 'three'

class OrbitControlHasTick extends OrbitControls {
  constructor(Camera: Camera, domElement: HTMLElement) {
    super(Camera, domElement)
  }
  tick() {
    this.update()
  }
}

function createControls(camera: Camera, domElement: HTMLElement) {
  const controls = new OrbitControlHasTick(camera, domElement)
  controls.target.set(0, 0, 0)
  controls.tick()
  return controls
}

export { createControls }