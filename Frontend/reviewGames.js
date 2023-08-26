
const urlParams = new URLSearchParams(window.location.search);
let selectedGameIndex = urlParams.get('selectedGameIndex');
if(selectedGameIndex==""){
  selectedGameIndex="1";
}
let selectedGame;

if (selectedGameIndex !== null) {
  console.log(selectedGameIndex);
  fetch(`http://localhost:8080/findid/`+selectedGameIndex)
    .then(response => response.json())
    .then(data => {
      selectedGame = data;
      console.log(data);
      document.addEventListener("DOMContentLoaded", function() {
        var newHeaderText = selectedGame.name; // Replace with your desired value
        var headerElement = document.querySelector('.header');
        headerElement.textContent = newHeaderText;
      });
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

//enum for the colors/players
const colors={
  black:'black',
  white:'white'
}

//this is the starting state for the board
const boardStart = [[pieces.bR,pieces.bN,pieces.bB,pieces.bK,pieces.bQ,pieces.bB,pieces.bK,pieces.bR],[pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP],
[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],
[pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP],[pieces.wR,pieces.wN,pieces.wB,pieces.wK,pieces.wQ,pieces.wB,pieces.wN,pieces.wR]];

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
    square.addEventListener("click",
        function(){
          move(i,j),false;
        }
      );
    
      chessboard[i].push(square);
    board.appendChild(square);
  }
}

//function to convert board data representation to visual representation
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

//primary function, is bound to onclick of each square element, first click just records the square clicked, the second click 
//calls movePiece, which handles checking whether the move is valid or not,
function move(i,j){
  if(!firstMoveMade){
    p1[0]=i;
    p1[1]=j;
    firstMoveMade=true;
  }else{
    p2[0]=i;
    p2[1]=j;
    movePiece();
  }
}

//this checks if the move results in a valid board state(e.g, check, checkmate)
//if valid, the function moves the pieces
//because of the scope of p1 and p2, they must be restored(this was probably a mistake)
function movePiece(){
  pieceLocation[p2[0]][p2[1]]=pieceLocation[p1[0]][p1[1]];
  pieceLocation[p1[0]][p1[1]]=pieces.empty;
  updateBoard();
}

updateBoard();