import type { GameOverProps } from "../types";

const GameOver = ({ onPlayAgain }: GameOverProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-4 border-gray-500 p-16">
      <span className="text-9xl">
        <span className="text-green-500">G</span>
        <span className="text-cyan-500">A</span>
        <span className="text-orange-500">M</span>
        <span className="text-blue-500">E</span>
        {" "}
        <span className="text-yellow-500">O</span>
        <span className="text-red-500">V</span>
        <span className="text-green-500">E</span>
        <span className="text-cyan-500">R</span>
      </span>
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
