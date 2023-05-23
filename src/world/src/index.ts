import { PerspectiveCamera, Mesh, WebGLRenderer, Scene, PointLight } from "three"
import { createCamera } from "./components/camera";
// import { createCube } from "./components/cube";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { Resizer } from "./systems/Resizer";
// import { createTorus } from "./components/shapes/torus";
import { createLights } from "./components/lights/light";
import { createSphere } from "./components/shapes/sphere";
import { Loop } from "./systems/loop";


class World {
  #container: HTMLCanvasElement;
  #camera: PerspectiveCamera;
  // #cube: Mesh;
  // #torus: Mesh;
  #renderer: WebGLRenderer;
  #scene: Scene;
  #lights: PointLight;
  #sun: Mesh;
  #earth: Mesh;
  #moon: Mesh;
  #loop: Loop
  angle: number;

  constructor(container: HTMLCanvasElement) {
    this.#container = container
    this.#camera = createCamera()
    this.#renderer = createRenderer()
    this.#scene = createScene()
    this.#loop = new Loop(this.#camera, this.#scene, this.#renderer)
    this.#container.appendChild(this.#renderer.domElement)
    
    // const cube: Mesh = createCube()
    this.angle = 0
    this.#lights = createLights()
    this.#sun = createSphere([10])
    this.#earth = createSphere([4])
    this.#moon = createSphere([1])
    this.#earth.position.z = 35
    this.#moon.position.z = 6
    this.#sun.add(this.#earth)
    this.#earth.add(this.#moon)
    this.#scene.add(this.#sun, this.#lights)

    const resizer = new Resizer(this.#container, this.#camera, this.#renderer)
    // resizer.onResize = () => {
    //   this.render()
    // }
  }

  render() {
    requestAnimationFrame(this.render.bind(this))
    this.#sun.rotation.y += 0.001
    this.#earth.rotation.y += .01
    this.#earth.rotation.x += .003
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