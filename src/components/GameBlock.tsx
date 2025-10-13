import type { GameBlockProps } from "../types";
import GridCell from "./GridCell";

const GameBlock = ({ block }: GameBlockProps) => {
  const type = block.type;
  const cellPositions = block.cells;
  return (
    <>
      {cellPositions.map((cellPosition) => (
        <GridCell cell={{ type: type, position: cellPosition }} />
      ))}
    </>
  );
};

export default GameBlock;
