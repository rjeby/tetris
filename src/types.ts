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
type Direction = "right" | "down" | "left" | "up";
type Grid = Array<Array<CellType>>;

export type {
  Block,
  CellColorMap,
  CleanupInfo,
  Direction,
  GameContainerProps,
  GameBlockProps,
  GameGridProps,
  GameSidebarProps,
  GameState,
  GridCellProps,
};
