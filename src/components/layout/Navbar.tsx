import React from "react";
import { PlusIcon, Squares2X2Icon } from "@heroicons/react/24/solid";

interface NavbarProps {
  onNewBoard: () => void;
}

export default function Navbar({ onNewBoard }: NavbarProps) {
  return (
    <header className="flex items-center justify-between p-4 bg-themeWhite shadow-md">
      <div className="flex items-center gap-2">
        <Squares2X2Icon className="w-6 h-6 text-themeBlue" />
        <h1 className="text-xl font-bold text-themeBlue">Kanban App</h1>
      </div>
      <button
        className="flex items-center gap-1 px-4 py-2 bg-themeBlue text-themeWhite rounded-lg shadow hover:opacity-90 transition"
        onClick={onNewBoard}
      >
        <PlusIcon className="w-5 h-5" />
        New Board
      </button>
    </header>
  );
}
