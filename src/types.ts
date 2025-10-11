interface CellPosition {
  row: number;
  column: number;
}
interface MemorizePosition {
  cellType: CellType;
  previous: CellPosition;
  current: CellPosition;
}
interface CellProps {
  type: CellType;
}

interface GameType {
  grid: GridType;
  block: BlockType;
  score: number;
  isGameOver: boolean;
}

interface CleanInfosType {
  intervalID: number;
  handleKeyPress: (event: KeyboardEvent) => void;
}

type CellType = "I" | "O" | "T" | "L" | "J" | "Z" | "S" | "E";
type BlockCellType = "I" | "O" | "T" | "L" | "J" | "Z" | "S";
type GridType = Array<Array<CellType>>;
type BlockType = Array<MemorizePosition>;
type DirectionType = "right" | "down" | "left" | "up";

export type {
  CellType,
  BlockCellType,
  CellPosition,
  CellProps,
  GridType,
  BlockType,
  GameType,
  DirectionType,
  CleanInfosType,
};
