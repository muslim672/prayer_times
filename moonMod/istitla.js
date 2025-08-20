function sets(lat, long, stamp = new Date()) {
    const maghrib = riset('sun', 'h0', lat, long, stamp)[1];
    const moonset = riset('moon', 'h0', lat, long, stamp)[1];
    return [maghrib, moonset];
}

function istitla_(lat, long, stamp = new Date()) {
    const new_moon = moon_phase(stamp);
    let istitlaa = new Date(new_moon);
    istitlaa.setHours(0, 0, 0, 0);
    const [maghrib, moonset] = sets(lat, long, istitlaa);
    if (!(new_moon < maghrib && maghrib < moonset)) {
        istitlaa = new Date(istitlaa.getTime() + 86400000);
        return [istitlaa, new_moon, ...sets(lat, long, istitlaa)];
    }
    return [istitlaa, new_moon, maghrib, moonset];
}

function istitla(lat, long, stamp = new Date()) {
    let stamp_ = moon_phase(stamp);
    stamp_ = new Date(stamp_.getTime() - 86400000 * 30);
    if (stamp <= istitla_(lat, long, stamp_)[2]) {
        return istitla_(lat, long, stamp_);
    }
    return istitla_(lat, long, stamp);
}
