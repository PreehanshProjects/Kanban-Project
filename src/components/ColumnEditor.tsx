import React, { useState } from "react";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";
import { useBoardStore } from "../store/boardStore";

export default function Column({
  boardId,
  column,
}: {
  boardId: string;
  column: any;
}) {
  const addCard = useBoardStore((s) => s.addCard);
  const renameColumn = useBoardStore((s) => s.renameColumn);
  const deleteColumn = useBoardStore((s) => s.deleteColumn);

  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [newCardTitle, setNewCardTitle] = useState("");

  // Column draggable
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;
    addCard(boardId, column.id, newCardTitle.trim());
    setNewCardTitle("");
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-gray-100 p-3 rounded w-72 flex-shrink-0 relative"
    >
      <div className="flex justify-between items-center mb-2">
        {editingTitle ? (
          <input
            className="p-1 rounded flex-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h4 className="font-semibold flex-1">{column.title}</h4>
        )}
        <div className="flex gap-1 ml-2">
          {editingTitle ? (
            <button
              onClick={() => {
                renameColumn(boardId, column.id, title);
                setEditingTitle(false);
              }}
              className="text-sm"
            >
              Save
            </button>
          ) : (
            <button onClick={() => setEditingTitle(true)} className="text-sm">
              Edit
            </button>
          )}
          <button
            onClick={() => deleteColumn(boardId, column.id)}
            className="text-sm text-red-600"
          >
            Del
          </button>
        </div>
      </div>

      {/* Cards */}
      <SortableContext
        items={column.cardIds}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 mb-2">
          {column.cardIds.map((cid: string) => (
            <Card key={cid} boardId={boardId} cardId={cid} />
          ))}
        </div>
      </SortableContext>

      {/* Add new card */}
      <div className="mt-2">
        <input
          className="w-full p-2 border rounded mb-1"
          placeholder="New card"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddCard()}
        />
        <button
          className="w-full p-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          type="button"
          onClick={handleAddCard}
        >
          Add Card
        </button>
      </div>

      {/* Drag handle overlay (optional) */}
      <div {...listeners} className="absolute top-0 left-0 w-full h-full z-0" />
    </div>
  );
}
