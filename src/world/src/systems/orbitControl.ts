import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PerspectiveCamera, MathUtils, WebGLRenderer, Scene, Vector3 } from 'three'
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js"


function randomPosition(min, max) {
  const x = Math.random() * (max - min) + min
  const y = Math.random() * (max - min) + min
  const z = Math.random() * (max - min) + min
  return new Vector3(x, y, z)
}

function createControls(camera: PerspectiveCamera, renderer: WebGLRenderer, scene: Scene, cssRenderer: CSS3DRenderer) {
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0,0,0)
  // controls.enablePan = false
  controls.enableDamping = true
  controls.dampingFactor = .05
  // controls.minDistance = 15
  // controls.maxDistance = 5
  // controls.enableRotate = false
  // controls.enableZoom = false
  // controls.enablePan = false
  controls.minAzimuthAngle = MathUtils.degToRad(0)
  controls.maxAzimuthAngle = MathUtils.degToRad(10)
  controls.minPolarAngle = MathUtils.degToRad(65)
  controls.maxPolarAngle = MathUtils.degToRad(150)
  controls.tick = () => {
    // controls.target.lerp(randomPosition(-10, 10), 0.1)
    controls.update()
  }
  controls.addEventListener('change', () => {
    renderer.render(scene, camera)
    cssRenderer.render(scene, camera)
  })
  
  return controls
}

export { createControls }