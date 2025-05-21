// src/pages/Analytics.jsx
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { Chart } from "react-google-charts";
import { useAppContext } from "../context/AppContext";

export default function Analytics() {
  const theme = useTheme();
  const { state } = useAppContext();
  const { tasks } = state;

  // Count completed vs pending
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount   = tasks.length - completedCount;

  // Build time‑series: last 7 days
  const today = new Date();
  const dayLabels = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  });

  const completedByDay = dayLabels.map(label => {
    const target = new Date(label);
    return tasks.filter(t => {
      if (!t.completedAt) return false;
      const d = new Date(t.completedAt);
      return (
        d.getDate() === target.getDate() &&
        d.getMonth() === target.getMonth() &&
        d.getFullYear() === target.getFullYear()
      );
    }).length;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Progress & Analytics
      </Typography>

      {/* Pie chart */}
      <Chart
        width={'100%'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading…</div>}
        data={[
          ['Status', 'Count'],
          ['Completed', completedCount],
          ['Pending',   pendingCount],
        ]}
        options={{
          legend: { position: 'bottom' },
          backgroundColor: 'transparent',
          pieSliceText: 'percentage',
          slices: {
            0: { color: theme.palette.primary.main },
            1: { color: theme.palette.error.main },
          },
        }}
      />

      {/* Bar chart */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Tasks Completed Last 7 Days
        </Typography>
        <Chart
          width={'100%'}
          height={'300px'}
          chartType="ColumnChart"
          loader={<div>Loading…</div>}
          data={[
            ['Day', 'Completed'],
            ...dayLabels.map((label, idx) => [label, completedByDay[idx]]),
          ]}
          options={{
            backgroundColor: 'transparent',
            legend: { position: 'none' },
            hAxis: { title: 'Day' },
            vAxis: { title: 'Count', minValue: 0 },
            colors: [theme.palette.primary.main],
          }}
        />
      </Box>
    </Box>
  );
}
