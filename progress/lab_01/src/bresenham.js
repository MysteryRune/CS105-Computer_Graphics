import { setPixel } from "./basic.js";

export function drawLineBresenham(imageData, points, lineRgba) {
    var p1 = {x: points[0][0],
              y: points[0][1]}
    var p2 = {x: points[1][0],
              y: points[1][1]}
    // var dx = Math.abs(p2.x - p1.x), dy = Math.abs(p2.y - p1.y);
    var dx = p2.x - p1.x, dy = p2.y - p1.y;

    if (dx == 0 && dy == 0) {
        return;
    }
    if (Math.abs(dy) <= Math.abs(dx)) { // Check use x-axis or y-axis for key axis to draw the line
        if (p1.x > p2.x) {
            // Swap 2 point when point 2 left side by point 1 (x-axis)
            var tx = p1.x; p1.x = p2.x; p2.x = tx;
            var ty = p1.y; p1.y = p2.y; p2.y = ty;
        }
        var p = 2 * dy - dx;
        var y = p1.y;
        var k = 1;
        if (dy / dx < 0) k = -1;
        for (var x = p1.x; x <= p2.x; x++) {
            setPixel(imageData, x, y, lineRgba);
            if (p < 0) {
                p = p + 2 * Math.abs(dy);
            }
            else{
                p = p + 2 * Math.abs(dy) - 2 * Math.abs(dx);
                y = y + k;
            }
        }
    }
    else {
        if (p1.y > p2.y) {
            // Swap 2 point when point 2 left side by point 1 (x-axis)
            var tx = p1.x; p1.x = p2.x; p2.x = tx;
            var ty = p1.y; p1.y = p2.y; p2.y = ty;
        }
        var p = 2 * dx - dy;
        var x = p1.x;
        var k = 1;
        if (dy / dx < 0) k = -1;
        for (var y = p1.y; y <= p2.y; y++) {
            setPixel(imageData, x, y, lineRgba);
            if (p < 0) {
                p = p + 2 * Math.abs(dx);
            }
            else{
                p = p + 2 * Math.abs(dx) - 2 * Math.abs(dy);
                x = x + k;
            }
        }
    }
}