import type { GameBlockProps } from "../types";
import GridCell from "./GridCell";

const GameBlock = ({ block, bounds }: GameBlockProps) => {
  const type = block.type;
  const cellPositions = block.cells;
  return (
    <>
      {cellPositions.map((position) => (
        <GridCell
          key={`${position.row}#${position.column}`}
          hasAnimation={
            position.row >= bounds.minCompleteRowIndex &&
            position.row <= bounds.maxCompleteRowIndex
          }
          cell={{ type: type, position: position }}
        />
      ))}
    </>
  );
};

export default GameBlock;
