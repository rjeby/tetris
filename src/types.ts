interface Block {
  type: CellType;
  cells: Array<CellPosition>;
}

interface Cell {
  type: CellType;
  position: CellPosition;
}

interface CellPosition {
  row: number;
  column: number;
}

interface CleanupInfo {
  intervalID: number;
  handleKeyPress: (event: KeyboardEvent) => void;
}

interface Delta {
  dr: number;
  dc: number;
}

interface GameState {
  grid: Grid;
  block: Block;
  score: number;
  isGameOver: boolean;
}

interface GameBlockProps {
  block: Block;
}

interface GameContainerProps {
  grid: Grid;
  block: Block;
}

interface GameGridProps {
  grid: Grid;
}

interface GameSidebarProps {
  score: number;
}

interface GridCellProps {
  cell: Cell;
}

type CellType = "I" | "O" | "T" | "L" | "J" | "Z" | "S" | "E";
type CellColorMap = Record<CellType, string>;
type DeltaMap = Record<Direction, Delta>;
type Direction = "right" | "down" | "left" | "up";
type Grid = Array<Array<CellType>>;
type RotationMatrix = Array<Array<Delta>>;

export type {
  Block,
  CellColorMap,
  CellType,
  CleanupInfo,
  DeltaMap,
  Direction,
  GameContainerProps,
  GameBlockProps,
  GameGridProps,
  GameSidebarProps,
  GameState,
  Grid,
  GridCellProps,
  RotationMatrix,
};
