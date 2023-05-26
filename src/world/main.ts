import { World } from "./src";

function main() {
  const container = document.querySelector('#scene') as HTMLCanvasElement
  const world = new World(container)
  world.start()
  return world
}

export { main }