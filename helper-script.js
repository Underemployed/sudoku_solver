// Utility function to create an element with attributes
function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

// Generate the Sudoku board with input cells
function generateBoard() {
  const board = document.getElementById("board");
  const cells = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const input = createElement("input", {
        type: "text",
        class: "cell",
        maxLength: "1",
        inputMode: "tel",
      });
      board.appendChild(input);
      cells.push(input);
    }
  }

  return cells;
}
function getHint(currentState, solutionState) {
  let emptyCells = [];

  // Find all empty cells and add their indices to the list
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (currentState[i][j] === 0) {
        emptyCells.push([i, j]);
      }
    }
  }

  // Check if there are any empty cells
  if (emptyCells.length === 0) {
    return null; // No empty cells, return null
  }

  // Select a random empty cell
  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  let [row, col] = emptyCells[randomIndex];

  // Fill the random empty cell with the solution value
  return [row, col, solutionState[row][col]];
}

// Solve the Sudoku puzzle
function solveSudoku() {
  const cells = generateBoard();
  const solveBtn = document.getElementById("solveBtn");
  const resetBtn = document.getElementById("resetBtn");

  solveBtn.addEventListener("click", () => {
    const puzzle = createPuzzle(cells);
    if (isSolvable(puzzle)) {
      const solution = solveSudokuHelper(puzzle);
      const hint = getHint(createPuzzle(cells), solution);
      if (hint !== null) {
        const [row, col, value] = hint;
        // Fill the selected cell with the solution value and add the fill animation
        const cell = cells[row * 9 + col];
        cell.value = value;
        cell.classList.add("fill-animation");
      }
    } else {
      alert(
        "The provided Sudoku problem is unsolvable. Please check your input."
      );
    }
  });

  resetBtn.addEventListener("click", () => {
    location.reload();
  });
}

function createPuzzle(cells) {
  const puzzle = [];
  let index = 0;

  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const value = parseInt(cells[index].value) || 0;
      row.push(value);
      index++;
    }
    puzzle.push(row);
  }

  return puzzle;
}

function solveSudokuHelper(board) {
  if (!findEmptyCell(board)) {
    return board;
  }

  const [row, col] = findEmptyCell(board);

  for (let num = 1; num <= 9; num++) {
    if (isValidMove(board, row, col, num)) {
      board[row][col] = num;

      if (solveSudokuHelper(board)) {
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
  for (let j = 0; j < 9; j++) {
    if (board[row][j] === num) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

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

function isSolvable(board) {
  // Perform the solvability check logic here
  // Return true if the problem is solvable, otherwise return false

  // Example implementation: Check if any of the rows, columns, or boxes have duplicate values
  for (let i = 0; i < 9; i++) {
    if (
      !isUnique(board[i]) ||
      !isUnique(getColumn(board, i)) ||
      !isUnique(getBox(board, i))
    ) {
      return false;
    }
  }

  return true;
}

function isUnique(arr) {
  const seen = new Set();
  for (const value of arr) {
    if (value !== 0 && seen.has(value)) {
      return false;
    }
    seen.add(value);
  }
  return true;
}

function getColumn(board, colIndex) {
  const column = [];
  for (let i = 0; i < 9; i++) {
    column.push(board[i][colIndex]);
  }
  return column;
}

function getBox(board, boxIndex) {
  const box = [];
  const startRow = Math.floor(boxIndex / 3) * 3;
  const startCol = (boxIndex % 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      box.push(board[i][j]);
    }
  }
  return box;
}
solveSudoku();
