import { COLS, ROWS } from "../constants";
import GameGrid from "./GameGrid";
import GameBlock from "./GameBlock";
import type { GameContainerProps } from "../types";

const GameContainer = ({ grid, block, completeRowPositions }: GameContainerProps) => {
  return (
    <div
      className="relative grid rounded-md border-4 border-gray-500"
      style={{
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
      }}
    >
      <GameGrid grid={grid} completeRowPositions={completeRowPositions} />
      <GameBlock block={block} />
    </div>
  );
};

export default GameContainer;
