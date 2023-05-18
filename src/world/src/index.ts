import { PerspectiveCamera, Mesh, WebGLRenderer, Scene,  } from "three"
import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { Resizer } from "./systems/Resizer";

class World {
  #container: HTMLCanvasElement;
  #camera: PerspectiveCamera;
  // cube: Mesh;
  #renderer: WebGLRenderer;
  #scene: Scene;
  constructor(container: HTMLCanvasElement) {
    this.#container = container
    this.#camera = createCamera()
    this.#renderer = createRenderer()
    this.#scene = createScene()
    this.#container.appendChild(this.#renderer.domElement)

    const cube: Mesh = createCube()
    this.#scene.add(cube)

    const resizer = new Resizer(this.#container, this.#camera, this.#renderer)
  }

  render() {
    this.#renderer.render(this.#scene, this.#camera)
  }
}

export { World }