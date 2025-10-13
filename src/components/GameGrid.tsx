import type { GameGridProps } from "../types";
import GridCell from "./GridCell";

const GameGrid = ({ grid }: GameGridProps) => {
  return (
    <>
      {grid.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <GridCell
            key={`${rowIndex}#${columnIndex}`}
            cell={{
              type: cell,
              position: { row: rowIndex, column: columnIndex },
            }}
          />
        )),
      )}
    </>
  );
};

export default GameGrid;
