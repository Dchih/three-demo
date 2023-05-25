import { PerspectiveCamera } from 'https://cdn.skypack.dev/three@0.136.2';

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100, // far clipping plane
  );

  camera.position.set(0, 0, 10);

  return camera;
}

export { createCamera };
