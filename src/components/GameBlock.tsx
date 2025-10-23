import type { GameBlockProps } from "../types";
import BlockCell from "./BlockCell";

const GameBlock = ({ block }: GameBlockProps) => {
  const type = block.type;
  const cellPositions = block.cells;
  return (
    <>
      {cellPositions.map((position) => (
        <BlockCell
          key={`${position.row}#${position.column}`}
          cell={{ type: type, position: position }}
        />
      ))}
    </>
  );
};

export default GameBlock;
