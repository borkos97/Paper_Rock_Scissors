const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}
const gameSeries = {
    series: 0,
    theBiggestStreak: 0,
}

const game = {
    playerHand: null,
    aiHand: null,
}

const hands = [...document.querySelectorAll('.select img')];

const series = document.querySelector('p.series span');
const theBiggestSeries = document.querySelector('.theBiggestSeries');
const theBiggestSpan = document.querySelector('.theBiggestSeries span');
const effect =  document.querySelector('[data-summary="who-win"]'); 
const win = document.querySelector('p.wins span');
const lose = document.querySelector('p.losses span')
const draw = document.querySelector('p.draws span');

function handSelection() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 0 4px deepSkyBlue';
}

function aiChoice() {
    return hands[Math.floor(Math.random() * hands.length)].dataset.option;
}

function checkResult() {
    if (game.playerHand === game.aiHand) return 'draw';
    else if((game.playerHand === 'paper' && game.aiHand === 'rock') || 
                (game.playerHand === 'rock' && game.aiHand === 'scissors') ||
                (game.playerHand === 'scissors' && game.aiHand === 'paper')){
        return 'win';
    } else return 'lose';
}

function checkSeries() {
    
    if(gameSeries.series > gameSeries.theBiggestStreak) {
        gameSeries.theBiggestStreak = gameSeries.series;
        series.style.color = 'deepskyblue'
        theBiggestSpan.style.color ='deepskyblue'
        theBiggestSeries.style.display = 'inline'
    } else if(gameSeries.series === 0) {
        series.style.color =''
    } 
    series.textContent = gameSeries.series;
    theBiggestSpan.textContent = gameSeries.theBiggestStreak;

}

function showResult(result) {   
    document.querySelector('[data-summary="your-choice"]').textContent = game.playerHand;
    document.querySelector('[data-summary="ai-choice"]').textContent = game.aiHand; 
    document.querySelector('p.numbers span').textContent = ++ gameSummary.numbers;
    if(result == 'win'){       
        win.textContent = ++ gameSummary.wins;
        win.style.color = 'green';
        effect.textContent = 'You won! Congratulations :D';
        effect.style.color = 'green';
        gameSeries.series = ++gameSeries.series;
    } else if(result == 'lose') {       
        lose.textContent = ++ gameSummary.losses;
        lose.style.color = 'red';
        effect.textContent = 'Computer won, maybe next time! :c';
        effect.style.color = 'red';
        gameSeries.series = 0;
    } else {        
        draw.textContent = ++ gameSummary.draws;
        draw.style.color = 'gray';
        effect.textContent = 'Draw';
        effect.style.color = 'gray';
        gameSeries.series = 0;
    } 
    checkSeries();
}

function newGame() {
    document.querySelector(`[data-option=${game.playerHand}]`).style.boxShadow = '';
    game.playerHand = '';
}

function startGame() {
    if(!game.playerHand) return alert('None of the options have been selected. Choose one of them.');
    game.aiHand = aiChoice();
    showResult(checkResult());
    newGame();
}

hands.forEach(hand => hand.addEventListener('click', handSelection));

document.querySelector('.start').addEventListener('click', startGame);