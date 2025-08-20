const stampEl = document.getElementById('stamp');
let diffD = 0;
stampEl.addEventListener('change', () => {
    diffD = new Date(stampEl.value) - new Date(new Date().setHours(0, 0, 0, 0) - new Date().getTimezoneOffset() * 60000);
});
let stamp;

const latEl = document.getElementById('lat');
latEl.value = localStorage.getItem('lat');
let lat;

const longEl = document.getElementById('long');
longEl.value = localStorage.getItem('long');
let long;

const elevEl = document.getElementById('elev');
elevEl.value = localStorage.getItem('elev')
let elev;

navigator.geolocation.getCurrentPosition(
    (position) => {
        latEl.value = position.coords.latitude;
        localStorage.setItem('lat', latEl.value);
        longEl.value = position.coords.longitude;
        localStorage.setItem('long', longEl.value);
    }
);
setInterval(setPrayerTimes, 50);

function getLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            latEl.value = position.coords.latitude;
            localStorage.setItem('lat', latEl.value);
            longEl.value = position.coords.longitude;
            localStorage.setItem('long', longEl.value);
        },
        (error) => {
            alert('لتحديث مواقيت الصلاة: يُرجىٰ تفعيل خاصية تحديد الموقع.');
        }
    );
}

function getPrayerTimes(n = 0) {
    return prayer_times(lat, long, new Date(stamp.getTime() + 86400000 * n), elev);
}

const prayerTableEl = document.getElementById('prayerTable');
function setPrayerTimes() {
    lat = parseFloat(latEl.value);
    long = parseFloat(longEl.value);
    localStorage.setItem('elev', elevEl.value);
    elev = parseFloat(elevEl.value);

    prayerTableEl.innerHTML = '';
    updateTimer();
    setHijri();

    const infoEl = document.getElementById('info');
    if (isNaN(lat) || isNaN(long)) {
        infoEl.style.display = 'none';
        return;
    }
    infoEl.style.display = 'block';

    if (Day(-1)) {
        appendRow(...Day(-1));
        appendRow('<td colspan=3><hr></td>');
        getPrayerTimes().forEach(appendRow);
    } else if (Day()) {
        getPrayerTimes().forEach(appendRow);
    } else {
        getPrayerTimes().forEach(appendRow);
        appendRow('<td colspan=3><hr></td>');
        appendRow(...Day(1));
    }
}

function updateTimer() {
    stamp = new Date(new Date().getTime() + diffD);
    stampEl.value = new Date(stamp - stamp.getTimezoneOffset() * 60000).toISOString().split('T')[0];

    const timerEl = document.getElementById('timer');
    if (isNaN(lat) || isNaN(long)) {
        timerEl.style.display = 'none';
        return;
    }
    timerEl.style.display = 'block';

    let next, i;
    if (Day(-1)) {
        [next, i] = Day(-1);
    } else if (Day()) {
        [next, i] = Day();
    } else {
        [next, i] = Day(1);
    }
    let diff = next - stamp;
    let hours = diff / 3600000;
    let minutes = diff % 3600000 / 60000;
    let seconds = diff % 60000 / 1000;
    [hours, minutes, seconds] = [hours, minutes, seconds].map(t => parseInt(t));
    timerEl.textContent = `باقٍ ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} على ${names[i]}.`;
}

function frmt(prayerTime) {
    return prayerTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).replace('AM', 'ص').replace('PM', 'م');
}

function appendRow(prayerTime, i) {
    const row = document.createElement('tr');
    if (isNaN(i)) {
        row.innerHTML = `${prayerTime}`;
    } else {
        row.innerHTML = `<td>${names[i]}</td><td>&nbsp:&nbsp</td><td>${frmt(prayerTime)}</td>`;
    }
    prayerTableEl.appendChild(row);
}

function Day(n = 0) {
    let i = 0;
    for (const prayerTime of getPrayerTimes(n)) {
        if (prayerTime > stamp) {
            return [prayerTime, i];
        }
        i++;
    }
}
