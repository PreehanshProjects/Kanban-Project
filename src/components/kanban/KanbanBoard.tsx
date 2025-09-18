import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion, AnimatePresence } from "framer-motion";

import { useBoardStore } from "../../core/store/boardStore";
import Column from "./Column";
import Card from "./Card";

export default function KanbanBoard({ boardId }: { boardId: string }) {
  const board = useBoardStore((s) => s.boards.find((b) => b.id === boardId)!);
  const addColumn = useBoardStore((s) => s.addColumn);
  const moveColumn = useBoardStore((s) => s.moveColumn);
  const moveCard = useBoardStore((s) => s.moveCard);

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) return;

    const activeIdStr = active.id as string;
    const overIdStr = over.id as string;

    // Column drag
    const colIds = board.columns.map((c) => c.id);
    if (colIds.includes(activeIdStr) && colIds.includes(overIdStr)) {
      const oldIndex = colIds.indexOf(activeIdStr);
      const newIndex = colIds.indexOf(overIdStr);
      if (oldIndex !== newIndex) moveColumn(boardId, oldIndex, newIndex);
      return;
    }

    // Card drag
    const fromCol = board.columns.find((c) => c.cardIds.includes(activeIdStr));
    const toCol =
      board.columns.find((c) => c.cardIds.includes(overIdStr)) ||
      board.columns.find((c) => c.id === overIdStr);

    if (!fromCol || !toCol) return;

    let newIndex = toCol.cardIds.indexOf(overIdStr);
    if (newIndex === -1) newIndex = toCol.cardIds.length;

    moveCard(boardId, fromCol.id, toCol.id, activeIdStr, newIndex);
  };

  return (
    <div>
      {/* Add Column */}
      <button
        className="mb-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        onClick={() => addColumn(boardId, "New Column")}
      >
        + Add Column
      </button>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={board.columns.map((c) => c.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-4 overflow-auto p-2">
            <AnimatePresence initial={false}>
              {board.columns.map((c) => (
                <motion.div
                  key={c.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex-shrink-0"
                >
                  <Column
                    boardId={boardId}
                    column={c}
                    boardCards={board.cards}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>

        {/* Column Drag Overlay */}
        <DragOverlay>
          {activeId && board.columns.find((col) => col.id === activeId) && (
            <motion.div
              className="w-72 p-4 bg-blue-100 border-2 border-blue-400 rounded-xl shadow-lg"
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {board.columns.find((col) => col.id === activeId)?.title}
            </motion.div>
          )}
        </DragOverlay>

        {/* Card Drag Overlay */}
        <DragOverlay>
          {activeId && board.cards[activeId] && (
            <Card boardId={boardId} cardId={activeId} />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
