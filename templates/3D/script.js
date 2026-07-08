import * as THREE from 'three';
import { XRButton } from 'three/addons/webxr/XRButton.js'; 
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
const camera = new THREE.PerspectiveCamera( 105, window.innerWidth / window.innerHeight, 1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate ); 
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.maxDistance = 40;
camera.position.z = 20;

const count = 1000; 

const objects_matrix = new Array(count).fill(new THREE.Matrix4());

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x5ef796 });
const instance = new THREE.InstancedMesh(geometry, material, count);

const r = () =>  150*(Math.random()-1/2);
for (let i = 0; i < count; i++) {
        
    var scale = new THREE.Vector3(1, 1, 1.1);
     objects_matrix[i].scale(scale);

objects_matrix[i].setPosition(
        r(),
        r(),
        r()
    );
       instance.setMatrixAt(i, objects_matrix[i]);
}

instance.instanceMatrix.needsUpdate = true;

scene.add(instance);
controls.update(); 

function animate() {

	controls.update(); 
	renderer.render( scene, camera );
}

animate(); 
