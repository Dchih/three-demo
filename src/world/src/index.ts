import { PerspectiveCamera, Mesh, WebGLRenderer, Scene, PointLight } from "three"
import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { createCamera } from "./components/camera";
// import { createCube } from "./components/cube";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { Resizer } from "./systems/Resizer";
import { createTorus } from "./components/shapes/torus";
import { createLights } from "./components/lights/light";
import { createSphere } from "./components/shapes/sphere";
import { Loop } from "./systems/loop";
import { createCube } from "./components/cube";
import { createControls } from "./systems/orbitControl";


class World {
  #container: HTMLCanvasElement;
  #camera: PerspectiveCamera;
  #cube: Mesh;
  #torus: Mesh;
  #renderer: WebGLRenderer;
  #scene: Scene;
  #lights: PointLight;
  #sun: Mesh;
  #earth: Mesh;
  #moon: Mesh;
  #loop: Loop
  angle: number;
  #controls: OrbitControls;

  constructor(container: HTMLCanvasElement) {
    this.#container = container
    this.#camera = createCamera()
    this.#renderer = createRenderer()
    this.#scene = createScene()

    this.#controls = createControls(this.#camera, this.#renderer.domElement)

    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer)
    this.#container.appendChild(this.#renderer.domElement)
    this.#loop.updatables.push(this.#controls)

    this.angle = 0
    this.#lights = createLights()
    this.#cube = createCube()
    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer)
    // this.#loop.updatables.push(this.#cube)
    this.#torus = createTorus()
    // this.#loop.updatables.push(this.#torus)
    this.#scene.add(this.#torus)
    this.#scene.add(this.#cube, this.#lights)

    const resizer = new Resizer(this.#container, this.#camera, this.#renderer)
  }

  render() {
    this.#controls.update()
    this.#renderer.render(this.#scene, this.#camera)
  }

  start() {
    this.#loop.start()
  }

  stop() {
    this.#loop.stop()
  }
}

export { World }