import * as Three from "three";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { Vector2, Shape, PerspectiveCamera, Mesh,ExtrudeGeometry, Scene, CircleGeometry, MathUtils } from "three"
import { geoJSON } from "../../../../assets/mapJSON/geojson";
import { points } from "../../../../assets/mapJSON/points";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js"
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

function toScreenPosition(obj, camera, renderer){
    var vector = new Three.Vector3();
    var widthHalf = 0.5 * renderer.context.canvas.width;
    var heightHalf = 0.5 * renderer.context.canvas.height;
    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);
    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;
    return { 
        x: vector.x,
        y: vector.y
    };
}


async function paintPoint() {
  let pointsLen = 0
  for(let i = 0; points.length > i; i++) {
    pointsLen += points[i].coordinates.length
  }
  const pointArr: Mesh[] = []
  const circle = new Three.CircleGeometry(.5, 16);
  const materail = new Three.MeshBasicMaterial({color: 0x00ff00})
  const mesh = new Three.InstancedMesh(circle, materail, pointsLen)
  let index = 0
  for(const area of points) {
    for(const point of area.coordinates) {
      index++
      const instanceMatrix = new Three.Matrix4()
      const [y, x] = point.coord
      const xAxes = (x - 112.65) * 240
      const yAxes = (y - 22.82) * 240
      instanceMatrix.setPosition(new Three.Vector3(xAxes, yAxes, 2.6))
      mesh.setMatrixAt(index, instanceMatrix)
    }
  }
  console.log(mesh)
  pointArr.push(mesh)
  return pointArr
}

function loadFont() {
  return new Promise((resolve, reject) => {
    const loader = new FontLoader()
    loader.load('/font/KaiTi_Regular.json', resolve, PE => {
      console.log('Progress: ', (PE.loaded / PE.total) * 100 + '%')
    }, err => {
      console.log(err)
      reject(err)
    })
  })
}

let font:any = null
async function createText(text: string) {
    if(!font) {
      font = await loadFont()
    }
    const geo = new TextGeometry( text, {
      font: font,
      size: 1.8,
      height: .1,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 0.01,
      bevelSize: 0.05,
      bevelSegments: 3
    });
    const material = new Three.MeshBasicMaterial({ color: 0xff0000 })
    const mesh = new Mesh(geo, material)
    mesh.position.set(0, 0 ,2.6)
    return mesh
}

function paintPointNames() {
  const pointArr: CSS3DObject[] = []
  points.forEach(area => {
    area.coordinates.forEach(point => {
      const el = document.createElement('div')
      el.textContent = point.name
      el.style.fontSize = '16px'
      el.style.color = 'white'
      el.style.backgroundColor = 'black'
      // console.log(el)
      const cssObject = new CSS3DObject(el)
      // cssObject.position.set()
      // console.log(cssObject)
      const [y, x] = point.coord
      const xAxes = (x - 112.65) * 240
      const yAxes = (y - 22.82) * 240
      // cssObject.position.set(xAxes, yAxes, 2.6)
      pointArr.push(cssObject)
    })
  })
  return pointArr
}

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
        vector3[0] = (vector3[0] - 112.65) * 60
        vector3[1] = (vector3[1] - 22.82) * 60
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
  const geometryArr: ExtrudeGeometry[] = []
  shapeArr.forEach(shape => {
    geometryArr.push(new Three.ExtrudeGeometry(
      shape,
      {
        depth: 2,
        bevelEnabled: false //无倒角
      }
    ))
  })
  const material1 = new Three.MeshPhongMaterial({
    color: 0x00ff00,
    specular: 0x00ff00
  })
  const material2 = new Three.MeshStandardMaterial({
    color: 0x00ab00
  })
  const meshArr: Mesh[] = []
  geometryArr.forEach((geometry, index) => {
    // console.log(geometry.attributes.uv)
    meshArr.push(new Three.Mesh(geometry, [material2, material1]))  // 侧面 顶面
  })
  meshGroup = meshArr
  return meshArr
}

// 初始化完map添加鼠标事件
// 鼠标事件应该在鼠标完成后恢复原来的颜色
// 优化： 鼠标移动时进行射线检测
let previous = null
let camera: PerspectiveCamera
let scene: Scene
function handleMouseOver(e: MouseEvent) {
  console.log('触发事件')
  let mouse = new Three.Vector2(0, 0)
  const canvas: HTMLCanvasElement = document.querySelector('#scene') as HTMLCanvasElement
  mouse.x = (e.offsetX / canvas.offsetWidth) * 2 - 1
  mouse.y = - (e.offsetY / canvas.offsetHeight) * 2 + 1
  const raycaster = new Three.Raycaster()
  raycaster.setFromCamera(mouse, camera)
  // 性能问题
  let intersections = raycaster.intersectObjects(meshGroup)
  if(previous) {
    previous.material[0].color.set(0x686868)
  }
  
  if(intersections[0] && intersections[0].object) {
    const newMaterial1 = new Three.MeshPhongMaterial({
      color: 0xff9300,
      specular: 0x00ff00
    })
    intersections[0].object.material[0] = newMaterial1
    previous = intersections[0].object
  }
}

// func
window.addEventListener('mouseenter', handleMouseOver, false)
window.addEventListener('click', handleMouseOver, false)
function createMap(mCamera: PerspectiveCamera, mScene: Scene) {
  const group = tackleJSON()
  camera = mCamera
  scene = mScene
  return group
}

export { createMap, paintShape, paintPoint, paintPointNames, createText }