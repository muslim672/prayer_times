function riset(body, target, lat, long, stamp = new Date(), elev = 0) {
    stamp.setHours(0, 0, 0, 0);
    const R = rise_set(body, target, -1, lat, long, stamp, elev);
    const S = rise_set(body, target, 1, lat, long, stamp, elev);
    return [R, S];
}

function transit_nadir(body, long, stamp = new Date()) {
    stamp.setHours(0, 0, 0, 0);
    const T = transit(body, 0, long, stamp);
    const N = transit(body, 180, long, T);
    return [T, N];
}
