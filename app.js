let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let gameOver = false;
// Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
// Player 'X' plays first
let xTurn = true;
let count = 0;

// Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  // Enable popup
  popupRef.classList.remove("hide");
  gameOver = true;
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  // Disable popup
  popupRef.classList.add("hide");
  gameOver = false;
};

// This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

// Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

// Win Logic
const winChecker = () => {
  // Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    // Check if elements are filled
    // If 3 empty elements are same and would give win as would
    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        // If all 3 buttons have same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

// Function to handle AI's move
const makeAIMove = () => {
  // Generate a random index to make a move
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * 9);
  } while (btnRef[randomIndex].innerText !== ""); // Ensure the selected button is empty

  // Make the move for the AI
  btnRef[randomIndex].innerText = "O";
  btnRef[randomIndex].disabled = true;
};

// Modify button click event listener to alternate between player and AI turns
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (!gameOver && xTurn) {
      // Player's turn
      element.innerText = "X";
      element.disabled = true;
      xTurn = false;
      count++;
      // Check for win or draw
      winChecker();
      if (count === 9 && !gameOver) {
        drawFunction();
      }
      if (!gameOver) {
        // AI's turn
        makeAIMove();
        xTurn = true;
        count++;
        // Check for win or draw
        winChecker();
        if (count === 9 && !gameOver) {
          drawFunction();
        }
      }
    }
  });
});

// Enable buttons and disable popup on page load
window.onload = () => {
  enableButtons();
};
