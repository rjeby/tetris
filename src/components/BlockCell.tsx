import type { BlockCellProps } from "../types";
import { CELL_COLOR_MAP, CELL_SIZE } from "../constants";

const BlockCell = ({ cell }: BlockCellProps) => {
  const type = cell.type;
  const position = cell.position;
  console.log(position)
  return (
    <div
      className={`absolute h-8 w-8`}
      style={{
        backgroundColor: CELL_COLOR_MAP[type],
        border: type === "E" ? "1px solid black" : "none",
        left: `${position.column * CELL_SIZE}px`,
        top: `${position.row * CELL_SIZE}px`,
      }}
    ></div>
  );
};

export default BlockCell;
