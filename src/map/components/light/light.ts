import { DirectionalLight, AmbientLight } from "three"

function createLights() {
  const light = new DirectionalLight(0x00e5ff)
  light.position.set(0, 0, 80)
  light.castShadow = true
  return light
}

function createAmbienLight() {
  const light = new AmbientLight()
  return light
}

export { createLights, createAmbienLight }