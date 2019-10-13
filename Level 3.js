/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var player1TotalScore,
  player1CurrentScore,
  player2TotalScore,
  player2CurrentScore,
  playerName,
  result;

//player1

player1CurrentScore = document.querySelector("#current-0");
player1CurrentScore.textContent = 0;

player1TotalScore = document.querySelector("#score-0");
player1TotalScore.textContent = 0;

//player 2

player2CurrentScore = document.querySelector("#current-1");
player2CurrentScore.textContent = 0;

player2TotalScore = document.querySelector("#score-1");
player2TotalScore.textContent = 0;

//General selector

var diceFace = [
  "dice-1.png",
  "dice-2.png",
  "dice-3.png",
  "dice-4.png",
  "dice-5.png",
  "dice-6.png"
];

//closing button and pannel selectors

var ruleCloseBtn = document.querySelector(".close_btn");
var ruleBookPanel = document.querySelector(".ruleBook");
var ruleOpenBtn = document.querySelector(".rule");

//Dice selectors
var allElement = document.querySelector(".wrapper").children;

var diceImage = allElement[allElement.length - 1];
// console.log(diceImage);
const allElementArr = [...allElement];
// console.log(allElementArr);

playerName = document.querySelector(".player");
result = document.querySelector(".result");

var playing = false;

var reset = document.querySelector(".btn-new");
reset.addEventListener("click", resetGame);

function resetGame() {
  location.reload();
  playing = false;
  player1CurrentScore.textContent = 0;
  player1TotalScore.textContent = 0;
}
if (playing === true) {
}
//rolling dice action
var dice = document.querySelector(".btn-roll");
dice.addEventListener("click", RollDice);

var dice_img = document.querySelector(".dice").getAttributeNames()[0];

let dice_face = document.querySelector(".dice");
const score1 = [];
const score2 = [];
var bg1 = document.querySelector(".player-0-panel");
var bg2 = document.querySelector(".player-1-panel");
function RollDice() {
  playing = true;

  if (bg1.classList.contains("active")) {
    player1playing();
  } else if (bg2.classList.contains("active")) {
    player2playing();
  } else {
    return;
  }

  // var bg1 = document.querySelector(".player-0-panel");
  // var bg2 = document.querySelector(".player-1-panel");
  //   player1playing();
  // var p1 = Number(player1CurrentScore.textContent);
  function player1playing() {
    var p1 = Number(player1CurrentScore.textContent);

    dice_img = diceFace[Math.floor(Math.random() * 6)];
    const val = Number([...dice_img][5]);
    console.log(val);
    dice_face.src = dice_img;

    if (val !== 1) {
      score1.push(val);
      p1 = p1 + val;
      player1CurrentScore.textContent = p1;
    }
    if (val === 1) {
      player1CurrentScore.textContent = 0;
      bg1.classList.remove("active");
      bg2.classList.add("active");
      // setTimeout(() => {
      //   RollDice();
      // }, 2000);

      // player2playing();
      //   dice_face.style.display = "none";
      //   dice_img = diceFace[7];
      //   allElementArr.pop();
    }
    console.log(val);
    console.log(dice_face);
    console.log(score1);
  }

  //player 2 playing

  function player2playing() {
    var p2 = Number(player2CurrentScore.textContent);

    dice_img = diceFace[Math.floor(Math.random() * 6)];
    const val = Number([...dice_img][5]);
    dice_face.src = dice_img;
    console.log(val);
    if (val !== 1) {
      score2.push(val);
      p2 = p2 + val;
      player2CurrentScore.textContent = p2;
    }
    if (val === 1) {
      player2CurrentScore.textContent = 0;
      player1CurrentScore.textContent = 0;
      bg2.classList.remove("active");
      bg1.classList.add("active");
      // setTimeout(() => {
      //   RollDice();
      // }, 2000);
      // player1playing();
    }

    console.log(val);
    console.log(score2);
  }
}

//saving the score

var holdBtn = document.querySelector(".btn-hold");
const val = Number([...dice_img][5]);
holdBtn.addEventListener("click", saveScore);

function saveScore() {
  // playing = true;
  //player 1

  var T1 = Number(player1TotalScore.textContent);
  var p1 = Number(player1CurrentScore.textContent);

  // //player2

  var T2 = Number(player2TotalScore.textContent);
  var p2 = Number(player2CurrentScore.textContent);

  if (bg1.classList.contains("active") && playing === true) {
    //player 1

    player1TotalScore.textContent = T1 + p1;
    player1CurrentScore.textContent = 0;

    bg1.classList.remove("active");
    bg2.classList.add("active");
  } else if (bg2.classList.contains("active") && playing === true) {
    //player 2
    player2TotalScore.textContent = T2 + p2;
    player2CurrentScore.textContent = 0;

    bg2.classList.remove("active");
    bg1.classList.add("active");
  } else {
    location.reload();
  }

  // ?annnouncing the winner

  if (player1TotalScore.textContent >= 100) {
    result.style.display = "block";
    playerName.textContent = "Player 1 You are winner";
    setTimeout(() => {
      resetGame();
    }, 2000);

    // alert("player 1 you are winner");
  } else if (player2TotalScore.textContent >= 100) {
    result.style.display = "block";
    playerName.textContent = "Player 2 You are winner";
    setTimeout(() => {
      resetGame();
    }, 2000);
    // alert("player 2 you are winner");
  }
}

//? opening the rule panel
ruleOpenBtn.addEventListener("click", () => {
  ruleBookPanel.style.display = "block";
});

//? closing the rule panel
ruleCloseBtn.addEventListener("click", () => {
  ruleBookPanel.style.display = "none";
});
