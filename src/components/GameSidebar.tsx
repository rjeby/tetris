import type { GameSidebarProps } from "../types";
const GameSidebar = ({ score }: GameSidebarProps) => {
  return (
    <div className="flex w-3xs flex-col self-start rounded-md border-4 border-gray-500 py-4 pl-4">
      <span className="text-3xl">
        SCORE : <span className="text-red-500">{score}</span>
      </span>
    </div>
  );
};

export default GameSidebar;
