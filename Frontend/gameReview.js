document.getElementById('reverseButton').addEventListener('click', reversemove);
document.getElementById('forwardButton').addEventListener('click', forwardmove);

const urlParams = new URLSearchParams(window.location.search);
let selectedGameIndex = urlParams.get('selectedGameIndex');
let selectedGame;
let moveIndex=0;
if (selectedGameIndex !== null) {
  console.log(selectedGameIndex);
  if(selectedGameIndex==""){
    selectedGameIndex=1;
  }
  fetch(`http://localhost:8079/findid/` + selectedGameIndex)
    .then(response => response.json())
    .then(data => {
      selectedGame = data;
      console.log(data);
      
      // Update header text with fetched data
      var newHeaderText = selectedGame.name;
      var headerElement = document.querySelector('.header');
      headerElement.textContent = newHeaderText;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}




const board = document.getElementById("board");

//visual representation of board
const chessboard = [[],[],[],[],[],[],[],[]];
//board data representation
const pieceLocation = [[],[],[],[],[],[],[],[]];

//enums for pieces, <6 is white, >5 is black
const pieces = {
	wR: 0,
	wN: 1,
  wB: 2,
  wK: 3,
  wQ: 4,
  wP: 5,
  bR: 6,
	bN: 7,
  bB: 8,
  bK: 9,
  bQ: 10,
  bP: 11,
  empty:'e'
}

function updateBoard() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      switch (pieceLocation[i][j]) {
        case pieces.wR:
          chessboard[i][j].innerHTML="♖";
        break;
        case pieces.wN:
          chessboard[i][j].innerHTML="♘";
        break;
        case pieces.wB:
          chessboard[i][j].innerHTML="♗";
        break;
        case pieces.wK:
          chessboard[i][j].innerHTML="♔";
        break;
        case pieces.wQ:
          chessboard[i][j].innerHTML="♕";
        break;
        case pieces.wP:
          chessboard[i][j].innerHTML="♙";
        break;
        case pieces.bR:
          chessboard[i][j].innerHTML="♜";
        break;
        case pieces.bN:
          chessboard[i][j].innerHTML="♞";
        break;
        case pieces.bB:
          chessboard[i][j].innerHTML="♝";
        break;
        case pieces.bK:
          chessboard[i][j].innerHTML="♚";
        break;
        case pieces.bQ:
          chessboard[i][j].innerHTML="♛";
        break;
        case pieces.bP:
          chessboard[i][j].innerHTML="♟";
        break;

        default:
          chessboard[i][j].innerHTML=" ";
      }
    }
  }
};

//enum for the colors/players
const colors={
  black:'black',
  white:'white'
}

//this is the starting state for the board
const boardStart = [[pieces.bR,pieces.bN,pieces.bB,pieces.bQ,pieces.bK,pieces.bB,pieces.bK,pieces.bR],[pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP],
[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],
[pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP],[pieces.wR,pieces.wN,pieces.wB,pieces.wQ,pieces.wK,pieces.wB,pieces.wN,pieces.wR]];

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    pieceLocation[i][j]=boardStart[i][j];
  }
}

//p1 refers to the square the piece to move is on, p2 refers to the square its moving to
//this was probably a mistake to do it this way
let p1=[-1,-1];
let p2=[-1,-1];


//generating board
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const square = document.createElement("body");
    square.className = (i + j) % 2 === 0 ? "square white" : "square black";
    square.setAttribute("data-row", i);
    square.setAttribute("data-col", j);
    chessboard[i].push(square);
    board.appendChild(square);
  }
}

//performs the next move
function forwardmove(i,j){
  let moveset=String(selectedGame.moves[moveIndex]);
  p1[0]=parseInt(moveset.charAt(0));
  p1[1]=parseInt(moveset.charAt(1));
  p2[0]=parseInt(moveset.charAt(2));
  p2[1]=parseInt(moveset.charAt(3));
  movePiece();
  moveIndex++;
}
//reverse the previous move
function reversemove(i,j){
  moveIndex--;
  console.log(moveIndex)
  let moveset=String(selectedGame.moves[moveIndex]);
  p1[0]=parseInt(moveset.charAt(2));
  p1[1]=parseInt(moveset.charAt(3));
  p2[0]=parseInt(moveset.charAt(0));
  p2[1]=parseInt(moveset.charAt(1));
  movePiece();
}

//moves piece 
function movePiece(){
  pieceLocation[p2[0]][p2[1]]=pieceLocation[p1[0]][p1[1]];
  pieceLocation[p1[0]][p1[1]]=pieces.empty;
  updateBoard();
}

updateBoard();