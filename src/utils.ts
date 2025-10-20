import {
  BLOCKS_INITIAL_STATES,
  COLS,
  DELTA,
  POINTS_FACTOR,
  ROTATION_MATRIX,
  ROWS,
} from "./constants";
import type {
  Block,
  Bounds,
  CellType,
  Direction,
  GameState,
  Grid,
} from "./types";

const updateRunningGameState = (game: GameState, direction: Direction) => {
  if (game.isPending) {
    return game;
  }
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
    //const points = removeGridCompleteRows(updatedGrid);
    const bounds = getCompleteRowBounds(updatedGrid);
    const _hasCompleteRow = hasCompleteRow(bounds);
    const randomBlock = _hasCompleteRow
      ? { type: "X" as CellType, cells: [] }
      : generateRandomBlockInitialState();
    const isGameOver = !_hasCompleteRow
      ? isBlockOverlapping(updatedGrid, randomBlock as Block)
      : false;
    return {
      grid: updatedGrid,
      block: randomBlock,
      score: game.score,
      bounds: bounds,
      hasGameStarted: true,
      isPending: _hasCompleteRow,
      isGameOver: isGameOver,
    };
  }
  if (!_isBlockValid || _isBlockOverlapping) {
    return game;
  }

  return { ...game, block: updatedBlock };
};

const updatePendingGameState = (game: GameState) => {
  if (!game.isPending) {
    return game;
  }
  const updatedGrid = [...game.grid.map((row) => row.slice())];
  const points = removeGridCompleteRows(updatedGrid);
  return {
    grid: updatedGrid,
    block: generateRandomBlockInitialState(),
    score: game.score + POINTS_FACTOR * points,
    hasGameStarted: true,
    bounds: {
      minCompleteRowIndex: Infinity,
      maxCompleteRowIndex: -Infinity,
    },
    isPending: false,
    isGameOver: false,
  };
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
  let minRowIndex = Infinity;
  let maxRowIndex = -Infinity;
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
  return { minCompleteRowIndex: minRowIndex, maxCompleteRowIndex: maxRowIndex };
};

const hasCompleteRow = (bounds: Bounds) => {
  return (
    bounds.minCompleteRowIndex !== Infinity &&
    bounds.maxCompleteRowIndex !== -Infinity
  );
};

const removeGridCompleteRows = (grid: Grid) => {
  const { minCompleteRowIndex, maxCompleteRowIndex } =
    getCompleteRowBounds(grid);
  const offset = maxCompleteRowIndex - minCompleteRowIndex + 1;
  if (maxCompleteRowIndex === -Infinity) {
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

const generateRandomBlockInitialState = () => {
  const types = Object.keys(BLOCKS_INITIAL_STATES);
  const randomIndex = Math.floor(Math.random() * types.length);
  const randomType = types[randomIndex] as Exclude<CellType, "E">;
  return BLOCKS_INITIAL_STATES[randomType];
};

export { updatePendingGameState, updateRunningGameState };
