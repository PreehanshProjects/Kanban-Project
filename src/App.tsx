import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useBoardStore } from "./store/boardStore";
import BoardEditor from "./components/BoardEditor";
import KanbanBoard from "./components/KanbanBoard";
import ConfirmModal from "./components/modal/ConfirmModal";
import { PlusIcon, Squares2X2Icon, TrashIcon } from "@heroicons/react/24/solid";

export default function App() {
  const boards = useBoardStore((s) => s.boards);
  const selectedBoardId = useBoardStore((s) => s.selectedBoardId);
  const setSelected = useBoardStore((s) => s.setSelectedBoard);
  const deleteBoard = useBoardStore((s) => s.deleteBoard);

  const [openEditor, setOpenEditor] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast notifications */}
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center gap-2">
          <Squares2X2Icon className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">Kanban App</h1>
        </div>
        <button
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          onClick={() => setOpenEditor(true)}
        >
          <PlusIcon className="w-5 h-5" />
          New Board
        </button>
      </header>

      {/* Main content */}
      <main className="p-4 flex gap-4">
        {/* Sidebar with boards */}
        <aside className="w-64 bg-white p-4 rounded-lg shadow h-[70vh] overflow-auto">
          <h3 className="mb-3 font-semibold text-gray-700">Boards</h3>
          <ul className="space-y-2">
            {boards.map((b) => (
              <li key={b.id} className="flex justify-between items-center">
                <button
                  className={`w-full text-left flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition ${
                    selectedBoardId === b.id
                      ? "bg-blue-100 font-semibold"
                      : "text-gray-700"
                  }`}
                  onClick={() => setSelected(b.id)}
                >
                  <span>{b.title}</span>
                  {selectedBoardId === b.id && (
                    <Squares2X2Icon className="w-4 h-4 text-blue-500" />
                  )}
                </button>

                {/* Delete Board Button */}
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => setBoardToDelete(b.id)}
                  title="Delete Board"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Kanban board area */}
        <section className="flex-1 bg-white p-4 rounded-lg shadow min-h-[70vh] overflow-auto">
          {selectedBoardId ? (
            <KanbanBoard boardId={selectedBoardId} />
          ) : (
            <div className="text-center text-gray-400 flex flex-col items-center justify-center h-full">
              <Squares2X2Icon className="w-12 h-12 mb-2 text-gray-300" />
              <span>Select a board to get started</span>
            </div>
          )}
        </section>
      </main>

      {/* Board Editor Modal */}
      {openEditor && <BoardEditor onClose={() => setOpenEditor(false)} />}

      {/* Confirm Modal for deleting a board */}
      <ConfirmModal
        isOpen={!!boardToDelete}
        title="Delete Board?"
        message="Are you sure you want to delete this board? All columns and cards will be permanently removed."
        onCancel={() => setBoardToDelete(null)}
        onConfirm={() => {
          if (boardToDelete) deleteBoard(boardToDelete);
          setBoardToDelete(null);
        }}
      />
    </div>
  );
}
