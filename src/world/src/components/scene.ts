import { Color, Scene, AxesHelper, GridHelper } from "three";

function createScene() {
  const scene = new Scene()
  // const axiosHelper = new AxesHelper(2000)
  // const gridHelper = new GridHelper(600, 60)
  scene.background = new Color(0xf0f0f0)
  // scene.add(axiosHelper)
  // scene.add(gridHelper)
  return scene
}

export { createScene }