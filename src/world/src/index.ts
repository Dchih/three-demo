import { PerspectiveCamera, Mesh, WebGLRenderer, Scene, PointLight, DirectionalLight, AmbientLight, Vector3 } from "three"
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { createCamera } from "./components/camera";
// import { createCube } from "./components/cube";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { Resizer } from "./systems/Resizer";
import { createTorus } from "./components/shapes/torus";
import { createLights, createAmbienLight } from "./components/lights/light";
import { createSphere } from "./components/shapes/sphere";
import { Loop } from "./systems/loop";
import { createCube } from "./components/cube";
import { createControls } from "./systems/orbitControl";
import { createMap, paintShape, paintPoint, paintPointNames, createText } from "./components/shapes/map"
import { createExtrude } from "./components/shapes/extrude"
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js"


class World {
  #container: HTMLCanvasElement;
  #camera: PerspectiveCamera;
  #cube: Mesh;
  #torus: Mesh;
  #renderer: WebGLRenderer;
  #scene: Scene;
  #lights: DirectionalLight;
  #sun: Mesh;
  #earth: Mesh;
  #moon: Mesh;
  #loop: Loop
  angle: number;
  #controls: OrbitControls;
  #map;
  #AmbientLight: AmbientLight;
  #mapShape: Mesh[];
  #extrude: Mesh;
  #points;
  #pointnames;

  constructor(container: HTMLCanvasElement) {
    this.#container = container
    this.#camera = createCamera()
    this.#renderer = createRenderer()
    this.#scene = createScene()

    this.#controls = createControls(this.#camera, this.#renderer, this.#scene, new CSS3DRenderer())

    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer)
    this.#loop.updatables.push(this.#controls)

    this.#container.appendChild(this.#renderer.domElement)

    this.angle = 0
    this.#lights = createLights()
    // this.#cube = createCube()
    // this.#scene.add(this.#cube)
    this.#map = createMap(this.#camera, this.#scene)
    this.#AmbientLight = createAmbienLight()
    this.#scene.add(this.#AmbientLight)
    this.#mapShape = paintShape()
    // this.#extrude = createExtrude()
    // this.#scene.add(this.#extrude)
    this.#mapShape.forEach(map => {
      this.#scene.add(map)
    })

    this.#points = paintPoint()
    this.#points.forEach(point => {
      this.#scene.add(point)
    })
    createText().then(mesh => this.#scene.add(mesh))
    // this.#pointnames = paintPointNames()
    // this.#pointnames.forEach(text => {
    //   this.#scene.add(text)
    // })
    
    this.#scene.add(this.#map, this.#lights)

    const resizer = new Resizer(this.#container, this.#camera, this.#renderer)
  }

  render() {
    // this.#controls.update()
    this.#renderer.render(this.#scene, this.#camera)
  }

  start() {
    this.#loop.start()
  }

  stop() {
    this.#loop.stop()
  }

  setCameraPosition(v: Vector3) {
    const { x, y, z} = v
    this.#camera.position.set(x, y, z)
    // this.#camera
  }

  setControlsPosition(v: Vector3) {
    console.log('setting...')
    this.#controls.target.lerp(v as Vector3, 0.05)
    this.#controls.update()
    this.render()
    console.log('setted')
  }
}

export { World }