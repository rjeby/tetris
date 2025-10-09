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

interface Game {
  grid: GridType;
  block: BlockType;
}

type CellType = "I" | "O" | "T" | "L" | "J" | "Z" | "S" | "E";
type GridType = Array<Array<CellType>>;
type BlockType = Array<MemorizePosition>;

export type { CellType, CellPosition, CellProps, GridType, BlockType, Game };
