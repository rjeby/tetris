import type { BlockType, GridType } from "./types";

const ROWS = 25;
const COLS = 15;

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
  for (const position of block) {
    const row = position.current.row;
    const column = position.current.column;

    if (grid[row][column] !== "E") {
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

// const updateBlockPosition = (key: string) => {
//   // console.log(block);
//   // let updatedBlock: BlockType = [];
//   // switch (key) {
//   //   case "ArrowRight":
//   //     updatedBlock = moveRight(block);
//   //     break;
//   //   case "ArrowLeft":
//   //     updatedBlock = moveLeft(block);
//   //     break;
//   //   case "ArrowDown":
//   //     updatedBlock = moveDown(block);
//   //     break;
//   //   default:
//   // }
//   // if (!isMoveValid(grid, updatedBlock)) {
//   //   return;
//   // }
//   // if (doesBlockReachedTheEnd(updatedBlock)) {
//   //   setGrid((gr) => getGrid(gr, updatedBlock));
//   //   setBlock(() => initialStateI);
//   // }
//   // setBlock(updatedBlock);
// };

export {
  ROWS,
  COLS,
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
};
