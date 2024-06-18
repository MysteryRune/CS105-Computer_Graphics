import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
// import * as CANNON from 'cannon-es';

function loadMap(scene, camera) {
    const loader = new GLTFLoader();
    // let model_path = './assets/3dModels/Sturcture - A Gate - Main gate (Right side).glb';
    let model_path = './assets/3dModels/E hall.glb';

    loader.load(model_path, (gltf) => {
        let model = gltf.scene;
        model.scale.set(100, 100, 100);
        scene.add(model);
        // mixer = new THREE.AnimationMixer(this.model);
        model.position.set(-10, 0, 10);

        model.traverse(function(node) {
            if (node.isMesh) {
              node.castShadow = true;
              node.receiveShadow = true;
            }
        });

    }, undefined, (error) => {
        console.error(error);
    });
}

class SunMoon {
    constructor(scene, camera) {
        this.SunMoonLight = new THREE.PointLight(0xEEF279, 40000, 0);
        this.SunMoonSize = 0.1;
        this.SunMoonDisplay = new THREE.PointLightHelper( this.SunMoonLight, this.SunMoonSize );
        this.velocity = 0.005;
        this.case = 1;
        this.rad_rotated = 0;
        this.scene = scene;
        this.init(scene, camera);

    }

    init(scene, camera) {
        //Create a PointLight and turn on shadows for the pointLight
        /*
            1. Sunrise 0 <= Degree <= 6 (#EEF279, Intensity: 40000 --> 80000)
            2. During day 6 < Degree < 170 (#FFFF70, Intensity 80000 --> 160000 --> 80000 - Highest value in 90 Degree).
            3. Dawn 170 <= Degree <= 180 (#FFAA2A, Intensity: 80000 --> 10000)
    
            Location of Sun and Moon:
                1. Start: (100, 0, -100)
                2. Mid: (0, 100, 0)
                3. End: (-100, 0, 100)
    
            Night Color of Moon:
                #C1C5D0
            ...
        */
    
        // const SunMoonLight = new THREE.PointLight(0xeef279, 40000, 0);
        this.SunMoonLight.name = 'sun';
        this.SunMoonLight.position.set( 100, 0, -100 );
        this.SunMoonLight.castShadow = true;
        this.SunMoonLight.shadow.mapSize.width = 2048;
        this.SunMoonLight.shadow.mapSize.height = 2048;
        this.SunMoonLight.shadow.bias = -0.001;
    
        scene.add( this.SunMoonLight );
        // const sphereSize = 0.1;
        // const SunMoonDisplay = new THREE.PointLightHelper( SunMoonLight, sphereSize );
        this.SunMoonDisplay.name = 'sun';
        scene.add( this.SunMoonDisplay );
    }
    
    update() {
        if (this.rad_rotated >= Math.PI) {
            if (this.SunMoonLight.name == 'sun') {
                this.SunMoonLight.name = 'moon';
                this.SunMoonDisplay.name = 'moon';
                // this.SunMoonLight.color.set(0xC1C5D0);
            }
            else
            {
                this.SunMoonLight.name = 'sun';
                this.SunMoonDisplay.name = 'sun';
                // this.SunMoonLight.color.set(0xEEF279);
            }
            this.SunMoonLight.position.set(100, 0, -100);
            this.rad_rotated = 0;
        }
        
    
        // Find point to set new position for SunMoon
        let rad = this.velocity * Math.PI / 180;
        let newPos = this.SunMoonLight.position.clone();
            // Rotate z-axis
        newPos.applyAxisAngle(new THREE.Vector3(0, 0, 1), rad);
            // Rotate y-axis
        // newPos.applyAxisAngle(new THREE.Vector3(0, 1, 0), rad);
            // Rotate x-axis
        newPos.applyAxisAngle(new THREE.Vector3(1, 0, 0), rad);

        let rad_old = this.SunMoonLight.position.angleTo(new THREE.Vector3(0, 1, 0));
        let rad_new = newPos.angleTo(new THREE.Vector3(0, 1, 0));
        let rad_delta = Math.abs(rad_old - rad_new);
        this.rad_rotated += rad_delta;
        this.updateEnviromentTime(rad_delta);
        
        // Update new position for SunMoon
        this.SunMoonLight.position.set( newPos.x,
                                        newPos.y,
                                        newPos.z);
        this.SunMoonDisplay.update();
    }

    updateEnviromentTime(rad_delta) {
        /*
        Case:
            1. Sunrise 0 <= Degree <= 6 (#EEF279, Intensity: 40000 --> 80000)
            2. During day 6 < Degree <= 90 (#FFFF70, Intensity (80000 --> 160000)).
            3. Noon 90 < Degree < 170 (#FFFF70, Intensity (160000 --> 80000)).
            4. Dawn 170 <= Degree <= 180 (#FFAA2A, Intensity: 80000 --> 10000)
            5. Night: Moon --> 0 -> 180 Degree (#C1C5D0, Intensity: 40000)

    
            Location of Sun and Moon:
                1. Start: (100, 0, -100) 
                2. Mid: (0, 100, 0)
                3. End: (-100, 0, 100)
    
            Night Color of Moon:
                #C1C5D0
            ...
        */

        if (this.SunMoonLight.name == 'sun') {
            if (this.rad_rotated * 180 / Math.PI <= 6) {
                if (this.case != 1) {
                    new RGBELoader().load('./assets/imgs/Sunrise.hdr', (texture) => {
                        texture.mapping = THREE.EquirectangularReflectionMapping;
                        this.scene.background = texture;
                        this.scene.environment = texture;
                    });
                    this.SunMoonLight.color.set(0xEEF279);
                    this.SunMoonLight.intensity = 40000;
                    this.case = 1;
                }
                let intensity_delta = 40000 / 6;
                this.SunMoonLight.intensity += intensity_delta * rad_delta;
            } else if (this.rad_rotated * 180 / Math.PI > 6 && this.rad_rotated * 180 / Math.PI <= 90) {
                if (this.case != 2) {
                    new RGBELoader().load('./assets/imgs/Midday.hdr', (texture) => {
                        texture.mapping = THREE.EquirectangularReflectionMapping;
                        this.scene.background = texture;
                        this.scene.environment = texture;
                    });
                    this.SunMoonLight.color.set(0xFFFF70);
                    this.case = 2;
                }
                let intensity_delta = 80000 / 83;
                this.SunMoonLight.intensity += intensity_delta * rad_delta;
            } else if (this.rad_rotated * 180 / Math.PI > 90 && this.rad_rotated * 180 / Math.PI < 170) {
                if (this.case != 3) {
                    new RGBELoader().load('./assets/imgs/Noon.hdr', (texture) => {
                        texture.mapping = THREE.EquirectangularReflectionMapping;
                        this.scene.background = texture;
                        this.scene.environment = texture;
                    });
                    this.SunMoonLight.color.set(0xFFFF70);
                    this.case = 3;
                }
                let intensity_delta = 80000 / 78;
                this.SunMoonLight.intensity -= intensity_delta * rad_delta;
            } else if (this.rad_rotated * 180 / Math.PI >= 170 && this.rad_rotated * 180 / Math.PI <= 180) {
                if (this.case != 4) {
                    new RGBELoader().load('./assets/imgs/Dawn.hdr', (texture) => {
                        texture.mapping = THREE.EquirectangularReflectionMapping;
                        this.scene.background = texture;
                        this.scene.environment = texture;
                    });
                    this.SunMoonLight.color.set(0xFFAA2A);
                    this.case = 4;
                }
                let intensity_delta = 70000 / 84;
                this.SunMoonLight.intensity -= intensity_delta * rad_delta;
            }
        }
        else {
            if (this.case != 5) {
                new RGBELoader().load('./assets/imgs/Night.hdr', (texture) => {
                    texture.mapping = THREE.EquirectangularReflectionMapping;
                    this.scene.background = texture;
                    this.scene.environment = texture;
                });
                this.SunMoonLight.color.set(0xC1C5D0);
                this.SunMoonLight.intensity = 40000;
                this.case = 5;
            }
        }
    }

}

export { loadMap, SunMoon };