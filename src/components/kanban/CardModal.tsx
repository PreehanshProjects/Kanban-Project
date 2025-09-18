import React, { useState } from "react";
import { useBoardStore, Card as CardType } from "../../core/store/boardStore";
import ConfirmModal from "../common/ConfirmModal";
import { TrashIcon } from "@heroicons/react/24/solid";

type Status = "Pending" | "In Progress" | "Done";
type Priority = "High" | "Medium" | "Low";

type CardModalProps = {
  boardId: string;
  cardId: string;
  onClose: () => void;
};

export default function CardModal({
  boardId,
  cardId,
  onClose,
}: CardModalProps) {
  const card: CardType = useBoardStore(
    (s) => s.boards.find((b) => b.id === boardId)!.cards[cardId]
  );
  const updateCard = useBoardStore((s) => s.updateCard);
  const deleteCard = useBoardStore((s) => s.deleteCard);

  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description ?? "");
  const [assignee, setAssignee] = useState(
    card.assignee ?? { name: "", avatar: "" }
  );
  const [status, setStatus] = useState<Status>(card.status ?? "Pending");
  const [priority, setPriority] = useState<Priority>(card.priority ?? "Medium");
  const [deadline, setDeadline] = useState<string>(
    card.deadline ? new Date(card.deadline).toISOString().split("T")[0] : ""
  );
  const [confirmOpen, setConfirmOpen] = useState(false);

  const save = () => {
    updateCard(boardId, cardId, {
      title,
      description,
      assignee,
      status,
      priority,
      deadline: deadline || undefined,
    });
    onClose();
  };

  const handleDelete = () => {
    deleteCard(boardId, cardId);
    setConfirmOpen(false);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg max-w-lg w-full space-y-3 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl font-semibold mb-2">Edit Card</h3>

          {/* Title */}
          <input
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          {/* Description */}
          <textarea
            className="w-full p-2 border rounded h-24"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          {/* Assignee */}
          <div className="flex gap-2">
            <input
              className="flex-1 p-2 border rounded"
              placeholder="Assignee Name"
              value={assignee.name}
              onChange={(e) =>
                setAssignee({ ...assignee, name: e.target.value })
              }
            />
            <input
              className="flex-1 p-2 border rounded"
              placeholder="Avatar URL"
              value={assignee.avatar}
              onChange={(e) =>
                setAssignee({ ...assignee, avatar: e.target.value })
              }
            />
          </div>

          {/* Status */}
          <select
            className="w-full p-2 border rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          {/* Priority */}
          <select
            className="w-full p-2 border rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Deadline */}
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          {/* Actions */}
          <div className="flex justify-between mt-2 items-center">
            {/* Trash icon for delete */}
            <button
              className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
              onClick={() => setConfirmOpen(true)}
              title="Delete Card"
            >
              <TrashIcon className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={save}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete Card"
        message="Are you sure you want to delete this card? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
