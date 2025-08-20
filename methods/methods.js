let prayerMethod;
const prayerIndex = localStorage.getItem('prayerIndex');
if (prayerIndex) {
    prayerMethod = prayerMethods[parseInt(prayerIndex)];
} else {
    prayerMethod = prayerMethods[1];
}

let fajrAngle, ishaAngle;
const prayerMethodEl = document.getElementById('prayerMethod');
const fajrEl = document.getElementById('fajr');
const ishaEl = document.getElementById('isha');
const prayerMethodsBtnEl = document.getElementById('prayerMethodsBtn');
const prayerMethodsEl = document.getElementById('prayerMethods');

[fajrAngle, ishaAngle] = [prayerMethod.fajrAngle, prayerMethod.ishaAngle];
prayerMethodEl.textContent = `حساب الفجر والعشاء: ${prayerMethod.nameAr}`;
fajrEl.textContent = `زاوية الفجر: ${prayerMethod.fajrAngle}`;
ishaEl.textContent = `زاوية العشاء: ${prayerMethod.ishaAngle}`;
prayerMethodsBtnEl.textContent = prayerMethod.nameAr;

prayerMethods.forEach((prayerMethod, index) => {
    const btnEl = document.createElement('button');
    btnEl.className = 'dropdown-item';
    btnEl.textContent = prayerMethod.nameAr;
    btnEl.onclick = () => {
        [fajrAngle, ishaAngle] = [prayerMethod.fajrAngle, prayerMethod.ishaAngle];
        prayerMethodEl.textContent = `حساب الفجر والعشاء: ${prayerMethod.nameAr}`;
        fajrEl.textContent = `زاوية الفجر: ${prayerMethod.fajrAngle}`;
        ishaEl.textContent = `زاوية العشاء: ${prayerMethod.ishaAngle}`;
        prayerMethodsBtnEl.textContent = prayerMethod.nameAr;
        localStorage.setItem('prayerIndex', index);
    };
    prayerMethodsEl.appendChild(btnEl);
});
