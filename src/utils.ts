import type { BlockType, DirectionType, GridType, GameType } from "./types";

// Utility Functions

const moveBlockRight = (block: BlockType) => {
  return block.map((cell) => ({
    previous: { row: cell.current.row, column: cell.current.column },
    current: { row: cell.current.row, column: cell.current.column + 1 },
  }));
};

const moveBlockLeft = (block: BlockType) => {
  return block.map((cell) => ({
    previous: { row: cell.current.row, column: cell.current.column },
    current: { row: cell.current.row, column: cell.current.column - 1 },
  }));
};

const moveBlockDown = (block: BlockType) => {
  return block.map((cell) => ({
    previous: { row: cell.current.row, column: cell.current.column },
    current: { row: cell.current.row + 1, column: cell.current.column },
  }));
};

const isBlockHorizontal = (block: BlockType) => {
  const commonRow = block[0].current.row;
  for (const position of block) {
    if (position.current.row !== commonRow) {
      return false;
    }
  }

  return true;
};

const rotateIBlock = (block: BlockType) => {
  const N = block.length;
  const rotationCenter = block[N - 1];
  const _isBlockHorizontal = isBlockHorizontal(block);
  return block.map((cell, index) => ({
    previous: { row: cell.current.row, column: cell.current.column },
    current: {
      row: _isBlockHorizontal
        ? rotationCenter.current.row + index - N + 1
        : rotationCenter.current.row,
      column: _isBlockHorizontal
        ? rotationCenter.current.column
        : rotationCenter.current.column + index - N + 1,
    },
  }));
};

const hasCompleteRow = (grid: GridType) => {
  for (let row = 0; row < ROWS; row++) {
    let isRowComplete = true;
    for (const cell of grid[row]) {
      if (cell === "E") {
        isRowComplete = false;
        break;
      }
    }
    if (isRowComplete) {
      return row;
    }
  }

  return -1;
};

const removeCompleteRow = (grid: GridType) => {
  const completeRowIndex = hasCompleteRow(grid);
  if (completeRowIndex === -1) {
    return;
  }

  for (let row = completeRowIndex; row >= 1; row--) {
    for (let column = 0; column < COLS; column++) {
      grid[row][column] = grid[row - 1][column];
    }
  }

  for (let column = 0; column < COLS; column++) {
    grid[0][column] = "E";
  }
};

const isBlockInGrid = (block: BlockType) => {
  let minRowIndex = Infinity;
  let maxRowIndex = -Infinity;
  let minColumnIndex = Infinity;
  let maxColumnIndex = -Infinity;

  if (!block.length) {
    return false;
  }

  for (const position of block) {
    minRowIndex = Math.min(minRowIndex, position.current.row);
    maxRowIndex = Math.max(maxRowIndex, position.current.row);
    minColumnIndex = Math.min(minColumnIndex, position.current.column);
    maxColumnIndex = Math.max(maxColumnIndex, position.current.column);
  }

  return (
    minRowIndex >= 0 &&
    maxRowIndex < ROWS &&
    minColumnIndex >= 0 &&
    maxColumnIndex < COLS
  );
};

const isBlockOverlapping = (grid: GridType, block: BlockType) => {
  const previousPositions = new Set();

  for (const position of block) {
    const previousRow = position.previous.row;
    const previousColumn = position.previous.column;
    previousPositions.add(`${previousRow}#${previousColumn}`);
  }
  for (const position of block) {
    const row = position.current.row;
    const column = position.current.column;

    if (
      !previousPositions.has(`${row}#${column}`) &&
      grid[row][column] !== "E"
    ) {
      return true;
    }
  }

  return false;
};

const isBlockAtEnd = (block: BlockType) => {
  for (const position of block) {
    if (position.current.row === ROWS - 1) {
      return true;
    }
  }
  return false;
};

const isGameOver = (grid: GridType, block: BlockType) => {
  const previousPositions = new Set();
  for (const position of block) {
    const previousRow = position.previous.row;
    const previousColumn = position.previous.column;
    previousPositions.add(`${previousRow}#${previousColumn}`);
  }

  for (const position of block) {
    const row = position.current.row;
    const column = position.current.column;
    if (
      row === 0 &&
      !previousPositions.has(`${row}#${column}`) &&
      grid[row][column] !== "E"
    ) {
      return true;
    }
  }
  return false;
};

const applyCurrentBlockToGrid = (grid: GridType, block: BlockType) => {
  const updatedGrid = [...grid.map((row) => [...row])];
  for (const position of block) {
    if (position.previous.row !== -1 && position.previous.column !== -1) {
      updatedGrid[position.previous.row][position.previous.column] = "E";
    }
  }
  for (const position of block) {
    updatedGrid[position.current.row][position.current.column] = "I";
  }
  return updatedGrid;
};

const applyPreviousBlockToGrid = (grid: GridType, block: BlockType) => {
  const updatedGrid = [...grid.map((row) => [...row])];
  for (const position of block) {
    updatedGrid[position.previous.row][position.previous.column] = "I";
  }
  return updatedGrid;
};

const updateBlock = (block: BlockType, direction: DirectionType) => {
  if (direction === "left") {
    return moveBlockLeft(block);
  }

  if (direction === "right") {
    return moveBlockRight(block);
  }

  if (direction === "up") {
    return rotateIBlock(block);
  }

  return moveBlockDown(block);
};

const updateGame = (game: GameType, direction: DirectionType) => {
  const grid = game.grid;
  const block = game.block;

  const updatedBlock = updateBlock(block, direction);

  if (!isBlockInGrid(updatedBlock)) {
    return game;
  }

  if (isBlockOverlapping(grid, updatedBlock)) {
    const intermediateGrid = applyPreviousBlockToGrid(grid, updatedBlock);
    removeCompleteRow(intermediateGrid);
    const updatedGrid = applyCurrentBlockToGrid(
      intermediateGrid,
      BLOCK_I_INITIAL_STATE,
    );
    return {
      grid: updatedGrid,
      block: BLOCK_I_INITIAL_STATE,
      isGameOver: isGameOver(intermediateGrid, BLOCK_I_INITIAL_STATE),
    };
  }

  if (isBlockAtEnd(updatedBlock)) {
    const intermediateGrid = applyCurrentBlockToGrid(grid, updatedBlock);
    removeCompleteRow(intermediateGrid);
    const updatedGrid = applyCurrentBlockToGrid(
      intermediateGrid,
      BLOCK_I_INITIAL_STATE,
    );
    return {
      grid: updatedGrid,
      block: BLOCK_I_INITIAL_STATE,
      isGameOver: isGameOver(intermediateGrid, BLOCK_I_INITIAL_STATE),
    };
  }

  return {
    grid: applyCurrentBlockToGrid(grid, updatedBlock),
    block: updatedBlock,
    isGameOver: false,
  };
};

// Constants

const ROWS = 25;
const COLS = 15;

const BLOCK_I_INITIAL_STATE = [
  { previous: { row: -1, column: -1 }, current: { row: 0, column: 3 } },
  { previous: { row: -1, column: -1 }, current: { row: 0, column: 4 } },
  { previous: { row: -1, column: -1 }, current: { row: 0, column: 5 } },
  { previous: { row: -1, column: -1 }, current: { row: 0, column: 6 } },
];

const GAME_INITIAL_STATE = {
  grid: applyCurrentBlockToGrid(
    Array.from({ length: ROWS }, () => new Array(COLS).fill("E")),
    BLOCK_I_INITIAL_STATE,
  ),
  block: BLOCK_I_INITIAL_STATE,
  isGameOver: false,
};

export { ROWS, COLS, BLOCK_I_INITIAL_STATE, GAME_INITIAL_STATE, updateGame };
