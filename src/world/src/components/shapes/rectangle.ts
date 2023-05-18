import { Vector2, ShapeGeometry, Shape } from "three"

function createPlaneShape(vectors: Vector2[]) {
  if(vectors.length < 2) {
    console.error('vectors must have 2 length')
    return
  }
  const shape = new Shape()
  const start = vectors.shift() as Vector2
  shape.moveTo(start.x, start.y)
  vectors.push(start)
  vectors.forEach(v2 => {
    shape.lineTo(v2.x, v2.y)
  })
  const shapeGeo = new ShapeGeometry(shape)
  return shapeGeo
}

export { createPlaneShape }