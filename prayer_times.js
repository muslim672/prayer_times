function prayer_times(lat, long, stamp = new Date(), elev) {
    if (isNaN(elev)) {
        elev = 0;
    }
    const [shurooq, maghrib] = riset('sun', 'h0', lat, long, stamp, elev);
    const fajr = riset('sun', -fajrAngle, lat, long, stamp)[0];
    const isha = riset('sun', -ishaAngle, lat, long, stamp)[1];
    const [dhuhr, muntasaf] = transit_nadir('sun', long, stamp);
    const dhuhr_angle = angles('sun', lat, long, dhuhr)[0];
    const x = 1;
    const asr_angle = atan2_d(tan_r(dhuhr_angle), 1 + x * tan_r(dhuhr_angle));
    const asr = riset('sun', asr_angle, lat, long, stamp)[1];
    return [fajr, shurooq, dhuhr, asr, maghrib, isha, muntasaf];
}

const names = ['الفجر', 'الشروق', 'الظهر', 'العصر', 'المغرب', 'العشاء', 'منتصف الليل'];
