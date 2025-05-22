// src/App.jsx
import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import {
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

import { useReminders } from "./hooks/useReminders";
import { useAppContext } from "./context/AppContext";

// pages
import Dashboard from "./pages/Dashboard";
import Calendar  from "./pages/Calendar";
import Tasks     from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import Settings  from "./pages/Settings";

export default function App() {
  const { state } = useAppContext();
  useReminders();

  const theme = createTheme({
    palette: {
      mode: state.settings.darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Router>
          <CssBaseline />

          {/* Top navigation bar */}
          <AppBar position="static">
            <Toolbar sx={{ flexWrap: "wrap" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Student Planner</Typography>
                <Typography variant="caption">Project By Iman</Typography>
              </Box>

              <Button
                color="inherit"
                component={Link}
                to="/dashboard"
                sx={{ ml: 1, my: 0.5 }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/tasks"
                sx={{ ml: 1, my: 0.5 }}
              >
                Tasks
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/calendar"
                sx={{ ml: 1, my: 0.5 }}
              >
                Calendar
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/analytics"
                sx={{ ml: 1, my: 0.5 }}
              >
                Analytics
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/settings"
                sx={{ ml: 1, my: 0.5 }}
              >
                Settings
              </Button>
            </Toolbar>
          </AppBar>

          {/* Main content area */}
          <Box sx={{ p: 2 }}>
            <Routes>
              {/* Redirect root → Dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Core pages */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks"     element={<Tasks />} />
              <Route path="/calendar"  element={<Calendar />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings"  element={<Settings />} />

              {/* Fallback: everything else → Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Box>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
