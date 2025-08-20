function transit(body, target, long, stamp = new Date()) {
    function f(JD) {
        const stamp_ = jd_(JD);
        const H = angles(body, null, long, stamp_);
        return norm(target - H);
    }
    const JD = jd(stamp);
    let diff = mod(f(JD));
    if (diff < finit) {
        diff += 360;
    }
    const JD_ = JD + diff / 360;
    return jd_(newton(f, JD_))
}
