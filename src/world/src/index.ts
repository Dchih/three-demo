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
import { createMap } from "./components/shapes/map"


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
  #AmbientLight: AmbientLight

  constructor(container: HTMLCanvasElement) {
    this.#container = container
    this.#camera = createCamera()
    this.#renderer = createRenderer()
    this.#scene = createScene()

    this.#controls = createControls(this.#camera, this.#renderer, this.#scene)

    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer)
    this.#loop.updatables.push(this.#controls)

    this.#container.appendChild(this.#renderer.domElement)

    this.angle = 0
    this.#lights = createLights()
    // this.#cube = createCube()
    // this.#loop.updatables.push(this.#cube)
    // this.#torus = createTorus()
    // this.#loop.updatables.push(this.#torus)
    // this.#scene.add(this.#torus)
    this.#map = createMap()
    this.#AmbientLight = createAmbienLight()
    this.#scene.add(this.#AmbientLight)
    console.log(this.#map)
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