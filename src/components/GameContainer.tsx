import { CELL_SIZE, COLS, ROWS } from "../constants";
import GameGrid from "./GameGrid";
import GameBlock from "./GameBlock";
import type { Bounds, GameContainerProps } from "../types";
import { getPotentialCompleteRowBounds } from "../utils";

const GameContainer = ({ grid, block }: GameContainerProps) => {
  const bounds: Bounds = getPotentialCompleteRowBounds(grid, block);
  const width = CELL_SIZE * COLS;
  const height = CELL_SIZE * ROWS;
  return (
    <div className="relative" style={{ width: width, height: height }}>
      <GameGrid grid={grid} bounds={bounds} />
      <GameBlock block={block} bounds={bounds} />
    </div>
  );
};

export default GameContainer;
