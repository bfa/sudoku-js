/* public/main.js */

// Constants
const grid = document.getElementById('grid');

// Example puzzle for development purposes only
// Eventually we will use Sanity to store a dataset of puzzles
const puzzle1 = {
  grid: [
    ['5', '3', ' ', ' ', '7', ' ', ' ', ' ', ' '],
    ['6', ' ', ' ', '1', '9', '5', ' ', ' ', ' '],
    [' ', '9', '8', ' ', ' ', ' ', '6', ' ', ' '],
    ['8', ' ', ' ', ' ', '6', ' ', ' ', ' ', '3'],
    ['4', ' ', ' ', '8', ' ', '3', ' ', ' ', '1'],
    ['7', ' ', ' ', ' ', '2', ' ', ' ', ' ', '6'],
    [' ', '6', ' ', ' ', ' ', ' ', '2', '8', ' '],
    [' ', ' ', ' ', '4', '1', '9', ' ', ' ', '5'],
    [' ', ' ', ' ', ' ', '8', ' ', ' ', '7', '9']
  ],
  solution: [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ],
  metadata: {
    difficulty: "easy",
    id: "puzzle1"
  }
};

// Function to create the Sudoku grid
function createGrid() {
  // Load random puzzle
  loadPuzzle(puzzle1);
  // Input handling
  const numberInputs = grid.querySelectorAll('input[type="number"]');
  numberInputs.forEach(input => {
    input.addEventListener('input', handleInput);
    input.addEventListener('keydown', handleArrowKeyNav);
  });
}

// Function to load the Sudoku puzzle into the grid
function loadPuzzle(puzzle) {
  puzzle.grid.forEach( (row, rowIndex) => {
    row.forEach( (value, colIndex) => {
      // Only load in cells with values
      if ( value !== ' ' ) {
        let cell = grid.querySelector(`input[data-row="${rowIndex + 1}"][data-col="${colIndex + 1}"]`);
        cell.value = value;
        cell.readOnly = true;
      }
    } );
  } );
}

// Function to handle arrow key navigation
function handleArrowKeyNav(event) {
  const input = event.target;
  let row = parseInt(input.getAttribute('data-row'), 10);
  let col = parseInt(input.getAttribute('data-col'), 10);

  // Determine traversal direction
  switch (event.key) {
    case 'ArrowUp' : event.preventDefault(); row--; break;
    case 'ArrowDown': event.preventDefault(); row++; break;
    case 'ArrowLeft' : event.preventDefault(); col--; break;
    case 'ArrowRight': event.preventDefault(); col++; break;
    default : return; // Ignore other keys
  }

  // Look for the next non-disabled input
  let newInput;
  while ( (newInput = grid.querySelector(`input[data-row="${row}"][data-col="${col}"]`) ) && newInput.disabled ) {
    // Adjust row or col until a non-disabled input is found
    switch (event.key) {
      case 'ArrowUp' : row--; break;
      case 'ArrowDown' : row++; break;
      case 'ArrowLeft' : col--; break;
      case 'ArrowRight' : col++; break;
    }
  }

  // Focus on the first non-disabled input found
  if (newInput) newInput.focus(); 

}

// Function to handle user input
function handleInput(event) {
  const input = event.target; // Get the input element from the event
  const value = input.value; // Get the current value of the input
  // Allow for deletion
  if (value === '') {
    input.value = '';
    return;
  }
  // Check if the last character is a valid digit (0-9)
  const lastChar = value.charAt(value.length - 1);
  if (!/^\d$/.test(lastChar)) {
    // If the last character is not a digit, remove it
    input.value = value.slice(0, -1);
    return;
  }
  const numberValue = Number(lastChar); // Convert last character to number
  // Check if the value is out of bounds
  if (numberValue < 1) {
    input.value = 1; // Set to lower bound
  } else if (numberValue > 9) {
    input.value = 9; // Set to upper bound
  } else {
    // If valid, set the input value to the last character (digit)
    input.value = lastChar;
  }
}

// Initialize the game
createGrid();