function isVisible(lat, long, stamp = new Date()) {
    const [π_m, λ_m, Δ_m] = angles_('moon', stamp).slice(4);
    const λ_s = angles_('sun', stamp).at(-2);
    const e_m = angles('moon', lat, long, stamp)[0];
    const e_s = angles('sun', lat, long, stamp)[0];

    const elon = λ_m - λ_s;
    const frct = (1 - cos_r(elon)) / 2;

    const s = 358473400 / Δ_m;
    const diam = 2 * s * (1 + sin_r(e_m) * sin_r(π_m));

    let W = frct * diam;
    W /= 60;
    const V = Math.abs(e_m - e_s) + 6.3226 * W - 0.7319 * W**2 + 0.1018 * W**3;
    if (V < 6.2051) {
        return 'white, invisible';
    }
    if (V < 9.1651) {
        return 'blue, visible by telescope';
    }
    if (V < 12.8151) {
        return 'pink, might be visible';
    }
    return 'green, visible';
}
