// DOM Elements
const H2 = document.querySelector('h2');
const DIFFICULTIES = document.querySelectorAll('.difficulties button');
const VISUAL_TIMER = document.querySelector('#visual-timer');
const TIME = document.querySelector('#time');
const WORD = document.querySelector('#word');
const INPUT = document.querySelector('input');
const FEEDBACK = document.querySelector('#feedback');
const SCORE = document.querySelector('#score');
const DIFFICULTIES_INFO = document.querySelector('.difficulties-info');
const PLAY_AGAIN = document.querySelector('#play-again');

const WORDS = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition'
];
// Game Levels
const LEVELS = {
  easy: 5,
  medium: 3,
  hard: 3
};
// Global Variables
const WIDTH = 100;
let multiplyToWidth = 1;
let level = LEVELS.easy;
let currentScore = 0;
let chosenWord = randomWord();
let isPlaying = false;
let isLevelHard = false;
let interval;

WORD.textContent = chosenWord;
INPUT.focus();

// Check If Game Is Playing
function checkGameStatus() {
  if (TIME.textContent == '0') {
    VISUAL_TIMER.style.width = '0%';
    setTimeout(() => VISUAL_TIMER.style.display = 'none', 300);
    stopGame();
  } else {
    const widthToBeRemoved = WIDTH / level * multiplyToWidth;
    const newWidth = WIDTH - widthToBeRemoved;
    multiplyToWidth++;

    VISUAL_TIMER.style.width = `${newWidth}%`;
  }
}

function randomWord() {
  let randomWordIndex = Math.round(Math.random() * WORDS.length - 1);

  if (randomWordIndex === -1) {
    randomWordIndex = 0;
  }

  return WORDS[randomWordIndex];
}

function resetWord() {
  chosenWord = randomWord();
  WORD.textContent = chosenWord;
}

function checkInput() {
  if (INPUT.value == chosenWord) {
    if (currentScore === 0 && !isPlaying) {
      startGame();
      currentScore++;
      INPUT.value = '';
    } else if (isPlaying) {
      FEEDBACK.textContent = 'Correct!!!';
      SCORE.textContent = currentScore;
      resetWord();
      currentScore++;
      TIME.textContent = level;
      VISUAL_TIMER.style.width = `${WIDTH}%`;
      multiplyToWidth = 1;
      INPUT.value = '';
    }
  }

  if (INPUT.value != '' && isPlaying) {
    FEEDBACK.textContent = '';
  }

  if (isLevelHard && isPlaying) {
    if (!chosenWord.includes(INPUT.value)) {
      stopGame();
    }
  }
}

function changeDifficulty(e) {
  switch (e.target.textContent) {
    case 'Easy':
      level = LEVELS.easy;
      isLevelHard = false;
      break;
    case 'Medium':
      level = LEVELS.medium;
      isLevelHard = false;
      break;
    default:
      level = LEVELS.hard;
      isLevelHard = true;
      break;
  }

  DIFFICULTIES.forEach(difficulty => difficulty.classList.remove('current'))
  e.target.classList.add('current')
  TIME.textContent = level;
}

function startGame() {
  FEEDBACK.textContent = '';
  VISUAL_TIMER.style.display = 'inline-block';
  H2.style.display = 'none';
  DIFFICULTIES.forEach(difficulty => difficulty.style.display = 'none');
  DIFFICULTIES_INFO.style.display = 'none';
  PLAY_AGAIN.style.display = 'none';
  interval = setInterval(() => {
    TIME.textContent = parseInt(TIME.textContent) - 1;
    checkGameStatus();
  }, 1000);
  resetWord();
  isPlaying = true;
}

function stopGame() {
  clearInterval(interval);
  FEEDBACK.textContent = 'Game Over!!!';
  PLAY_AGAIN.style.display = 'inline-block';
  INPUT.value = '';
  isPlaying = false;
}

function resetGame() {
  currentScore = 0;
  VISUAL_TIMER.style.display = 'none';
  VISUAL_TIMER.style.width = `${WIDTH}%`;
  multiplyToWidth = 1;
  H2.style.display = 'block';
  DIFFICULTIES_INFO.style.display = 'block';
  DIFFICULTIES.forEach(difficulty => difficulty.style.display = 'inline-block');
  PLAY_AGAIN.style.display = 'none';
  FEEDBACK.innerHTML = 'Type In Word To Start Game <br> (First Guess Will Not Affect Your Score)';
  INPUT.value = '';
  TIME.textContent = level;
  SCORE.textContent = currentScore;
  INPUT.focus();
  resetWord();
}

// Event Listeners
DIFFICULTIES.forEach(difficulty => difficulty.addEventListener('click', changeDifficulty));
INPUT.addEventListener('keyup', checkInput);
PLAY_AGAIN.addEventListener('click', resetGame);
