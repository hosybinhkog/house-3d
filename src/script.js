import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import { Group } from "three";

THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// FOG
const fog = new THREE.Fog("#262837", 1, 15);

// Scene
const scene = new THREE.Scene();
scene.fog = fog;
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
/**
 * House
 */

const house = new THREE.Group();
scene.add(house);

const walls = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughnessMap: bricksRoughnessTexture,
  })
);

house.add(walls);
walls.position.y = 2.5 / 2;
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);

const root = new THREE.Mesh(
  new THREE.ConeBufferGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
house.add(root);
root.position.y = 2.5 + 1 / 2;
root.rotation.y += Math.PI / 4;

const door = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2, 2),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);

house.add(door);
door.position.z = 2 + 0.01;
door.position.y = 2 / 2;

// Temporary sphere
const sphereGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });
const bush1 = new THREE.Mesh(sphereGeometry, sphereMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(sphereGeometry, sphereMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.2, 2.1);

const bush3 = new THREE.Mesh(sphereGeometry, sphereMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.1);

const bush4 = new THREE.Mesh(sphereGeometry, sphereMaterial);
bush4.scale.set(0.25, 0.25, 0.25);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxBufferGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b2b1" });

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  console.log(angle);

  const radius = 6 + Math.random() * 3;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.4, z);
  grave.rotation.y = Math.random() - 0.4 + 1;
  grave.rotation.z = Math.random() - 0.4 + 1;
  grave.castShadow = true;
  graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight("#00ffff", 2, 3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight("#ffff00", 2, 3);
scene.add(ghost1);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d6ff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d6ff", 0.12);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

// Moon Light

const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
scene.add(doorLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");
renderer.shadowMap.enabled = true;

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;

moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 15;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

// ...

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

// ...

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

// ...

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const gostAngle = elapsedTime * 0.5;

  ghost1.position.x = Math.cos(gostAngle) * 4;
  ghost1.position.z = Math.sin(gostAngle) * 4;
  ghost1.position.y = Math.sin(gostAngle * 3);

  const gostAngle2 = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(gostAngle2) * 4;
  ghost2.position.z = Math.sin(gostAngle2) * 4;
  ghost2.position.y = Math.sin(gostAngle2 * 4) + Math.sin(gostAngle2 * 2.5);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x =
    Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
  ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
