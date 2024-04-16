const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "When was the Maharaja Agrasen Institute of Technology established?",
    choice1: "1995",
    choice2: "1999",
    choice3: "2000",
    choice4: "2005",
    answer: 2
  },
  {
    question:
      "Who is the founder of the Maharaja Agrasen Institute of Technology?",
    choice1: "Dr. Nand Kishore Garg",
    choice2: "Dr. Neelam Sharma",
    choice3: "Sh. Vineet Kumar Lohia",
    choice4: "Er. T.R Garg",
    answer: 1
  },
  {
    question: "Which university is the Maharaja Agrasen Institute of Technology affiliated to?",
    choice1: "Delhi University",
    choice2: "Jawaharlal Nehru University",
    choice3: "Guru Gobind Singh Indraprastha University",
    choice4: "Amity University",
    answer: 3
  },
  {
    question: "What is the ISO certification of the Maharaja Agrasen Institute of Technology?",
    choice1: "ISO 9001-2000",
    choice2: "ISO 9001-2015",
    choice3: "ISO 14001-2015",
    choice4: "ISO 22000-2018",
    answer: 2
  },
  {
    question: "What is the aim of the Maharaja Agrasen Technical Education Society (MATES)?",
    choice1: "To promote quality education in the field of Technology and Management",
    choice2: "To promote sports activities",
    choice3: "To promote cultural activities",
    choice4: "To promote political awareness",
    answer: 1
  },
  {
    question: "Who is the current director of the Maharaja Agrasen Institute of Technology?",
    choice1: "Dr. Nand Kishore Garg",
    choice2: "Dr. Neelam Sharma",
    choice3: "Sh. Vineet Kumar Lohia",
    choice4: "Er. T.R Garg",
    answer: 2
  },
  {
    question: "Where is the Maharaja Agrasen Institute of Technology located?",
    choice1: "Rohini, Delhi",
    choice2: "Dwarka, Delhi",
    choice3: "Janakpuri, Delhi ",
    choice4: "Saket, Delhi",
    answer: 1
  },
  {
    question: "What courses does the Maharaja Agrasen Institute of Technology offer?",
    choice1: "Bachelor of Technology and Master of Business Administration",
    choice2: "Bachelor of Arts and Master of Science",
    choice3: "Bachelor of Commerce and Master of Arts",
    choice4: "Bachelor of Science and Master of Technology",
    answer: 1
  },
  {
    question: "Who is the Chairman of the Maharaja Agrasen Technical Education Society (MATES)?",
    choice1: "Dr. Nand Kishore Garg",
    choice2: "Dr. Neelam Sharma",
    choice3: "Sh. Vineet Kumar Lohia",
    choice4: "Er. T.R Garg",
    answer: 3
  },
  {
    question: "Who is the General Secretary of the Maharaja Agrasen Technical Education Society (MATES)?",
    choice1: "Dr. Nand Kishore Garg",
    choice2: "Dr. Neelam Sharma",
    choice3: "Sh. Vineet Kumar Lohia",
    choice4: "Er. T.R Garg",
    answer: 4
  }
];

//CONSTANTS
const INCORRECT_TAX = 10;
const MAX_QUESTIONS = 10;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  score = 150;
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      //go to the end page
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Penalty for wrong choice
decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};


startGame();
