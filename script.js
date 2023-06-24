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
  const board = document.getElementById('board');
  const cells = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const input = createElement('input', {
        type: 'text',
        class: 'cell',
        maxLength: '1',
        inputMode: 'tel'
      });
      board.appendChild(input);
      cells.push(input);
    }
  }

  return cells;
}

// Solve the Sudoku puzzle
function solveSudoku() {
  const cells = generateBoard();
  const solveBtn = document.getElementById('solveBtn');
  const resetBtn = document.getElementById('resetBtn');

  solveBtn.addEventListener('click', () => {
    const puzzle = createPuzzle(cells);
    if (isSolvable(puzzle)) {
      const solution = solveSudokuHelper(puzzle);
      animateSolution(cells, solution);
    } else {
      alert("The provided Sudoku problem is unsolvable. Please check your input.");
    }
  });

  resetBtn.addEventListener('click', () => {
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

function animateSolution(cells, solution) {
  const delay = 100;

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const cell = cells[i * 9 + j];
      const value = solution[i][j];

      if (value !== 0) {
        setTimeout(() => {
          cell.classList.add('fill-animation');
          cell.value = value;
        }, i * 9 * delay + j * delay);
      }
    }
  }
}

function isSolvable(board) {
  // Perform the solvability check logic here
  // Return true if the problem is solvable, otherwise return false

  // Example implementation: Check if any of the rows, columns, or boxes have duplicate values
  for (let i = 0; i < 9; i++) {
    if (!isUnique(board[i]) || !isUnique(getColumn(board, i)) || !isUnique(getBox(board, i))) {
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

function toggleMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);

  const primaryColorDelay = 3000;
  setTimeout(() => {
    body.classList.add("hide-primary-color");
  }, primaryColorDelay);
}

function loadModePreference() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  const body = document.body;
  if (isDarkMode) {
    body.classList.add("dark-mode");
  }
}

const switchInput = createElement("input", {
  type: "checkbox",
  id: "switchInput",
  checked: localStorage.getItem("darkMode") === "true"
});

const slider = createElement("div", {
  class: "slider"
});
slider.addEventListener("click", toggleMode);

const switchElement = createElement("label", {
  class: "switch"
});
switchElement.appendChild(switchInput);
switchElement.appendChild(slider);

document.body.appendChild(switchElement);

loadModePreference();

solveSudoku();
