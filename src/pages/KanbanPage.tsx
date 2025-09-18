// src/pages/KanbanPage.tsx
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import BoardEditor from "../components/kanban/BoardEditor";
import KanbanBoard from "../components/kanban/KanbanBoard";
import MainLayout from "../components/layout/MainLayout";
import { useBoardStore } from "../core/store/boardStore";

export default function KanbanPage() {
  const [openEditor, setOpenEditor] = useState(false);
  const selectedBoardId = useBoardStore((s) => s.selectedBoardId);

  const currentUserRole: "SuperAdmin" | "Admin" | "Doyanier" | "Client" =
    "Admin";

  return (
    <MainLayout currentUserRole={currentUserRole}>
      <Toaster position="bottom-right" reverseOrder={false} />

      <section className="bg-white p-4 rounded-lg shadow min-h-[70vh] overflow-auto">
        {selectedBoardId ? (
          <KanbanBoard boardId={selectedBoardId} />
        ) : (
          <div className="text-center text-gray-400 flex flex-col items-center justify-center h-full">
            <span>Select a board to get started</span>
          </div>
        )}
      </section>

      {openEditor && <BoardEditor onClose={() => setOpenEditor(false)} />}
    </MainLayout>
  );
}
