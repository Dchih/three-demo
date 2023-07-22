import { Loop } from "./system/loop"
import { createControls } from "./system/orbitControl"
import { Resizer } from "./system/resizer"
import { createCamera } from "./components/camera"
import { createScene } from "./components/scene"
import { createRenderer } from "./components/renderer"
import { createMap, drawMap } from "./components/shapes/map"
import { createCss2DRenderer } from "./components/shapes/mapText"

import { createCube } from "./components/shapes/cube"
import { createLights } from "./components/light/light"

import { Color } from "three"

class Map3D {
  private container: HTMLElement
  private camera
  private renderer
  private scene
  private controls
  private loop: Loop
  private css2drenderer
  private cube

  constructor(container: HTMLElement) {
    this.container = container
    this.camera = createCamera()
    this.renderer = createRenderer()
    this.scene = createScene()

    

    this.createCSSRenderer()
    this.addControl()
    this.addLoop()

    this.cube = createCube()
    this.scene.add(this.cube)
    this.loop.updatables.push(this.cube)

    this.addLights()
    this.addMap()
    this.container.append(this.renderer.domElement)
    this.initResizer()
  }

  private initResizer() {
    const { container, camera, renderer, css2drenderer } = this
    new Resizer({ container, camera, renderer, css2DRenderer: css2drenderer })
  }

  private createCSSRenderer() {
    this.css2drenderer = createCss2DRenderer()
  }

  private addMap() {
    const shapeGroup = drawMap()
    shapeGroup.forEach(shape => {
      this.scene.add(shape)
    })
    const shapeGroup2 = drawMap([0, 1, 2], new Color(0x09A7E3))
    shapeGroup2.forEach(shape => {
      this.scene.add(shape)
    })
    const map = createMap([0, 1, 1.5])
    const map2 = createMap([0, 0, -.5], new Color(0xffffff))
    this.scene.add(map)
    this.scene.add(map2)
  }

  private addControl() {
    const { container, camera } = this
    this.controls = createControls(camera, container)
  }

  private addLoop() {
    const { camera, renderer, css2drenderer, scene, controls } = this
    this.loop = new Loop({ camera, renderer, cssRenderer: css2drenderer, scene })
    this.loop.updatables.push(controls)
  }

  private addLights() {
    const light = createLights()
    this.scene.add(light)
  }

  render() {
    const { camera, renderer, scene, container } = this
    container.append(renderer.domElement)
    renderer.render(scene, camera)
  }

  start() {
    this.loop.start()
  }

  stop() {
    this.loop.stop()
  }
}

export { Map3D }