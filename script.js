'use strict';

// selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


const init = () => {
    // starting conditions
    const scores = [0, 0];
    let currentScore = 0;
    let activePlayer = 0; // player--0
    let playing = true;

    score0.textContent = 0;
    score1.textContent = 0;

    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    dice.classList.add('hidden');

    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');

    player0.classList.add('active--player');
    player1.classList.remove('active--player');
};
init();

const swtichPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; // switching activePlayer
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};

// rolling dice functionality
btnRoll.addEventListener('click', () => {
    if (playing) {
        // generate a random dice roll
        const randomDice = Math.floor(Math.random() * 6) + 1;

        // display the dice
        dice.classList.remove('hidden');
        dice.src = `dice-${randomDice}.png`;

        // check if rolled dice === 1; if true, switch players
        if (randomDice !== 1) {
            // add dice value to current score of current player
            currentScore += randomDice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // switch to next player
            swtichPlayer();
        }
    }
});


btnHold.addEventListener('click', () => {
    if (playing) {
        // add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // check if player's score >= 100
        if (scores[activePlayer] >= 20) {
            // finish game
            playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        } else {
            // switch to the next player
            swtichPlayer();
        }
    }
});

btnNew.addEventListener('click', function () {
    init();
});
