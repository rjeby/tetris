interface Block {
  type: CellType;
  cells: Array<CellPosition>;
}

interface Bounds {
  minCompleteRowIndex: number;
  maxCompleteRowIndex: number;
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
  bounds: Bounds;
  hasGameStarted: boolean;
  isPending: boolean;
  isGameOver: boolean;
}

interface BlockCellProps {
  cell: Cell;
}

interface GameBlockProps {
  block: Block;
}

interface GameContainerProps {
  grid: Grid;
  block: Block;
  bounds: Bounds;
}

interface GameGridProps {
  grid: Grid;
  bounds: Bounds;
}

interface GameMenuProps {
  onPlayGame: () => void;
}

interface GameOverProps {
  onPlayAgain: () => void;
}

interface GameSidebarProps {
  score: number;
}

interface GridCellProps {
  cell: Cell;
  hasAnimation: boolean;
}

type CellType = "I" | "O" | "T" | "L" | "J" | "Z" | "S" | "E";
type CellColorMap = Record<CellType, string>;
type DeltaMap = Record<Direction, Delta>;
type Direction = "right" | "down" | "left" | "up";
type Grid = Array<Array<CellType>>;
type RotationMatrix = Array<Array<Delta>>;

export type {
  Block,
  BlockCellProps,
  Bounds,
  CellColorMap,
  CellType,
  CleanupInfo,
  DeltaMap,
  Direction,
  GameContainerProps,
  GameBlockProps,
  GameMenuProps,
  GameGridProps,
  GameOverProps,
  GameSidebarProps,
  GameState,
  Grid,
  GridCellProps,
  RotationMatrix,
};
