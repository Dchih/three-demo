import * as Three from "three";
import { Vector2, Shape } from "three"
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

function paintShape() {
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
    color: 0x0000ff,
    specular: 0x00ff00
  })
  const materail2 = new Three.MeshBasicMaterial({
    color: 0x008bfb
  })
  console.log(shapeArr)
  const geometry = new Three.ExtrudeGeometry(
    shapeArr,
    {
      depth: 2,
      bevelEnabled: false //无倒角
    }
  )
  const mesh = new Three.Mesh(geometry, [material1, materail2])
  // mesh.scale.set(4,4,4)
  // mesh.position.set(0,0,0)
  return mesh
}

// func

function createMap() {
  const group = tackleJSON()
  return group
}

export { createMap, paintShape }