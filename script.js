'use strict';

//Seleceting elements
let score1El = document.getElementById('score--0');
let score2El = document.getElementById('score--1');
const current1El = document.getElementById('current--0');
const current2El = document.getElementById('current--1');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const modal = document.getElementById('win-modal');
const overlay = document.querySelector('.overlay');
const modalNewGameBtn = document.querySelector('.btn--modal-new');
//buttons
const diceEl = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const newgameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
//sounds
const rollingDiceSound = new Audio('Sound/dice-142528.mp3');
const clickSound = new Audio('Sound/mixkit-arcade-game-jump-coin-216.mp3');
const winSound = new Audio('Sound/kids-saying-yay-sound-effect_3.mp3');

//starting conditions
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
// let playing = true;

score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add('hidden');

//switch player function
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
};

//rolling dice function
rollDiceBtn.addEventListener('click', function () {
  // show dice
  diceEl.classList.remove('hidden');

  //play sound
  rollingDiceSound.play();
  rollingDiceSound.volume = 0.4;

  //generate random number
  let randomNumber = Math.trunc(Math.random() * 6) + 1;

  // show dice = random number
  diceEl.src = `dice-${randomNumber}.png`;

  //   if score not = 1
  if (randomNumber !== 1) {
    //Add score
    currentScore += randomNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    // current1El.textContent = currentScore;
  } else {
    //switch player
    switchPlayer();
  }
});

holdBtn.addEventListener('click', function () {
  //clicking sound
  clickSound.volume = 0.4;
  clickSound.play();

  // add current score to total score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // check if player won
  if (scores[activePlayer] >= 100) {
    winSound.volume = 0.2;
    winSound.play();
    document.getElementById('win-message').textContent = `Player ${
      activePlayer + 1
    } Wins!`;
    document.getElementById('win-modal').classList.remove('hidden');
    document.querySelector('.overlay').classList.remove('hidden');

    // disable further play
    rollDiceBtn.disabled = true;
    holdBtn.disabled = true;

    // force new game after 3 seconds
    setTimeout(() => {
      document.getElementById('win-modal').classList.add('hidden');
      document.querySelector('.overlay').classList.add('hidden');
      newgameBtn.click(); // trigger new game
      rollDiceBtn.disabled = false;
      holdBtn.disabled = false;
    }, 3000);
  } else {
    // switch player
    switchPlayer();
  }
});

newgameBtn.addEventListener('click', function () {
  //clicking sound
  clickSound.play();
  clickSound.volume = 0.4;

  //sarting conditons
  scores = [0, 0];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = 0;
  // let playing = true;

  score1El.textContent = 0;
  score2El.textContent = 0;
  diceEl.classList.add('hidden');
});
