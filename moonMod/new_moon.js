function new_moon(lat, long, stamp = new Date()) {
    const [istitlaa, newMoon, maghrib, moonset] = istitla(lat, long, stamp);
    const o_time = new Date(maghrib.getTime() + 4 / 9 * (moonset.getTime() - maghrib.getTime()));
    const visib = isVisible(lat, long, o_time);

    const n = 29.53;
    const N = 65970;
    const y = Math.round(jd(newMoon) / n) - N;
    const year = Math.floor(y / 12);
    const month = mod(y, 12);

    return [year, month + 1, visib, istitlaa, newMoon, maghrib, moonset, o_time];
}
