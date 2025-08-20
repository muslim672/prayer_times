function moonPhase(target, stamp = new Date()) {
    function f(JD) {
        const stamp_ = jd_(JD);
        const λ_m = angles_('moon', stamp_).at(-2);
        const λ_s = angles_('sun', stamp_).at(-2);
        const elon = λ_m - λ_s;
        return norm(target - elon);
    }
    const JD = jd(stamp);
    let diff = mod(f(JD));
    if (diff < finit) {
        diff += 360;
    }
    const JD_ = JD + 29.53 * diff / 360;
    return jd_(newton(f, JD_));
}

function moon_phase(stamp = new Date(), P = 'N') {
    switch (P) {
        case 'N':
            return moonPhase(0, stamp);
        case 'Q1':
            return moonPhase(90, stamp);
        case 'F':
            return moonPhase(180, stamp);
        case 'Q2':
            return moonPhase(270, stamp);
    }
}
