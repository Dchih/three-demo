import { TorusGeometry, Mesh, MeshStandardMaterial } from "three"

function createTorus() {
  const geometry = new TorusGeometry(10, 3, 16, 100)
  const material = new MeshStandardMaterial()
  const torus = new Mesh(geometry, material)
  return torus
}

export { createTorus }