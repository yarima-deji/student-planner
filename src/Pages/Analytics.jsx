// src/pages/Analytics.jsx
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { Chart } from "react-google-charts";
import { useAppContext } from "../context/AppContext";
import { parseISO, format, subDays, isSameDay } from "date-fns";

export default function Analytics() {
  const { state } = useAppContext();
  const { tasks } = state;

  // 1) Pie: completed vs pending
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount   = tasks.length - completedCount;
  const pieData = [
    ["Status", "Count"],
    ["Completed", completedCount],
    ["Pending", pendingCount],
  ];

  // 2) Bar: last 7 days completed
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => subDays(today, 6 - i));
  const barData = [
    ["Day", "Completed"],
    ...days.map((day) => {
      const count = tasks.filter((t) => {
        if (!t.completed || !t.completedAt) return false;
        return isSameDay(parseISO(t.completedAt), day);
      }).length;
      return [format(day, "EEE"), count];
    }),
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Progress & Analytics
      </Typography>

      {/* Completed vs Pending */}
      <Typography variant="h6" gutterBottom>
        Task Status Breakdown
      </Typography>
      <Chart
        width={"100%"}
        height={300}
        chartType="PieChart"
        data={pieData}
        options={{
          legend: { position: "bottom" },
          chartArea: { width: "80%", height: "70%" },
        }}
      />

      <Divider sx={{ my: 4 }} />

      {/* Completed per Day */}
      <Typography variant="h6" gutterBottom>
        Tasks Completed Last 7 Days
      </Typography>
      <Chart
        width={"100%"}
        height={300}
        chartType="ColumnChart"
        data={barData}
        options={{
          legend: { position: "none" },
          chartArea: { width: "80%", height: "70%" },
          vAxis: { minValue: 0 },
        }}
      />
    </Box>
  );
}
