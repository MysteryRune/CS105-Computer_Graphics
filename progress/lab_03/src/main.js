import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';


var object = [];
var objectSelectionDropBox = document.getElementById("object-type");

var decreaseButtonAngleXaxisValue = document.getElementById("decrease-angle-x-axis-value-button");
var increaseButtonAngleXaxisValue = document.getElementById("increase-angle-x-axis-value-button");
var decreaseButtonAngleYaxisValue = document.getElementById("decrease-angle-y-axis-value-button");
var increaseButtonAngleYaxisValue = document.getElementById("increase-angle-y-axis-value-button");
var decreaseButtonAngleZaxisValue = document.getElementById("decrease-angle-z-axis-value-button");
var increaseButtonAngleZaxisValue = document.getElementById("increase-angle-z-axis-value-button");
var decreaseButtonTransitionXaxisValue = document.getElementById("decrease-transition-x-axis-value-button");
var increaseButtonTransitionXaxisValue = document.getElementById("increase-transition-x-axis-value-button");
var decreaseButtonTransitionYaxisValue = document.getElementById("decrease-transition-y-axis-value-button");
var increaseButtonTransitionYaxisValue = document.getElementById("increase-transition-y-axis-value-button");
var decreaseButtonTransitionZaxisValue = document.getElementById("decrease-transition-z-axis-value-button");
var increaseButtonTransitionZaxisValue = document.getElementById("increase-transition-z-axis-value-button");
var decreaseButtonScaleXaxisValue = document.getElementById("decrease-scale-x-axis-value-button");
var increaseButtonScaleXaxisValue = document.getElementById("increase-scale-x-axis-value-button");
var decreaseButtonScaleYaxisValue = document.getElementById("decrease-scale-y-axis-value-button");
var increaseButtonScaleYaxisValue = document.getElementById("increase-scale-y-axis-value-button");
var decreaseButtonScaleZaxisValue = document.getElementById("decrease-scale-z-axis-value-button");
var increaseButtonScaleZaxisValue = document.getElementById("increase-scale-z-axis-value-button");
var decreaseButtonVrpXaxisValue = document.getElementById("decrease-vrp-x-axis-value-button");
var increaseButtonVrpXaxisValue = document.getElementById("increase-vrp-x-axis-value-button");
var decreaseButtonVrpYaxisValue = document.getElementById("decrease-vrp-y-axis-value-button");
var increaseButtonVrpYaxisValue = document.getElementById("increase-vrp-y-axis-value-button");
var decreaseButtonVrpZaxisValue = document.getElementById("decrease-vrp-z-axis-value-button");
var increaseButtonVrpZaxisValue = document.getElementById("increase-vrp-z-axis-value-button");
var decreaseButtonLookAtXaxisValue = document.getElementById("decrease-look-at-x-axis-value-button");
var increaseButtonLookAtXaxisValue = document.getElementById("increase-look-at-x-axis-value-button");
var decreaseButtonLookAtYaxisValue = document.getElementById("decrease-look-at-y-axis-value-button");
var increaseButtonLookAtYaxisValue = document.getElementById("increase-look-at-y-axis-value-button");
var decreaseButtonLookAtZaxisValue = document.getElementById("decrease-look-at-z-axis-value-button");
var increaseButtonLookAtZaxisValue = document.getElementById("increase-look-at-z-axis-value-button");

var intervalID;

// decreaseButtonAngleXaxisValue.addEventListener("click", decrease_button_angle_x_axis_value_clicked, false);
decreaseButtonAngleXaxisValue.addEventListener("mousedown", decrease_button_angle_x_axis_value_mousedown, false);
decreaseButtonAngleXaxisValue.addEventListener("mouseup", decrease_button_angle_x_axis_value_mouseup, false);
decreaseButtonAngleXaxisValue.addEventListener("mouseleave", decrease_button_angle_x_axis_value_mouseup, false);

// increaseButtonAngleXaxisValue.addEventListener("click", increase_button_angle_x_axis_value_clicked, false);
increaseButtonAngleXaxisValue.addEventListener("mousedown", increase_button_angle_x_axis_value_mousedown, false);
increaseButtonAngleXaxisValue.addEventListener("mouseup", increase_button_angle_x_axis_value_mouseup, false);
increaseButtonAngleXaxisValue.addEventListener("mouseleave", increase_button_angle_x_axis_value_mouseup, false);

// decreaseButtonAngleYaxisValue.addEventListener("click", decrease_button_angle_y_axis_value_clicked, false);
decreaseButtonAngleYaxisValue.addEventListener("mousedown", decrease_button_angle_y_axis_value_mousedown, false);
decreaseButtonAngleYaxisValue.addEventListener("mouseup", decrease_button_angle_y_axis_value_mouseup, false);
decreaseButtonAngleYaxisValue.addEventListener("mouseleave", decrease_button_angle_y_axis_value_mouseup, false);

// increaseButtonAngleYaxisValue.addEventListener("click", increase_button_angle_y_axis_value_clicked, false);
increaseButtonAngleYaxisValue.addEventListener("mousedown", increase_button_angle_y_axis_value_mousedown, false);
increaseButtonAngleYaxisValue.addEventListener("mouseup", increase_button_angle_y_axis_value_mouseup, false);
increaseButtonAngleYaxisValue.addEventListener("mouseleave", increase_button_angle_y_axis_value_mouseup, false);

// decreaseButtonAngleZaxisValue.addEventListener("click", decrease_button_angle_z_axis_value_clicked, false);
decreaseButtonAngleZaxisValue.addEventListener("mousedown", decrease_button_angle_z_axis_value_mousedown, false);
decreaseButtonAngleZaxisValue.addEventListener("mouseup", decrease_button_angle_z_axis_value_mouseup, false);
decreaseButtonAngleZaxisValue.addEventListener("mouseleave", decrease_button_angle_z_axis_value_mouseup, false);

// increaseButtonAngleZaxisValue.addEventListener("click", increase_button_angle_z_axis_value_clicked, false);
increaseButtonAngleZaxisValue.addEventListener("mousedown", increase_button_angle_z_axis_value_mousedown, false);
increaseButtonAngleZaxisValue.addEventListener("mouseup", increase_button_angle_z_axis_value_mouseup, false);
increaseButtonAngleZaxisValue.addEventListener("mouseleave", increase_button_angle_z_axis_value_mouseup, false);

// decreaseButtonTransitionXaxisValue.addEventListener("click", decrease_button_transition_x_axis_value_clicked, false);
decreaseButtonTransitionXaxisValue.addEventListener("mousedown", decrease_button_transition_x_axis_value_mousedown, false);
decreaseButtonTransitionXaxisValue.addEventListener("mouseup", decrease_button_transition_x_axis_value_mouseup, false);
decreaseButtonTransitionXaxisValue.addEventListener("mouseleave", decrease_button_transition_x_axis_value_mouseup, false);

// increaseButtonTransitionXaxisValue.addEventListener("click", increase_button_transition_x_axis_value_clicked, false);
increaseButtonTransitionXaxisValue.addEventListener("mousedown", increase_button_transition_x_axis_value_mousedown, false);
increaseButtonTransitionXaxisValue.addEventListener("mouseup", increase_button_transition_x_axis_value_mouseup, false);
increaseButtonTransitionXaxisValue.addEventListener("mouseleave", increase_button_transition_x_axis_value_mouseup, false);

// decreaseButtonTransitionYaxisValue.addEventListener("click", decrease_button_transition_y_axis_value_clicked, false);
decreaseButtonTransitionYaxisValue.addEventListener("mousedown", decrease_button_transition_y_axis_value_mousedown, false);
decreaseButtonTransitionYaxisValue.addEventListener("mouseup", decrease_button_transition_y_axis_value_mouseup, false);
decreaseButtonTransitionYaxisValue.addEventListener("mouseleave", decrease_button_transition_y_axis_value_mouseup, false);

// increaseButtonTransitionYaxisValue.addEventListener("click", increase_button_transition_y_axis_value_clicked, false);
increaseButtonTransitionYaxisValue.addEventListener("mousedown", increase_button_transition_y_axis_value_mousedown, false);
increaseButtonTransitionYaxisValue.addEventListener("mouseup", increase_button_transition_y_axis_value_mouseup, false);
increaseButtonTransitionYaxisValue.addEventListener("mouseleave", increase_button_transition_y_axis_value_mouseup, false);

// decreaseButtonTransitionZaxisValue.addEventListener("click", decrease_button_transition_z_axis_value_clicked, false);
decreaseButtonTransitionZaxisValue.addEventListener("mousedown", decrease_button_transition_z_axis_value_mousedown, false);
decreaseButtonTransitionZaxisValue.addEventListener("mouseup", decrease_button_transition_z_axis_value_mouseup, false);
decreaseButtonTransitionZaxisValue.addEventListener("mouseleave", decrease_button_transition_z_axis_value_mouseup, false);

// increaseButtonTransitionZaxisValue.addEventListener("click", increase_button_transition_z_axis_value_clicked, false);
increaseButtonTransitionZaxisValue.addEventListener("mousedown", increase_button_transition_z_axis_value_mousedown, false);
increaseButtonTransitionZaxisValue.addEventListener("mouseup", increase_button_transition_z_axis_value_mouseup, false);
increaseButtonTransitionZaxisValue.addEventListener("mouseleave", increase_button_transition_z_axis_value_mouseup, false);

// decreaseButtonScaleXaxisValue.addEventListener("click", decrease_button_scale_x_axis_value_clicked, false);
decreaseButtonScaleXaxisValue.addEventListener("mousedown", decrease_button_scale_x_axis_value_mousedown, false);
decreaseButtonScaleXaxisValue.addEventListener("mouseup", decrease_button_scale_x_axis_value_mouseup, false);
decreaseButtonScaleXaxisValue.addEventListener("mouseleave", decrease_button_scale_x_axis_value_mouseup, false);

// increaseButtonScaleXaxisValue.addEventListener("click", increase_button_scale_x_axis_value_clicked, false);
increaseButtonScaleXaxisValue.addEventListener("mousedown", increase_button_scale_x_axis_value_mousedown, false);
increaseButtonScaleXaxisValue.addEventListener("mouseup", increase_button_scale_x_axis_value_mouseup, false);
increaseButtonScaleXaxisValue.addEventListener("mouseleave", increase_button_scale_x_axis_value_mouseup, false);

// decreaseButtonScaleYaxisValue.addEventListener("click", decrease_button_scale_y_axis_value_clicked, false);
decreaseButtonScaleYaxisValue.addEventListener("mousedown", decrease_button_scale_y_axis_value_mousedown, false);
decreaseButtonScaleYaxisValue.addEventListener("mouseup", decrease_button_scale_y_axis_value_mouseup, false);
decreaseButtonScaleYaxisValue.addEventListener("mouseleave", decrease_button_scale_y_axis_value_mouseup, false);


// increaseButtonScaleYaxisValue.addEventListener("click", increase_button_scale_y_axis_value_clicked, false);
increaseButtonScaleYaxisValue.addEventListener("mousedown", increase_button_scale_y_axis_value_mousedown, false);
increaseButtonScaleYaxisValue.addEventListener("mouseup", increase_button_scale_y_axis_value_mouseup, false);
increaseButtonScaleYaxisValue.addEventListener("mouseleave", increase_button_scale_y_axis_value_mouseup, false);

// decreaseButtonScaleZaxisValue.addEventListener("click", decrease_button_scale_z_axis_value_clicked, false);
decreaseButtonScaleZaxisValue.addEventListener("mousedown", decrease_button_scale_z_axis_value_mousedown, false);
decreaseButtonScaleZaxisValue.addEventListener("mouseup", decrease_button_scale_z_axis_value_mouseup, false);
decreaseButtonScaleZaxisValue.addEventListener("mouseleave", decrease_button_scale_z_axis_value_mouseup, false);

// increaseButtonScaleZaxisValue.addEventListener("click", increase_button_scale_z_axis_value_clicked, false);
increaseButtonScaleZaxisValue.addEventListener("mousedown", increase_button_scale_z_axis_value_mousedown, false);
increaseButtonScaleZaxisValue.addEventListener("mouseup", increase_button_scale_z_axis_value_mouseup, false);
increaseButtonScaleZaxisValue.addEventListener("mouseleave", increase_button_scale_z_axis_value_mouseup, false);

decreaseButtonVrpXaxisValue.addEventListener("mousedown", decrease_button_vrp_x_axis_value_mousedown, false);
decreaseButtonVrpXaxisValue.addEventListener("mouseup", decrease_button_vrp_x_axis_value_mouseup, false);
decreaseButtonVrpXaxisValue.addEventListener("mouseleave", decrease_button_vrp_x_axis_value_mouseup, false);

increaseButtonVrpXaxisValue.addEventListener("mousedown", increase_button_vrp_x_axis_value_mousedown, false);
increaseButtonVrpXaxisValue.addEventListener("mouseup", increase_button_vrp_x_axis_value_mouseup, false);
increaseButtonVrpXaxisValue.addEventListener("mouseleave", increase_button_vrp_x_axis_value_mouseup, false);

decreaseButtonVrpYaxisValue.addEventListener("mousedown", decrease_button_vrp_y_axis_value_mousedown, false);
decreaseButtonVrpYaxisValue.addEventListener("mouseup", decrease_button_vrp_y_axis_value_mouseup, false);
decreaseButtonVrpYaxisValue.addEventListener("mouseleave", decrease_button_vrp_y_axis_value_mouseup, false);

increaseButtonVrpYaxisValue.addEventListener("mousedown", increase_button_vrp_y_axis_value_mousedown, false);
increaseButtonVrpYaxisValue.addEventListener("mouseup", increase_button_vrp_y_axis_value_mouseup, false);
increaseButtonVrpYaxisValue.addEventListener("mouseleave", increase_button_vrp_y_axis_value_mouseup, false);

decreaseButtonVrpZaxisValue.addEventListener("mousedown", decrease_button_vrp_z_axis_value_mousedown, false);
decreaseButtonVrpZaxisValue.addEventListener("mouseup", decrease_button_vrp_z_axis_value_mouseup, false);
decreaseButtonVrpZaxisValue.addEventListener("mouseleave", decrease_button_vrp_z_axis_value_mouseup, false);

increaseButtonVrpZaxisValue.addEventListener("mousedown", increase_button_vrp_z_axis_value_mousedown, false);
increaseButtonVrpZaxisValue.addEventListener("mouseup", increase_button_vrp_z_axis_value_mouseup, false);
increaseButtonVrpZaxisValue.addEventListener("mouseleave", increase_button_vrp_z_axis_value_mouseup, false);

decreaseButtonLookAtXaxisValue.addEventListener("mousedown", decrease_button_look_at_x_axis_value_mousedown, false);
decreaseButtonLookAtXaxisValue.addEventListener("mouseup", decrease_button_look_at_x_axis_value_mouseup, false);
decreaseButtonLookAtXaxisValue.addEventListener("mouseleave", decrease_button_look_at_x_axis_value_mouseup, false);

increaseButtonLookAtXaxisValue.addEventListener("mousedown", increase_button_look_at_x_axis_value_mousedown, false);
increaseButtonLookAtXaxisValue.addEventListener("mouseup", increase_button_look_at_x_axis_value_mouseup, false);
increaseButtonLookAtXaxisValue.addEventListener("mouseleave", increase_button_look_at_x_axis_value_mouseup, false);

decreaseButtonLookAtYaxisValue.addEventListener("mousedown", decrease_button_look_at_y_axis_value_mousedown, false);
decreaseButtonLookAtYaxisValue.addEventListener("mouseup", decrease_button_look_at_y_axis_value_mouseup, false);
decreaseButtonLookAtYaxisValue.addEventListener("mouseleave", decrease_button_look_at_y_axis_value_mouseup, false);

increaseButtonLookAtYaxisValue.addEventListener("mousedown", increase_button_look_at_y_axis_value_mousedown, false);
increaseButtonLookAtYaxisValue.addEventListener("mouseup", increase_button_look_at_y_axis_value_mouseup, false);
increaseButtonLookAtYaxisValue.addEventListener("mouseleave", increase_button_look_at_y_axis_value_mouseup, false);

decreaseButtonLookAtZaxisValue.addEventListener("mousedown", decrease_button_look_at_z_axis_value_mousedown, false);
decreaseButtonLookAtZaxisValue.addEventListener("mouseup", decrease_button_look_at_z_axis_value_mouseup, false);
decreaseButtonLookAtZaxisValue.addEventListener("mouseleave", decrease_button_look_at_z_axis_value_mouseup, false);

increaseButtonLookAtZaxisValue.addEventListener("mousedown", increase_button_look_at_z_axis_value_mousedown, false);
increaseButtonLookAtZaxisValue.addEventListener("mouseup", increase_button_look_at_z_axis_value_mouseup, false);
increaseButtonLookAtZaxisValue.addEventListener("mouseleave", increase_button_look_at_z_axis_value_mouseup, false);

objectSelectionDropBox.addEventListener("change", change_object, false);

function decrease_button_angle_x_axis_value_clicked() {
	let angleValue = document.getElementById("angle-x-axis-value");
	let unit = document.getElementById("unit");
    if (/*parseFloat(angleValue.textContent) - parseFloat(unit.value) >= 0*/true) {
		let angleValue = document.getElementById("angle-x-axis-value");
    	angleValue.textContent = (parseFloat(angleValue.textContent) - parseFloat(unit.value)).toFixed(1);
		object[0].rotation.x -= parseFloat(unit.value).toFixed(1)*Math.PI/180;
		object[1].rotation.x -= parseFloat(unit.value).toFixed(1)*Math.PI/180;
		update_scence();
    }
}
function decrease_button_angle_y_axis_value_clicked() {
	let angleValue = document.getElementById("angle-y-axis-value");
	let unit = document.getElementById("unit");
    if (/*parseFloat(angleValue.textContent) - parseFloat(unit.value) >= 0*/true) {
		let angleValue = document.getElementById("angle-y-axis-value");
    	angleValue.textContent = (parseFloat(angleValue.textContent) - parseFloat(unit.value)).toFixed(1);
		object[0].rotation.y -= parseFloat(unit.value).toFixed(1)*Math.PI/180;
		object[1].rotation.y -= parseFloat(unit.value).toFixed(1)*Math.PI/180;
		update_scence();
    }
}
function decrease_button_angle_z_axis_value_clicked() {
	let angleValue = document.getElementById("angle-z-axis-value");
	let unit = document.getElementById("unit");
    if (/*parseFloat(angleValue.textContent) - parseFloat(unit.value) >= 0*/true) {
		let angleValue = document.getElementById("angle-z-axis-value");
    	angleValue.textContent = (parseFloat(angleValue.textContent) - parseFloat(unit.value)).toFixed(1);
		object[0].rotation.z -= parseFloat(unit.value).toFixed(1)*Math.PI/180;
		object[1].rotation.z -= parseFloat(unit.value).toFixed(1)*Math.PI/180;
		update_scence();
    }
}
function decrease_button_transition_x_axis_value_clicked() {
	let transitionValue = document.getElementById("transition-x-axis-value");
	let unit = document.getElementById("unit");
	transitionValue.textContent = (parseFloat(transitionValue.textContent) - parseFloat(unit.value)).toFixed(1);
	object[0].position.x -= parseFloat(unit.value);
	object[1].position.x -= parseFloat(unit.value);
	update_scence();
}
function decrease_button_transition_y_axis_value_clicked() {
	let transitionValue = document.getElementById("transition-y-axis-value");
	let unit = document.getElementById("unit");
	transitionValue.textContent = (parseFloat(transitionValue.textContent) - parseFloat(unit.value)).toFixed(1);
	object[0].position.y -= parseFloat(unit.value);
	object[1].position.y -= parseFloat(unit.value);
	update_scence();
}
function decrease_button_transition_z_axis_value_clicked() {
	let transitionValue = document.getElementById("transition-z-axis-value");
	let unit = document.getElementById("unit");
	transitionValue.textContent = (parseFloat(transitionValue.textContent) - parseFloat(unit.value)).toFixed(1);
	object[0].position.z -= parseFloat(unit.value);
	object[1].position.z -= parseFloat(unit.value);
	update_scence();
}
function decrease_button_scale_x_axis_value_clicked() {
	let scaleValueX = document.getElementById("scale-x-axis-value");
	let scaleValueY = document.getElementById("scale-y-axis-value");
	let scaleValueZ = document.getElementById("scale-z-axis-value");
	let unit = document.getElementById("unit");
	scaleValueX.textContent = (parseFloat(scaleValueX.textContent) - parseFloat(unit.value)).toFixed(1);
	object[0].scale.set(parseFloat(scaleValueX.textContent), parseFloat(scaleValueY.textContent), parseFloat(scaleValueZ.textContent));
	object[1].scale.set(parseFloat(scaleValueX.textContent), parseFloat(scaleValueY.textContent), parseFloat(scaleValueZ.textContent));
	update_scence();
}
function decrease_button_scale_y_axis_value_clicked() {
	let scaleValueX = document.getElementById("scale-x-axis-value");
	let scaleValueY = document.getElementById("scale-y-axis-value");
	let scaleValueZ = document.getElementById("scale-z-axis-value");
	let unit = document.getElementById("unit");
	scaleValueY.textContent = (parseFloat(scaleValueY.textContent) - parseFloat(unit.value)).toFixed(1);
	object[0].scale.set(parseFloat(scaleValueX.textContent), parseFloat(scaleValueY.textContent), parseFloat(scaleValueZ.textContent));
	object[1].scale.set(parseFloat(scaleValueX.textContent), parseFloat(scaleValueY.textContent), parseFloat(scaleValueZ.textContent));
	update_scence();
}
function decrease_button_scale_z_axis_value_clicked() {
	let scaleValueX = document.getElementById("scale-x-axis-value");
	let scaleValueY = document.getElementById("scale-y-axis-value");
	let scaleValueZ = document.getElementById("scale-z-axis-value");
	let unit = document.getElementById("unit");
	scaleValueZ.textContent = (parseFloat(scaleValueZ.textContent) - parseFloat(unit.value)).toFixed(1);
	object[0].scale.set(parseFloat(scaleValueX.textContent), parseFloat(scaleValueY.textContent), parseFloat(scaleValueZ.textContent));
	object[1].scale.set(parseFloat(scaleValueX.textContent), parseFloat(scaleValueY.textContent), parseFloat(scaleValueZ.textContent));
	update_scence();
}
function decrease_button_vrp_x_axis_value_clicked() {
	let vrpValueX = document.getElementById("vrp-x-axis-value");
	let vrpValueY = document.getElementById("vrp-y-axis-value");
	let vrpValueZ = document.getElementById("vrp-z-axis-value");
	let unit = document.getElementById("unit");
	vrpValueX.textContent = (parseFloat(vrpValueX.textContent) - parseFloat(unit.value)).toFixed(1);
	camera.position.set(parseFloat(vrpValueX.textContent), parseFloat(vrpValueY.textContent), parseFloat(vrpValueZ.textContent))
	update_scence();
}
function decrease_button_vrp_y_axis_value_clicked() {
	let vrpValueX = document.getElementById("vrp-x-axis-value");
	let vrpValueY = document.getElementById("vrp-y-axis-value");
	let vrpValueZ = document.getElementById("vrp-z-axis-value");
	let unit = document.getElementById("unit");
	vrpValueY.textContent = (parseFloat(vrpValueY.textContent) - parseFloat(unit.value)).toFixed(1);
	camera.position.set(parseFloat(vrpValueX.textContent), parseFloat(vrpValueY.textContent), parseFloat(vrpValueZ.textContent))
	update_scence();
}
function decrease_button_vrp_z_axis_value_clicked() {
	let vrpValueX = document.getElementById("vrp-x-axis-value");
	let vrpValueY = document.getElementById("vrp-y-axis-value");
	let vrpValueZ = document.getElementById("vrp-z-axis-value");
	let unit = document.getElementById("unit");
	vrpValueZ.textContent = (parseFloat(vrpValueZ.textContent) - parseFloat(unit.value)).toFixed(1);
	camera.position.set(parseFloat(vrpValueX.textContent), parseFloat(vrpValueY.textContent), parseFloat(vrpValueZ.textContent))
	update_scence();
}
function decrease_button_look_at_x_axis_value_clicked() {
	let lookAtValueX = document.getElementById("look-at-x-axis-value");
	let lookAtValueY = document.getElementById("look-at-y-axis-value");
	let lookAtValueZ = document.getElementById("look-at-z-axis-value");
	let unit = document.getElementById("unit");
	lookAtValueX.textContent = (parseFloat(lookAtValueX.textContent) - parseFloat(unit.value)).toFixed(1);
	camera.lookAt(parseFloat(lookAtValueX.textContent), parseFloat(lookAtValueY.textContent), parseFloat(lookAtValueZ.textContent));
	update_scence();
}
function decrease_button_look_at_y_axis_value_clicked() {
	let lookAtValueX = document.getElementById("look-at-x-axis-value");
	let lookAtValueY = document.getElementById("look-at-y-axis-value");
	let lookAtValueZ = document.getElementById("look-at-z-axis-value");
	let unit = document.getElementById("unit");
	lookAtValueY.textContent = (parseFloat(lookAtValueY.textContent) - parseFloat(unit.value)).toFixed(1);
	camera.lookAt(parseFloat(lookAtValueX.textContent), parseFloat(lookAtValueY.textContent), parseFloat(lookAtValueZ.textContent));
	update_scence();
}
function decrease_button_look_at_z_axis_value_clicked() {
	let lookAtValueX = document.getElementById("look-at-x-axis-value");
	let lookAtValueY = document.getElementById("look-at-y-axis-value");
	let lookAtValueZ = document.getElementById("look-at-z-axis-value");
	let unit = document.getElementById("unit");
	lookAtValueZ.textContent = (parseFloat(lookAtValueZ.textContent) - parseFloat(unit.value)).toFixed(1);
	camera.lookAt(parseFloat(lookAtValueX.textContent), parseFloat(lookAtValueY.textContent), parseFloat(lookAtValueZ.textContent));
	update_scence();
}

function increase_button_angle_x_axis_value_clicked() {
    let angleValue = document.getElementById("angle-x-axis-value");
	let unit = document.getElementById("unit");
    if (/*parseFloat(angleValue.textContent) + parseFloat(unit.value) <= 360*/true) {
		let angleValue = document.getElementById("angle-x-axis-value");
    	angleValue.textContent = (parseFloat(angleValue.textContent) + parseFloat(unit.value)).toFixed(1);
		object[0].rotation.x += parseFloat(unit.value).toFixed(1)*Math.PI/180;
		object[1].rotation.x += parseFloat(unit.value).toFixed(1)*Math.PI/180;
		update_scence();
    }
}
function increase_button_angle_y_axis_value_clicked() {
    let angleValue = document.getElementById("angle-y-axis-value");
	let unit = document.getElementById("unit");
    if (/*parseFloat(angleValue.textContent) + parseFloat(unit.value) <= 360*/true) {
		let angleValue = document.getElementById("angle-y-axis-value");
    	angleValue.textContent = (parseFloat(angleValue.textContent) + parseFloat(unit.value)).toFixed(1);
		object[0].rotation.y += parseFloat(unit.value).toFixed(1)*Math.PI/180;
		object[1].rotation.y += parseFloat(unit.value).toFixed(1)*Math.PI/180;
		update_scence();
    }
}
function increase_button_angle_z_axis_value_clicked() {
    let angleValue = document.getElementById("angle-z-axis-value");
	let unit = document.getElementById("unit");
    if (/*parseFloat(angleValue.textContent) + parseFloat(unit.value) <= 360*/true) {
		let angleValue = document.getElementById("angle-z-axis-value");
    	angleValue.textContent = (parseFloat(angleValue.textContent) + parseFloat(unit.value)).toFixed(1);
		object[0].rotation.z += parseFloat(unit.value).toFixed(1)*Math.PI/180;
		object[1].rotation.z += parseFloat(unit.value).toFixed(1)*Math.PI/180;
		update_scence();
    }
}
function increase_button_transition_x_axis_value_clicked() {
	let transitionValue = document.getElementById("transition-x-axis-value");
	let unit = document.getElementById("unit");
	transitionValue.textContent = (parseFloat(transitionValue.textContent) + parseFloat(unit.value)).toFixed(1);
	object[0].position.x += parseFloat(unit.value);
	object[1].position.x += parseFloat(unit.value);
	update_scence();
}
function increase_button_transition_y_axis_value_clicked() {
	let transitionValue = document.getElementById("transition-y-axis-value");
	let unit = document.getElementById("unit");
	transitionValue.textContent = (parseFloat(transitionValue.textContent) + parseFloat(unit.value)).toFixed(1);
	object[0].position.y += parseFloat(unit.value);
	object[1].position.y += parseFloat(unit.value);
	update_scence();
}
function increase_button_transition_z_axis_value_clicked() {
	let transitionValue = document.getElementById("transition-z-axis-value");
	let unit = document.getElementById("unit");
	transitionValue.textContent = (parseFloat(transitionValue.textContent) + parseFloat(unit.value)).toFixed(1);
	object[0].position.z += parseFloat(unit.value);
	object[1].position.z += parseFloat(unit.value);
	update_scence();
}
function increase_button_scale_x_axis_value_clicked() {
	let scaleValueX = document.getElementById("scale-x-axis-value");
	let scaleValueY = document.getElementById("scale-y-axis-value");
	let scaleValueZ = document.getElementById("scale-z-axis-value");
	let unit = document.getElementById("unit");
	scaleValueX.textContent = (parseFloat(scaleValueX.textContent) + parseFloat(unit.value)).toFixed(1);
	object[0].scale.set(parseFloat(scaleValueX.textContent), parseFloat(scaleValueY.textContent), parseFloat(scaleValueZ.textContent));
	object[1].scale.set(parseFloat(scaleValueX.textContent), parseFloat(scaleValueY.textContent), parseFloat(scaleValueZ.textContent));
	update_scence();
}
function increase_button_scale_y_axis_value_clicked() {
	let scaleValueX = document.getElementById("scale-x-axis-value");
	let scaleValueY = document.getElementById("scale-y-axis-value");
	let scaleValueZ = document.getElementById("scale-z-axis-value");
	let unit = document.getElementById("unit");
	scaleValueY.textContent = (parseFloat(scaleValueY.textContent) + parseFloat(unit.value)).toFixed(1);
	object[0].scale.set(parseFloat(scaleValueX.textContent), parseFloat(scaleValueY.textContent), parseFloat(scaleValueZ.textContent));
	object[1].scale.set(parseFloat(scaleValueX.textContent), parseFloat(scaleValueY.textContent), parseFloat(scaleValueZ.textContent));
	update_scence();
}
function increase_button_scale_z_axis_value_clicked() {
	let scaleValueX = document.getElementById("scale-x-axis-value");
	let scaleValueY = document.getElementById("scale-y-axis-value");
	let scaleValueZ = document.getElementById("scale-z-axis-value");
	let unit = document.getElementById("unit");
	scaleValueZ.textContent = (parseFloat(scaleValueZ.textContent) + parseFloat(unit.value)).toFixed(1);
	object[0].scale.set(parseFloat(scaleValueX.textContent), parseFloat(scaleValueY.textContent), parseFloat(scaleValueZ.textContent));
	object[1].scale.set(parseFloat(scaleValueX.textContent), parseFloat(scaleValueY.textContent), parseFloat(scaleValueZ.textContent));
	update_scence();
}
function increase_button_vrp_x_axis_value_clicked() {
	let vrpValueX = document.getElementById("vrp-x-axis-value");
	let vrpValueY = document.getElementById("vrp-y-axis-value");
	let vrpValueZ = document.getElementById("vrp-z-axis-value");
	let unit = document.getElementById("unit");
	vrpValueX.textContent = (parseFloat(vrpValueX.textContent) + parseFloat(unit.value)).toFixed(1);
	camera.position.set(parseFloat(vrpValueX.textContent), parseFloat(vrpValueY.textContent), parseFloat(vrpValueZ.textContent))
	update_scence();
}
function increase_button_vrp_y_axis_value_clicked() {
	let vrpValueX = document.getElementById("vrp-x-axis-value");
	let vrpValueY = document.getElementById("vrp-y-axis-value");
	let vrpValueZ = document.getElementById("vrp-z-axis-value");
	let unit = document.getElementById("unit");
	vrpValueY.textContent = (parseFloat(vrpValueY.textContent) + parseFloat(unit.value)).toFixed(1);
	camera.position.set(parseFloat(vrpValueX.textContent), parseFloat(vrpValueY.textContent), parseFloat(vrpValueZ.textContent))
	update_scence();
}
function increase_button_vrp_z_axis_value_clicked() {
	let vrpValueX = document.getElementById("vrp-x-axis-value");
	let vrpValueY = document.getElementById("vrp-y-axis-value");
	let vrpValueZ = document.getElementById("vrp-z-axis-value");
	let unit = document.getElementById("unit");
	vrpValueZ.textContent = (parseFloat(vrpValueZ.textContent) + parseFloat(unit.value)).toFixed(1);
	camera.position.set(parseFloat(vrpValueX.textContent), parseFloat(vrpValueY.textContent), parseFloat(vrpValueZ.textContent))
	update_scence();
}
function increase_button_look_at_x_axis_value_clicked() {
	let lookAtValueX = document.getElementById("look-at-x-axis-value");
	let lookAtValueY = document.getElementById("look-at-y-axis-value");
	let lookAtValueZ = document.getElementById("look-at-z-axis-value");
	let unit = document.getElementById("unit");
	lookAtValueX.textContent = (parseFloat(lookAtValueX.textContent) + parseFloat(unit.value)).toFixed(1);
	camera.lookAt(parseFloat(lookAtValueX.textContent), parseFloat(lookAtValueY.textContent), parseFloat(lookAtValueZ.textContent));
	update_scence();
}
function increase_button_look_at_y_axis_value_clicked() {
	let lookAtValueX = document.getElementById("look-at-x-axis-value");
	let lookAtValueY = document.getElementById("look-at-y-axis-value");
	let lookAtValueZ = document.getElementById("look-at-z-axis-value");
	let unit = document.getElementById("unit");
	lookAtValueY.textContent = (parseFloat(lookAtValueY.textContent) + parseFloat(unit.value)).toFixed(1);
	camera.lookAt(parseFloat(lookAtValueX.textContent), parseFloat(lookAtValueY.textContent), parseFloat(lookAtValueZ.textContent));
	update_scence();
}
function increase_button_look_at_z_axis_value_clicked() {
	let lookAtValueX = document.getElementById("look-at-x-axis-value");
	let lookAtValueY = document.getElementById("look-at-y-axis-value");
	let lookAtValueZ = document.getElementById("look-at-z-axis-value");
	let unit = document.getElementById("unit");
	lookAtValueZ.textContent = (parseFloat(lookAtValueZ.textContent) + parseFloat(unit.value)).toFixed(1);
	camera.lookAt(parseFloat(lookAtValueX.textContent), parseFloat(lookAtValueY.textContent), parseFloat(lookAtValueZ.textContent));
	update_scence();
}

function decrease_button_angle_x_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_angle_x_axis_value_clicked, 100);
}
function decrease_button_angle_x_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_angle_y_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_angle_y_axis_value_clicked, 100);
}
function decrease_button_angle_y_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_angle_z_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_angle_z_axis_value_clicked, 100);
}
function decrease_button_angle_z_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_transition_x_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_transition_x_axis_value_clicked, 100);
}
function decrease_button_transition_x_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_transition_y_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_transition_y_axis_value_clicked, 100);
}
function decrease_button_transition_y_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_transition_z_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_transition_z_axis_value_clicked, 100);
}
function decrease_button_transition_z_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_scale_x_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_scale_x_axis_value_clicked, 100);
}
function decrease_button_scale_x_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_scale_y_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_scale_y_axis_value_clicked, 100);
}
function decrease_button_scale_y_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_scale_z_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_scale_z_axis_value_clicked, 100);
}
function decrease_button_scale_z_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_vrp_x_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_vrp_x_axis_value_clicked, 100);
}
function decrease_button_vrp_x_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_vrp_y_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_vrp_y_axis_value_clicked, 100);
}
function decrease_button_vrp_y_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_vrp_z_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_vrp_z_axis_value_clicked, 100);
}
function decrease_button_vrp_z_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_look_at_x_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_look_at_x_axis_value_clicked, 100);
}
function decrease_button_look_at_x_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_look_at_y_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_look_at_y_axis_value_clicked, 100);
}
function decrease_button_look_at_y_axis_value_mouseup() {
	clearInterval(intervalID);
}
function decrease_button_look_at_z_axis_value_mousedown() {
	intervalID = setInterval(decrease_button_look_at_z_axis_value_clicked, 100);
}
function decrease_button_look_at_z_axis_value_mouseup() {
	clearInterval(intervalID);
}

function increase_button_angle_x_axis_value_mousedown() {
	intervalID = setInterval(increase_button_angle_x_axis_value_clicked, 100);
}
function increase_button_angle_x_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_angle_y_axis_value_mousedown() {
	intervalID = setInterval(increase_button_angle_y_axis_value_clicked, 100);
}
function increase_button_angle_y_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_angle_z_axis_value_mousedown() {
	intervalID = setInterval(increase_button_angle_z_axis_value_clicked, 100);
}
function increase_button_angle_z_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_transition_x_axis_value_mousedown() {
	intervalID = setInterval(increase_button_transition_x_axis_value_clicked, 100);
}
function increase_button_transition_x_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_transition_y_axis_value_mousedown() {
	intervalID = setInterval(increase_button_transition_y_axis_value_clicked, 100);
}
function increase_button_transition_y_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_transition_z_axis_value_mousedown() {
	intervalID = setInterval(increase_button_transition_z_axis_value_clicked, 100);
}
function increase_button_transition_z_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_scale_x_axis_value_mousedown() {
	intervalID = setInterval(increase_button_scale_x_axis_value_clicked, 100);
}
function increase_button_scale_x_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_scale_y_axis_value_mousedown() {
	intervalID = setInterval(increase_button_scale_y_axis_value_clicked, 100);
}
function increase_button_scale_y_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_scale_z_axis_value_mousedown() {
	intervalID = setInterval(increase_button_scale_z_axis_value_clicked, 100);
}
function increase_button_scale_z_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_vrp_x_axis_value_mousedown() {
	intervalID = setInterval(increase_button_vrp_x_axis_value_clicked, 100);
}
function increase_button_vrp_x_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_vrp_y_axis_value_mousedown() {
	intervalID = setInterval(increase_button_vrp_y_axis_value_clicked, 100);
}
function increase_button_vrp_y_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_vrp_z_axis_value_mousedown() {
	intervalID = setInterval(increase_button_vrp_z_axis_value_clicked, 100);
}
function increase_button_vrp_z_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_look_at_x_axis_value_mousedown() {
	intervalID = setInterval(increase_button_look_at_x_axis_value_clicked, 100);
}
function increase_button_look_at_x_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_look_at_y_axis_value_mousedown() {
	intervalID = setInterval(increase_button_look_at_y_axis_value_clicked, 100);
}
function increase_button_look_at_y_axis_value_mouseup() {
	clearInterval(intervalID);
}
function increase_button_look_at_z_axis_value_mousedown() {
	intervalID = setInterval(increase_button_look_at_z_axis_value_clicked, 100);
}
function increase_button_look_at_z_axis_value_mouseup() {
	clearInterval(intervalID);
}

function change_object() {
	object = get_object();
	let angleXaxisValue = document.getElementById("angle-x-axis-value");
	let angleYaxisValue = document.getElementById("angle-y-axis-value");
	let angleZaxisValue = document.getElementById("angle-z-axis-value");
	let transitionXaxisValue = document.getElementById("transition-x-axis-value");
	let transitionYaxisValue = document.getElementById("transition-y-axis-value");
	let transitionZaxisValue = document.getElementById("transition-z-axis-value");

	// console.log(object[0].rotation.x);
	angleXaxisValue.textContent = Math.round(object[0].rotation.x*180/Math.PI);
	angleYaxisValue.textContent = Math.round(object[0].rotation.y*180/Math.PI);
	angleZaxisValue.textContent = Math.round(object[0].rotation.z*180/Math.PI);
	transitionXaxisValue.textContent = object[0].position.x;
	transitionYaxisValue.textContent = object[0].position.y;
	transitionZaxisValue.textContent = object[0].position.z;

}
function get_object() {
	let object_selection_drop_box = document.getElementById("object-type");
	if (object_selection_drop_box.value == "Cube") {
		return [cube_01, line_cube_01];
	} else if (object_selection_drop_box.value == "Cone") {
		return [cone_01, line_cone_01];
	} else {
		return [ball_01, line_ball_01];
	}
}




function init() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 
		75, 
		window.innerWidth / window.innerHeight, 
		0.1, 
		1000 
	);
	const renderer = new THREE.WebGLRenderer();

	document.getElementById("webgl").appendChild( renderer.domElement );

	renderer.setSize( 
		window.innerWidth, 
		window.innerHeight 
	);

	camera.position.set( 0, 10, 25 );
	camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

	const geometry = new THREE.PlaneGeometry( 25, 25 );
	const material = new THREE.MeshBasicMaterial( {color: 0xdddddd, side: THREE.DoubleSide} );
	const plane = new THREE.Mesh( geometry, material );
	plane.position.set( 0, -2, 0 );
	plane.rotation.x = 90 * (Math.PI / 180);
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
const targetPosition = new THREE.Vector3(0, 0, 0);

var controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', ()=>{renderer.render(scene, camera)} );

var originalNear = camera.near;
document.getElementById('nearSlider').addEventListener('input', function() {
    var near = parseFloat(this.value);
    updateNearDisplay(near);
    camera.near = near;
    camera.updateProjectionMatrix();
	camera.updateProjectionMatrix();
});
function updateNearDisplay(near) {
    var nearPer = (near / originalNear) * 100;
    document.getElementById('nearPer').innerText = nearPer.toFixed() + "%";
}


var originalFar = 100;
document.getElementById('farSlider').addEventListener('input', function() {
    var far = parseFloat(this.value);
    updateFarDisplay(far);
    camera.far = far;
    camera.updateProjectionMatrix();
});
function updateFarDisplay(far) {
    var farPer = (far / originalFar) * 100;
    document.getElementById('farPer').innerText = farPer.toFixed() + "%";
}


const geometry_cube = new THREE.BoxGeometry( 5, 5, 5 );
const material_cube = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube_01 = new THREE.Mesh( geometry_cube, material_cube );
cube_01.position.set( 0, 3, 0);
scene.add( cube_01 );
const geometry_edges = new THREE.BoxGeometry( 5, 5, 5 );
const material_line = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 })
const edges_cube_01 = new THREE.EdgesGeometry( geometry_edges ); 
const line_cube_01 = new THREE.LineSegments(edges_cube_01, material_line ); 
line_cube_01.position.set( 0, 3, 0 );
scene.add( line_cube_01 );

const geometry_cone = new THREE.ConeGeometry( 3, 5, 32 ); 
const material_cone = new THREE.MeshBasicMaterial( {color: 0x16537e} );
const cone_01 = new THREE.Mesh(geometry_cone, material_cone );
cone_01.position.set( -7, 3, 0);
scene.add( cone_01 );
const material_line_cone = new THREE.LineBasicMaterial({ color: 0xffa140, linewidth: 1 })
const edges_cone = new THREE.EdgesGeometry( geometry_cone ); 
const line_cone_01 = new THREE.LineSegments(edges_cone, material_line_cone );
line_cone_01.position.set( -7, 3, 0 );
scene.add( line_cone_01 );

const geometry_sphere = new THREE.SphereGeometry(2.5, 32, 16);
const material_sphere = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const ball_01 = new THREE.Mesh( geometry_sphere, material_sphere );
ball_01.position.set( 7, 3, 0 );
scene.add( ball_01 );
const material_line_sphere = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 1 })
const edges_sphere = new THREE.EdgesGeometry( geometry_sphere ); 
const line_ball_01 = new THREE.LineSegments(edges_sphere, material_line_sphere ); 
line_ball_01.position.set( 7, 3, 0 );
scene.add( line_ball_01 );

update_scence();

object = [cube_01, line_cube_01];


function render() {

	let vrpValueX = document.getElementById("vrp-x-axis-value");
	let vrpValueY = document.getElementById("vrp-y-axis-value");
	let vrpValueZ = document.getElementById("vrp-z-axis-value");
	vrpValueX.textContent = camera.position.x.toFixed(1);
	vrpValueY.textContent = camera.position.y.toFixed(1);
	vrpValueZ.textContent = camera.position.z.toFixed(1);

	let lookAtValueX = document.getElementById("look-at-x-axis-value");
	let lookAtValueY = document.getElementById("look-at-y-axis-value");
	let lookAtValueZ = document.getElementById("look-at-z-axis-value");
	// lookAtValueX.textContent = lookDirection.x.toFixed(1);
	// lookAtValueY.textContent = lookDirection.y.toFixed(1);
	// lookAtValueZ.textContent = lookDirection.z.toFixed(1);
	camera.lookAt(	parseFloat(lookAtValueX.textContent).toFixed(1),
					parseFloat(lookAtValueY.textContent).toFixed(1),
					parseFloat(lookAtValueZ.textContent).toFixed(1)	);

	// Update camera projection matrix if needed
    camera.updateProjectionMatrix();

    // Render the scene
    renderer.render(scene, camera);

    // Call render function recursively
    requestAnimationFrame(render);
}
render();