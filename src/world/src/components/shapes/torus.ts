import { TorusGeometry, Mesh, MeshStandardMaterial, TextureLoader, MathUtils } from "three"

let roundRadian = MathUtils.degToRad(4)

function createMeterial() {
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load('/src/assets/uv-test-col.png')
  console.log(texture)
  const material = new MeshStandardMaterial({map: texture})
  return material
}

function createTorus() {
  const geometry = new TorusGeometry(10, 3, 16, 100)
  const material = createMeterial()
  const torus = new Mesh(geometry, material)
  torus.position.set(40, 0, 0)

  torus.tick = (delta: number) => {
    torus.rotation.x += roundRadian * delta
    torus.rotation.y += roundRadian * delta
    torus.rotation.z += roundRadian * delta
  }

  return torus
}

export { createTorus }