import type {
  BlockType,
  DirectionType,
  GridType,
  GameType,
  BlockCellType,
} from "./types";

// Utility Functions

const moveBlockRight = (block: BlockType) => {
  return block.map((cell) => ({
    cellType: cell.cellType,

    previous: { row: cell.current.row, column: cell.current.column },
    current: { row: cell.current.row, column: cell.current.column + 1 },
  }));
};

const moveBlockLeft = (block: BlockType) => {
  return block.map((cell) => ({
    cellType: cell.cellType,
    previous: { row: cell.current.row, column: cell.current.column },
    current: { row: cell.current.row, column: cell.current.column - 1 },
  }));
};

const moveBlockDown = (block: BlockType) => {
  return block.map((cell) => ({
    cellType: cell.cellType,
    previous: { row: cell.current.row, column: cell.current.column },
    current: { row: cell.current.row + 1, column: cell.current.column },
  }));
};

const getRotationCoefficient = (block: BlockType) => {
  const N = block.length;
  const rotationCenter = block[N - 1];
  const rotationCenterNeighbor = block[N - 2];
  const rY = rotationCenterNeighbor.current.column;
  const cY = rotationCenter.current.column;

  return rY < cY || rY > cY ? 1 : -1;
};

const rotateBlock = (block: BlockType) => {
  const N = block.length;
  const rotationCenter = block[N - 1];
  const cX = rotationCenter.current.row;
  const cY = rotationCenter.current.column;
  const coeff = getRotationCoefficient(block);
  return block.map((cell) => ({
    cellType: cell.cellType,

    previous: { row: cell.current.row, column: cell.current.column },
    current: {
      row: cX + coeff * (cell.current.column - cY),
      column: cY + coeff * (cell.current.row - cX),
    },
  }));
};

const hasCompleteRow = (grid: GridType) => {
  let minCompleteRowIndex = Infinity;
  let maxCompleteRowIndex = -Infinity;
  for (let row = 0; row < ROWS; row++) {
    let isRowComplete = true;
    for (const cell of grid[row]) {
      if (cell === "E") {
        isRowComplete = false;
        break;
      }
    }
    if (isRowComplete) {
      minCompleteRowIndex = Math.min(row, minCompleteRowIndex);
      maxCompleteRowIndex = Math.max(row, maxCompleteRowIndex);
    }
  }

  return [minCompleteRowIndex, maxCompleteRowIndex];
};

const removeCompleteRows = (grid: GridType) => {
  const [minCompleteRowIndex, maxCompleteRowIndex] = hasCompleteRow(grid);
  const offset = maxCompleteRowIndex - minCompleteRowIndex + 1;
  if (minCompleteRowIndex === Infinity) {
    return 0;
  }

  for (let row = maxCompleteRowIndex; row - offset >= 0; row--) {
    for (let column = 0; column < COLS; column++) {
      grid[row][column] = grid[row - offset][column];
    }
  }

  for (let row = 0; row < offset; row++) {
    for (let column = 0; column < COLS; column++) {
      grid[row][column] = "E";
    }
  }

  return offset;
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
    updatedGrid[position.current.row][position.current.column] =
      position.cellType;
  }
  return updatedGrid;
};

const applyPreviousBlockToGrid = (grid: GridType, block: BlockType) => {
  const updatedGrid = [...grid.map((row) => [...row])];
  for (const position of block) {
    updatedGrid[position.previous.row][position.previous.column] =
      position.cellType;
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
    return rotateBlock(block);
  }

  return moveBlockDown(block);
};

const generateRandomInitialState = () => {
  const initialStatesTypes = ["I", "O", "T", "S", "Z", "J", "L"];
  const randomIndex = Math.floor(Math.random() * initialStatesTypes.length);
  const randomStateType = initialStatesTypes[randomIndex] as BlockCellType;
  return BLOCKS_INITIAL_STATES[randomStateType];
};

const updateGame = (game: GameType, direction: DirectionType) => {
  const grid = game.grid;
  const block = game.block;
  const score = game.score;
  const updatedBlock = updateBlock(block, direction);

  if (!isBlockInGrid(updatedBlock)) {
    return game;
  }

  if (isBlockOverlapping(grid, updatedBlock)) {
    const intermediateGrid = applyPreviousBlockToGrid(grid, updatedBlock);
    const points = removeCompleteRows(intermediateGrid);
    const randomInitialState = generateRandomInitialState();
    const updatedGrid = applyCurrentBlockToGrid(
      intermediateGrid,
      randomInitialState,
    );
    return {
      grid: updatedGrid,
      block: randomInitialState,
      score: score + points * POINTS_FACTOR,
      isGameOver: isGameOver(intermediateGrid, randomInitialState),
    };
  }

  if (isBlockAtEnd(updatedBlock)) {
    const intermediateGrid = applyCurrentBlockToGrid(grid, updatedBlock);
    const points = removeCompleteRows(intermediateGrid);
    const randomInitialState = generateRandomInitialState();
    const updatedGrid = applyCurrentBlockToGrid(
      intermediateGrid,
      randomInitialState,
    );
    return {
      grid: updatedGrid,
      block: randomInitialState,
      score: score + points * POINTS_FACTOR,
      isGameOver: isGameOver(intermediateGrid, randomInitialState),
    };
  }

  return {
    grid: applyCurrentBlockToGrid(grid, updatedBlock),
    block: updatedBlock,
    score: score,
    isGameOver: false,
  };
};

// Constants

const ROWS = 25;
const COLS = 15;
const POINTS_FACTOR = 100;

const BLOCK_I_INITIAL_STATE: BlockType = [
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 3 },
    cellType: "I",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 4 },
    cellType: "I",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 5 },
    cellType: "I",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 6 },
    cellType: "I",
  },
];

const BLOCK_O_INITIAL_STATE: BlockType = [
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 4 },
    cellType: "O",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 5 },
    cellType: "O",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 1, column: 4 },
    cellType: "O",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 1, column: 5 },
    cellType: "O",
  },
];

const BLOCK_T_INITIAL_STATE: BlockType = [
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 3 },
    cellType: "T",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 5 },
    cellType: "T",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 1, column: 4 },
    cellType: "T",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 4 },
    cellType: "T",
  },
];

const BLOCK_S_INITIAL_STATE: BlockType = [
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 5 },
    cellType: "S",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 4 },
    cellType: "S",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 1, column: 4 },
    cellType: "S",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 1, column: 3 },
    cellType: "S",
  },
];

const BLOCK_Z_INITIAL_STATE: BlockType = [
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 3 },
    cellType: "Z",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 4 },
    cellType: "Z",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 1, column: 4 },
    cellType: "Z",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 1, column: 5 },
    cellType: "Z",
  },
];

const BLOCK_J_INITIAL_STATE: BlockType = [
  {
    previous: { row: -1, column: -1 },
    current: { row: 1, column: 5 },
    cellType: "J",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 3 },
    cellType: "J",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 4 },
    cellType: "J",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 5 },
    cellType: "J",
  },
];

const BLOCK_L_INITIAL_STATE: BlockType = [
  {
    previous: { row: -1, column: -1 },
    current: { row: 1, column: 3 },
    cellType: "L",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 3 },
    cellType: "L",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 4 },
    cellType: "L",
  },
  {
    previous: { row: -1, column: -1 },
    current: { row: 0, column: 5 },
    cellType: "L",
  },
];

const BLOCKS_INITIAL_STATES = {
  I: BLOCK_I_INITIAL_STATE,
  O: BLOCK_O_INITIAL_STATE,
  T: BLOCK_T_INITIAL_STATE,
  S: BLOCK_S_INITIAL_STATE,
  Z: BLOCK_Z_INITIAL_STATE,
  J: BLOCK_J_INITIAL_STATE,
  L: BLOCK_L_INITIAL_STATE,
};

const GAME_INITIAL_STATE = {
  grid: applyCurrentBlockToGrid(
    Array.from({ length: ROWS }, () => new Array(COLS).fill("E")),
    BLOCK_I_INITIAL_STATE,
  ),
  block: BLOCK_I_INITIAL_STATE,
  score: 0,
  isGameOver: false,
};

export {
  ROWS,
  COLS,
  BLOCK_I_INITIAL_STATE,
  BLOCK_O_INITIAL_STATE,
  BLOCK_J_INITIAL_STATE,
  BLOCK_T_INITIAL_STATE,
  BLOCK_S_INITIAL_STATE,
  BLOCK_L_INITIAL_STATE,
  BLOCK_Z_INITIAL_STATE,
  GAME_INITIAL_STATE,
  updateGame,
};
