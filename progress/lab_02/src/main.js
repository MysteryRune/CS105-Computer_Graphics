import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry_cube = new THREE.BoxGeometry( 1, 1, 1 );
const material_cube = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry_cube, material_cube );
scene.add( cube );

const geometry_edges = new THREE.BoxGeometry( 1, 1, 1 );
const material_line = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 1 })
const edges_cube = new THREE.EdgesGeometry( geometry_edges ); 
const line_cube = new THREE.LineSegments(edges_cube, material_line ); 
scene.add( line_cube );

const geometry_sphere = new THREE.SphereGeometry(1, 32, 16);
const material_sphere = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry_sphere, material_sphere );
const material_line_sphere = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 1 })
const edges_sphere = new THREE.EdgesGeometry( geometry_sphere ); 
const line_sphere = new THREE.LineSegments(edges_sphere, material_line_sphere ); 
sphere.position.set(2, 2, -2);
line_sphere.position.set(2, 2, -2);
scene.add( sphere );
scene.add( line_sphere );

const geometry_octahedron = new THREE.OctahedronGeometry(1, 0);
const material_octahedron = new THREE.MeshBasicMaterial({ color: 0x00ffff, linewidth: 1 });
const octahedron = new THREE.Mesh(geometry_octahedron, material_octahedron);
const material_line_octahedron = new THREE.LineBasicMaterial({ color: 0xff00ff, linewidth: 1 })
const edges_octahedron = new THREE.EdgesGeometry( geometry_octahedron ); 
const line_octahedron = new THREE.LineSegments(edges_octahedron, material_line_octahedron );
octahedron.position.set(-2, 2, -2);
line_octahedron.position.set(-2, 2, -2);
scene.add( octahedron );
scene.add( line_octahedron );

const geometry_cone = new THREE.ConeGeometry( 1, 2, 32 ); 
const material_cone = new THREE.MeshBasicMaterial( {color: 0x16537e} );
const cone = new THREE.Mesh(geometry_cone, material_cone );
const material_line_cone = new THREE.LineBasicMaterial({ color: 0xffa140, linewidth: 1 })
const edges_cone = new THREE.EdgesGeometry( geometry_cone ); 
const line_cone = new THREE.LineSegments(edges_cone, material_line_cone );
cone.position.set( 0, 4, -1);
line_cone.position.set( 0, 4, -1 );
cone.rotation.x = 220 * (Math.PI / 180);
cone.rotation.z =  10 * (Math.PI / 180);
line_cone.rotation.x = 220 * (Math.PI / 180);
line_cone.rotation.z = 10 * (Math.PI / 180);
scene.add( cone );
scene.add( line_cone );

const geometry_plane = new THREE.PlaneGeometry( 10, 10, 10, 10 );
const material_plane = new THREE.MeshBasicMaterial( {color: 0x7c857e, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry_plane, material_plane );
const grid_plane = new THREE.GridHelper(10, 10, 0xffffff, 0xffffff);
plane.position.set( 0, -1, 0 );
grid_plane.position.set( 0, -0.99, 0 );
plane.rotation.x =  90 * (Math.PI / 180);
scene.add( plane );
scene.add( grid_plane );


camera.position.x = 0;
camera.position.y = 5;
camera.position.z = 8;

const target = new THREE.Vector3( 0, -2, -1 );
camera.lookAt(target);


function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.009;
	cube.rotation.y += 0.009;
	line_cube.rotation.x += 0.009;
	line_cube.rotation.y += 0.009;

	line_sphere.rotation.x += 0.009;
	line_sphere.rotation.y += 0.009;
	sphere.rotation.x += 0.009;
	sphere.rotation.y += 0.009;

	octahedron.rotation.x += 0.009;
	octahedron.rotation.y += 0.009;
	line_octahedron.rotation.x += 0.009;
	line_octahedron.rotation.y += 0.009;

	cone.rotation.y += 0.009;
	line_cone.rotation.y += 0.009;

	renderer.render( scene, camera );
}

if ( WebGL.isWebGLAvailable() ) {

	// Initiate function or other initializations here
	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}