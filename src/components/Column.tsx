import React, { useState } from "react";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  Bars3Icon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import Card from "./Card";
import ConfirmModal from "./modal/ConfirmModal";
import { useBoardStore } from "../store/boardStore";

type ColumnProps = {
  boardId: string;
  column: any;
  boardCards?: Record<string, any>;
};

export default function Column({
  boardId,
  column,
  boardCards = {},
}: ColumnProps) {
  const addCard = useBoardStore((s) => s.addCard);
  const renameColumn = useBoardStore((s) => s.renameColumn);
  const deleteColumn = useBoardStore((s) => s.deleteColumn);

  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Drag & drop
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;
    addCard(boardId, column.id, newCardTitle.trim());
    setNewCardTitle("");
  };

  const handleDelete = () => {
    deleteColumn(boardId, column.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-50 p-4 rounded-xl shadow-lg w-72 flex-shrink-0 hover:shadow-2xl transition-shadow relative"
      >
        {/* Column Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Drag Handle */}
            <Bars3Icon
              className="w-5 h-5 text-gray-400 cursor-move"
              {...listeners}
              {...attributes}
            />

            {editingTitle ? (
              <input
                className="p-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            ) : (
              <h4 className="font-semibold text-gray-800">{column.title}</h4>
            )}
          </div>

          <div className="flex items-center gap-1">
            {editingTitle ? (
              <button
                onClick={() => {
                  renameColumn(boardId, column.id, title);
                  setEditingTitle(false);
                }}
                className="p-1 ml-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                title="Save"
              >
                <CheckIcon className="ml-2w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setEditingTitle(true)}
                className="p-1 rounded hover:bg-gray-200 transition-colors"
                title="Edit"
              >
                <PencilIcon className="w-4 h-4 text-gray-600" />
              </button>
            )}

            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-1 rounded hover:bg-red-100 transition-colors"
              title="Delete"
            >
              <TrashIcon className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <SortableContext
          items={column.cardIds}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3 mb-3">
            {column.cardIds
              .filter((cid: string) => boardCards[cid])
              .map((cid: string) => (
                <Card key={cid} boardId={boardId} cardId={cid} />
              ))}
          </div>
        </SortableContext>

        {/* Add New Card */}
        <div className="mt-2 flex gap-2">
          <input
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New card"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddCard()}
          />
          <button
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            onClick={handleAddCard}
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reusable Confirm Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        message="Are you sure you want to delete this column?"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}
