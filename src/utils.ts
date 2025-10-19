import {
  BLOCKS_INITIAL_STATES,
  COLS,
  DELTA,
  POINTS_FACTOR,
  ROTATION_MATRIX,
  ROWS,
} from "./constants";
import type { Block, CellType, Direction, GameState, Grid } from "./types";

const updateGameState = (game: GameState, direction: Direction) => {
  // immutability
  const updatedBlock =
    direction === "up"
      ? rotateBlock(game.block)
      : moveBlock(game.block, direction);
  const _isBlockValid = isBlockValid(updatedBlock);
  const _isBlockOverlapping = _isBlockValid
    ? isBlockOverlapping(game.grid, updatedBlock)
    : false;
  const _hasBlockReachedTheEnd = hasBlockReachedTheEnd(updatedBlock);

  if (direction === "down" && (_hasBlockReachedTheEnd || _isBlockOverlapping)) {
    const updatedGrid = applyBlockToGrid(game.grid, game.block);
    const randomBlock = generateRandomBlockInitialState();
    const points = removeGridCompleteRows(updatedGrid);
    return {
      ...game,
      grid: updatedGrid,
      block: randomBlock,
      score: game.score + POINTS_FACTOR * points,
    };
  }
  if (!_isBlockValid || _isBlockOverlapping) {
    return { ...game };
  }

  return { ...game, block: updatedBlock };
};

const moveBlock = (block: Block, direction: Direction) => {
  return {
    type: block.type,
    cells: block.cells.map((position) => ({
      row: position.row + DELTA[direction].dr,
      column: position.column + DELTA[direction].dc,
    })),
  };
};

const rotateBlock = (block: Block) => {
  if (block.type === "O") {
    return {
      type: block.type,
      cells: block.cells.map((position) => ({
        row: position.row,
        column: position.column,
      })),
    };
  }
  const { cX, cY } = { cX: block.cells[0].row, cY: block.cells[0].column };

  return {
    type: block.type,
    cells: block.cells.map((position) => {
      const dX = position.row - cX;
      const dY = position.column - cY;
      const delta = ROTATION_MATRIX[1 + dX][1 + dY];
      return {
        row: position.row + delta.dr,
        column: position.column + delta.dc,
      };
    }),
  };
};

const isBlockValid = (block: Block) => {
  for (const position of block.cells) {
    if (
      position.row < 0 ||
      position.row >= ROWS ||
      position.column < 0 ||
      position.column >= COLS
    ) {
      return false;
    }
  }
  return true;
};

const isBlockOverlapping = (grid: Grid, block: Block) => {
  for (const position of block.cells) {
    if (grid[position.row][position.column] !== "E") {
      return true;
    }
  }
  return false;
};

const hasBlockReachedTheEnd = (block: Block) => {
  for (const position of block.cells) {
    if (position.row === ROWS) {
      return true;
    }
  }

  return false;
};

const applyBlockToGrid = (grid: Grid, block: Block) => {
  const _grid = grid.map((rows) => rows.slice());
  for (const position of block.cells) {
    _grid[position.row][position.column] = block.type;
  }
  return _grid;
};

const getCompleteRowBounds = (grid: Grid) => {
  let minRowIndex = ROWS;
  let maxRowIndex = -1;
  for (let row = 0; row < ROWS; row++) {
    let isRowComplete = true;
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === "E") {
        isRowComplete = false;
      }
    }

    if (isRowComplete) {
      minRowIndex = Math.min(minRowIndex, row);
      maxRowIndex = Math.max(maxRowIndex, row);
    }
  }
  return { minRowIndex: minRowIndex, maxRowIndex: maxRowIndex };
};

const removeGridCompleteRows = (grid: Grid) => {
  const { minRowIndex, maxRowIndex } = getCompleteRowBounds(grid);
  const offset = maxRowIndex - minRowIndex + 1;
  if (maxRowIndex === -1) {
    return 0;
  }

  for (let row = maxRowIndex; row - offset >= 0; row--) {
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

const generateRandomBlockInitialState = () => {
  const types = Object.keys(BLOCKS_INITIAL_STATES);
  const randomIndex = Math.floor(Math.random() * types.length);
  const randomType = types[randomIndex] as Exclude<CellType, "E">;
  return BLOCKS_INITIAL_STATES[randomType];
};

export { updateGameState };
