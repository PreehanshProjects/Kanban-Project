import React, { useState, useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  PencilIcon,
  Bars3Icon,
  ClockIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import CardModal from "./CardModal";
import { useBoardStore } from "../../core/store/boardStore";

type CardProps = { boardId: string; cardId: string };

export default function Card({ boardId, cardId }: CardProps) {
  const card = useBoardStore(
    (s) => s.boards.find((b) => b.id === boardId)?.cards[cardId]
  );
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
    Medium: "bg-orange-100 text-orange-800",
    Low: "bg-green-100 text-green-800",
  };

  // Progress bar
  const progressStyle = useMemo(() => {
    if (!card.deadline) return "bg-gray-200";
    const now = new Date().getTime();
    const deadline = new Date(card.deadline).getTime();
    const remaining = deadline - now;
    if (remaining <= 0) return "bg-red-500";
    if (remaining <= 1000 * 60 * 60 * 24) return "bg-orange-400";
    return "bg-green-500";
  }, [card.deadline]);

  const progressValue = useMemo(() => {
    if (!card.deadline) return 100;
    const now = new Date().getTime();
    const deadline = new Date(card.deadline).getTime();
    const created = card.createdAt ? new Date(card.createdAt).getTime() : now;
    const total = deadline - created;
    const remaining = Math.max(deadline - now, 0);
    return total > 0 ? Math.round((remaining / total) * 100) : 0;
  }, [card.deadline, card.createdAt]);

  return (
    <>
      <AnimatePresence>
        <motion.div
          ref={setNodeRef}
          style={style}
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`relative p-5 rounded-2xl shadow-md hover:shadow-xl transition-all bg-white flex flex-col gap-3 border border-gray-200 ${
            isDragging ? "opacity-50" : ""
          } hover:scale-105`}
        >
          {/* Drag Handle */}
          <Bars3Icon
            {...listeners}
            {...attributes}
            className="w-5 h-5 text-gray-400 absolute top-3 left-3 cursor-move hover:text-gray-600"
          />

          {/* Edit Button */}
          <button
            className="absolute top-3 right-3 p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
            onClick={() => setOpenModal(true)}
            title="Edit Card"
          >
            <PencilIcon className="w-4 h-4" />
          </button>

          {/* Title */}
          <h4 className="font-semibold text-gray-800 text-lg mt-2 mb-2">
            {card.title}
          </h4>

          {/* Assignee */}
          {card.assignee && (
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
              <UserIcon className="w-5 h-5 text-gray-400" />
              <img
                src={card.assignee.avatar}
                alt={card.assignee.name}
                className="w-6 h-6 rounded-full border border-gray-200"
              />
              <span>{card.assignee.name}</span>
            </div>
          )}

          {/* Status & Priority */}
          <div className="flex gap-2 flex-wrap mb-2">
            {card.status && (
              <span
                className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${
                  statusColors[card.status]
                }`}
              >
                <ClockIcon className="w-3 h-3" />
                {card.status}
              </span>
            )}
            {card.priority && (
              <span
                className={`flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full ${
                  priorityColors[card.priority]
                }`}
              >
                {card.priority} Priority
              </span>
            )}
          </div>

          {/* Deadline Progress Bar */}
          {card.deadline && (
            <div className="mt-2">
              <div className="text-xs text-gray-500 mb-1">
                Deadline: {new Date(card.deadline).toLocaleDateString()}
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className={`${progressStyle} h-2 rounded-full`}
                  style={{ width: `${100 - progressValue}%` }}
                  layout
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {openModal && (
          <CardModal
            boardId={boardId}
            cardId={cardId}
            onClose={() => setOpenModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
