// src/components/layout/MainLayout.tsx
import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useBoardStore } from "../../core/store/boardStore";

interface MainLayoutProps {
  children: ReactNode;
  currentUserRole: "SuperAdmin" | "Admin" | "Doyanier" | "Client";
}

export default function MainLayout({
  children,
  currentUserRole,
}: MainLayoutProps) {
  const boards = useBoardStore((s) => s.boards);
  const selectedBoardId = useBoardStore((s) => s.selectedBoardId);
  const setSelected = useBoardStore((s) => s.setSelectedBoard);
  const deleteBoard = useBoardStore((s) => s.deleteBoard);

  function setOpenEditor(arg0: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar onNewBoard={() => setOpenEditor(true)} />
      <div className="flex flex-1">
        <Sidebar
          role={currentUserRole}
          boards={boards}
          selectedBoardId={selectedBoardId ?? null}
          onSelectBoard={setSelected}
          onDeleteBoard={deleteBoard}
        />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
