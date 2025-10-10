interface CellPosition {
  row: number;
  column: number;
}
interface MemorizePosition {
  previous: CellPosition;
  current: CellPosition;
}
interface CellProps {
  type: CellType;
}

interface GameType {
  grid: GridType;
  block: BlockType;
  isGameOver: boolean;
  intervalId: number;
}

type CellType = "I" | "O" | "T" | "L" | "J" | "Z" | "S" | "E";
type GridType = Array<Array<CellType>>;
type BlockType = Array<MemorizePosition>;
type DirectionType = "right" | "down" | "left";

export type {
  CellType,
  CellPosition,
  CellProps,
  GridType,
  BlockType,
  GameType,
  DirectionType,
};
