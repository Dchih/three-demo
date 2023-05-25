import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PerspectiveCamera } from 'three'

function createControls(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
  const controls = new OrbitControls(camera, canvas)

  controls.target.set(10,10,10)
  // controls.enablePan = false
  controls.enableDamping = true
  // controls.dampingFactor = 2
  controls.tick = () => {
    controls.update()
  }
  return controls
}

export { createControls }