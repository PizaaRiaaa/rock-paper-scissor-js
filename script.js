let pScore = 0;
let cScore = 0;
let currentRound = 1;
let logRound = 1;

const player_score = document.querySelector(".player-score");
const computer_score = document.querySelector(".computer-score");

const attemp_container = document.querySelector(".attempt");
const round = document.querySelector(".round-text");
const container = document.querySelector(".container");

const selected_input = document.querySelector(".select");
const rock_paper_scissor = document.querySelector(".rock-paper-scissor");

const prompt_status = document.querySelector(".prompt-status");
const prompt_description = document.querySelector(".prompt-description");

const round_log = document.querySelector(".round-log");
const logs = document.querySelector(".logs");

const btnRetry = document.createElement("button");
const wonStatus = document.createElement("h2");

const GREEN = "#50fa7b";
const RED = "#ff5555";
const BLACK = "#282a36";

round.innerText = currentRound;
player_score.innerText = 0;
computer_score.innerText = 0;

const getComputerChoice = () => {
  const choices = ["rock", "paper", "scissor"];
  let random = Math.floor(Math.random() * choices.length);
  return choices[random];
};

const displayPrompt = (message, description, color) => {
  prompt_status.innerText = message;
  prompt_description.innerText = description;
  prompt_status.style.color = color;
};

const playRound = (pSelection, cSelection) => {
  let player = pSelection.toLowerCase();
  let computer = cSelection;

  prompt_status.style.display = "block";
  prompt_description.style.display = "block";

  const priority = {
    paper: 0,
    scissor: 1,
    rock: 2,
  };

  if (priority[player] < priority[computer]) {
    description = `${computer} beats ${player}`;
    displayPrompt("You lose!", description, RED);
    cScore++;
    computer_score.innerText = cScore.toString();
  } else if (priority[player] > priority[computer]) {
    description = `${player} beats ${computer}`;
    displayPrompt("You Win!", description, GREEN);
    pScore++;
    player_score.innerText = pScore.toString();
  } else {
    description = `${player} vs ${computer}`;
    displayPrompt(`It's a Tie!`, description, GREEN);
    cScore++;
    pScore++;
    computer_score.innerText = cScore.toString();
    player_score.innerText = pScore.toString();
  }
};

const displayLogs = (message, color, parentElement) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = ` 
                    <p>Round : <span class="round-number">${logRound++}</span></p>
                    <p><span class="round-status" style="color: ${color};">< ${message} ></span> </p>
                `;
  parentElement.appendChild(listItem);
};

const checkWhoWin = (pScore, cScore) => {
  let message = "";
  btnRetry.innerText = "Retry";
  btnRetry.style.backgroundColor = GREEN;
  btnRetry.style.color = BLACK;

  round_log.style.display = "block";
  btnRetry.style.display = "block";

  if (pScore > cScore) {
    message = "You won!";
    displayLogs(message, GREEN, logs);
    wonStatus.innerText = message;
    wonStatus.style.color = GREEN;
    attemp_container.appendChild(wonStatus);
    attemp_container.appendChild(btnRetry);
  } else {
    message = "Computer won!";
    displayLogs(message, RED, logs);
    wonStatus.innerText = message;
    wonStatus.style.color = RED;
    attemp_container.appendChild(wonStatus);
    attemp_container.appendChild(btnRetry);
  }
};

rock_paper_scissor.addEventListener("click", (e) => {
  const selectedValue = e.target.dataset.value;
  round.innerText = currentRound++;
  selectedValue
    ? playRound(selectedValue, getComputerChoice())
    : alert("something went wrong!");

  if (pScore > 5 || cScore > 5) {
    container.style.display = "none";
    checkWhoWin(pScore, cScore);
  }
});

btnRetry.addEventListener("click", () => {
  pScore = 0;
  cScore = 0;
  currentRound = 1;
  round.innerText = currentRound;

  prompt_status.style.display = "none";
  prompt_description.style.display = "none";
  btnRetry.style.display = "none";

  player_score.innerText = pScore;
  computer_score.innerText = cScore;
  wonStatus.innerText = "";

  container.style.display = "block";
});
