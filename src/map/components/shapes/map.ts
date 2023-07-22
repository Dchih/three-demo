import { China } from "../../../assets/ChinaJSON/China";
import { 
  BufferGeometry,
  BufferAttribute,
  LineBasicMaterial,
  LineLoop,
  Group,
  Shape,
  ExtrudeGeometry,
  MeshPhongMaterial,
  MeshStandardMaterial,
  Mesh,
  Color,
 } from "three";

let meshGroup = []
type tupleThree = [number, number, number]

function drawLine(points: number[], color: Color) {
  const geometry = new BufferGeometry()
  const vertices = new Float32Array(points)
  geometry.setAttribute('position', new BufferAttribute(vertices, 3))
  const material = new LineBasicMaterial({color})
  const line = new LineLoop(geometry, material)
  return line
}

function createMapEdge(position: tupleThree, color: Color) {
  const group = new Group()
  China.features.forEach(feature => {
    const coordinates = feature.geometry.coordinates
    let points: number[] = []
    coordinates.forEach(multiPolygon => {
      multiPolygon.forEach(polygons => {
        polygons.forEach(polygon => {
          const vector3: tupleThree = polygon.concat([.52]) as tupleThree
          vector3[0] = (vector3[0] - 112.65)
          vector3[1] = (vector3[1] - 22.82)
          points = points.concat(vector3)
        })
      })
    })
    group.add(drawLine(points, color))
  })
  group.position.set(...position)
  return group
}

function createShapes(json) {
  let shapes: Shape[] = []
  json.features.forEach(feature => {
    const coordinates = feature.geometry.coordinates
    coordinates.forEach(multiPolygon => {
      multiPolygon.forEach(polygons => {
        const shape = new Shape()
        polygons.forEach((polygon, index) => {
          const vector2 = [(polygon[0] - 112.65), (polygon[1] - 22.82)]
          if(index === 0) shape.moveTo(vector2[0], vector2[1])
          else shape.lineTo(vector2[0], vector2[1])
        })
        shapes.push(shape)
      })
    })
  })
  return shapes
}

function createGeometries(shapes: Shape[]) {
  const geometries: ExtrudeGeometry[] = []
  shapes.forEach(shape => {
    geometries.push(new ExtrudeGeometry(
      shape,
      {
        depth: 0,
        bevelEnabled: false //无倒角
      }
    ))
  })
  return geometries
}

function createMeshes(geometries: ExtrudeGeometry[], position: tupleThree, color: Color) {
  const material1 = new MeshPhongMaterial({
    color,
    opacity: .56,
    // specular: 0x00ff00
  })
  const meshes: Mesh[] = []
  geometries.forEach(geometry => {
    const mesh = new Mesh(geometry, material1)
    mesh.position.set(...position)
    meshes.push(mesh)  // 侧面 顶面
  })
  return meshes
}

function drawMap(position: tupleThree = [0, 0, 0], color: Color = new Color(0x1BBBFB)) {
  const shapes = createShapes(China)
  const geometries = createGeometries(shapes)
  const meshes = createMeshes(geometries, position, color)
  meshGroup = meshes
  return meshes
}

function createMap(position: tupleThree, color: Color = new Color(0x00e5ff)) {
  return createMapEdge(position, color)
}

export { drawMap, createMap }