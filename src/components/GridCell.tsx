import type { GridCellProps } from "../types";
import { CELL_COLOR_MAP, CELL_SIZE } from "../constants";

const GridCell = ({ cell }: GridCellProps) => {
  const type = cell.type;
  const position = cell.position;
  return (
    <div
      className={"absolute h-8 w-8 border-10 border-black"}
      style={{
        backgroundColor: CELL_COLOR_MAP[type],
        border: type === "E" ? "1px solid black" : "none",
        left: `${position.column * CELL_SIZE}px`,
        top: `${position.row * CELL_SIZE}px`,
      }}
    ></div>
  );
};

export default GridCell;
