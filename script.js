const board = document.getElementById("board");
const chessboard = [];

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    const square = document.createElement("div");
    square.className = (i + j) % 2 === 0 ? "square white" : "square black";
    chessboard.push(square);
    board.appendChild(square);
  }
}

