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
  if(!firstMoveMade){
    p1[0]=i;
    p1[1]=j;
    firstMoveMade=true;
  }else{
    p2[0]=i;
    p2[1]=j;
    if(validMove()&&validMovePiece(pieceLocation[p1[0]][p1[1]])){
      pieceLocation[p2[0]][p2[1]]=pieceLocation[p1[0]][p1[1]];
      pieceLocation[p1[0]][p1[1]]=pieces.empty;
    }
    firstMoveMade=false;
    updateBoard();
  }
}

function validMove(){
  //if its a white piece

  if(pieceLocation[p1[0]][p1[1]]<6){
    //if its a white piece, the second position must be either be empty or black
    if(pieceLocation[p2[0]][p2[1]]<6&&pieceLocation[p2[0]][p2[1]]!=pieces.empty){
      return false;
    }
  }
  //if its a black piece
  if(pieceLocation[p1[0]][p1[1]]>5){
    //if its a black piece, and the second position is not empty or white.
    if(pieceLocation[p2[0]][p2[1]]>5){
    return false;
    }
  }
  return true;
}
  function validMovePiece(pieceType){
    switch(pieceType){
      case pieces.wR||pieces.bR:
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
        
      case pieces.wN||pieces.bN:
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
  
      case pieces.wB||pieces.bB:
        //if the change in columns is equal to the change in rows, return true
        if(Math.abs(p2[0]-p1[0])==Math.abs(p2[1]-p1[1])){
          return true;
        }else{
          return false;
        }
        return true;
      case pieces.wK||pieces.bK:
        if(p2[0]>=p1[0]-1&&p2[0]<=p1[0]+1){
          if(p2[1]>=p1[1]-1&&p2[1]<=p1[1]+1){
            return true;
          }
        }
      return false;
  
      case pieces.wQ||pieces.bQ:
        if(validMovePiece(pieces.bB)||validMovePiece(pieces.bR)){
          return true;
        }
      return false;
  
      case pieces.wP:
        return true;
      break;
  
      case pieces.bP:
        return true;
      break;
  
      case pieces.empty:
        return false;
      break;
  
      default:
        return false;
    }
}

function checkCheck(){
  return false;
}
resetBoard();
updateBoard();