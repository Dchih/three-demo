import { Map3D } from "./index"

function main() {
  const container = document.querySelector('#scene') as HTMLElement
  const map = new Map3D(container)
  map.start()
  return map
}

export { main }