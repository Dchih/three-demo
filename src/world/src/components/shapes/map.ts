import * as Three from "three";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { Vector2,Vector3, Shape, PerspectiveCamera, Mesh,ExtrudeGeometry, Scene, CircleGeometry, MathUtils, CircleGeometry } from "three"
import { geoJSON } from "../../../../assets/mapJSON/geojson";
import { points } from "../../../../assets/mapJSON/points";
import { CSS2DRenderer,CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { createCube } from "../cube";

interface CSS3DObjectOptions {
  coord: Vector3
}

let camera: PerspectiveCamera
let scene: Scene
let meshGroup: Mesh[]
let pointGroup: Mesh[]

function createRing(index: number, total: number) {
  const ring = new Mesh(
    new Three.RingGeometry(1, 1.1, 32),
    new Three.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 1
    })
  )
  ring.tick = () => {
    const offset = (Date.now() / 1000 + index) % total
    ring.geometry = new Three.RingGeometry(offset, offset + .1, 32)
    ring.material.opacity = 1 - offset / total
  }
  ring.position.set(0, 0, 3)
  return ring
}

function createWaves(num: number) {
  const rings: Mesh[] = []
  for(let i = 0; i < num; i++) {
    rings.push(createRing(i, num))
  }
  return rings
}

function createLines() {

}

function highlightEdge() {

}

function create3dRect(options: CSS3DObjectOptions) {
  const { coord } = options
  // 3d柱子
  const el = document.createElement('div')
  el.innerHTML = `<div class="cube">
    <div class="face front"></div>
    <div class="face back"></div>
    <div class="face right"></div>
    <div class="face left"></div>
    <div class="face top"></div>
    <div class="face bottom"></div>
  </div>`
  const css3dobject = new CSS3DObject(el)
  const { x, y, z } = coord
  css3dobject.position.set(x, y , z)
  return css3dobject
}

function createPointsCube() {
  const meshArr: Mesh[] = []
  for(const point of points) {
    for(const co of point.coordinates) {
      const material = new Three.MeshStandardMaterial({color: 0x00ff00})
      const geometry = new Three.BoxGeometry(1, 1, 30)
      const mesh = new Three.Mesh(geometry, material)
      const [y, x] = co.coord
      const xAxes = (x - 112.65) * 240
      const yAxes = (y - 22.82) * 240
      const vector3 = new Three.Vector3(xAxes, yAxes, 2.6)
      // const { a, b, c } = vector3
      mesh.position.set(xAxes, yAxes, 17.6)
      meshArr.push(mesh)
    }
  }
  return meshArr
}

function paintText() {
  // 文本
  let order = 0, css2dobjects = []
  for(let i = 0; i < points.length; i++) {
    const coords = points[i].coordinates
    for(let j = 0; j < coords.length; j++) {
      const [y, x] = coords[j].coord
      const xAxes = (x - 112.65) * 240
      const yAxes = (y - 22.82) * 240
      const vector3 = new Three.Vector3(xAxes, yAxes, 2.7)
      css2dobjects.push(createTag(coords[j].name, order, vector3))
      order += 1
    }
  }
  return css2dobjects
}

async function paintPoint() {
  const pointArr: Mesh[] = []
  for(const area of points) {
    for(const point of area.coordinates) {
      const circle = new Three.CircleGeometry(.5, 16);
      const materail = new Three.MeshBasicMaterial({color: 0x00ff00})
      const mesh = new Three.Mesh(circle, materail)
      const [y, x] = point.coord
      const xAxes = (x - 112.65) * 240
      const yAxes = (y - 22.82) * 240
      mesh.position.set(xAxes, yAxes, 2.6)
      mesh.name = point.name
      pointArr.push(mesh)
    }
  }
  pointGroup = pointArr
  return pointArr
}

function createTag(name: string, index: number, coord: Vector3) {
  const el = document.createElement('div')
  el.setAttribute('id', name + index)
  el.innerHTML = name
  const css2DObject = new CSS2DObject(el)
  const {x, y, z} = coord
  css2DObject.position.set(x, y, z)
  return css2DObject
}

function createCss3DRenderer() {
  const css3d = new CSS3DRenderer()
  css3d.setSize(window.innerWidth, window.innerHeight)
  css3d.domElement.style.position = 'absolute'
  css3d.domElement.style.top = '0'
  css3d.domElement.style.transform = 'rotate3d(0, 0, 1, 90deg)'
  css3d.domElement.style.pointerEvents = 'none'
  document.body.appendChild(css3d.domElement)
  return css3d
}

function createCss2DRenderer() {
  const css2DRenderer = new CSS2DRenderer()
  css2DRenderer.setSize(window.innerWidth, window.innerHeight)
  css2DRenderer.domElement.style.position = 'absolute'
  css2DRenderer.domElement.style.top = '0'
  css2DRenderer.domElement.style.pointerEvents = 'none'
  document.body.appendChild(css2DRenderer.domElement)
  // css2DRenderer.render(scene, camera)
  // const tag = new CSS2DObject(dom)
  return css2DRenderer
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
      const cssObject = new CSS3DObject(el)
      // cssObject.position.set()
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
    meshArr.push(new Three.Mesh(geometry, [material2, material1]))  // 侧面 顶面
  })
  meshGroup = meshArr
  return meshArr
}

// 初始化完map添加鼠标事件
// 鼠标事件应该在鼠标完成后恢复原来的颜色
// 优化： 鼠标移动时进行射线检测
let previous = null

function handleMouseOver(e: MouseEvent) {
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
  let intersectionOfPoints = raycaster.intersectObjects(pointGroup)
  if(intersectionOfPoints[0] && intersectionOfPoints[0].object) {
    console.log(intersectionOfPoints[0].object.name)
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

export { 
  createMap, 
  paintShape,
  paintPoint,
  paintPointNames,
  createText,
  createTag,
  createCss2DRenderer,
  paintText,
  createCss3DRenderer,
  create3dRect,
  createPointsCube,
  createWaves,
  createRing }