import { create } from "zustand";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

export type Card = {
  id: string;
  title: string;
  description?: string;
  assignee?: { name: string; avatar: string };
  status?: "Pending" | "In Progress" | "Done";
  priority?: "High" | "Medium" | "Low";
  createdAt?: string; // ISO string for progress calculation
  deadline?: string; // ISO string
};

export type Column = { id: string; title: string; cardIds: string[] };
export type Board = {
  id: string;
  title: string;
  columns: Column[];
  cards: Record<string, Card>;
};

interface BoardStore {
  boards: Board[];
  selectedBoardId?: string;

  setSelectedBoard: (id: string) => void;
  addBoard: (title: string) => string;
  deleteBoard: (boardId: string) => void;

  addColumn: (boardId: string, title: string) => void;
  renameColumn: (boardId: string, columnId: string, title: string) => void;
  deleteColumn: (boardId: string, columnId: string) => void;

  addCard: (boardId: string, columnId: string, title: string) => void;
  deleteCard: (boardId: string, cardId: string) => void;
  updateCard: (boardId: string, cardId: string, patch: Partial<Card>) => void;

  moveCard: (
    boardId: string,
    fromColumnId: string,
    toColumnId: string,
    cardId: string,
    index?: number
  ) => void;
  moveColumn: (boardId: string, fromIndex: number, toIndex: number) => void;
}

const STORAGE_KEY = "kanban:boards";

const loadBoards = (): Board[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveBoards = (boards: Board[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
  } catch {}
};

export const useBoardStore = create<BoardStore>((set, get) => ({
  boards:
    loadBoards().length > 0
      ? loadBoards()
      : [
          {
            id: nanoid(),
            title: "Demo Board",
            columns: [
              { id: nanoid(), title: "To Do", cardIds: [] },
              { id: nanoid(), title: "In Progress", cardIds: [] },
              { id: nanoid(), title: "Done", cardIds: [] },
            ],
            cards: {},
          },
        ],
  selectedBoardId: undefined,

  setSelectedBoard: (id) => set({ selectedBoardId: id }),

  addBoard: (title) => {
    const newBoard: Board = {
      id: nanoid(),
      title,
      columns: [
        { id: nanoid(), title: "To Do", cardIds: [] },
        { id: nanoid(), title: "In Progress", cardIds: [] },
        { id: nanoid(), title: "Done", cardIds: [] },
      ],
      cards: {},
    };
    set((state) => {
      const boards = [...state.boards, newBoard];
      saveBoards(boards);
      toast.success(`Board "${title}" created!`, {
        style: { background: "#22c55e", color: "#fff" },
      });
      return { boards, selectedBoardId: newBoard.id }; // ✅ auto-select
    });
    return newBoard.id;
  },

  deleteBoard: (boardId) =>
    set((state) => {
      const board = state.boards.find((b) => b.id === boardId);
      if (!board) return { boards: state.boards };
      const boards = state.boards.filter((b) => b.id !== boardId);
      const selectedBoardId =
        state.selectedBoardId === boardId ? undefined : state.selectedBoardId;
      saveBoards(boards);
      toast.error(`Board "${board.title}" deleted`, {
        style: { background: "#ef4444", color: "#fff" },
      });
      return { boards, selectedBoardId };
    }),

  addColumn: (boardId, title) =>
    set((state) => {
      const boards = state.boards.map((b) =>
        b.id === boardId
          ? {
              ...b,
              columns: [...b.columns, { id: nanoid(), title, cardIds: [] }],
            }
          : b
      );
      saveBoards(boards);
      toast.success(`Column "${title}" added!`, {
        style: { background: "#3b82f6", color: "#fff" },
      });
      return { boards };
    }),

  renameColumn: (boardId, columnId, title) =>
    set((state) => {
      const boards = state.boards.map((b) =>
        b.id === boardId
          ? {
              ...b,
              columns: b.columns.map((c) =>
                c.id === columnId ? { ...c, title } : c
              ),
            }
          : b
      );
      saveBoards(boards);
      toast(`Column renamed to "${title}"`, {
        style: { background: "#facc15", color: "#000" },
      });
      return { boards };
    }),

  deleteColumn: (boardId, columnId) =>
    set((state) => {
      const boards = state.boards.map((b) => {
        if (b.id !== boardId) return b;
        const col = b.columns.find((c) => c.id === columnId)!;
        const newCards = { ...b.cards };
        col.cardIds.forEach((id) => delete newCards[id]);
        return {
          ...b,
          columns: b.columns.filter((c) => c.id !== columnId),
          cards: newCards,
        };
      });
      saveBoards(boards);
      toast.error("Column deleted", {
        style: { background: "#ef4444", color: "#fff" },
      });
      return { boards };
    }),

  addCard: (boardId, columnId, title) =>
    set((state) => {
      const boards = state.boards.map((b) => {
        if (b.id !== boardId) return b;
        const id = nanoid();
        const now = new Date().toISOString();
        const newCard: Card = {
          id,
          title,
          status: "Pending",
          priority: "Medium",
          createdAt: now,
        };
        const newCards = { ...b.cards, [id]: newCard };
        const newColumns = b.columns.map((c) =>
          c.id === columnId ? { ...c, cardIds: [...c.cardIds, id] } : c
        );
        toast.success(`Card "${title}" added!`, {
          style: { background: "#3b82f6", color: "#fff" },
        });
        return { ...b, cards: newCards, columns: newColumns };
      });
      saveBoards(boards);
      return { boards };
    }),

  deleteCard: (boardId: string, cardId: string) =>
    set((state) => {
      const boards = state.boards.map((b) => {
        if (b.id !== boardId) return b;

        // Remove card from cards object
        const newCards = { ...b.cards };
        const cardTitle = newCards[cardId]?.title || "Card";
        delete newCards[cardId];

        // Remove cardId from its column
        const newColumns = b.columns.map((c) => ({
          ...c,
          cardIds: c.cardIds.filter((id) => id !== cardId),
        }));

        toast.error(`Card "${cardTitle}" deleted`, {
          style: { background: "#ef4444", color: "#fff" },
        });

        return { ...b, cards: newCards, columns: newColumns };
      });

      saveBoards(boards);
      return { boards };
    }),

  updateCard: (boardId, cardId, patch) =>
    set((state) => {
      const boards = state.boards.map((b) =>
        b.id === boardId
          ? {
              ...b,
              cards: { ...b.cards, [cardId]: { ...b.cards[cardId], ...patch } },
            }
          : b
      );
      saveBoards(boards);
      toast(`Card updated`, {
        style: { background: "#fcd34d", color: "#000" },
      });
      return { boards };
    }),

  moveCard: (boardId, fromColumnId, toColumnId, cardId, index) =>
    set((state) => {
      const boards = state.boards.map((b) => {
        if (b.id !== boardId) return b;
        const fromCol = b.columns.find((c) => c.id === fromColumnId)!;
        const toCol = b.columns.find((c) => c.id === toColumnId)!;
        fromCol.cardIds = fromCol.cardIds.filter((id) => id !== cardId);
        if (index === undefined) toCol.cardIds.push(cardId);
        else toCol.cardIds.splice(index, 0, cardId);

        const cardTitle = b.cards[cardId]?.title || "Card";
        toast(
          fromColumnId !== toColumnId
            ? `Moved "${cardTitle}" to "${toCol.title}"`
            : `Reordered "${cardTitle}"`,
          {
            style: {
              background: fromColumnId !== toColumnId ? "#10b981" : "#3b82f6",
              color: "#fff",
            },
          }
        );

        return b;
      });
      saveBoards(boards);
      return { boards };
    }),

  moveColumn: (boardId, fromIndex, toIndex) =>
    set((state) => {
      const boards = state.boards.map((b) => {
        if (b.id !== boardId) return b;
        const newCols = [...b.columns];
        const [moved] = newCols.splice(fromIndex, 1);
        newCols.splice(toIndex, 0, moved);

        toast(`Moved column "${moved.title}"`, {
          style: { background: "#f97316", color: "#fff" },
        });

        return { ...b, columns: newCols };
      });

      saveBoards(boards); // ✅ now saving the updated state
      return { boards };
    }),
}));
