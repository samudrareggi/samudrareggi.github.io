const quiz = [
  {
    q: "What is 8 - 2 ?",
    o: [8, 9, 7, 6],
    a: "0",
  },
  {
    q: "What is 2 + 2 ?",
    o: [4, 5, 3, 2],
    a: "0",
  },
  {
    q: "What is 10 / 5 ?",
    o: [4, 5, 3, 2],
    a: "0",
  },
  {
    q: "What is 2 x 4?",
    o: [8, 9, 7, 6],
    a: "0",
  },
  {
    q: "What is 2 + 6 ?",
    o: [8, 7, 9, 6],
    a: "0",
  },
];

const questionNum = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionContainer = document.getElementById("option-container");
const homeBox = document.getElementById("home-box");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const headerBox = document.getElementById("head-box");
const answerBox = document.getElementById("answer-box");

let questionCount = 0;
let temp = 0;
let currentQuestion;
let availableQuestion = [];
let availableOption = [];
let correctCount = 0;
let wrongCount = 0;

function setAvailableQuestion() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestion.push(quiz[i]);
  }
}

function setNewQuestion() {
  questionNum.innerHTML = `Question ${questionCount + 1} of 5`;
  currentQuestion = availableQuestion[temp];
  questionText.innerHTML = currentQuestion["q"];
  const optionLength = currentQuestion["o"].length;
  temp++;
  for (let i = 0; i < optionLength; i++) {
    availableOption.push(i);
  }
  optionContainer.innerHTML = "";
  for (let i = 0; i < optionLength; i++) {
    const optionIndex =
      availableOption[Math.floor(Math.random() * availableOption.length)];
    const i2 = availableOption.indexOf(optionIndex);
    availableOption.splice(i2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion["o"][optionIndex];
    option.id = optionIndex;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }
  questionCount++;
}

function getResult(element) {
  const id = element.id;
  if (id === currentQuestion["a"]) {
    element.classList.add("correct");
    correctCount++;
    setTimeout(function () {
      next();
    }, 500);
  } else {
    element.classList.add("wrong");
    wrongCount++;
    setTimeout(function () {
      next();
    }, 500);
  }
}

function next() {
  if (questionCount !== quiz.length) {
    setNewQuestion();
  } else {
    finish();
  }
}

function startQuiz() {
  homeBox.classList.add("hide");
  quizBox.classList.remove("hide");
  headerBox.classList.remove("hide");
  answerBox.classList.remove("hide");
  setAvailableQuestion();
  setNewQuestion();
}

function finish() {
  const correctResult = (document.getElementById(
    "total-correct"
  ).innerHTML = correctCount);
  document.getElementById("total-wrong").innerHTML = wrongCount;
  document.getElementById("total-score").innerHTML = correctResult * 20;
  headerBox.classList.add("hide");
  quizBox.classList.add("hide");
  answerBox.classList.add("hide");
  resultBox.classList.remove("hide");
}

function playAgain() {
  location.reload();
}
