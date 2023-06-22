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
  empty:'e'
}
const colors={
  black:'black',
  white:'white'
}
currentTurn=colors.white;

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

function move(i,j){
  if(!firstMoveMade){
    p1[0]=i;
    p1[1]=j;

    if(currentTurn!==getColor(pieceLocation[p1[0]][p1[1]])){
      return;
    }

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
    if(validMove()&&validMovePiece(pieceLocation[p1[0]][p1[1]])){
      pieceLocation[p2[0]][p2[1]]=pieceLocation[p1[0]][p1[1]];
      pieceLocation[p1[0]][p1[1]]=pieces.empty;
      if(currentTurn==colors.white){
        currentTurn=colors.black;
      }else{
        currentTurn=colors.white;
      }
    }
    firstMoveMade=false;
    updateBoard();
  }
}

function validMove(){
  return getColor(pieceLocation[p1[0]][p1[1]])!=getColor(pieceLocation[p2[0]][p2[1]])
}
  function validMovePiece(pieceType){
    switch(pieceType){
      case pieces.wR:
      case pieces.bR:
        //if horizontal movement
        if(p1[0]==p2[0]){
          //if moving to the right
          if(p1[1]>p2[1]){
            for(i=p2[1]+1;i<p1[1];i++){
              if(pieceLocation[p1[0]][i]!=pieces.empty){
                console.log(pieceLocation[p1[0]][i]);
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
        //if the change in columns is equal to the change in rows, return true
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
        if(validMovePiece(pieces.bB)||validMovePiece(pieces.bR)){
          return true;
        }
      return false;
  
      case pieces.wP:
        output=false;
        if(p1[0]+1==p2[0]){
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
  
      case pieces.bP:
        output=false;
        if(p1[0]-1==p2[0]){
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

function isKingInCheck(color) {
  if (color === colors.white) {
    kingPiece = pieces.wK;
    opposingColor = colors.black;
  } else {
    kingPiece = pieces.bK;
    opposingColor = colors.white;
  }

  // Find the position of the king
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

  // Check if any opposing piece can attack the king
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (pieceLocation[i][j] !== pieces.empty && getColor(pieceLocation[i][j]) === opposingColor) {
        // Check if the opposing piece can move to the king's position
        p1[0] = i;
        p1[1] = j;
        p2[0] = kingPosition[0];
        p2[1] = kingPosition[1];
        if (validMovePiece(pieceLocation[i][j]) && validMove()) {
          return true; // King is in check
        }
      }
    }
  }

  return false; // King is not in check
}
resetBoard();
updateBoard();