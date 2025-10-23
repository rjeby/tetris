import type {
  Block,
  CellColorMap,
  DeltaMap,
  GameState,
  RotationMatrix,
} from "./types";

const ROWS = 25;
const COLS = 15;
const CELL_SIZE = 32;
const POINTS_FACTOR = 100;
const PERIOD = 1000;

const DELTA: DeltaMap = {
  up: { dr: -1, dc: 0 },
  right: { dr: 0, dc: 1 },
  down: { dr: 1, dc: 0 },
  left: { dr: 0, dc: -1 },
};

const BLOCK_I_INITIAL_STATE: Block = {
  type: "I",
  cells: [
    { row: 0, column: 7 },
    { row: 0, column: 8 },
    { row: 0, column: 6 },
  ],
};

const BLOCK_O_INITIAL_STATE: Block = {
  type: "O",
  cells: [
    { row: 0, column: 6 },
    { row: 0, column: 7 },
    { row: 1, column: 6 },
    { row: 1, column: 7 },
  ],
};

const BLOCK_T_INITIAL_STATE: Block = {
  type: "T",
  cells: [
    { row: 0, column: 7 },
    { row: 0, column: 6 },
    { row: 0, column: 8 },
    { row: 1, column: 7 },
  ],
};

const BLOCK_S_INITIAL_STATE: Block = {
  type: "S",
  cells: [
    { row: 0, column: 7 },
    { row: 1, column: 6 },
    { row: 0, column: 8 },
    { row: 1, column: 7 },
  ],
};

const BLOCK_Z_INITIAL_STATE: Block = {
  type: "Z",
  cells: [
    { row: 0, column: 7 },
    { row: 1, column: 7 },
    { row: 0, column: 6 },
    { row: 1, column: 8 },
  ],
};

const BLOCK_J_INITIAL_STATE: Block = {
  type: "J",
  cells: [
    { row: 0, column: 7 },
    { row: 1, column: 8 },
    { row: 0, column: 6 },
    { row: 0, column: 8 },
  ],
};

const BLOCK_L_INITIAL_STATE: Block = {
  type: "L",
  cells: [
    { row: 0, column: 7 },
    { row: 1, column: 6 },
    { row: 0, column: 6 },
    { row: 0, column: 8 },
  ],
};

const BLOCKS_INITIAL_STATES = {
  I: BLOCK_I_INITIAL_STATE,
  O: BLOCK_O_INITIAL_STATE,
  T: BLOCK_T_INITIAL_STATE,
  S: BLOCK_S_INITIAL_STATE,
  Z: BLOCK_Z_INITIAL_STATE,
  J: BLOCK_J_INITIAL_STATE,
  L: BLOCK_L_INITIAL_STATE,
};

const GRID_INITIAL_STATE = Array.from({ length: ROWS }, () =>
  new Array(COLS).fill("E"),
);

const GAME_INITIAL_STATE: GameState = {
  grid: GRID_INITIAL_STATE,
  block: BLOCK_I_INITIAL_STATE,
  score: 0,
  completeRowPositions: new Set(),
  hasGameStarted: false,
  isPending: false,
  isGameOver: false,
};

const CELL_COLOR_MAP: CellColorMap = {
  I: "rgb(6, 182, 212)", // cyan-400
  O: "rgb(252, 211, 77)", // yellow-400
  T: "rgb(139, 92, 246)", // purple-400
  L: "rgb(251, 146, 60)", // orange-400
  J: "rgb(59, 130, 246)", // blue-400
  Z: "rgb(239, 68, 68)", // red-400
  S: "rgb(34, 197, 94)", // green-400
  E: "rgb(255, 255, 255)", // white
};

const ROTATION_MATRIX: RotationMatrix = [
  [
    { dr: 0, dc: 2 },
    { dr: 1, dc: 1 },
    { dr: 2, dc: 0 },
  ],
  [
    { dr: -1, dc: 1 },
    { dr: 0, dc: 0 },
    { dr: 1, dc: -1 },
  ],
  [
    { dr: -2, dc: 0 },
    { dr: -1, dc: -1 },
    { dr: 0, dc: -2 },
  ],
];

export {
  ROWS,
  COLS,
  CELL_SIZE,
  DELTA,
  BLOCKS_INITIAL_STATES,
  PERIOD,
  POINTS_FACTOR,
  CELL_COLOR_MAP,
  GAME_INITIAL_STATE,
  ROTATION_MATRIX,
};
