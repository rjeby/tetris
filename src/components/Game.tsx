import type { GameState } from "../types";
import { useState } from "react";
import { GAME_INITIAL_STATE } from "../constants";
import GameSidebar from "./GameSidebar";
import GameContainer from "./GameContainer";

const Game = () => {
  const [game, setGame] = useState<GameState>(GAME_INITIAL_STATE);
  // const cleanRef = useRef<CleanInfosType>({
  //   intervalID: -1,
  //   handleKeyPress: (event) => event,
  // });

  // useEffect(() => {
  //   const pointer = cleanRef.current;
  //   const handleKeyDown = (event: KeyboardEvent) => handleKeyStroke(event.key);
  //   cleanRef.current.intervalID = setInterval(() => {
  //     setGame((game) => updateGameState(game, "down"));
  //   }, 1000);
  //   cleanRef.current.handleKeyPress = handleKeyDown;
  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     clearInterval(pointer.intervalID);
  //     window.removeEventListener("keydown", pointer.handleKeyPress);
  //   };
  // }, []);

  // const handleKeyStroke = (key: string) => {
  //   if (["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(key)) {
  //     const direction = key.substring(5).toLowerCase() as DirectionType;
  //     setGame((game) => updateGameState(game, direction));
  //   }
  // };

  // const updateGameState = (game: GameType, direction: DirectionType) => {
  //   const updatedGameState = updateGame(game, direction);
  //   if (updatedGameState.isGameOver) {
  //     clearInterval(cleanRef.current.intervalID);
  //     window.removeEventListener("keydown", cleanRef.current.handleKeyPress);
  //   }
  //   return updatedGameState;
  // };

  return (
    <>
      <div className="flex gap-4">
        <GameContainer grid={game.grid} block={game.block} />
        <GameSidebar score={game.score} />
      </div>
    </>
  );
};

export default Game;
