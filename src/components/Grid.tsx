import type { DirectionType, GameType, CleanInfosType } from "../types";
import { useEffect, useRef, useState } from "react";
import { updateGame, GAME_INITIAL_STATE } from "../utils";
import { ROWS, COLS } from "../constants";
import Cell from "./Cell";

const Grid = () => {
  const [game, setGame] = useState<GameType>(GAME_INITIAL_STATE);
  const cleanRef = useRef<CleanInfosType>({
    intervalID: -1,
    handleKeyPress: (event) => event,
  });

  useEffect(() => {
    const pointer = cleanRef.current;
    const handleKeyDown = (event: KeyboardEvent) => handleKeyStroke(event.key);
    cleanRef.current.intervalID = setInterval(() => {
      setGame((game) => updateGameState(game, "down"));
    }, 1000);
    cleanRef.current.handleKeyPress = handleKeyDown;
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(pointer.intervalID);
      window.removeEventListener("keydown", pointer.handleKeyPress);
    };
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
      clearInterval(cleanRef.current.intervalID);
      window.removeEventListener("keydown", cleanRef.current.handleKeyPress);
    }
    return updatedGameState;
  };

  return (
    <>
      {game.isGameOver ? (
        <span className="text-9xl">GAME OVER</span>
      ) : (
        <div className="flex gap-4">
          <div
            tabIndex={0}
            className="grid border-1 border-black"
            style={{
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            }}
          >
            {game.grid.map((row, rowIndex) =>
              row.map((cell, columnIndex) => (
                <Cell key={`${rowIndex}#${columnIndex}`} type={cell} />
              )),
            )}
          </div>
          <div className="flex w-3xs flex-col self-start border-4 border-black py-4 pl-4">
            <span className="text-3xl">
              SCORE : <span className="text-red-500">{game.score}</span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Grid;
