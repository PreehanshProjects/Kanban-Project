"use client";

import { motion } from "framer-motion";
import ChartsSection from "@/components/dashboard/ChartsSection";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProjectProgress from "@/components/dashboard/ProjectProgress";
import QuickActions from "@/components/dashboard/QuickActions";
import StatsCards from "@/components/dashboard/StatsCards";
import MainLayout from "@/components/layout/MainLayout";

export default function DashboardPage() {
  const currentUserRole: "SuperAdmin" | "Admin" | "Doyanier" | "Client" =
    "Admin";

  // Animation variants for reusable fade + slide
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MainLayout currentUserRole={currentUserRole}>
      <div className="p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5 }}
        >
          <DashboardHeader />
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StatsCards />
        </motion.div>

        {/* Charts */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ChartsSection />
        </motion.div>

        {/* Project Progress */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ProjectProgress />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <QuickActions />
        </motion.div>
      </div>
    </MainLayout>
  );
}
