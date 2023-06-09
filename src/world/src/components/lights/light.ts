import { DirectionalLight, AmbientLight } from "three"

// DirectionalLight takes two params
// color
// intensity
function createLights() {
  const light = new DirectionalLight(0x666666, 2)
  light.position.set(40, 40, 40)
  return light
}

function createAmbienLight() {
  const light = new AmbientLight()
  return light
}

export { createLights, createAmbienLight }