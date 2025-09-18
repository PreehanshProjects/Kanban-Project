"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Project {
  name: string;
  value: number; // percentage
}

const projects: Project[] = [
  { name: "Project Alpha", value: 70 },
  { name: "Project Beta", value: 45 },
  { name: "Project Gamma", value: 90 },
];

export default function ProjectProgress() {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <CardTitle>Project Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((p) => (
          <div key={p.name}>
            <div className="flex justify-between text-sm font-medium text-gray-700">
              <span>{p.name}</span>
              <span>{p.value}%</span>
            </div>
            <Progress value={p.value} className="h-2 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
