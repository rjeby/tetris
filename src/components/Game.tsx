import type { CleanupInfo, Direction, GameState } from "../types";
import { useEffect, useState, useRef } from "react";
import { GAME_INITIAL_STATE, PERIOD } from "../constants";
import GameSidebar from "./GameSidebar";
import GameContainer from "./GameContainer";
import { updatePendingGameState, updateRunningGameState } from "../utils";
import GameOver from "./GameOver";
import GameMenu from "./GameMenu";

// Game Component

const Game = () => {
  const {
    game: game,
    handlePlayGame: handlePlayGame,
    handlePlayAgain: handlePlayAgain,
  } = useGame();

  return (
    <>
      {!game.hasGameStarted && <GameMenu onPlayGame={handlePlayGame} />}
      {game.hasGameStarted && game.isGameOver && (
        <GameOver onPlayAgain={handlePlayAgain} />
      )}
      {game.hasGameStarted && !game.isGameOver && (
        <>
          <div className="flex gap-4">
            <GameContainer
              grid={game.grid}
              block={game.block}
              completeRowPositions={game.completeRowPositions}
            />
            <GameSidebar score={game.score} />
          </div>
        </>
      )}
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
      setGame((game) => updateRunningGameState(game, direction));
    }
  };

  const handlePlayAgain = () => {
    setGame(() => ({ ...GAME_INITIAL_STATE, isGameOver: false }));
  };

  const handlePlayGame = () => {
    const cleanup = cleanupRef.current;
    const handleKeyDown = (event: KeyboardEvent) => handleKeyStroke(event.key);
    setGame(() => ({ ...GAME_INITIAL_STATE, hasGameStarted: true }));
    window.addEventListener("keydown", handleKeyDown);
    cleanup.intervalID = setInterval(() => {
      setGame((game) => updateRunningGameState(game, "down"));
    }, PERIOD);
    cleanup.handleKeyPress = handleKeyDown;
  };

  useEffect(() => {
    if (game.isGameOver) {
      window.removeEventListener("keydown", cleanupRef.current.handleKeyPress);
      clearInterval(cleanupRef.current.intervalID);
    }

    if (!game.isPending) {
      return;
    }
    setTimeout(() => {
      setGame((game) => updatePendingGameState(game));
    }, PERIOD);
  }, [game]);

  return {
    game: game,
    handlePlayAgain: handlePlayAgain,
    handlePlayGame: handlePlayGame,
  };
};

export default Game;
