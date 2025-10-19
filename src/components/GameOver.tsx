import type { GameOverProps } from "../types";

const GameOver = ({ onPlayAgain }: GameOverProps) => {
  return (
    <div className="justify-centerrounded-2xl flex flex-col gap-4 items-center rounded-2xl border-4 border-gray-500 p-16">
      <span className="text-9xl">GAME OVER</span>
      <button
        type="button"
        className="rounded-2xl bg-gray-200 px-8 py-2 text-4xl hover:scale-125"
        onClick={onPlayAgain}
      >
        Play Again
      </button>
    </div>
  );
};
export default GameOver;
