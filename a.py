import tkinter as tk
from tkinter import filedialog
from PIL import ImageTk, Image
import numpy as np

class SudokuSolverApp(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("Sudoku Solver")
        self.geometry("400x400")

        self.selected_image = None
        self.sudoku_grid = np.zeros((9, 9), dtype=int)
        self.solved_grid = None

        

        self.sudoku_frame = tk.Frame(self)
        self.sudoku_frame.pack(side=tk.RIGHT, padx=10, pady=10)

        self.label = tk.Label(self.sudoku_frame, text="Manually fill in the Sudoku grid:")
        self.label.pack(pady=10)

        self.sudoku_entry = [[None for _ in range(9)] for _ in range(9)]
        self.create_sudoku_entry()

        self.solve_button = tk.Button(self.sudoku_frame, text="Solve Sudoku", command=self.solve_sudoku)
        self.solve_button.pack(pady=10)

        self.browse_button = tk.Button(self.sudoku_frame, text="Browse Image", command=self.browse_image)
        self.browse_button.pack(pady=10)

    def create_sudoku_entry(self):
        for i in range(9):
            entry_row = tk.Frame(self.sudoku_frame)
            entry_row.pack()
            for j in range(9):
                entry = tk.Entry(entry_row, width=3, font=("Arial", 16))
                entry.pack(side=tk.LEFT, padx=2, pady=2)
                self.sudoku_entry[i][j] = entry



    def solve_sudoku(self):
        self.get_sudoku_values()
        self.solved_grid = solve_sudoku_puzzle(self.sudoku_grid.tolist())
        self.display_sudoku(self.solved_grid)

    def get_sudoku_values(self):
        for i in range(9):
            for j in range(9):
                entry = self.sudoku_entry[i][j]
                value = entry.get()
                if value.isdigit():
                    self.sudoku_grid[i][j] = int(value)
                else:
                    self.sudoku_grid[i][j] = 0

    def display_sudoku(self, grid):
        for i in range(9):
            for j in range(9):
                entry = self.sudoku_entry[i][j]
                entry.delete(0, tk.END)
                entry.insert(0, str(grid[i][j]))






    def create_sudoku_entry(self):
        for i in range(9):
            entry_row = tk.Frame(self.sudoku_frame)
            entry_row.pack()
            for j in range(9):
                entry = tk.Entry(entry_row, width=3, font=("Arial", 16))
                entry.pack(side=tk.LEFT, padx=2, pady=2)
                self.sudoku_entry[i][j] = entry

    def browse_image(self):
        filetypes = (("Image files", ".png .jpg .jpeg .bmp"), ("All files", "*.*"))
        self.selected_image = filedialog.askopenfilename(title="Select an image", filetypes=filetypes)

        if self.selected_image:
            image = Image.open(self.selected_image)
            image.thumbnail((400, 400))
            self.photo = ImageTk.PhotoImage(image)
            self.canvas.create_image(0, 0, anchor=tk.NW, image=self.photo)

    def solve_sudoku(self):
        self.get_sudoku_values()
        self.solved_grid = solve_sudoku_puzzle(self.sudoku_grid.tolist())
        self.display_sudoku(self.solved_grid)

    def get_sudoku_values(self):
        for i in range(9):
            for j in range(9):
                entry = self.sudoku_entry[i][j]
                value = entry.get()
                if value.isdigit():
                    self.sudoku_grid[i][j] = int(value)
                else:
                    self.sudoku_grid[i][j] = 0

    def display_sudoku(self, grid):
        for i in range(9):
            for j in range(9):
                entry = self.sudoku_entry[i][j]
                entry.delete(0, tk.END)
                entry.insert(0, str(grid[i][j]))


def solve_sudoku_puzzle(grid):
    # Find the next empty cell
    row, col = find_empty_cell(grid)

    if row is None:
        return grid

    # Try placing numbers from 1 to 9 in the empty cell
    for num in range(1, 10):
        if is_valid_move(grid, row, col, num):
            grid[row][col] = num

            if solve_sudoku_puzzle(grid):
                return grid

            grid[row][col] = 0

    return None


def find_empty_cell(grid):
    # Find the next empty cell represented by 0
    for row in range(9):
        for col in range(9):
            if grid[row][col] == 0:
                return row, col

    # If no empty cell is found, return None
    return None, None

#if possible
def is_valid_move(grid, row, col, num):


    # Check row
    for c in range(9):
        if grid[row][c] == num:
            return False

    # Check column
    for r in range(9):
        if grid[r][col] == num:
            return False

    # Check 3x3 box
    box_row = (row // 3) * 3
    box_col = (col // 3) * 3
    for r in range(box_row, box_row + 3):
        for c in range(box_col, box_col + 3):
            if grid[r][c] == num:
                return False

    # If all checks pass, the move is valid
    return True



if __name__ == "__main__":
    app = SudokuSolverApp()
    app.mainloop()
