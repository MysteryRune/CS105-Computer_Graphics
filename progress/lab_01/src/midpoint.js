import { setPixel} from "./basic.js";

export function drawCircleMidpoint(imageData, xc, yc, r, lineRgba) {
    var x = 0;
    var y = r;
    var p = 1 - r;
    while (x < y) {
        setPixel(imageData, x + xc, y + yc, lineRgba);
        setPixel(imageData, -x + xc, y + yc, lineRgba);
        setPixel(imageData, x + xc, -y + yc, lineRgba);
        setPixel(imageData, -x + xc, -y + yc, lineRgba);
        setPixel(imageData, y + xc, x + yc, lineRgba);
        setPixel(imageData, -y + xc, x + yc, lineRgba);
        setPixel(imageData, y + xc, -x + yc, lineRgba);
        setPixel(imageData, -y + xc, -x + yc, lineRgba);

        x = x + 1
        if (p < 0) {
            p = p + 2*x + 1
        }
        else {
            y = y - 1
            p = p + 2*(x - y) + 1
        }
    }
}