import { SphereGeometry, MeshBasicMaterial, Mesh } from "three"

function createSphere() {
  const geometry = new SphereGeometry(15, 32, 16);
  const material = new MeshBasicMaterial({
      color: 0xffff00
  });
  const sphere = new Mesh(geometry, material);
  return sphere
}

export { createSphere }