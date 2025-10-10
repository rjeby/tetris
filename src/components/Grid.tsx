import type { DirectionType, GameType } from "../types";
import { useEffect, useRef, useState } from "react";
import { ROWS, COLS, GAME_INITIAL_STATE, updateGame } from "../utils";
import Cell from "./Cell";

const Grid = () => {
  const [game, setGame] = useState<GameType>(GAME_INITIAL_STATE);
  const gridRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number>(-1);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.focus();
    }
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setGame((game) => updateGameState(game, "down"));
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleKeyStroke = (key: string) => {
    if (["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(key)) {
      const direction = key.substring(5).toLowerCase() as DirectionType;
      setGame((game) => updateGameState(game, direction));
    }
  };

  const updateGameState = (game: GameType, direction: DirectionType) => {
    const updatedGameState = updateGame(game, direction);
    if (updatedGameState.isGameOver) {
      clearInterval(intervalRef.current);
    }
    return updatedGameState;
  };

  return (
    <>
      {game.isGameOver ? (
        <span className="text-9xl">GAME OVER</span>
      ) : (
        <div
          ref={gridRef}
          tabIndex={0}
          className="grid border-1 border-black"
          style={{
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          }}
          onKeyDown={(event) => handleKeyStroke(event.key)}
        >
          {game.grid.map((row, rowIndex) =>
            row.map((cell, columnIndex) => (
              <Cell key={`${rowIndex}#${columnIndex}`} type={cell} />
            )),
          )}
        </div>
      )}
    </>
  );
};

export default Grid;
