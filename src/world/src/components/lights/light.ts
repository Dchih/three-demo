import { PointLight } from "three"

// DirectionalLight takes two params
// color
// intensity
function createLights() {
  const light = new PointLight('green', 2)
  light.position.set(40, 40, 40)
  return light
}

export { createLights }