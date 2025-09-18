// BoardEditor.tsx
import React, { useState } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "../store/boardStore";

interface BoardEditorProps {
  onClose: () => void;
}

export default function BoardEditor({ onClose }: BoardEditorProps) {
  const [title, setTitle] = useState("");
  const addBoard = useBoardStore((s) => s.addBoard);

  const handleCreate = () => {
    if (!title.trim()) return;
    addBoard(title.trim());
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-80 p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 transition"
          onClick={onClose}
          aria-label="Close modal"
        >
          <XMarkIcon className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
          <PlusIcon className="w-5 h-5 text-blue-600" />
          New Board
        </h2>

        {/* Input */}
        <input
          type="text"
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Board name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-1"
          >
            <PlusIcon className="w-4 h-4" />
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
