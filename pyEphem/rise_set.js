function rise_set(body, target, isSet, lat, long, stamp = new Date(), elev = 0) {
    function f(JD) {
        const stamp_ = jd_(JD);
        const [δ, H0, h0] = angles_(body, stamp_).slice(1, 4);
        const H = long - H0;
        let target_ = target;
        if (target === 'h0') {
            const r = 6371000;
            let dip = acos_d(r / (r + Math.abs(elev)));
            if (elev < 0) {
                dip *= -1;
            }
            target_ = h0 - dip;
        }
        const target_H_ = acos_d((sin_r(target_) - sin_r(lat) * sin_r(δ)) / (cos_r(lat) * cos_r(δ)));
        const target_H = isSet * target_H_;
        return norm(target_H - H);
    }
    const JD = jd(stamp);
    let diff = mod(f(JD));
    if (diff < finit) {
        diff += 360;
    }
    const JD_ = JD + diff / 360;
    return jd_(newton(f, JD_))
}
