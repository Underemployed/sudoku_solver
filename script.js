const solveBtn = document.getElementById('solveBtn');
const resetBtn = document.getElementById('resetBtn');
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
solveBtn.addEventListener('click', solveSudoku);

// Event listener for the reset button
resetBtn.addEventListener('click', () => {
  location.reload();
});

function solveSudoku() {
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
  const solution = solveSudokuHelper(puzzle);

  // Update the board with the solved puzzle
  animateSolution(solution);
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

function animateSolution(solution) {
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

function toggleMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);

  const primaryColorDelay = 3000; // 3 seconds delay
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

const switchInput = document.createElement("input");
switchInput.type = "checkbox";
switchInput.id = "switchInput";
switchInput.checked = localStorage.getItem("darkMode") === "true";

const slider = document.createElement("div");
slider.className = "slider";
slider.addEventListener("click", toggleMode);

const switchElement = document.createElement("label");
switchElement.className = "switch";
switchElement.appendChild(switchInput);
switchElement.appendChild(slider);

document.body.appendChild(switchElement);

loadModePreference();
