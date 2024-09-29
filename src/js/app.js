const mainMenu = document.getElementById("menu");
const header = document.getElementById("header");
const questions = document.getElementById("questions");

document.addEventListener("click", (e) => {
  const eventTarget = e.target;

  if (eventTarget.hasAttribute("data-gamemode")) {
    const selectedGamemode = eventTarget.getAttribute("data-gamemode");

    mainMenu.classList.add("hidden");
    mainMenu.ariaHidden = true;

    header.classList.remove("hidden");
    header.classList.add("flex");
    header.ariaHidden = false;

    questions.classList.remove("hidden");
    questions.classList.add("flex");
    questions.ariaHidden = false;

    startStopwatch();

    if (selectedGamemode === "clock") {
      againstTheClock();
    }
  }
});

const startStopwatch = () => {
  const startTime = new Date().getTime();

  setInterval(() => {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;

    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
    const hours = Math.floor(elapsedTime / 1000 / 60 / 60);

    const displayedTime = `${padNumber(hours)}:${padNumber(minutes)}:${padNumber(seconds)}`;

    document.getElementById("timer").innerHTML = displayedTime;
  }, 1000);
};

const againstTheClock = () => {
  const questionNumberUI = document.getElementById("question-number");
  const progressBar = document.getElementById("progress");

  const question = document.getElementById("question");

  const answers = {};

  const answerBox = document.getElementById("answer");
  answerBox.focus();

  let questionNumber = 1;

  questionNumberUI.innerHTML = questionNumber;

  const questionEquation = generateQuestion();

  question.innerHTML = questionEquation;

  answerBox.addEventListener("keydown", (e) => {
    if (questionNumber < 20) {
      if (e.key === "Enter") {
        answers[`${question.innerHTML}`] = [
          eval(question.innerHTML),
          parseInt(answerBox.value),
        ];

        console.log(answers);

        answerBox.value = "";

        const questionEquation = generateQuestion();

        question.innerHTML = questionEquation;

        questionNumber++;

        progressBar.value = questionNumber;

        questionNumberUI.innerHTML = questionNumber;
      }
    }
  });
};

const padNumber = (number) => (number < 10 ? "0" : "") + number;

const generateQuestion = () => {
  const num1 = Math.floor(Math.random() * (16 - 1) + 1);
  const num2 = Math.floor(Math.random() * (16 - 1) + 1);

  const operator = "+";

  return `${num1} ${operator} ${num2}`;
};
