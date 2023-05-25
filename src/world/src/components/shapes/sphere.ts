import { SphereGeometry, Mesh, MeshStandardMaterial } from "three"

function createSphere(spheres: number[]) {
  const geometry = new SphereGeometry(...spheres);
  const material = new MeshStandardMaterial({
      color: 0xffff00
  });
  const sphere = new Mesh(geometry, material);
  return sphere
}

export { createSphere }