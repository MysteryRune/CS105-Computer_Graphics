var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var reset_button = document.getElementById("reset");

var width = 800;
var height = 600;

var bgHex =  "#f0f0f0"; // [240, 240, 200, 1];
var bgRgba = [240, 240, 200, 1];
var pointRgba = [0, 0, 255, 255]; // "#0000ff"; // [0, 0, 255, 255];
var lineRgba = [0, 0, 0, 255]; // "#000000"; // [0, 0, 0, 255];
var vlineRgba = "#ff0000"; // [255, 0, 0, 255];

var imageData = context.createImageData(width, height);
var points = [];
var optionChoiceDropBox = document.getElementById("algorithm");
var radiusSlider = document.getElementById("radius-slider");
var decreaseButton = document.getElementById("decrease-slider-value-button");
var increaseButton = document.getElementById("increase-slider-value-button");
var optionList = {
    "DDA": 0,
    "Bresenham": 1,
    "CircleMidpoint": 2
}
var option = optionList[optionChoiceDropBox.value];
var mouseHistory = {
    x: 0,
    y: 1
}

import { drawLineDDA } from "./dda.js"
import { setPixel } from "./basic.js";
import { drawLineBresenham } from "./bresenham.js";
import { drawCircleMidpoint } from "./midpoint.js";

canvas.setAttribute("width", width);
canvas.setAttribute("height", height);
canvas.style.background = bgHex;

canvas.addEventListener("mousedown", mouseClick, false);
canvas.addEventListener("mousemove", mouseMove, false);
reset_button.addEventListener("click", reset_button_clicked, false);
optionChoiceDropBox.addEventListener("change", value_changed, false);
radiusSlider.addEventListener("input", slider_value_changed, false);
decreaseButton.addEventListener("click", decrease_button_clicked, false);
increaseButton.addEventListener("click", increase_button_clicked, false);


function copyImageData(imageData) {
    let copiedData = new Uint8ClampedArray(imageData.data);
    return new ImageData(copiedData, imageData.width, imageData.height);
}

function mouseClick(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    points.push([x, y]);

    setPixel(imageData, x, y, pointRgba);

    // Call action method
    actionChoice(option, optionList, imageData, points, lineRgba);
    

    // context.putImageData(imageData, 0, 0);
    // alert(x.toString() + ', ' + y.toString());
}

function mouseMove(event) {
    var points_tmp = Array.from(points);
    let imageData_tmp = copyImageData(imageData);
    mouseHistory.x = event.offsetX;
    mouseHistory.y = event.offsetY;
    points_tmp.push([mouseHistory.x, mouseHistory.y]);
    previewGeometric(option, optionList, imageData_tmp, points_tmp, lineRgba); // Draw object preview
    context.putImageData(imageData_tmp, 0, 0);
}

function actionChoice(option, optionList, imageData, points, lineRgba) {
    switch (option) {
        case optionList["DDA"]:
            {
                if (points.length == 2) {
                    // alert("Drawing by DDA");
                    drawLineDDA(imageData, points, lineRgba);
                    points.length = 0;
                }
                break;
            }
        case optionList["Bresenham"]:
            {
                if (points.length == 2) {
                    // alert("Drawing by Bresenham");
                    drawLineBresenham(imageData, points, lineRgba);
                    points.length = 0;
                }
                break;
            }
        case optionList["CircleMidpoint"]:
            {
                if (points.length == 1) {
                    // alert("Drawing Circle with Mid-point algorithm");
                    var xc = points[0][0], yc = points[0][1];
                    var radius = parseInt(document.getElementById("radius-slider").value);
                    drawCircleMidpoint(imageData, xc, yc, radius, lineRgba);
                    points.length = 0;
                }
                break;
            }
        default:
            {

            }
    }
}

function previewGeometric(option, optionList, imageData, points, lineRgba) {
    actionChoice(option, optionList, imageData, points, lineRgba);
}

function value_changed() {
    option = optionList[optionChoiceDropBox.value];
    points.length = 0;
    if (option == 2) {
        let radius_input_container = document.getElementById("radius-input-container");
        radius_input_container.style.display = "block";
    }
    else {
        let radius_input_container = document.getElementById("radius-input-container");
        radius_input_container.style.display = "none";
    }
}

function slider_value_changed() {
    let radiusSlider = document.getElementById("radius-slider");
    let radiusValue = document.getElementById("radius-value");
    radiusValue.textContent = radiusSlider.value;
}

function decrease_button_clicked() {
    let radiusSlider = document.getElementById("radius-slider");
    if (parseInt(radiusSlider.value) > parseInt(radiusSlider.min)) {
        radiusSlider.value--;
        slider_value_changed();
    }
}

function increase_button_clicked() {
    let radiusSlider = document.getElementById("radius-slider");
    if (parseInt(radiusSlider.value) < parseInt(radiusSlider.max)) {
        radiusSlider.value++;
        slider_value_changed();
    }
}

function reset_button_clicked() {
    imageData = context.createImageData(width, height);
    context.putImageData(imageData, 0, 0);
}