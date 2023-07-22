import { WebGLRenderer } from "three";

function createRenderer() {
  const renderer = new WebGLRenderer({antialias: true, alpha: true})
  renderer.shadowMap.enabled = true
  return renderer
}

export { createRenderer }