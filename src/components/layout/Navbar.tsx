import React from "react";
import { Squares2X2Icon } from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-4 bg-themeWhite shadow-md">
      <div className="flex items-center gap-2">
        <Squares2X2Icon className="w-6 h-6 text-themeBlue" />
        <h1 className="text-xl font-bold text-themeBlue">Kanban App</h1>
      </div>
    </header>
  );
}
