import type { BlockType, DirectionType, GridType } from "./types";

const ROWS = 25;
const COLS = 15;

const blockIInitialState = [
  { previous: { row: 0, column: 3 }, current: { row: 0, column: 3 } },
  { previous: { row: 0, column: 4 }, current: { row: 0, column: 4 } },
  { previous: { row: 0, column: 5 }, current: { row: 0, column: 5 } },
  { previous: { row: 0, column: 6 }, current: { row: 0, column: 6 } },
];

const moveRight = (block: BlockType) => {
  return block.map((cell) => ({
    previous: { row: cell.current.row, column: cell.current.column },
    current: { row: cell.current.row, column: cell.current.column + 1 },
  }));
};

const moveLeft = (block: BlockType) => {
  return block.map((cell) => ({
    previous: { row: cell.current.row, column: cell.current.column },
    current: { row: cell.current.row, column: cell.current.column - 1 },
  }));
};

const moveDown = (block: BlockType) => {
  return block.map((cell) => ({
    previous: { row: cell.current.row, column: cell.current.column },
    current: { row: cell.current.row + 1, column: cell.current.column },
  }));
};

const isMoveInGrid = (block: BlockType) => {
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

const doesBlockOverlap = (grid: GridType, block: BlockType) => {
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

const isMoveValid = (grid: GridType, block: BlockType) => {
  return isMoveInGrid(block) && !doesBlockOverlap(grid, block);
};

const doesBlockReachedTheEnd = (block: BlockType) => {
  for (const position of block) {
    if (position.current.row === ROWS - 1) {
      return true;
    }
  }
  return false;
};

const getGrid = (grid: GridType, block: BlockType) => {
  const updatedGrid = [...grid.map((row) => [...row])];
  for (const position of block) {
    updatedGrid[position.previous.row][position.previous.column] = "E";
  }
  for (const position of block) {
    updatedGrid[position.current.row][position.current.column] = "I";
  }
  return updatedGrid;
};

const getCurrentGrid = (grid: GridType, block: BlockType) => {
  const updatedGrid = [...grid.map((row) => [...row])];
  for (const position of block) {
    updatedGrid[position.previous.row][position.previous.column] = "E";
    updatedGrid[position.current.row][position.current.column] = "I";
  }
  return updatedGrid;
};

const getPreviousGrid = (grid: GridType, block: BlockType) => {
  const updatedGrid = [...grid.map((row) => [...row])];
  for (const position of block) {
    updatedGrid[position.previous.row][position.previous.column] = "I";
  }
  return updatedGrid;
};

const updateBlock = (block: BlockType, direction: DirectionType) => {
  if (direction === "left") {
    return moveLeft(block);
  }

  if (direction === "right") {
    return moveRight(block);
  }

  return moveDown(block);
};

const makeMoveValid = (block: BlockType) => {
  return block.map((cell) => ({
    previous: { row: cell.current.row, column: cell.current.column },
    current: { row: cell.current.row, column: cell.current.column },
  }));
};

const updateGame = (
  grid: GridType,
  block: BlockType,
  direction: DirectionType,
) => {
  const movedBlock = updateBlock(block, direction);
  const updatedBlock = !isMoveInGrid(movedBlock)
    ? makeMoveValid(block)
    : movedBlock;

  if (doesBlockOverlap(grid, block)) {
    return { grid: getPreviousGrid(grid, block), block: blockIInitialState };
  }

  if (doesBlockReachedTheEnd(block)) {
    return { grid: getCurrentGrid(grid, block), block: blockIInitialState };
  }

  return { grid: getGrid(grid, block), block: updatedBlock };
};

export {
  ROWS,
  COLS,
  blockIInitialState,
  moveRight,
  moveLeft,
  moveDown,
  isMoveInGrid,
  doesBlockOverlap,
  isMoveValid,
  doesBlockReachedTheEnd,
  getGrid,
  getCurrentGrid,
  getPreviousGrid,
  updateGame,
};
