import * as Three from "three";
import { geoJSON } from "../../../../assets/mapJSON/geojson";

function paintEdge(pointArr: number[]) {
  const geometry = new Three.BufferGeometry()
  const vertices = new Float32Array(pointArr)
  geometry.setAttribute('position', new Three.BufferAttribute(vertices, 3))
  const material = new Three.LineBasicMaterial({color: 0x000000})
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
        const vector3 = polygon.concat([2])
        pointArr = pointArr.concat(vector3)
      })
    })
    group.add(paintEdge(pointArr))
  })
  return group
}

function paintShape(pointArrs: number[]) {
  const shapeArr: number[] = []
  pointArrs.forEach(pointArr => {
    pointArr[0]
  })
}

function createMap() {
  const group = tackleJSON()
  return group
}

export { createMap }