import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(
    75,
    1,
    .1,
    1000
  )
  camera.position.set(0,10,75)

  camera.tick = () => {
    
  }
  return camera
}

export { createCamera }