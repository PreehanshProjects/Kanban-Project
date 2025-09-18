"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TruckIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

interface Action {
  name: string;
  icon: JSX.Element;
  bg: string;
  hover: string;
}

const actions: Action[] = [
  {
    name: "Delivery",
    icon: <TruckIcon className="w-6 h-6 text-blue-600 mb-2" />,
    bg: "bg-blue-50",
    hover: "hover:bg-blue-100",
  },
  {
    name: "Stock",
    icon: <CubeIcon className="w-6 h-6 text-green-600 mb-2" />,
    bg: "bg-green-50",
    hover: "hover:bg-green-100",
  },
  {
    name: "Orders",
    icon: (
      <ClipboardDocumentListIcon className="w-6 h-6 text-yellow-600 mb-2" />
    ),
    bg: "bg-yellow-50",
    hover: "hover:bg-yellow-100",
  },
  {
    name: "Settings",
    icon: <Cog6ToothIcon className="w-6 h-6 text-purple-600 mb-2" />,
    bg: "bg-purple-50",
    hover: "hover:bg-purple-100",
  },
];

export default function QuickActions() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {actions.map((a) => (
          <button
            key={a.name}
            className={`flex flex-col items-center p-4 rounded-lg transition ${a.bg} ${a.hover}`}
          >
            {a.icon}
            <span className="text-sm font-medium">{a.name}</span>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
