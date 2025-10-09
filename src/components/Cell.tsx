import type { CellType, CellProps } from "../types";

const Cell = ({ type }: CellProps) => {
  return (
    <div
      className={"h-8 w-8 border-black"}
      style={{
        backgroundColor: typeColorMap[type],
        border: type === "E" ? "1px solid black" : "none",
      }}
    ></div>
  );
};

export default Cell;

const typeColorMap: Record<CellType, string> = {
  I: "rgb(6, 182, 212)", // cyan-400
  O: "rgb(252, 211, 77)", // yellow-400
  T: "rgb(139, 92, 246)", // purple-400
  L: "rgb(251, 146, 60)", // orange-400
  J: "rgb(59, 130, 246)", // blue-400
  Z: "rgb(239, 68, 68)", // red-400
  S: "rgb(34, 197, 94)", // green-400
  E: "rgb(255, 255, 255)", // white
};
