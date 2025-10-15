import type { CleanupInfo, Direction, GameState } from "../types";
import { useEffect, useState, useRef } from "react";
import { GAME_INITIAL_STATE, PERIOD } from "../constants";
import GameSidebar from "./GameSidebar";
import GameContainer from "./GameContainer";

import { updateGameState } from "../utils";

// Game Component

const Game = () => {
  const game = useGame();
  return (
    <>
      <div className="flex gap-4">
        <GameContainer grid={game.grid} block={game.block} />
        <GameSidebar score={game.score} />
      </div>
    </>
  );
};

// Custom Hook

const useGame = () => {
  const [game, setGame] = useState<GameState>(GAME_INITIAL_STATE);
  const cleanupRef = useRef<CleanupInfo>({
    intervalID: -1,
    handleKeyPress: (event) => event,
  });

  const handleKeyStroke = (key: string) => {
    if (["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(key)) {
      const direction = key.substring(5).toLowerCase() as Direction;
      setGame((game) => updateGameState(game, direction));
    }
  };

  useEffect(() => {
    const cleanup = cleanupRef.current;
    const handleKeyDown = (event: KeyboardEvent) => handleKeyStroke(event.key);
    window.addEventListener("keydown", handleKeyDown);
    cleanup.intervalID = setInterval(() => {
      setGame((game) => updateGameState(game, "down"));
    }, PERIOD);
    cleanup.handleKeyPress = handleKeyDown;
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(cleanup.intervalID);
    };
  }, []);

  return game;
};

export default Game;
