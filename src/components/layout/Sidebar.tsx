import React, { useState } from "react";
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
  Bars3Icon,
  XMarkIcon,
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
  const [open, setOpen] = useState(false); // mobile drawer
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [boardsOpen, setBoardsOpen] = useState(true);

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
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between bg-white shadow-md p-4">
        <button onClick={() => setOpen(true)}>
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full bg-white shadow-lg flex flex-col justify-between p-4 transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} 
          md:static md:translate-x-0 md:flex-none
          ${collapsed ? "w-16" : "w-64"}
        `}
      >
        {/* Collapse toggle for desktop */}
        <div className="hidden md:flex justify-end mb-4">
          <button onClick={() => setCollapsed(!collapsed)}>
            <Bars3Icon className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Logo / title */}
          {!collapsed && (
            <h2 className="hidden md:block text-xl font-bold text-gray-700 mb-2">
              Freight App
            </h2>
          )}

          {/* Main navigation */}
          <nav className="space-y-2">
            {items.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition ${
                    isActive
                      ? "bg-blue-100 font-semibold text-blue-600"
                      : "text-gray-700"
                  }`
                }
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </nav>

          {/* Boards section */}
          {!collapsed &&
            boards.length > 0 &&
            onSelectBoard &&
            onDeleteBoard && (
              <div>
                <button
                  className="w-full flex justify-between items-center text-gray-500 uppercase text-xs font-medium mb-2"
                  onClick={() => setBoardsOpen(!boardsOpen)}
                >
                  <span>Boards</span>
                  <span
                    className={`transform transition-transform ${
                      boardsOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {boardsOpen && (
                  <ul className="space-y-1">
                    {boards.map((b) => (
                      <li
                        key={b.id}
                        className="flex justify-between items-center"
                      >
                        <button
                          className={`flex-1 text-left flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 transition ${
                            selectedBoardId === b.id
                              ? "bg-blue-100 font-semibold text-blue-600"
                              : "text-gray-700"
                          }`}
                          onClick={() => {
                            onSelectBoard(b.id);
                            navigate("/kanban");
                            setOpen(false);
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
                )}
              </div>
            )}
        </div>

        {/* Footer */}
        {!collapsed && (
          <div className="mt-4 text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Freight Co.
          </div>
        )}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
