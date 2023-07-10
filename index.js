let playerOne = "🐬";
let playerTwo = "🦩";
let currentPlayer = playerOne;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

let parentDiv = document.querySelector('.con');
let childDivs = document.querySelectorAll('.box');
let message = document.createElement('div');
message.style.position = "absolute";
message.style.top= "41rem";
message.style.fontSize= "2rem";

//////////////////////////////////////////////////////////////Main Funtion////////////////////////////////////////////////////////////////////
parentDiv.addEventListener('click', function(evt) {
  // if (gameBoard.every(symbol => symbol !== '')) {
  //   console.log('The game is already over. Please restart to play again.');
  //   return;
  // }

if (gameOver) {
  return;
}

//checks if the class of box does not exist,
// keeps user from placeing symbols outside of container. 
  if (!evt.target.classList.contains('box')) {
    return;
  }

  let putSymbol = document.createElement('h1');
  putSymbol.style.textAlign = 'center'; 
  putSymbol.style.marginTop = '0'; 
  putSymbol.style.fontSize = '11rem';
  putSymbol.style.color = '#2CEAEE';


  if (currentPlayer === playerOne) {
    putSymbol.textContent = "🐬";
    message.textContent= "Player🦩's turn";
    parentDiv.appendChild(message);
    currentPlayer = playerTwo;
  } else {
    putSymbol.textContent = "🦩";
    message.textContent= "Player🐬's turn";
    parentDiv.appendChild(message);
    currentPlayer = playerOne;
  }
///////////////////////////////////////////////////////////Updates the Board///////////////////////////////////////////////////////////////////////
  evt.target.appendChild(putSymbol);
  let index = Array.from(childDivs).indexOf(evt.target);
  gameBoard[index] = putSymbol.textContent; 

  checkBoard();
});


/////////////////////////////////////////////////////////creates the Reset button /////////////////////////////////////////////////////////////////////////
const restartBtn = document.querySelector('.btn');
restartBtn.textContent = 'Restart';

restartBtn.addEventListener('click', function(evt) { 
  resetGame();
});

document.body.appendChild(restartBtn);

function resetGame() {
  childDivs.forEach((div) => {
    div.innerHTML = '';
  });

  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameOver = false; 
}


/////////////////////////////////////////////////////////////Winning Method//////////////////////////////////////////////////////////////
const checkBoard = () => {
  let winnerCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let winState of winnerCombos) {
    const [position1, position2, position3] = winState;
    if (
      gameBoard[position1] !== '' &&
      gameBoard[position1] === gameBoard[position2] &&
      gameBoard[position1] === gameBoard[position3]
    ) {
      alert(`${gameBoard[position1]}'s wins!`);
      gameOver = true; 
      return; 
    }
  }
////////////////////////////////////////////////////////////Draw Function/////////////////////////////////////////////////////////
  const boxesAllUsed = gameBoard.every(function(symbol) {
    return symbol !== '';
  });
  
  if (boxesAllUsed) {
   alert('It\'s a draw');
   gameOver = true;
  }

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
