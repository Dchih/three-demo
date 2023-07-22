import { PerspectiveCamera } from "three"

interface CameraConfig {
  fov: number,
  aspect: number,
  near: number,
  far: number
}

function createCamera(CameraConfig:CameraConfig = {fov: 75, aspect: 1, near: .1, far: 10000}) {
  const { fov, aspect, near, far } = CameraConfig
  const camera = new PerspectiveCamera(
    fov,
    aspect,
    near,
    far
  )
  camera.position.set(0,0,75)
  return camera
}

export { createCamera }
