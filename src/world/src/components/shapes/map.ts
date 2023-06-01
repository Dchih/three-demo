import * as Three from "three";
import { Vector2, Shape, PerspectiveCamera, Mesh,ExtrudeGeometry, Scene } from "three"
import { geoJSON } from "../../../../assets/mapJSON/geojson";

function paintEdge(pointArr: number[]) {
  const geometry = new Three.BufferGeometry()
  const vertices = new Float32Array(pointArr)
  geometry.setAttribute('position', new Three.BufferAttribute(vertices, 3))
  const material = new Three.LineBasicMaterial({color: 0xffffff})
  const line = new Three.LineLoop(geometry, material)
  return line
}

function tackleJSON() {
  const group = new Three.Group()
  geoJSON.features.forEach(feature => {
    const coordinates = feature.geometry.coordinates
    let pointArr: number[] = []
    coordinates.forEach(multiPolygon => {
      multiPolygon.forEach(polygon => {
        const vector3: [number, number, number] = polygon.concat([.52]) as [number, number, number]
        // 假设经纬度平均值为 112 22 2
        vector3[0] = (vector3[0] - 112.65) * 60
        vector3[1] = (vector3[1] - 22.82) * 60
        // vector3[1] = vector3[1] - 22
        pointArr = pointArr.concat(vector3)
      })
    })
    group.add(paintEdge(pointArr))
  })
  group.scale.set(4,4,4)
  // group.position.set(-112,-22,-2)
  return group
}

let meshGroup: Mesh[]
function paintShape() {
  const textureLoader = new Three.TextureLoader()
  const texture = textureLoader.load('/src/assets/background.png')
  let shapeArr: Shape[] = []
  geoJSON.features.forEach(feature => {
    const coordinates = feature.geometry.coordinates
    coordinates.forEach(multiPolygon => {
      const shape = new Three.Shape()
      multiPolygon.forEach((polygon, index) => {
        const vector2 = [(polygon[0] - 112.65) * 240, (polygon[1] - 22.82) * 240]
        if(index === 0) shape.moveTo(vector2[0], vector2[1])
        else shape.lineTo(vector2[0], vector2[1])
      })
      shapeArr.push(shape)
    })
  })
  const material1 = new Three.MeshPhongMaterial({
    color: 0x00ff00,
    specular: 0x00ff00
  })
  const material2 = new Three.MeshStandardMaterial({
    color: 0x00ab00
  })
  console.log(shapeArr)
  const geometryArr: ExtrudeGeometry[] = []
  shapeArr.forEach(shape => {
    geometryArr.push(new Three.ExtrudeGeometry(
      shapeArr,
      {
        depth: 2,
        bevelEnabled: false //无倒角
      }
    ))
  })
  // const geometry = new Three.ExtrudeGeometry(
  //   shapeArr,
  //   {
  //     depth: 2,
  //     bevelEnabled: false //无倒角
  //   }
  // )
  const meshArr: Mesh[] = []
  geometryArr.forEach(geometry => {
    meshArr.push(new Three.Mesh(geometry, [material2, material1]))  // 侧面 顶面
  })
  // const mesh = new Three.Mesh(geometry, [material1, materail2])
  meshGroup = meshArr
  console.log('mesh: ', meshArr)
  return meshArr
}

// 初始化完map添加鼠标事件
// 鼠标事件应该在鼠标完成后恢复原来的颜色
// 优化： 鼠标移动时进行射线检测
let previous = null
let camera: PerspectiveCamera
let scene: Scene
const raycaster = new Three.Raycaster()
function handleMouseOver(e: MouseEvent) {
  let mouse = new Three.Vector2(0, 0)
  const canvas: HTMLCanvasElement = document.querySelector('#scene') as HTMLCanvasElement
  mouse.x = (e.offsetX / canvas.offsetWidth) * 2 - 1
  mouse.y = - (e.offsetY / canvas.offsetHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  // 性能问题
  let intersections = raycaster.intersectObjects(meshGroup)
  console.log(intersections[0].object.uuid, meshGroup[0].uuid)
  if(previous) {
    previous.material[0].color = new Three.Color(0x686868)
  }
  meshGroup
  intersections.forEach(intersect => {
    console.log(intersect.object.material[0].uuid)
  })
  if(intersections[0] && intersections[0].object) {
    intersections[0].object.material[0].color = new Three.Color(0xff9300)
    previous = intersections[0].object
  }
}

// func
window.addEventListener('click', handleMouseOver, false)
function createMap(mCamera: PerspectiveCamera, mScene: Scene) {
  const group = tackleJSON()
  camera = mCamera
  scene = mScene
  return group
}

export { createMap, paintShape }