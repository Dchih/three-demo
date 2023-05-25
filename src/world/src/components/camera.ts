import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(
    75,
    1,
    .1,
    1000
  )
  camera.position.set(0,0,75)
  return camera
}

export { createCamera }