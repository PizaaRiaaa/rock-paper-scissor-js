const getComputerChoice = () => {
  const choices = ["rock", "paper", "scissor"];
  let random = Math.floor(Math.random() * choices.length);
  return choices[random];
};

const playRound = (pSelection, cSelection) => {
  let player = pSelection.toLowerCase();
  let computer = cSelection;

  const priority = {
    paper: 0,
    scissor: 1,
    rock: 2,
  };

  if (priority[player] < priority[computer]) {
    return `You lose! ${computer} beats ${player}`;
  } else if (priority[player] > priority[computer]) {
    return `You Win! ${player} beats ${computer}`;
  } else {
    return `It's a tie! ${player} vs ${computer}`;
  }
};

console.log(playRound("rock", getComputerChoice()));
