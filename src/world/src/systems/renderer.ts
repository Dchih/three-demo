import { WebGLRenderer } from "three";

function createRenderer() {
  const renderer = new WebGLRenderer({antialias: true})
  // renderer.physicallyCorrectLights
  return renderer
}

export { createRenderer }