const hijriMethods = ['الرؤية الشرعية (معيار عودة)', 'الحساب الفلكي'];
let hijriIndex = localStorage.getItem('hijriIndex');
if (hijriIndex) {
    hijriIndex = parseInt(hijriIndex);
} else {
    hijriIndex = 0;
}
let hijriMethod = hijriMethods[hijriIndex];

const hijriMethodEl = document.getElementById('hijriMethod');
const hijriMethodsBtnEl = document.getElementById('hijriMethodsBtn');
const hijriMethodsEl = document.getElementById('hijriMethods');

hijriMethodEl.textContent = `حساب بداية الشهر الهجري: ${hijriMethod}`;
hijriMethodsBtnEl.textContent = hijriMethod;

hijriMethods.forEach((hijriMethod, index) => {
    const btnEl = document.createElement('button');
    btnEl.className = 'dropdown-item';
    btnEl.textContent = hijriMethod;
    btnEl.onclick = () => {
        hijriMethodEl.textContent = `حساب بداية الشهر الهجري: ${hijriMethod}`;
        hijriMethodsBtnEl.textContent = hijriMethod;
        hijriIndex = index;
        localStorage.setItem('hijriIndex', index);
    };
    hijriMethodsEl.appendChild(btnEl);
});


function hijri(lat, long, stamp = new Date()) {
    let stamp_ = moon_phase(stamp);
    stamp_ = new Date(stamp_.getTime() - 86400000 * 30);
    let [year, month, visib, istitlaa] = new_moon(lat, long, stamp_).slice(0, 4);
    let day;
    if (hijriIndex === 1) {
        day = Math.round((new Date(stamp).setHours(0, 0, 0, 0) - istitlaa.getTime()) / 86400000);
    } else if (hijriIndex === 0) {
        day = Math.round((new Date(stamp).setHours(0, 0, 0, 0) - istitlaa.getTime()) / 86400000) - 1;
        if (visib === 'green, visible') {
            day += 1;
        }
    }
    if (day <= 0) {
        const n = 1 - day;
        day = hijri(lat, long, new Date(stamp.getTime() - 86400000 * n)).at(-1) + n;
        month -= 1;
        if (month === 0) {
            month = 12;
            year -= 1;
        }
    }
    return [year, month, day];
}

function setHijri() {
    const hijriEl = document.getElementById('hijri');
    if (isNaN(lat) || isNaN(long)) {
        hijriEl.style.display = 'none';
        return;
    }
    hijriEl.style.display = 'block';

    const months = ['محرم', 'صفر', 'ربيع أول', 'ربيع ثاني', 'جمادى الأولى', 'جمادى الثانية', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    const fajr = getPrayerTimes()[0];
    const maghrib = getPrayerTimes()[4];

    if (stamp < fajr) {
        const [year, month, day] = hijri(lat, long, stamp);
        hijriEl.textContent = `ليلة ${day} ${months[month - 1]} ${year}.`;
    } else if (stamp < maghrib) {
        const [year, month, day] = hijri(lat, long, stamp);
        hijriEl.textContent = `يوم ${day} ${months[month - 1]} ${year}.`;
    } else {
        const [year, month, day] = hijri(lat, long, new Date(stamp.getTime() + 86400000));
        hijriEl.textContent = `ليلة ${day} ${months[month - 1]} ${year}.`;
    }
}
