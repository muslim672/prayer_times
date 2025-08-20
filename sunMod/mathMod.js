function mod(value, modulus = 360){
    return (value % modulus + modulus) % modulus;
}

function radians(angle){
    return angle * Math.PI / 180;
}

function degrees(x){
    return x * 180 / Math.PI;
}

function sin_r(angle) {
    return Math.sin(radians(angle));
}

function cos_r(angle) {
    return Math.cos(radians(angle));
}

function tan_r(angle) {
    return Math.tan(radians(angle));
}

function asin_d(x) {
    return degrees(Math.asin(x));
}

function acos_d(x) {
    return degrees(Math.acos(x));
}

function atan_d(x) {
    return degrees(Math.atan(x));
}

function atan2_d(y, x) {
    return degrees(Math.atan2(y, x));
}

function poly(base, coeffs) {
    return coeffs.reduce((sum, coeff, i) => sum + coeff * base**i, 0);
}

function norm(angle, offset = 180) {
    return mod(angle - offset, 2 * offset) - offset;
}

const finit = 1e-6;
function newton(f, x0, h = finit, max_iter = 3) {
    let x1;
    for (let i = 0; i < max_iter; i++) {
        const df = (f(x0 + h) - f(x0 - h)) / (2 * h);
        x1 = x0 - f(x0) / df;
        x0 = x1;
    }
    return x1;
}
