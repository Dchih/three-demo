import { Mesh, BoxGeometry, MeshStandardMaterial, MathUtils, Clock, TextureLoader } from 'three'
const radiansPerSecond = MathUtils.degToRad(3.6)

let waveRadian = MathUtils.degToRad(.5)
let waveNumber = 0

function triangleWave(x: number, period:number) {
  return Math.abs((x / period) % 2 - 1) * 2 - 1
}

function createMaterial() {
  // 纹理
  const textureLoader = new TextureLoader()

  const texture = textureLoader.load('/src/assets/uv-test-col.png')
  const texture2 = textureLoader.load('/src/assets/uv-test-bw.png')

  const material = new MeshStandardMaterial({normalMap: texture, lightMap: texture2})
  // material.transparent = true
  return material
}

function createCube() {
  const geometry = new BoxGeometry(20,20,20)
  // const material = createMaterial()
  const material = createMaterial()
  const cube = new Mesh(geometry, material)

  cube.tick = (delta: number) => {
    waveRadian += MathUtils.degToRad(.5)
    waveNumber += .04
    cube.rotation.x += radiansPerSecond * delta
    cube.rotation.y += radiansPerSecond * delta
    cube.rotation.z += radiansPerSecond * delta
    // cube.position.x = 10 - (cube.position.x + 1 * delta) % 10
    // cube.scale.x = triangleWave(waveNumber, 10) * delta * 100
    // cube.scale.y = triangleWave(waveNumber, 10) * delta * 100
    // cube.scale.z = triangleWave(waveNumber, 10) * delta * 100
  }

  return cube
}

export { createCube }