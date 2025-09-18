import React, { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useBoardStore } from "../../core/store/boardStore";
import BoardEditor from "../kanban/BoardEditor";
import ConfirmModal from "../common/ConfirmModal";

type MainLayoutProps = {
  children: ReactNode;
  currentUserRole: "SuperAdmin" | "Admin" | "Doyanier" | "Client";
};

export default function MainLayout({
  children,
  currentUserRole,
}: MainLayoutProps) {
  const boards = useBoardStore((s) => s.boards);
  const selectedBoardId = useBoardStore((s) => s.selectedBoardId);
  const setSelected = useBoardStore((s) => s.setSelectedBoard);
  const deleteBoardStore = useBoardStore((s) => s.deleteBoard);

  const [openEditor, setOpenEditor] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-themeWhite flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar
          role={currentUserRole}
          boards={boards}
          selectedBoardId={selectedBoardId ?? null}
          onSelectBoard={setSelected}
          onDeleteBoard={(id) => setBoardToDelete(id)}
        />
        <main className="flex-1 p-4">{children}</main>
      </div>

      {/* Board editor modal */}
      {openEditor && <BoardEditor onClose={() => setOpenEditor(false)} />}

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={!!boardToDelete}
        title="Delete Board?"
        message="Are you sure you want to delete this board? All columns and cards will be permanently removed."
        onCancel={() => setBoardToDelete(null)}
        onConfirm={() => {
          if (boardToDelete) deleteBoardStore(boardToDelete);
          setBoardToDelete(null);
        }}
      />
    </div>
  );
}
