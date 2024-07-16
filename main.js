const words = [
  {
    word: "react",
    disc: "Javascript Library",
  },
  {
    word: "vue",
    disc: "Javascript Framwork",
  },
  {
    word: "angular",
    disc: "Javascript MVW Framework",
  },
  {
    word: "nodejs",
    disc: "Javascript RunTime Enviroment ",
  },
  {
    word: "php",
    disc: "General Purpose Scripting Language",
  },
  {
    word: "python",
    disc: "Programming Language",
  },
];

let theAudio = new Audio("./succ.mp3");

const InputContainer = document.querySelector(".inputs");
const theDescription = document.querySelector(".desc");
const theTyping = document.querySelector(".typing");
const theBtn = document.querySelector(".btn");
const tries = document.querySelector(".tries");

// Set Option's
let word;
let maxTries = 15;
let theArray = [];

document.addEventListener("keyup", () => theTyping.focus());

theTyping.addEventListener("input", startGame);

function startGame(e) {
  let char = e.target.value;

  if (!char.match(/[a-z]/i)) return;

  if (word.includes(char)) {
    for (let i = 0; i < word.length; i++) {
      if (
        word[i] === char &&
        !document.querySelectorAll(".inputs input")[i].value
      ) {
        document.querySelectorAll(".inputs input")[i].value = char;
        theArray.push(char);
      }
    }
  } else {
    maxTries--;
    tries.textContent = maxTries;
  }
  theTyping.value = "";

  if (tries.textContent === "0") {
    tries.classList.add("red");
    setTimeout(() => {
      alert("You Have Been Lose !!");
      for (let i = 0; i < word.length; i++) {
        InputContainer.querySelectorAll("input")[i].value = word[i];
        InputContainer.querySelectorAll("input")[i].classList.add("red");
      }
    });
  }

  if (theArray.length === word.length) {
    theArray = [];
    theAudio.play();
    document.querySelector(".winner").classList.add("show");
    for (let i = 0; i < word.length; i++) {
      InputContainer.querySelectorAll("input")[i].classList.add("green");
    }
  }
}

function getData() {
  // Empty Inputs Field

  InputContainer.innerHTML = "";

  let randomObject = words[Math.floor(Math.random() * words.length)];

  // Get Word From Object
  word = randomObject.word;
  // Set Description From Object
  theDescription.textContent = randomObject.disc;
  // Set MaxTries
  tries.textContent = maxTries;

  // Looping
  for (let i = 0; i < word.length; i++) {
    InputContainer.innerHTML += "<input type='text' disabled>";
  }
}

theBtn.addEventListener("click", getData);

getData();
