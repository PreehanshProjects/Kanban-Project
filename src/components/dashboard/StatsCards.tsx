import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";

export default function StatsCards() {
  const stats = [
    {
      title: "Total Projects",
      value: 12,
      subtitle: "Active Projects",
      icon: <HomeIcon className="w-6 h-6 text-blue-500" />,
    },
    {
      title: "Users",
      value: 87,
      subtitle: "Total Users",
      icon: <UserGroupIcon className="w-6 h-6 text-green-500" />,
    },
    {
      title: "Orders",
      value: 34,
      subtitle: "Pending Orders",
      icon: <ClipboardDocumentListIcon className="w-6 h-6 text-yellow-500" />,
    },
    {
      title: "Stock",
      value: 240,
      subtitle: "Items in Stock",
      icon: <CubeIcon className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((s) => (
        <Card key={s.title} className="border border-gray-200">
          <CardHeader className="flex items-center gap-2">
            {s.icon}
            <CardTitle>{s.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-gray-500 text-sm mt-1">{s.subtitle}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
