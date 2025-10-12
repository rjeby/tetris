import type { BlockType } from "./types";

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

export {
  ROWS,
  COLS,
  BLOCKS_INITIAL_STATES,
  BLOCK_I_INITIAL_STATE,
  POINTS_FACTOR,
};
