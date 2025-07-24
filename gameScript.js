const modal = document.getElementById('gameModal');
const openBtn = document.getElementById('gameOpenBtn');
const nextBtn = document.getElementById('gameNextBtn');
const inputLabel = document.getElementById('gameInputLabel');
const inputField = document.getElementById('gameInputField');
const errorMsg = document.getElementById('gameError');
const clueMsg = document.getElementById('gameClue');
const answerText = document.getElementById('gameAnswerText');
const gameVideo = document.getElementById('gameVideo');
const instructionText = document.getElementById('gameInstruction');

const words = ["Always", "Not gonna", "Take", "Me", "Down"];
const correctAnswers = ["never", "gonna", "give", "you", "up"];
const clues = [
  "Rhymes with 'ever', starts with N.",
  "A slang contraction of 'going to'.",
  "Rhymes with 'live', starts with G.",
  "Not 'me' but ___.",
  "Where balloons like to go."
];

const userAnswers = [];
let currentStep = 0;

openBtn.onclick = () => {
  modal.style.display = 'flex';
  resetChallenge();
};

function resetChallenge() {
  currentStep = 0;
  userAnswers.length = 0;
  errorMsg.innerText = "";
  clueMsg.innerText = "";
  instructionText.classList.remove('hidden');
  inputLabel.innerText = words[currentStep];
  inputField.value = "";
  inputField.focus();

  inputLabel.classList.remove('slideOut', 'slideIn');  // <<< Reset Slide Animations
  inputField.classList.remove('slideOut', 'slideIn');  // <<< Reset Slide Animations

  answerText.classList.add('hidden');
  gameVideo.classList.add('hidden');
  gameVideo.pause();
  gameVideo.currentTime = 0;

  document.querySelector('.game-singleInput').classList.remove('hidden');
}

nextBtn.onclick = checkAnswer;

inputField.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    nextBtn.click();
  }
});

function checkAnswer() {
  const userInput = inputField.value.trim().toLowerCase();

  if (userInput === correctAnswers[currentStep]) {
    userAnswers.push(userInput);
    errorMsg.innerText = "";
    clueMsg.innerText = "";

    inputLabel.classList.add('slideOut');
    inputField.classList.add('slideOut');

    setTimeout(() => {
      currentStep++;

      if (currentStep < words.length) {
        inputLabel.innerText = words[currentStep];
        inputField.value = "";

        inputLabel.classList.remove('slideOut');
        inputField.classList.remove('slideOut');

        inputLabel.classList.add('slideIn');
        inputField.classList.add('slideIn');

        setTimeout(() => {
          inputLabel.classList.remove('slideIn');
          inputField.classList.remove('slideIn');
        }, 300);

        inputField.focus();
      } else {
        triggerFinalTrap();
      }
    }, 300);

  } else {
    errorMsg.innerText = "Incorrect! Try again.";
    clueMsg.innerText = "Clue: " + clues[currentStep];
    inputField.focus();
  }
}

function triggerFinalTrap() {
  instructionText.classList.add('hidden');
  document.querySelector('.game-singleInput').classList.add('hidden');
  const finalAnswer = userAnswers.join(' ');
  answerText.innerHTML = `Your Answer: <span style="color:#1298ff;">${finalAnswer}</span><br><br>🎵 You have been rick rolled! 🎵`;
  answerText.classList.remove('hidden');
  answerText.classList.add('fadeIn');
  gameVideo.classList.remove('hidden');
  gameVideo.classList.add('zoomIn');
  gameVideo.muted = false;
  gameVideo.play();
}

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    resetChallenge();  // <<< Full Reset when clicking outside modal
  }
};
