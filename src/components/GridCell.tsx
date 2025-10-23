import type { GridCellProps } from "../types";
import { CELL_COLOR_MAP } from "../constants";

const GridCell = ({ cell, hasAnimation }: GridCellProps) => {
  const type = cell.type;
  return (
    <div
      className={`h-8 w-8 ${hasAnimation ? "animate-ping" : ""} `}
      style={{
        backgroundColor: CELL_COLOR_MAP[type],
        border: type === "E" ? "1px solid gray" : "none",
      }}
    ></div>
  );
};

export default GridCell;
