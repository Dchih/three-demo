import { Color, Scene, AxesHelper, GridHelper } from "three";

function createScene() {
  const scene = new Scene()
  // const axesHelper = new AxesHelper(8000)
  // const gridHelper = new GridHelper(600, 60)
  // scene.background = new Color(0xefefef)
  // scene.add(axesHelper)
  // scene.add(gridHelper)
  return scene
}

export { createScene }