import type { Game, BlockType, GridType } from "../types";
import { useEffect, useRef, useState } from "react";
import {
  ROWS,
  COLS,
  moveDown,
  doesBlockOverlap,
  doesBlockReachedTheEnd,
  getGrid,
  getPreviousGrid,
  getCurrentGrid,
} from "../utils";
import Cell from "./Cell";

const initialStateI = [
  { previous: { row: 0, column: 3 }, current: { row: 0, column: 3 } },
  { previous: { row: 0, column: 4 }, current: { row: 0, column: 4 } },
  { previous: { row: 0, column: 5 }, current: { row: 0, column: 5 } },
  { previous: { row: 0, column: 6 }, current: { row: 0, column: 6 } },
];

const Grid = () => {
  const [game, setGame] = useState<Game>({
    grid: Array.from({ length: ROWS }, () => new Array(COLS).fill("E")),
    block: initialStateI,
  });

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGame((game) => {
        const grid = game.grid;
        const block = game.block;
        const updatedBlock = moveDown(block);

        if (doesBlockOverlap(grid, block)) {
          return { grid: getPreviousGrid(grid, block), block: initialStateI };
        }

        if (doesBlockReachedTheEnd(block)) {
          return { grid: getCurrentGrid(grid, block), block: initialStateI };
        }

        return { grid: getGrid(grid, block), block: updatedBlock };
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={gridRef}
      tabIndex={0}
      className="grid border-1 border-black"
      style={{
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
      }}
      onKeyDown={(event) => updateBlockPosition(event.key)}
    >
      {game.grid.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <Cell key={`${rowIndex}#${columnIndex}`} type={cell} />
        )),
      )}
    </div>
  );
};

export default Grid;

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
