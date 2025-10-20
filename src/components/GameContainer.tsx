import { CELL_SIZE, COLS, ROWS } from "../constants";
import GameGrid from "./GameGrid";
import GameBlock from "./GameBlock";
import type { GameContainerProps } from "../types";

const GameContainer = ({ grid, block, bounds }: GameContainerProps) => {
  const width = CELL_SIZE * COLS;
  const height = CELL_SIZE * ROWS;
  return (
    <div className="relative" style={{ width: width, height: height }}>
      <GameGrid grid={grid} bounds={bounds} />
      <GameBlock block={block} />
    </div>
  );
};

export default GameContainer;
