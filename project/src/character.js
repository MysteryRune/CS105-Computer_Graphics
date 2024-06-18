// chracter.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as CANNON from 'cannon-es';

class Model3DCharacter {
    constructor(scene, camera, world, modelPath) {
        this.scene = scene;
        this.camera = camera;
        this.world = world;
        this.cameraViewMode = 2;
        this.cameraCursor = new THREE.Vector3(0, 0, 0);
        this.modelPath = modelPath;
        this.model = null;
        this.body = null;
        this.mixer = null;
        this.clock = new THREE.Clock();
        this.keysPressed = {};
        this.coefAngleRotation = 1;
        this.mouse = {x: null, y:null};
        this.step = {x: 0, y:0};

        this.init();
        this.addEventListeners();
    }

    init() {
        this.firstCamView = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.thirdCamView = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        const loader = new GLTFLoader();
        loader.load(this.modelPath, (gltf) => {
            this.model = gltf.scene;
            this.scene.add(this.model);
            this.mixer = new THREE.AnimationMixer(this.model);
            this.model.position.set(0, 0, 0);

            this.model.traverse(function(node){
                if (node.isMesh){
                  node.castShadow = true;
                }
            });

            let size = this.getSize();
            this.model.position.set(0, size.y/2 + 1, 0);
            let pos = this.model.position;
            const shape = new CANNON.Box(new CANNON.Vec3(size.x, size.y, size.z)); // Adjust size as needed
            this.body = new CANNON.Body({
                mass: 1,
                position: new CANNON.Vec3(pos.x, pos.y, pos.z),
                shape: shape,
                material: new CANNON.Material()
            });

            // Play a certain animation
            // const clip = THREE.AnimationClip.findByName(clips, 'Floating');
            // const action = mixer.clipAction(clip);
            // action.play();
            // Play all animations at the same time
            // gltf.animations.forEach((clip) => {
            //     this.mixer.clipAction(clip).play();
            // });

            this.body.threeObject = this.model;
            this.model.body = this.body;
            this.world.addBody(this.body);
        }, undefined, (error) => {
            console.error(error);
        });
    }

    getSize() {
        const box = new THREE.Box3().setFromObject(this.model);
        const size = new THREE.Vector3();
        box.getSize(size);
        return size;
    }

    getMouseDirection(x, y) {
        /*
            O ._________________________________________>x
              |
              |
              |
              |
              |
              v
              y
        */

        let direction = '';

        if (this.mouse.x !== null && this.mouse.y !== null) {
            const deltaX = x - this.mouse.x;
            const deltaY = y - this.mouse.y;

            if (deltaY < 0) {
                direction += 'N';
            } else if (deltaY > 0) {
                direction += 'S';
            }
            if (deltaX > 0) {
                direction += 'E';
            } else if (deltaX < 0) {
                direction += 'W';
            }
        }

        this.mouse.x = x;
        this.mouse.y = y;
        return direction;
    }

    getXlookAtMove(oldStep) {
        let radianUnit = Math.PI/180;
        let amplitude = Math.sqrt(Math.pow(this.camera.position.x - this.cameraCursor.x, 2) + Math.pow(this.camera.position.z - this.cameraCursor.z, 2));
        let coefRotation = this.coefAngleRotation;
        let omega = coefRotation * radianUnit;
        let phi = -Math.PI/2;

        let oldX_ = amplitude*Math.cos(omega*(oldStep.x) + phi);
        let newX_ = amplitude*Math.cos(omega*this.step.x + phi);
        let deltaX = newX_ - oldX_;

        return deltaX;
    }

    getYlookAtMove(oldStep) {
        let radianUnit = Math.PI/180;
        let amplitude = Math.sqrt(Math.pow(this.camera.position.z - this.cameraCursor.z, 2) + Math.pow(this.camera.position.y - this.cameraCursor.y, 2));
        let coefRotation = this.coefAngleRotation;
        let omega = coefRotation * radianUnit;
        let phi = 0;

        let oldY_ = amplitude*Math.sin(omega*(oldStep.y) + phi);
        let newY_ = amplitude*Math.sin(omega*this.step.y + phi);
        let deltaY = newY_ - oldY_;

        return deltaY;
    }

    getZlookAtMove(oldStep) {
        let radianUnit = Math.PI/180;
        let amplitude = Math.sqrt(Math.pow(this.camera.position.x - this.cameraCursor.x, 2) + Math.pow(this.camera.position.z - this.cameraCursor.z, 2));
        let coefRotation = this.coefAngleRotation;
        let omega = coefRotation * radianUnit;
        let phi = Math.PI/2;

        let oldZ_ = amplitude*Math.sin(omega*(oldStep.x) + phi);
        let newZ_ = amplitude*Math.sin(omega*this.step.x + phi);
        let deltaZ = newZ_ - oldZ_;

        return deltaZ;
    }



    addEventListeners() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onKeyDown(event) {
        this.keysPressed[event.code] = true;
    }

    onKeyUp(event) {
        this.keysPressed[event.code] = false;
    }

    onMouseMove(event) {
        /*
            In ThreeJS, the Coordinate System is different to Coordinate System is used in real life.
            Follows link below to get more information:
                https://discoverthreejs.com/book/first-steps/transformations/#coordinate-systems-world-space-and-local-space
        */

        let mouseX = event.offsetX;
        let mouseY = event.offsetY;
        let coef_angle_rotation = this.coefAngleRotation;
        let oldStep = {x:this.step.x, y:this.step.y};
        const mouseDirection = this.getMouseDirection(mouseX, mouseY);

        switch (mouseDirection) {
            case 'N':
                {
                    this.step.y += 1;
                    this.step.x += 0;
                    // rad_x *= -1;
                    // rad_y *= 0;
                    break;
                }
            case 'S':
                {
                    this.step.y += -1;
                    this.step.x += 0;
                    // rad_x *= 1;
                    // rad_y *= 0;
                    break;
                }
            case 'E':
                {
                    this.step.y += 0;
                    this.step.x += -1;
                    // rad_x *= 0;
                    // rad_y *= -1;
                    break;
                }
            case 'W':
                {
                    this.step.y += 0;
                    this.step.x += 1;
                    // rad_x *= 0;
                    // rad_y *= 1;
                    break;
                }
            // default:
            //     {
            //         rad_x *= 0;
            //         rad_y *= 0;
            //         break;
            //     }
            case 'NE':
                {
                    this.step.y += 1;
                    this.step.x += -1;
                    // rad_x *= -1;
                    // rad_y *= -1;
                    break;
                }
            case 'NW':
                {
                    this.step.y += 1;
                    this.step.x += 1;
                    // rad_x *= -1;
                    // rad_y *= 1;
                    break;
                }
            case 'SE':
                {
                    this.step.y += -1;
                    this.step.x += -1;
                    // rad_x *= 1;
                    // rad_y *= -1;
                    break;
                }
            case 'SW':
                {
                    this.step.y += -1;
                    this.step.x += 1;
                    // rad_x *= 1;
                    // rad_y *= 1;
                    break;
                }
        }
        if (this.step.y > parseInt(90/coef_angle_rotation)) {
            this.step.y -= 1;
        }
        if (this.step.y < parseInt(-90/coef_angle_rotation)) {
            this.step.y += 1;
        }

        let deltaX = this.getXlookAtMove(oldStep);
        let deltaY = this.getYlookAtMove(oldStep);
        let deltaZ = this.getZlookAtMove(oldStep);
        // console.log(deltaX, deltaY, deltaZ, this.step);
        // let deltaX = (this.step.x - oldStep.x) * 0.1;
        // let deltaY = (this.step.y - oldStep.y) * 0.1;
        // let deltaZ = 0;

        this.camera.lookAt(this.cameraCursor.x + deltaX,
                           this.cameraCursor.y + deltaY,
                           this.cameraCursor.z + deltaZ);
        this.cameraCursor.set(this.cameraCursor.x + deltaX,
                              this.cameraCursor.y + deltaY,
                              this.cameraCursor.z + deltaZ);
        // console.log(deltaX, deltaY, deltaZ);
        // console.log(this.cameraCursor, this.step);

        // this.rotateModel(rad_x, rad_y, 0);
    }

    moveModel() {
        /*
            Rotation formula:
                x' = x.cos(a) - y.sin(a)
                y' = x.sin(a) + y.cos(a)

        ==>
            1. Rotate 90 Degree:
                x' = -y
                y' =  x
            2. Rotate -90 Degree:
                x' =  y
                y' = -x
            3. Rotate 180 Degree:
                x' = -y
                y' = -x

        The coordinate system in ThreeJS is different to Math
        */

        if (this.model && this.model.body) {
            const moveDistance = 0.05;
            let moveSpeedUp = 1;
            let directionVector = this.camera.position.clone();
            let size = this.getSize();
            // Distance from camera to look at has lenght 0.5 (Follows the function `changeViewCam` for more information).
            let OxModel = new THREE.Vector3(0.5, 0, 0);
            let OyModel = new THREE.Vector3(0, 0.5, 0);
            let OzModel = new THREE.Vector3(0, 0, 0.5);
            directionVector.x = this.cameraCursor.x - this.camera.position.x;
            directionVector.y = this.cameraCursor.y - this.camera.position.y;
            directionVector.z = this.cameraCursor.z - this.camera.position.z;
            
            if (this.keysPressed['ShiftLeft'] || this.keysPressed['ShiftRight']) {moveSpeedUp = 5;} // Change coefficient of velocity

            // Move forward
            if (this.keysPressed['KeyW'] || this.keysPressed['ArrowUp']) {
                let x_coef = directionVector.dot(OxModel) / OxModel.dot(OxModel);
                // let y_coef = directionVector.dot(OyModel) / OyModel.dot(OyModel);
                let z_coef = directionVector.dot(OzModel) / OzModel.dot(OzModel);
                if (this.cameraViewMode == 2) {x_coef = 0, /*y_coef = 0,*/ z_coef = 1}  

                this.model.body.position.x += x_coef * moveDistance * moveSpeedUp;
                // this.model.body.position.y += y_coef * moveDistance * moveSpeedUp;
                this.model.body.position.z += z_coef * moveDistance * moveSpeedUp;
                this.cameraCursor.x += x_coef * moveDistance * moveSpeedUp;
                // this.cameraCursor.y += y_coef * moveDistance * moveSpeedUp;
                this.cameraCursor.z += z_coef * moveDistance * moveSpeedUp;
                this.camera.position.x += x_coef * moveDistance * moveSpeedUp;
                // this.camera.position.y += y_coef * moveDistance * moveSpeedUp;
                this.camera.position.z += z_coef * moveDistance * moveSpeedUp;
            }
            // Move left
            if (this.keysPressed['KeyA'] || this.keysPressed['ArrowLeft']) {
                let directionVector_ = new THREE.Vector3(   -directionVector.z, 
                                                            directionVector.y,
                                                            directionVector.x);
                let x_coef = directionVector_.dot(OxModel) / OxModel.dot(OxModel);
                let z_coef = directionVector_.dot(OzModel) / OzModel.dot(OzModel);
                if (this.cameraViewMode == 2) {x_coef = -1, /*y_coef = 0,*/ z_coef = 0}  

                this.model.body.position.x -= x_coef * moveDistance * moveSpeedUp;
                this.model.body.position.z -= z_coef * moveDistance * moveSpeedUp;
                this.cameraCursor.x -= x_coef * moveDistance * moveSpeedUp;
                this.cameraCursor.z -= z_coef * moveDistance * moveSpeedUp;
                this.camera.position.x -= x_coef * moveDistance * moveSpeedUp;
                this.camera.position.z -= z_coef * moveDistance * moveSpeedUp;

                // this.model.body.position.x += moveDistance * moveSpeedUp;
                // this.cameraCursor.x += moveDistance * moveSpeedUp;
                // this.camera.position.x += moveDistance * moveSpeedUp;
            } 
            // Move backward
            if (this.keysPressed['KeyS'] || this.keysPressed['ArrowDown']) {
                let x_coef = directionVector.dot(OxModel) / OxModel.dot(OxModel);
                // let y_coef = directionVector.dot(OyModel) / OyModel.dot(OyModel);
                let z_coef = directionVector.dot(OzModel) / OzModel.dot(OzModel);
                if (this.cameraViewMode == 2) {x_coef = 0, /*y_coef = 0,*/ z_coef = 1}

                this.model.body.position.x -= x_coef * moveDistance * moveSpeedUp;
                // this.model.body.position.y += y_coef * moveDistance * moveSpeedUp;
                this.model.body.position.z -= z_coef * moveDistance * moveSpeedUp;
                this.cameraCursor.x -= x_coef * moveDistance * moveSpeedUp;
                // this.cameraCursor.y += y_coef * moveDistance * moveSpeedUp;
                this.cameraCursor.z -= z_coef * moveDistance * moveSpeedUp;
                this.camera.position.x -= x_coef * moveDistance * moveSpeedUp;
                // this.camera.position.y += y_coef * moveDistance * moveSpeedUp;
                this.camera.position.z -= z_coef * moveDistance * moveSpeedUp;

                // this.model.body.position.z -= moveDistance * moveSpeedUp;
                // this.cameraCursor.z -= moveDistance * moveSpeedUp;
                // this.camera.position.z -= moveDistance * moveSpeedUp;
            } 
            // Move right
            if (this.keysPressed['KeyD'] || this.keysPressed['ArrowRight']) {
                let directionVector_ = new THREE.Vector3(   directionVector.z, 
                                                            directionVector.y,
                                                            -directionVector.x);
                let x_coef = directionVector_.dot(OxModel) / OxModel.dot(OxModel);
                let z_coef = directionVector_.dot(OzModel) / OzModel.dot(OzModel);
                if (this.cameraViewMode == 2) {x_coef = 1, /*y_coef = 0,*/ z_coef = 0}  

                this.model.body.position.x -= x_coef * moveDistance * moveSpeedUp;
                this.model.body.position.z -= z_coef * moveDistance * moveSpeedUp;
                this.cameraCursor.x -= x_coef * moveDistance * moveSpeedUp;
                this.cameraCursor.z -= z_coef * moveDistance * moveSpeedUp;
                this.camera.position.x -= x_coef * moveDistance * moveSpeedUp;
                this.camera.position.z -= z_coef * moveDistance * moveSpeedUp;

                // this.model.body.position.x -= moveDistance * moveSpeedUp;
                // this.cameraCursor.x -= moveDistance * moveSpeedUp;
                // this.camera.position.x -= moveDistance * moveSpeedUp;
            } 
            // Move up
            if (this.keysPressed['Space']) {
                this.model.body.position.y += moveDistance * moveSpeedUp;
                this.cameraCursor.y += moveDistance * moveSpeedUp;
                this.camera.position.y += moveDistance * moveSpeedUp;
            } 
            // Move down
            if (this.keysPressed['ControlLeft'] || this.keysPressed['ControlRight']) {
                this.model.body.position.y -= moveDistance * moveSpeedUp;
                this.cameraCursor.y -= moveDistance * moveSpeedUp;
                this.camera.position.y -= moveDistance * moveSpeedUp;
            } 
            // console.log(this.cameraCursor);

            this.model.position.copy(this.model.body.position);
            this.model.quaternion.copy(this.model.body.quaternion);
        } else {
            console.error("Model not loaded yet.");
        }
    }

    rotateModel(rad_x, rad_y, rad_z) {
        // if (this.radian.x + rad_x > Math.PI || this.radian.x + rad_x < -Math.PI ||
        //     this.radian.y + rad_y > Math.PI || this.radian.y + rad_y < -Math.PI)
        //     return;
        // console.log(this.radian.x, this.radian.y);
        // this.radian.x += rad_x;
        // this.radian.y += rad_y;
        // this.model.rotation.x = 0;
        // this.model.rotation.x = 0;
        // this.model.rotation.x = this.radian.x;
        // this.model.rotation.y = this.radian.y;
        // this.model.rotateX(rad_x);
        // this.model.rotateY(rad_y);
        // this.model.rotateZ(rad_z);

        // this.model.body.quaternion.copy(this.model.quaternion);
    }

    updateCameraPos() {
        
        if (this.model && this.model.body) {

            // Change to First-person view
            if (this.cameraViewMode == 1) {
                let x = this.cameraCursor.x;
                let y = this.cameraCursor.y;
                let z = this.cameraCursor.z;
                this.camera.lookAt(x, y, z)
            }

            // Change to Second-person view
            if (this.cameraViewMode == 2) {
                this.camera.position.set(0, 30, -30);
                this.camera.lookAt(0, 0, 0);
                this.cameraCursor.set(0, 0, 0);
            } 

            // Change to Third-person view
            // if (this.cameraViewMode == 3) {
            //     this.camera.position.set (
            //         position.x, 
            //         position.y + size.y/2 + 3, 
            //         position.z - size.z/2 - 10);
            //     this.camera.lookAt (
            //         position.x, 
            //         position.y + size.y/2, 
            //         position.z + size.z/2 + 3
            //     );
            //     this.cameraCursor.set (
            //         position.x, 
            //         position.y + size.y/2, 
            //         position.z + size.z/2 + 3
            //     );
            // }
        } else {
            console.error("Model not loaded yet.");
        }
    }

    changeViewCam() {
        /*
            The cursor is center of model with The shape of body is Cube.
            H: Height of bounding box model (Oy)
            W: Width of bounding box model (Oz)
            L: Lenght of bounding box model (Ox)

            - First-person view: The camera space between the model the distance:
                x: x_BodyModel
                y: y_BodyModel + H/2
                z: z_BodyModel + W/2 + 0.5
            - Second-person view: The camera space between the model the distance:
                Original Position or Sunlight position
                Default: 
                    x: 0
                    y: 30
                    z: -30
            - Third-person view:
                x: x_BodyModel
                y: y_BodyModel + H/2
                z: z_BodyModel - W/2 - 10
                    

        */

        if (this.model && this.model.body) {
            let size = this.getSize();
            let position = this.model.body.position;

            // Change to First-person view
            if (this.keysPressed['Digit1']) {
                console.log('Change to First-person view');
                this.camera.position.set (
                    position.x, 
                    position.y + size.y/2, 
                    position.z + size.z/2 + 0.5);
                this.camera.lookAt (
                    position.x, 
                    position.y + size.y/2, 
                    position.z + size.z/2 + 1
                );
                this.cameraCursor.set (
                    position.x, 
                    position.y + size.y/2, 
                    position.z + size.z/2 + 1
                );
                this.step.x = 0;
                this.step.y = 0;
                this.cameraViewMode = 1;
            }

            // Change to Second-person view
            if (this.keysPressed['Digit2']) {
                console.log('Change to Second-person view');
                this.step.x = 0;
                this.step.y = 0;
                this.cameraViewMode = 2;
            } 

            // Change to Third-person view
            // if (this.keysPressed['Digit3']) {
            //     console.log('Change to Third-person view');
            //     this.cameraViewMode = 3;
            // }
        } else {
            console.error("Model not loaded yet.");
        }
    }

    animationPlay(animationName) {
        const clips = this.model.animations;
        const clip = THREE.AnimationClip.findByName( clips, animationName );
        const action = this.mixer.clipAction( clip );
        action.play();
    }

    animate() {
        const delta = this.clock.getDelta();
        if (this.mixer) {
            this.mixer.update(delta);
        }
    }

    update() {
        this.animate();
        this.changeViewCam();
        this.updateCameraPos();
        this.moveModel();
        this.camera.updateProjectionMatrix();
    }
}

export { Model3DCharacter };