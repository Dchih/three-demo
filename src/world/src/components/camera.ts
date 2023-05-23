import { PerspectiveCamera, Vector3 } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(
    75,
    1,
    .1,
    100
  )
  camera.position.set(0,0,75)
  return camera
}

export { createCamera }