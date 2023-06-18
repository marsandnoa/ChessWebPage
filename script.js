const board = document.getElementById("board");
const chessboard = [[],[],[],[],[],[],[],[]];
const pieceLocation = [[],[],[],[],[],[],[],[]];
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
  empty:-1
}

p1=[-1,-1];
p2=[-1,-1];
firstMoveMade=false;

const boardStart = [[pieces.wR,pieces.wN,pieces.wB,pieces.wK,pieces.wQ,pieces.wB,pieces.wN,pieces.wR],[pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP],
[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],
[pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP],[pieces.bR,pieces.bN,pieces.bB,pieces.bK,pieces.bQ,pieces.bB,pieces.bN,pieces.bR]];

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const square = document.createElement("body");
    square.className = (i + j) % 2 === 0 ? "square white" : "square black";

    square.addEventListener("click",
        function(){
          move(i,j),false;
        }
      );
    
      chessboard[i].push(square);
    board.appendChild(square);
  }
}

function resetBoard(){
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      pieceLocation[i][j]=boardStart[i][j];
    }
  }
}

function updateBoard() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      switch (pieceLocation[i][j]) {
        case pieces.wR:
          chessboard[i][j].innerHTML="wR";
        break;
        case pieces.wN:
          chessboard[i][j].innerHTML="wN";
        break;
        case pieces.wB:
          chessboard[i][j].innerHTML="wB";
        break;
        case pieces.wK:
          chessboard[i][j].innerHTML="wK";
        break;
        case pieces.wQ:
          chessboard[i][j].innerHTML="wQ";
        break;
        case pieces.wP:
          chessboard[i][j].innerHTML="wP";
        break;
        case pieces.bR:
          chessboard[i][j].innerHTML="bR";
        break;
        case pieces.bN:
          chessboard[i][j].innerHTML="bN";
        break;
        case pieces.bB:
          chessboard[i][j].innerHTML="bB";
        break;
        case pieces.bK:
          chessboard[i][j].innerHTML="bK";
        break;
        case pieces.bQ:
          chessboard[i][j].innerHTML="bQ";
        break;
        case pieces.bP:
          chessboard[i][j].innerHTML="bP";
        break;

        default:
          chessboard[i][j].innerHTML=" ";
      }
    }
  }
};

function move(i,j){
  console.log("entered func")
  if(firstMoveMade!=true){
    console.log("entered first if")
    p1[0]=i;
    p1[1]=j;
    firstMoveMade=true;
    console.log([p1]);
  }else{
    p2[0]=i;
    p2[1]=j;

    console.log("entered second if");
    console.log(pieceLocation[i][j]);

    if(validMove){
      pieceLocation[p2[0]][p2[1]]=pieceLocation[p1[0]][p1[1]];
      pieceLocation[p1[0]][p1[1]]=pieces.empty;
    }
    firstMoveMade=false;
    updateBoard();
  }
}

function validMove(){
  return true;
}
resetBoard();
updateBoard();