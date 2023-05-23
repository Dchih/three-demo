import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three'

function createCube() {
  const geometry = new BoxGeometry(2,2,2)

  const material = new MeshStandardMaterial()

  const cube = new Mesh(geometry, material)

  return cube
}

export { createCube }