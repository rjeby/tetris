import type { GameBlockProps } from "../types";
import GridCell from "./GridCell";

const GameBlock = ({ block }: GameBlockProps) => {
  const type = block.type;
  const cellPositions = block.cells;
  return (
    <>
      {cellPositions.map((position) => (
        <GridCell
          key={`${position.row}#${position.column}`}
          cell={{ type: type, position: position }}
        />
      ))}
    </>
  );
};

export default GameBlock;
