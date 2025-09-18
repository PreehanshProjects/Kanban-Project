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
import Column from "./Column";
import Card from "./Card";
import { useBoardStore } from "../store/boardStore";

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

    const activeId = active.id as string;
    const overId = over.id as string;

    // Column drag
    const colIds = board.columns.map((c) => c.id);
    if (colIds.includes(activeId) && colIds.includes(overId)) {
      const oldIndex = colIds.indexOf(activeId);
      const newIndex = colIds.indexOf(overId);
      if (oldIndex !== newIndex) moveColumn(boardId, oldIndex, newIndex);
      return;
    }

    // Card drag
    const fromCol = board.columns.find((c) => c.cardIds.includes(activeId));
    const toCol =
      board.columns.find((c) => c.cardIds.includes(overId)) ||
      board.columns.find((c) => c.id === overId);

    if (!fromCol || !toCol) return;

    // Get the index inside the destination column
    let newIndex = toCol.cardIds.indexOf(overId);
    if (newIndex === -1) newIndex = toCol.cardIds.length;

    moveCard(boardId, fromCol.id, toCol.id, activeId, newIndex);
  };

  return (
    <div>
      <button
        className="mb-2 px-3 py-2 bg-green-600 text-white rounded"
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
            {board.columns.map((c) => (
              <Column
                key={c.id}
                boardId={boardId}
                column={c}
                boardCards={board.cards} // pass all cards
              />
            ))}
          </div>
        </SortableContext>

        <DragOverlay>
          {activeId && board.cards[activeId] ? (
            <Card boardId={boardId} cardId={activeId} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
