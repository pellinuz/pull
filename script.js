let coins = 99999;
let totalPulls = 0;
const resultsDiv = document.getElementById('results');

function updateUI() {
    document.getElementById('coins').textContent = coins;
    document.getElementById('totalPulls').textContent = totalPulls;
}

function getRandomStar() {
    const rand = Math.random();
    if (rand < 0.01) return 5; // 1% chance for 5-star
    if (rand < 0.1) return 4;  // 9% chance for 4-star
    return 3;                  // 90% chance for 3-star
}

function pull(times) {
    if ((times === 1 && coins < 160) || (times === 10 && coins < 1600)) {
        alert('Not enough Gacha Coins!');
        return;
    }

    coins -= times * 160;
    totalPulls += times;
    let results = '';
    let got4Star = false;
    let got5Star = false;

    for (let i = 0; i < times; i++) {
        let star = getRandomStar();
        if (totalPulls >= 90 && !got5Star) {
            star = 5;
            got5Star = true;
        }
        if ((totalPulls % 10 === 0 || i === times - 1) && !got4Star) {
            star = 4;
            got4Star = true;
        }
        results += `Pull ${times === 10 ? '10' : totalPulls}: ${star}-star item<br>`;
    }

    const resultElement = document.createElement('div');
    resultElement.className = 'result';
    resultElement.innerHTML = results;
    resultsDiv.prepend(resultElement);

    updateUI();
}

updateUI();
