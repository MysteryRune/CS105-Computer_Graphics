import { setPixel } from "./basic.js";

export function drawLineDDA(imageData, points, lineRgba) {
    var p1 = {x: points[0][0],
              y: points[0][1]}
    var p2 = {x: points[1][0],
              y: points[1][1]}
    var dx = p2.x - p1.x, dy = p2.y - p1.y;

    if (dx == 0 && dy == 0) {
        return;
    }
    if (Math.abs(dy) <= Math.abs(dx)) { // Check use x-axis or y-axis for key axis to draw the line
        if (p2.x < p1.x) {
            // Swap 2 point when point 2 left side by point 1 (x-axis)
            var tx = p1.x; p1.x = p2.x; p2.x = tx;
            var ty = p1.y; p1.y = p2.y; p2.y = ty;
        }
        var k = dy / dx;
        var y = p1.y;
        for (var x = p1.x; x <= p2.x; x++) {
            setPixel(imageData, x, Math.floor(y + 0.5), lineRgba);
            y = y + k;
        }
    }
    else {
        if (p2.y < p1.y) {
            var tx = p1.x; p1.x = p2.x; p2.x = tx;
            var ty = p1.y; p1.y = p2.y; p2.y = ty;
        }
        var k = dx / dy;
        var x = p1.x;
        for (var y = p1.y; y <= p2.y; y++) {
            setPixel(imageData, Math.floor(x + 0.5), y, lineRgba);
            x = x + k;
        }
    }
    
}