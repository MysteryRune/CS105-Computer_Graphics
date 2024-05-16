import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';


var object = [];
// var objectSelectionDropBox = document.getElementById("object-type");
var objectShowCube_01 = document.getElementById("cube-geometry");
var objectShowCone_01 = document.getElementById("cone-geometry");
var objectShowBall_01 = document.getElementById("ball-geometry");
var intervalID;

// objectSelectionDropBox.addEventListener("change", change_object, false);
objectShowCube_01.addEventListener("change", objectShowStatusCube_01Update, false);
objectShowCone_01.addEventListener("change", objectShowStatusCone_01Update, false);
objectShowBall_01.addEventListener("change", objectShowStatusBall_01Update, false);

function objectShowStatusCube_01Update() {
	let objectShowCube_01 = document.getElementById("cube-geometry");
	if ( objectShowCube_01.checked ) {
		cube_01.visible = true;
	} else {
		cube_01.visible = false;
	}
}
function objectShowStatusCone_01Update() {
	let objectShowCone_01 = document.getElementById("cone-geometry");
	if ( objectShowCone_01.checked ) {
		cone_01.visible = true;
	} else {
		cone_01.visible = false;
	}
}
function objectShowStatusBall_01Update() {
	let objectShowBall_01 = document.getElementById("ball-geometry");
	if ( objectShowBall_01.checked ) {
		ball_01.visible = true;
	} else {
		ball_01.visible = false;
	}
}
// function change_object() {
// 	object[0].visible = !object[0].visible;
// 	object = get_object();
// 	object[0].visible = !object[0].visible;
// 	// let angleXaxisValue = document.getElementById("angle-x-axis-value");
// 	// let angleYaxisValue = document.getElementById("angle-y-axis-value");
// 	// let angleZaxisValue = document.getElementById("angle-z-axis-value");
// 	// let transitionXaxisValue = document.getElementById("transition-x-axis-value");
// 	// let transitionYaxisValue = document.getElementById("transition-y-axis-value");
// 	// let transitionZaxisValue = document.getElementById("transition-z-axis-value");
// 	// let scaleValueX = document.getElementById("scale-x-axis-value");
// 	// let scaleValueY = document.getElementById("scale-y-axis-value");
// 	// let scaleValueZ = document.getElementById("scale-z-axis-value");

// 	// // console.log(object[0].rotation.x);
// 	// angleXaxisValue.textContent = parseFloat(object[0].rotation.x*180/Math.PI).toFixed(1);
// 	// angleYaxisValue.textContent = parseFloat(object[0].rotation.y*180/Math.PI).toFixed(1);
// 	// angleZaxisValue.textContent = parseFloat(object[0].rotation.z*180/Math.PI).toFixed(1);
// 	// transitionXaxisValue.textContent = object[0].position.x;
// 	// transitionYaxisValue.textContent = object[0].position.y;
// 	// transitionZaxisValue.textContent = object[0].position.z;
// 	// scaleValueX.textContent = parseFloat(object[0].scale.x).toFixed(1);
// 	// scaleValueY.textContent = parseFloat(object[0].scale.y).toFixed(1);
// 	// scaleValueZ.textContent = parseFloat(object[0].scale.z).toFixed(1);

// }
// function get_object() {
// 	// let object_selection_drop_box = document.getElementById("object-type");
// 	// if (object_selection_drop_box.value == "Cube") {
// 	// 	return [cube_01, line_cube_01];
// 	// } else if (object_selection_drop_box.value == "Cone") {
// 	// 	return [cone_01, line_cone_01];
// 	// } else {
// 	// 	return [ball_01, line_ball_01];
// 	// }

// 	let object_selection_drop_box = document.getElementById("object-type");
// 	if (object_selection_drop_box.value == "Cube") {
// 		return [cube_01];
// 	} else if (object_selection_drop_box.value == "Cone") {
// 		return [cone_01];
// 	} else {
// 		return [ball_01];
// 	}
// }


// Load the texture
const textureLoader = new THREE.TextureLoader();
var texture;

function init() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 
		75, 
		window.innerWidth / window.innerHeight, 
		0.1, 
		1000 
	);

	//Create a WebGLRenderer and turn on shadows in the renderer
	const renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	document.getElementById("webgl").appendChild( renderer.domElement );

	renderer.setSize( 
		window.innerWidth, 
		window.innerHeight 
	);

	camera.position.set( 0, 10, 35 );
	camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

	texture = textureLoader.load('assets/PavingStones138_1K/PavingStones138_1K-PNG_Color.png');
	const geometry = new THREE.PlaneGeometry( 50, 50, 32, 32 );
	const material = new THREE.MeshStandardMaterial( {color: 0xdddddd, side: THREE.DoubleSide, map: texture} );
	const plane = new THREE.Mesh( geometry, material );
	plane.position.set( 0, -2, 0 );
	plane.rotation.x = -90 * (Math.PI / 180);
	plane.receiveShadow = true;
	scene.add( plane );

	// const grid_plane = new THREE.GridHelper(50, 50, 0xffffff, 0xffffff);
	// grid_plane.position.set( 0, 0, 0 );
	// scene.add(grid_plane);

	renderer.render( 
		scene, 
		camera 
	);


	return [renderer, scene, camera];
}
function update_scence() {
	renderer.render( scene, camera )
}

var [renderer, scene, camera] = init();

var controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', ()=>{renderer.render(scene, camera)} );

texture = textureLoader.load('assets/MetalPlates006_1K/MetalPlates006_1K-PNG_Color.png');
const geometry_cube = new THREE.BoxGeometry( 5, 5, 5 );
// const material_cube = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
const material_cube = new THREE.MeshPhongMaterial( { color: 0x00ff00, map: texture } );
const cube_01 = new THREE.Mesh( geometry_cube, material_cube );
cube_01.position.set( 0, 3, 0);
cube_01.castShadow = true;
scene.add( cube_01 );
// const geometry_edges = new THREE.BoxGeometry( 5, 5, 5 );
// const material_line = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 })
// const edges_cube_01 = new THREE.EdgesGeometry( geometry_edges ); 
// const line_cube_01 = new THREE.LineSegments(edges_cube_01, material_line ); 
// line_cube_01.position.set( 0, 3, 0 );
// scene.add( line_cube_01 );

const geometry_cone = new THREE.ConeGeometry( 3, 5, 32 ); 
const material_cone = new THREE.MeshPhongMaterial( { color: 0xff0000, map: texture } );
const cone_01 = new THREE.Mesh(geometry_cone, material_cone );
cone_01.position.set( -7, 3, 0);
cone_01.castShadow = true;
cone_01.visible = false;
scene.add( cone_01 );
// const material_line_cone = new THREE.LineBasicMaterial({ color: 0xffa140, linewidth: 1 })
// const edges_cone = new THREE.EdgesGeometry( geometry_cone ); 
// const line_cone_01 = new THREE.LineSegments(edges_cone, material_line_cone );
// line_cone_01.position.set( -7, 3, 0 );
// scene.add( line_cone_01 );

const geometry_sphere = new THREE.SphereGeometry(2.5, 32, 16);
const material_sphere = new THREE.MeshPhongMaterial( { color: 0x0000ff, map: texture } );
const ball_01 = new THREE.Mesh( geometry_sphere, material_sphere );
ball_01.position.set( 7, 3, 0 );
ball_01.castShadow = true;
ball_01.visible = false;
scene.add( ball_01 );
// const material_line_sphere = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 1 })
// const edges_sphere = new THREE.EdgesGeometry( geometry_sphere ); 
// const line_ball_01 = new THREE.LineSegments(edges_sphere, material_line_sphere ); 
// line_ball_01.position.set( 7, 3, 0 );
// scene.add( line_ball_01 );



//Create a PointLight and turn on shadows for the pointLight
const pointLight = new THREE.PointLight( 0xffffff, 1000, 0 );
pointLight.position.set( 15, 15, 0 );
pointLight.castShadow = true; // default false
pointLight.shadow.mapSize.width = 2048;
pointLight.shadow.mapSize.height = 2048;
pointLight.shadow.bias = 0.001;

scene.add( pointLight );
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );

update_scence();

// object = [cube_01, line_cube_01];
object = [cube_01];

var oscillationPointLight_x = -1;
var oscillationPointLight_z = -1;
var PointLight_x = 0;
var PointLight_z = 0;
function render() {

	if (pointLight.position.x >= 15)
		oscillationPointLight_x = -1
	else if (pointLight.position.x <= -15)
		oscillationPointLight_x = 1;
	if (pointLight.position.z >= 15)
		oscillationPointLight_z = -1
	else if (pointLight.position.z <= -15)
		oscillationPointLight_z = 1;
	PointLight_x += oscillationPointLight_x*0.005;
	pointLight.position.x = 15*Math.cos( PointLight_x);
	PointLight_z += oscillationPointLight_z*0.005;
	pointLight.position.z = -15*Math.sin( PointLight_z);
	pointLightHelper.update();

	// Update camera projection matrix if needed
    camera.updateProjectionMatrix();

    // Render the scene
    renderer.render(scene, camera);

    // Call render function recursively
    requestAnimationFrame(render);
}
render();