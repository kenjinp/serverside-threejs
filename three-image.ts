// Assign this to global so that the subsequent modules can extend it:
import * as THREE from "three-canvas-renderer";
import { Canvas } from "canvas";

const mimeType = "image/png";

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(max) {
  return getRandomArbitrary(0, max);
}

const makeCube = () => {
  const cube = new THREE.Object3D();
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  for (var i = 0; i < geometry.faces.length; i += 2) {
    var hex = Math.random() * 0xffffff;
    geometry.faces[i].color.setHex(hex);
    geometry.faces[i + 1].color.setHex(hex);
  }

  const material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.FaceColors
    // overdraw: 0.5
  });

  cube.add(new THREE.Mesh(geometry, material));
  cube.position.set(
    getRandomArbitrary(-200, 200),
    getRandomArbitrary(-200, 200),
    getRandomArbitrary(-200, 200)
  );
  cube.rotation.set(getRandomInt(360), getRandomInt(360), getRandomInt(360));
  return cube;
};

export default () => {
  const numCubes = 1000;
  const w = 600;
  const h = 600;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(70, 1, 1, 100);
  camera.position.y = 0;
  camera.position.z = 200;

  for (var i = 0; i < numCubes; i++) {
    const cube = makeCube();
    scene.add(cube);
  }

  const canvas = new Canvas(w, h);
  // @ts-ignore
  canvas.style = {}; // dummy shim to prevent errors during render.setSize

  const renderer = new THREE.CanvasRenderer({
    canvas: canvas,
    alpha: true
  });

  renderer.setClearColor(0xffffff, 0);
  renderer.setSize(600, 600);
  renderer.render(scene, camera);

  return canvas.toBuffer(mimeType);
};
