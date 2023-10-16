//setting up html elements and event listeners
const board = document.getElementById("board");;
document.getElementById('resetButton').addEventListener('click', resetBoard);
const checkMateText = document.getElementById("endGame");
const openDialogButton = document.getElementById('saveButton');
const stringInputDialog = document.getElementById('saveDialog');
const inputForm = document.getElementById('inputForm');
openDialogButton.addEventListener('click', () => {
  stringInputDialog.showModal();
});
inputForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const name = document.getElementById('input1').value;
  const url = '/api/new'; 
  const data = {
    name: name,
    moves: movelist
  };
console.log(JSON.stringify(data));
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  stringInputDialog.close();
});

//movelist of all moves so far
let movelist=[];
//whose turn it is
let currentTurn;
//is false if someone hasnt selected the square to move from
let firstMoveMade=false;
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
const boardStart = [[pieces.bR,pieces.bN,pieces.bB,pieces.bQ,pieces.bK,pieces.bB,pieces.bN,pieces.bR],[pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP,pieces.bP],
[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],[pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty,pieces.empty],
[pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP,pieces.wP],[pieces.wR,pieces.wN,pieces.wB,pieces.wQ,pieces.wK,pieces.wB,pieces.wN,pieces.wR]];

//p1 refers to the square the piece to move is on, p2 refers to the square its moving to
//this was probably a mistake to do it this way
let p1=[-1,-1];
let p2=[-1,-1];

//binding reset to the "r" key
document.onkeyup = function(e) {
  if (e.which == 82) {
    resetBoard();
  }
};

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

//reset the board
function resetBoard(){
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      pieceLocation[i][j]=boardStart[i][j];
    }
  }
  movelist=[];
  currentTurn=colors.white;
  firstMoveMade=false;
  checkMateText.open=false;
  chessboard.forEach(row => {
    row.forEach(square => {
      square.classList.remove('highlight');
    });
  })
  updateBoard();
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

    if(currentTurn!==getColor(pieceLocation[p1[0]][p1[1]])){
      return;
    }

    //this adds a highlight to the selected square
    const selectedSquareElement = document.querySelector(`[data-row="${i}"][data-col="${j}"]`);
    selectedSquareElement.classList.add('highlight');

    firstMoveMade=true;
  }else{
    chessboard.forEach(row => {
      row.forEach(square => {
        square.classList.remove('highlight');
      });
    });

    p2[0]=i;
    p2[1]=j;
    movePiece();
  }
}

//this checks if the move results in a valid board state(e.g, check, checkmate)
//if valid, the function moves the pieces
//because of the scope of p1 and p2, they must be restored(this was probably a mistake)
function movePiece(){

  if(isDifColor()&&isValidMove(pieceLocation[p1[0]][p1[1]])){
    let temp1=[p1[0],p1[1]];
    let temp2=[p2[0],p2[1]];
    let tempPiece1=pieceLocation[p1[0]][p1[1]];
    let tempPiece2=pieceLocation[p2[0]][p2[1]];

    pieceLocation[p2[0]][p2[1]]=pieceLocation[p1[0]][p1[1]];
    pieceLocation[p1[0]][p1[1]]=pieces.empty;

    if(isKingInCheck(currentTurn)){
      p1=temp1;
      p2=temp2;
      firstMoveMade=false;
      pieceLocation[p1[0]][p1[1]]=tempPiece1;
      pieceLocation[p2[0]][p2[1]]=tempPiece2;
      return;
    }
    movelist.push(String(p1[0])+String(p1[1])+String(p2[0])+String(p2[1]));
    if(currentTurn==colors.white){
      currentTurn=colors.black;
    }else{
      currentTurn=colors.white;
    }
  }
  firstMoveMade=false;
  if(isCheckMate(currentTurn)){
    checkMateText.open=true;
  }
  updateBoard();
}

//checks whether the pieces are two different colors
function isDifColor(){
  return getColor(pieceLocation[p1[0]][p1[1]])!=getColor(pieceLocation[p2[0]][p2[1]])
}

//this function checks whether the move is valid given the piece type
//most of the pieces have the same move rule,regardless of color, except pawns

function isValidMove(pieceType){
  let output=false;
  let i;
  switch(pieceType){
    case pieces.wR:
    case pieces.bR:
      //if horizontal movement
      if(p1[0]==p2[0]){
        //if moving to the right
        if(p1[1]>p2[1]){
          for(i=p2[1]+1;i<p1[1];i++){
            if(pieceLocation[p1[0]][i]!=pieces.empty){
              return false;
            }
          }
        }else{
          for(i=p2[1]-1;i>p1[1];i--){
            if(pieceLocation[p1[0]][i]!=pieces.empty){
              return false;
            }
          }
        }
      }else if(p1[1]==p2[1]){
        if(p1[0]>p2[0]){
          for(i=p2[0]+1;i<p1[0];i++){
            if(pieceLocation[i][p1[1]]!=pieces.empty){
              return false;
            }
          }
        }else{
          for(i=p2[0]-1;i>p1[0];i--){
            if(pieceLocation[i][p1[1]]!=pieces.empty){
              return false;
            }
          }
        }
      }else{
        return false;
      }
      return true;
      
    case pieces.wN:
    case pieces.bN:
      if(p1[0]==p2[0]-2||(p1[0]==p2[0]+2)){
        if(p1[1]==p2[1]-1||p1[1]==p2[1]+1){
          return true;
        }
      }

      if(p1[1]==p2[1]-2||(p1[1]==p2[1]+2)){
        if(p1[0]==p2[0]-1||p1[0]==p2[0]+1){
          return true;
        }
      }
    return false;

    case pieces.wB:
    case pieces.bB:
      let incrementX;
      let incrementY;
      //if the change in columns is equal to the change in rows,then the piece
      //is moving diagonally
      if(Math.abs(p2[0]-p1[0])==Math.abs(p2[1]-p1[1])){
        if(p2[0]>p1[0]){
          incrementX=-1;
        }else{
          incrementX=1;
        }
        if(p2[1]>p1[1]){
          incrementY=-1;
        }else{
          incrementY=1;
        }

        //verifying diagonal is empty
        while(p2[0]+incrementX!=p1[0]){
          if(pieceLocation[p2[0]+incrementX][p2[1]+incrementY]!=pieces.empty){
            return false;
          }
          if(incrementX>0){
            incrementX++;
          }else{
            incrementX--;
          }

          if(incrementY>0){
            incrementY++;
          }else{
            incrementY--;
          }
        }

        return true;
      }else{
        return false;
      }
    case pieces.wK:
    case pieces.bK:
      if(p2[0]>=p1[0]-1&&p2[0]<=p1[0]+1){
        if(p2[1]>=p1[1]-1&&p2[1]<=p1[1]+1){
          return true;
        }
      }
    return false;

    case pieces.wQ:
    case pieces.bQ:
      if(isValidMove(pieces.bB)||isValidMove(pieces.bR)){
        return true;
      }
    return false;

    //pawns have multiple cases
    //1.Standard pawn moves
    //  1.1 move forward 1
    //  1.2 capture forward
    //2.double move
    //3.ending on final rank
    case pieces.bP:
      output=false;
      if(p1[0]+1==p2[0]){
        if(p2[1]==p1[1]){
          if(pieceLocation[p2[0]][p2[1]]==pieces.empty){
            output=true;
          }
        }
        if(p2[1]==p1[1]-1||p2[1]==p1[1]+1){
          if(pieceLocation[p2[0]][p2[1]]<6&&pieceLocation[p2[0]][p2[1]]!=pieces.empty){
            output=true;
          }
        }
      }
    
      if(p1[0]==1){
        if(p1[0]+2==p2[0]){
          if(p2[1]==p1[1]){
            if(pieceLocation[p2[0]][p2[1]]==pieces.empty&&pieceLocation[p2[0]-1][p2[1]]==pieces.empty){
              output=true;
            }
          }
        }
      }
      if(output&&p2[0]==7){
        pieceLocation[p1[0]][p1[1]]=pieces.wQ;
      }
      return output;

    case pieces.wP:
      output=false;
      if(p1[0]-1==p2[0]){
        if(p2[1]==p1[1]){
          if(pieceLocation[p2[0]][p2[1]]==pieces.empty){
            output=true;
          }
        }
        if(p2[1]==p1[1]-1||p2[1]==p1[1]+1){
          if(pieceLocation[p2[0]][p2[1]]>5){
            output=true;
          }
        }
      }
    
      if(p1[0]==6){
        if(p1[0]-2==p2[0]){
          if(p2[1]==p1[1]){
            if(pieceLocation[p2[0]][p2[1]]==pieces.empty&&pieceLocation[p2[0]+1][p2[1]]==pieces.empty){
              output=true;
            }
          }
        }
      }
      if(output&&p2[0]==0){
        pieceLocation[p1[0]][p1[1]]=pieces.bQ;
      }
      return output;

    case pieces.empty:
      return false;

    default:
      return false;
  }
}

function getColor(piece) {
  return piece === pieces.empty ? pieces.empty : piece < 6 ? colors.white : colors.black;
}

//this function checks to see if king is in check
//works by locating the king of the given color, then looping through the entire board 
//until a piece has a valid move to capture the king
function isKingInCheck(color) {
  let temp1=[p1[0],p1[1]];
  let temp2=[p2[0],p2[1]];
  let kingPiece;
  let opposingColor;
  let kingPosition;
  if (color === colors.white) {
    kingPiece = pieces.wK;
    opposingColor = colors.black;
  } else {
    kingPiece = pieces.bK;
    opposingColor = colors.white;
  }

  kingPosition =[-1,-1];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (pieceLocation[i][j] === kingPiece) {
        kingPosition[0] = i;
        kingPosition[1] = j;
        break;
      }
    }
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (pieceLocation[i][j] !== pieces.empty && getColor(pieceLocation[i][j]) === opposingColor) {
        p1[0] = i;
        p1[1] = j;
        p2[0] = kingPosition[0];
        p2[1] = kingPosition[1];
        if (isValidMove(pieceLocation[i][j]) && isDifColor()) {
          p1=temp1;
          p2=temp2;
          return true; 
        }
      }
    }
  }
  p1=temp1;
  p2=temp2;
  return false; 
}


//this function checks for checkmate, it does this by checking if any square on the board has a valid move to any other square on the board,
//and whether or not that will end up in a game state where the "color" side isn't in check
function isCheckMate(color) {
  if(!isKingInCheck(color)){
    return;
  }
  let temp1=[p1[0],p1[1]];
  let temp2=[p2[0],p2[1]];
  let tempPiece1;
  let tempPiece2;
  let output=true;

  for (let k = 0; k < 8; k++) {
    for (let l = 0; l < 8; l++) {
      if(getColor(pieceLocation[k][l])==color){
        p1=[k,l];
      }
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          p2=[i,j];
          if(isDifColor()&&isValidMove(pieceLocation[p1[0]][p1[1]])){
            tempPiece2=pieceLocation[p2[0]][p2[1]];
            tempPiece1=pieceLocation[p1[0]][p1[1]];
            pieceLocation[p2[0]][p2[1]]=tempPiece1;
            pieceLocation[p1[0]][p1[1]]=pieces.empty;

            if(!isKingInCheck(color)){
              output=false;
            }
            pieceLocation[p2[0]][p2[1]]=tempPiece2;
            pieceLocation[p1[0]][p1[1]]=tempPiece1;
          }
        }
      }
    }
  }
  p1=temp1;
  p2=temp2;
  
  return output;
}
resetBoard();
updateBoard();