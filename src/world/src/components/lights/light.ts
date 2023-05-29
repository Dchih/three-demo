import { DirectionalLight, AmbientLight } from "three"

// DirectionalLight takes two params
// color
// intensity
function createLights() {
  const light = new DirectionalLight('white', 2)
  light.position.set(40, 40, 40)
  return light
}

function createAmbienLight() {
  const light = new AmbientLight(0xbbbbbb)
  return light
}

export { createLights, createAmbienLight }