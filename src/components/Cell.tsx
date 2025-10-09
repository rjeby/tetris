import type { CellType, CellProps } from "../types";

const Cell = ({ type }: CellProps) => {
  return (
    <div className={`h-8 w-8 border-1 border-black ${typeColorMap[type]}`}></div>
  );
};

export default Cell;

const typeColorMap: Record<CellType, string> = {
  I: "bg-cyan-400",
  O: "bg-yellow-400",
  T: "bg-purple-400",
  L: "bg-orange-400",
  J: "bg-blue-400",
  Z: "bg-red-400",
  S: "bg-green-400",
  E: "bg-white",
};
