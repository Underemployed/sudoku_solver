const solveBtn = document.getElementById('solveBtn');
const board = document.getElementById('board');
let cells = [];

// Generate the Sudoku board with input cells
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'cell';
    input.maxLength = '1';
    board.appendChild(input);
    cells.push(input);
  }
}

// Event listener for the solve button
solveBtn.addEventListener('click', () => {
  const puzzle = [];
  let index = 0;

  // Create a 2D array representing the Sudoku puzzle
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const value = parseInt(cells[index].value) || 0;
      row.push(value);
      index++;
    }
    puzzle.push(row);
  }

  // Solve the puzzle
  const solution = solveSudoku(puzzle);

  // Update the board with the solved puzzle
  solution.forEach((row, i) => {
    row.forEach((value, j) => {
      cells[i * 9 + j].value = value;
    });
  });
});

function solveSudoku(board) {
  if (!findEmptyCell(board)) {
    return board;
  }

  const [row, col] = findEmptyCell(board);

  for (let num = 1; num <= 9; num++) {
    if (isValidMove(board, row, col, num)) {
      board[row][col] = num;

      if (solveSudoku(board)) {
        return board;
      }

      board[row][col] = 0;
    }
  }

  return null;
}

function findEmptyCell(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
}

function isValidMove(board, row, col, num) {
  // Check row
  for (let j = 0; j < 9; j++) {
    if (board[row][j] === num) {
      return false;
    }
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }

  return true;
}
