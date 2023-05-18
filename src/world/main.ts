import { World } from "./src";

function main() {
  const container = document.querySelector('#scene') as HTMLCanvasElement
  console.log(container)
  const world = new World(container)
  world.render()
}

export { main }