import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PencilIcon, Bars3Icon } from "@heroicons/react/24/solid";
import CardModal from "./modal/CardModal";
import { useBoardStore } from "../store/boardStore";

type CardProps = { boardId: string; cardId: string };

export default function Card({ boardId, cardId }: CardProps) {
  const card = useBoardStore(
    (s) => s.boards.find((b) => b.id === boardId)?.cards[cardId]
  );

  // Guard against missing card
  if (!card) return null;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cardId });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const [openModal, setOpenModal] = useState(false);

  const statusColors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Done: "bg-green-100 text-green-800",
  };

  const priorityColors: Record<string, string> = {
    High: "bg-red-100 text-red-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800",
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`relative p-5 rounded-2xl shadow-md hover:shadow-lg transition-all bg-white flex flex-col gap-3 ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        {/* Drag Handle */}
        <Bars3Icon
          {...listeners}
          {...attributes}
          className="w-5 h-5 text-gray-400 absolute top-3 left-3 cursor-move hover:text-gray-600"
        />

        {/* Title */}
        <h4 className="font-semibold text-gray-800 text-lg mt-2 mb-2">
          {card.title}
        </h4>

        {/* Assignee */}
        {card.assignee && (
          <div className="flex items-center gap-3 mt-1 mb-2">
            <img
              src={card.assignee.avatar}
              alt={card.assignee.name}
              className="w-7 h-7 rounded-full border border-gray-200"
            />
            <span className="text-sm text-gray-700">{card.assignee.name}</span>
          </div>
        )}

        {/* Status & Priority */}
        <div className="flex gap-3 flex-wrap mt-1 mb-2">
          {card.status && (
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                statusColors[card.status]
              }`}
            >
              {card.status}
            </span>
          )}
          {card.priority && (
            <span
              className={`text-xs font-medium px-3 py-1 rounded-full ${
                priorityColors[card.priority]
              }`}
            >
              {card.priority} Priority
            </span>
          )}
        </div>

        {/* Edit Button */}
        <button
          className="absolute top-3 right-3 p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
          onClick={() => setOpenModal(true)}
          title="Edit Card"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
      </div>

      {openModal && (
        <CardModal
          boardId={boardId}
          cardId={cardId}
          onClose={() => setOpenModal(false)}
        />
      )}
    </>
  );
}
