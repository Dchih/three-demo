import { PerspectiveCamera, Mesh, WebGLRenderer, Scene, Object3D, Vector3 } from "three"
import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createRenderer } from "./systems/renderer";
import { createScene } from "./components/scene";
import { Resizer } from "./systems/Resizer";
import { createTorus } from "./components/shapes/torus";

class World {
  #container: HTMLCanvasElement;
  #camera: PerspectiveCamera;
  // cube: Mesh;
  #torus: Mesh;
  #renderer: WebGLRenderer;
  #scene: Scene;
  #group: Object3D;

  angle: number;

  constructor(container: HTMLCanvasElement) {
    this.#container = container
    this.#camera = createCamera()
    this.#renderer = createRenderer()
    this.#scene = createScene()
    this.#container.appendChild(this.#renderer.domElement)

    // const cube: Mesh = createCube()
    this.angle = 0
    this.#torus = createTorus()
    this.#scene.add(this.#torus)

    const resizer = new Resizer(this.#container, this.#camera, this.#renderer)
  }

  render() {
    requestAnimationFrame(this.render.bind(this))

    // this.#torus.rotation.x += .01
    // this.#torus.rotation.y += .01

    const radius = 70
    this.angle += .01
    this.#camera.position.x = radius * Math.cos(this.angle)
    this.#camera.position.z = radius * Math.sin(this.angle)
    this.#camera.position.y = 10
    this.#camera.lookAt(new Vector3(0,0,0))


    this.#renderer.render(this.#scene, this.#camera)
  }
}

export { World }