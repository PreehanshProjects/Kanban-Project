import React, { useState } from "react";
import { useBoardStore, Card as CardType } from "../../store/boardStore";

type CardModalProps = { boardId: string; cardId: string; onClose: () => void };

export default function CardModal({
  boardId,
  cardId,
  onClose,
}: CardModalProps) {
  const card: CardType = useBoardStore(
    (s) => s.boards.find((b) => b.id === boardId)!.cards[cardId]
  );
  const updateCard = useBoardStore((s) => s.updateCard);

  type Status = "Pending" | "In Progress" | "Done";
  type Priority = "High" | "Medium" | "Low";

  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || "");
  const [assignee, setAssignee] = useState(
    card.assignee || { name: "", avatar: "" }
  );
  const [status, setStatus] = useState<Status>(card.status || "Pending");
  const [priority, setPriority] = useState<Priority>(card.priority || "Medium");

  const save = () => {
    updateCard(boardId, cardId, {
      title,
      description,
      assignee,
      status,
      priority,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4">Edit Card</h3>
        <input
          className="w-full p-2 border rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="w-full p-2 border rounded mb-3 h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div className="flex gap-2 mb-3">
          <input
            className="flex-1 p-2 border rounded"
            placeholder="Assignee Name"
            value={assignee.name}
            onChange={(e) => setAssignee({ ...assignee, name: e.target.value })}
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
        <select
          className="w-full p-2 border rounded mb-3"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <select
          className="w-full p-2 border rounded mb-4"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <div className="flex justify-end gap-2">
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
  );
}
