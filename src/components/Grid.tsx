import type { DirectionType, Game } from "../types";
import { useEffect, useRef, useState } from "react";
import { ROWS, COLS, blockIInitialState, updateGame } from "../utils";
import Cell from "./Cell";

const Grid = () => {
  const [game, setGame] = useState<Game>({
    grid: Array.from({ length: ROWS }, () => new Array(COLS).fill("E")),
    block: blockIInitialState,
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
        return updateGame(grid, block, "down");
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  const handleKeyStroke = (key: string) => {
    if (["ArrowRight", "ArrowLeft", "ArrowDown"].includes(key)) {
      const direction = key.substring(5).toLowerCase() as DirectionType;
      setGame((game) => {
        const grid = game.grid;
        const block = game.block;
        return updateGame(grid, block, direction);
      });
    }
  };

  return (
    <div
      ref={gridRef}
      tabIndex={0}
      className="grid border-1 border-black"
      style={{
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
      }}
      onKeyDown={(event) => handleKeyStroke(event.key)}
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
