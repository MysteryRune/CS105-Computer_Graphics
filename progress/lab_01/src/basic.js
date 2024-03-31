export function setPixel(imageData, x, y, pointRgba) {
    // var index = (x + y * imageData.width) * 4; ~ (x + y * imageData.width) << 2
    if (x < imageData.width && y < imageData.height) {
        var index = (x + y * imageData.width) << 2;
        imageData.data[index + 0] = pointRgba[0]; // Red
        imageData.data[index + 1] = pointRgba[1]; // Green
        imageData.data[index + 2] = pointRgba[2]; // Blue
        imageData.data[index + 3] = pointRgba[3]; // Alpha (opacity)
    }
}