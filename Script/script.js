// const element = document.querySelector('[class="1 2"]');
const game = (() => {
  const player1 = {
    name: "Player 1",
    sign: "x",
    color: "rgb(143,194,63,.8)",
  };
  const player2 = {
    name: "Player 2",
    sign: "o",
    color: "rgb(255,143,113,.8)",
  };
  let playerTurnFlag = player1;

  let gameBoard;
  let winPositionCounter = 0;

  let winner;
  let totalCellFilled = 0;

  //   make dom reset
  const restGameBoardInDom = () => {
    document.querySelector(".content").innerHTML = "";
    const gameBoardNode = document.createElement("div");
    gameBoardNode.classList.add("gameBoardDiv");

    gameBoardNode.innerHTML = `
    <div class="0 0"></div>
    <div class="0 1"></div>
    <div class="0 2"></div>
    <div class="1 0"></div>
    <div class="1 1"></div>
    <div class="1 2"></div>
    <div class="2 0"></div>
    <div class="2 1"></div>
    <div class="2 2"></div>`;
    document.querySelector(".content").appendChild(gameBoardNode);
  };
  const fillGameBoardGridCellAndObj = (p, i, j) => {
    // check if obj is empty at i and j
    if (!gameBoard.gameBoardGrid[i][j]) {
      // fill obj
      gameBoard.gameBoardGrid[i][j] = playerTurnFlag;

      // fill grid
      const imgSrc =
        playerTurnFlag.sign === "x" ? "letter-x.png" : "letter-o.png";
      document.querySelector(`[class="${i} ${j}"]`).innerHTML = `
      <img src="./Images/${imgSrc}" alt="" srcset="">
      `;
    }

    // check for winner
    winnerChecker(i, j);
    // switch player
    playerTurnFlag = playerTurnFlag === player1 ? player2 : player1;
  };
  const declareResult = () => {
    const winnerDeclareNode = document.createElement("div");
    winnerDeclareNode.classList.add("winner");

    if (winner) {
      winnerDeclareNode.innerText = `${winner.name} is winner`;
      winnerDeclareNode.style.backgroundColor = `${winner.color}`;
    } else {
      winnerDeclareNode.innerText = `Match is draw`;
      winnerDeclareNode.style.backgroundColor = `rgb(191,30,45)`;
    }
    document.querySelector(".content").appendChild(winnerDeclareNode);
    playerTurnFlag = player1;

    winPositionCounter = 0;
    winner = null;
    totalCellFilled = 0;
    playerTurnFlag = player1;
  };
  const checkVertically = (row) => {
    for (let j = 0; j < 3; j += 1) {
      if (gameBoard.gameBoardGrid[row][j] === playerTurnFlag) {
        // if all near by horizontal obj same
        winPositionCounter += 1;
        if (winPositionCounter === 3) {
          // someone Won!!!
          winner = playerTurnFlag;
          declareResult();
        }
      } else {
        // otherwise Reset
        winPositionCounter = 0;
      }
    }
    // resetPosition streak
    winPositionCounter = 0;
  };
  const checkHorizontally = (col) => {
    for (let j = 0; j < 3; j += 1) {
      if (gameBoard.gameBoardGrid[j][col] === playerTurnFlag) {
        // if all near by horizontal obj same
        winPositionCounter += 1;
        if (winPositionCounter === 3) {
          // someone Won!!!
          winner = playerTurnFlag;
          declareResult();
        }
      } else {
        // otherwise Reset
        winPositionCounter = 0;
      }
    }
    // reset winCounter
    winPositionCounter = 0;
  };
  const checkDiagonally = (row, col) => {
    if (row === col) {
      for (let i = 0; i < 3; i += 1) {
        if (gameBoard.gameBoardGrid[i][i] === playerTurnFlag) {
          // if all i===j are marked with same
          winPositionCounter += 1;
          if (winPositionCounter === 3) {
            // someone Won!!!
            winner = playerTurnFlag;
            declareResult();
          }
        } else {
          // otherwise Reset
          winPositionCounter = 0;
        }
      }
    }
    winPositionCounter = 0;

    if ((row === 1 && col === 1) || Math.abs(row - col) === 2) {
      let rowCounter = 0;
      for (let j = 2; j >= 0; j -= 1) {
        if (gameBoard.gameBoardGrid[rowCounter][j] === playerTurnFlag) {
          // if all i===j are marked with same
          winPositionCounter += 1;
          if (winPositionCounter === 3) {
            // someone Won!!!
            winner = playerTurnFlag;
            declareResult();
          }
        } else {
          // otherwise Reset
          winPositionCounter = 0;
        }
        rowCounter += 1;
      }
    }
    // reset winCounter
    winPositionCounter = 0;
  };
  const winnerChecker = (row, col) => {
    checkVertically(row);
    checkHorizontally(col);
    checkDiagonally(row, col);
    totalCellFilled += 1;
    console.log(totalCellFilled, winner);
    // check for draw
    if (totalCellFilled === 9 && !winner) {
      declareResult();
    }
  };
  const addEventListenerToGameBoardCell = () => {
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        document
          .querySelector(`[class="${i} ${j}"]`)
          .addEventListener(
            "click",
            fillGameBoardGridCellAndObj.bind(null, playerTurnFlag, i, j)
          );
      }
    }
  };

  const resetGameBoardObj = () => {
    gameBoard = {
      gameBoardGrid: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
    };
  };

  const startGame = () => {
    // make start button disabled
    const startButton = document.querySelector(".startGame");
    startButton.disabled = true; // to disable the button
    // and reset button enable
    const resetButton = document.querySelector(".resetGame");
    resetButton.disabled = false;
    resetGameBoardObj();
    restGameBoardInDom();
    addEventListenerToGameBoardCell();
  };
  const resetGame = () => {
    const startButton = document.querySelector(".startGame");
    startButton.disabled = false; // to disable the button
    // and reset button enable
    const resetButton = document.querySelector(".resetGame");
    resetButton.disabled = true;
    resetGameBoardObj();
    restGameBoardInDom();
    addEventListenerToGameBoardCell();
  };

  return {
    startGame,
    resetGame,
  };
})();
document.querySelector(".startGame").addEventListener("click", game.startGame);
document.querySelector(".resetGame").addEventListener("click", game.resetGame);
