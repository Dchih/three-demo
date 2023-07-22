import { BoxGeometry, MeshStandardMaterial, Mesh } from "three"

function createCube() {
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshStandardMaterial({ color: "purple" });
  const cube = new Mesh(geometry, material);

  cube.rotation.set(-0.5, -0.1, 0.8);

  // this method will be called once per frame
  cube.tick = () => {
    // increase the cube's rotation each frame
    cube.rotation.z += 0.01;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  };
  cube.position.set(-40, -40, 10)
  return cube;
}

export { createCube }