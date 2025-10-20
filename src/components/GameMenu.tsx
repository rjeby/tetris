import type { GameMenuProps } from "../types";

const GameMenu = ({ onPlayGame }: GameMenuProps) => {
  return (
    <div className="flex w-xl flex-col items-center justify-center gap-4 rounded-2xl border-4 border-gray-500 py-8">
      <span className="text-8xl">
        <span className="text-cyan-500">T</span>
        <span className="text-orange-500">E</span>
        <span className="text-blue-500">T</span>
        <span className="text-red-500">R</span>
        <span className="text-green-500">I</span>
        <span className="text-yellow-500">S</span>
      </span>
      <div className="mb-16 flex w-2xs flex-col">
        <span className="flex justify-center gap-1">
          <span className="text-red-500">Arrow Up:</span>
          <span className="text-cyan-400">Rotate</span>
        </span>
        <div className="flex justify-between">
          <span className="flex gap-1">
            <span className="text-red-500">Arrow Left:</span>
            <span className="text-cyan-400">Move Left</span>
          </span>
          <span className="flex gap-1">
            <span className="text-red-500">Arrow Right:</span>
            <span className="text-cyan-400">Move Right</span>
          </span>
        </div>
      </div>
      <button
        type="button"
        className="rounded-2xl bg-gray-200 px-8 py-2 text-4xl hover:scale-125"
        onClick={onPlayGame}
      >
        Play
      </button>
    </div>
  );
};

export default GameMenu;
