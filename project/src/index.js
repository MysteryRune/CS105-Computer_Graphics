import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import {FBXLoader} from 'three/addons/loaders/FBXLoader.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// import { GLTFLoaderExtension } from 'three/addons/loaders/GLTFLoader_extensions.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import {Model3DCharacter} from './character.js';
import * as uitMap from './initMap.js';



const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();

const fov = 60;
const aspect = 1920 / 1080;
const near = 0.1;
const far = 5000.0;
// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 5000 );
const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
// const orbit = new OrbitControls(camera, renderer.domElement);
const world = new CANNON.World();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0xA3A3A3);
camera.position.set(0, 30, -30);
world.gravity.set(0, -9.86, 0);


renderer.domElement.id = 'webGL';
// renderer.domElement.style.cursor = 'none';
document.body.appendChild(renderer.domElement);
// orbit.update();
renderer.render(scene, camera);

  // Grid Plan Helper
// const grid = new THREE.GridHelper(30, 30);
// grid.receiveShadow = true;
// scene.add(grid);
  // Axes Helper
// const axesHelper = new THREE.AxesHelper(4);
// scene.add(axesHelper);
  // Camera Helper
// const helper = new THREE.CameraHelper( camera );
// scene.add( helper );

let SunMoon = new uitMap.SunMoon(scene, camera);

// const loader = new THREE.CubeTextureLoader();
// const texture = loader.load([
//     './assets/imgs/DaySky_negx.png',
//     './assets/imgs/DaySky_posx.png',
//     './assets/imgs/DaySky_posy.png',
//     './assets/imgs/DaySky_negy.png',
//     './assets/imgs/DaySky_posz.png',
//     './assets/imgs/DaySky_negz.png',
// ]);
// scene.background = texture;

new RGBELoader().load('./assets/imgs/Sunrise.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

// const pointLight = new THREE.PointLight( 0xffffff, 500, 0 );
// pointLight.position.set( 8, 10, 0 );
// pointLight.castShadow = true; // default false
// pointLight.shadow.mapSize.width = 2048;
// pointLight.shadow.mapSize.height = 2048;
// pointLight.shadow.bias = 0.001;

// scene.add( pointLight );
// const sphereSize = 1;
// const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
// scene.add( pointLightHelper );


let model_path = './assets/3dModels/Character 06 - Drone 04.glb';
let model;

uitMap.loadMap(scene, camera);
let userCharacter = new Model3DCharacter(scene, camera, world, model_path);
// let userCharacter = new Model3DCharacter(scene, model_path);


// Ground Plane for test

// const geometry = new THREE.PlaneGeometry( 100, 100, 100, 100 );
// const material = new THREE.MeshPhongMaterial( {color: 0xdddddd, side: THREE.DoubleSide} );
// const plane = new THREE.Mesh( geometry, material );
// plane.position.set( 0, 0, 0 );
// plane.rotation.x = -90 * (Math.PI / 180);
// plane.receiveShadow = true;
// scene.add( plane );
/////////////////////////////

//////////////////////////// Add some object ////////////////////////////
// const geometry_cube = new THREE.BoxGeometry( 1, 1, 1 );
// const material_cube = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
// const cube_01 = new THREE.Mesh( geometry_cube, material_cube );
// cube_01.position.set( 0, 0.5, 5);
// cube_01.castShadow = true;
// scene.add( cube_01 );
/////////////////////////////////////////////////////////////////////////


function renderUpdate() {

  userCharacter.update();
  SunMoon.update();

  renderer.render(scene, camera);
  
  // Call render function recursively
  requestAnimationFrame(renderUpdate);
}
renderUpdate();

// renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});