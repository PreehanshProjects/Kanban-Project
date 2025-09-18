// KanbanPage.tsx
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useBoardStore } from "../core/store/boardStore";
import BoardEditor from "../components/kanban/BoardEditor";
import KanbanBoard from "../components/kanban/KanbanBoard";
import ConfirmModal from "../components/common/ConfirmModal";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function SettingsPage() {
  const boards = useBoardStore((s) => s.boards);
  const selectedBoardId = useBoardStore((s) => s.selectedBoardId);
  const setSelected = useBoardStore((s) => s.setSelectedBoard);
  const deleteBoard = useBoardStore((s) => s.deleteBoard);

  const [openEditor, setOpenEditor] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);

  // Example: You might fetch the current user's role from a store or context
  const currentUserRole: "SuperAdmin" | "Admin" | "Doyanier" | "Client" =
    "Admin";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster position="bottom-right" reverseOrder={false} />

      {/* Navbar */}
      <Navbar onNewBoard={() => setOpenEditor(true)} />

      <div className="flex flex-1 p-4 gap-4">
        {/* Sidebar */}
        <Sidebar
          role={currentUserRole}
          boards={boards}
          selectedBoardId={selectedBoardId ?? null}
          onSelectBoard={setSelected}
          onDeleteBoard={setBoardToDelete}
        />

        {/* Board Area */}
        <section className="flex-1 bg-white p-4 rounded-lg shadow min-h-[70vh] overflow-auto">
          {selectedBoardId ? (
            <KanbanBoard boardId={selectedBoardId} />
          ) : (
            <div className="text-center text-gray-400 flex flex-col items-center justify-center h-full">
              <span>Select a board to get started</span>
            </div>
          )}
        </section>
      </div>

      {/* Board Editor Modal */}
      {openEditor && <BoardEditor onClose={() => setOpenEditor(false)} />}

      {/* Confirm Modal */}
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
