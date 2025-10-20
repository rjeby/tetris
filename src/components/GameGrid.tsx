import type { GameGridProps } from "../types";
import GridCell from "./GridCell";

const GameGrid = ({ grid, bounds }: GameGridProps) => {
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
            hasAnimation={
              rowIndex >= bounds.minCompleteRowIndex &&
              rowIndex <= bounds.maxCompleteRowIndex
            }
          />
        )),
      )}
    </>
  );
};

export default GameGrid;
