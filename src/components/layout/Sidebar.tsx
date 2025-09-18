// Sidebar.tsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Squares2X2Icon,
  HomeIcon,
  TruckIcon,
  CubeIcon,
  UserGroupIcon,
  InboxArrowDownIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

interface SidebarItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
  roles: string[];
}

interface SidebarProps {
  role: "SuperAdmin" | "Admin" | "Doyanier" | "Client";
  boards?: { id: string; title: string }[];
  selectedBoardId?: string | null;
  onSelectBoard?: (id: string) => void;
  onDeleteBoard?: (id: string) => void;
}

export default function Sidebar({
  role,
  boards = [],
  selectedBoardId,
  onSelectBoard,
  onDeleteBoard,
}: SidebarProps) {
  const navigate = useNavigate();

  const allItems: SidebarItem[] = [
    {
      id: "home",
      title: "Dashboard",
      icon: <HomeIcon className="w-5 h-5" />,
      path: "/",
      roles: ["SuperAdmin", "Admin"],
    },
    {
      id: "delivery",
      title: "Livraison",
      icon: <TruckIcon className="w-5 h-5" />,
      path: "/delivery",
      roles: ["SuperAdmin", "Admin"],
    },
    {
      id: "stock",
      title: "Gestion de Stock",
      icon: <CubeIcon className="w-5 h-5" />,
      path: "/stock",
      roles: ["SuperAdmin", "Admin"],
    },
    {
      id: "users",
      title: "Gestion d'Utilisateur",
      icon: <UserGroupIcon className="w-5 h-5" />,
      path: "/users",
      roles: ["SuperAdmin", "Admin"],
    },
    {
      id: "reception",
      title: "Reception",
      icon: <InboxArrowDownIcon className="w-5 h-5" />,
      path: "/reception",
      roles: ["SuperAdmin", "Admin"],
    },
    {
      id: "orders",
      title: "Commande",
      icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
      path: "/orders",
      roles: ["SuperAdmin", "Admin"],
    },
    {
      id: "settings",
      title: "Paramètres",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      path: "/settings",
      roles: ["SuperAdmin"],
    },
    {
      id: "profile",
      title: "Profile",
      icon: <UserCircleIcon className="w-5 h-5" />,
      path: "/profile",
      roles: ["SuperAdmin", "Admin", "Doyanier", "Client"],
    },
  ];

  const items = allItems.filter((i) => i.roles.includes(role));

  return (
    <aside className="w-64 bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between h-[calc(100vh-20px)]">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-700 mb-2">Freight App</h2>

        {/* Main Navigation */}
        <nav className="space-y-2">
          {items.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 transition ${
                  isActive
                    ? "bg-blue-100 font-semibold text-blue-600"
                    : "text-gray-700"
                }`
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Boards Section */}
        {boards.length > 0 && onSelectBoard && onDeleteBoard && (
          <div className="mt-6">
            <h3 className="text-gray-500 font-medium uppercase text-xs mb-2">
              Boards
            </h3>
            <ul className="space-y-1">
              {boards.map((b) => (
                <li key={b.id} className="flex justify-between items-center">
                  <button
                    className={`w-full text-left flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition ${
                      selectedBoardId === b.id
                        ? "bg-blue-100 font-semibold text-blue-600"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      onSelectBoard(b.id); // update selected board in store
                      navigate("/kanban"); // go to Kanban page
                    }}
                  >
                    <span>{b.title}</span>
                    {selectedBoardId === b.id && (
                      <Squares2X2Icon className="w-4 h-4 text-blue-500" />
                    )}
                  </button>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => onDeleteBoard(b.id)}
                    title="Delete Board"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Freight Co.
      </div>
    </aside>
  );
}
