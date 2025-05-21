// src/App.jsx

import React from "react";
import {
  BrowserRouter as Router,
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
import Calendar from "./pages/Calendar";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

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
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Student Planner
              </Typography>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/tasks">
                Tasks
              </Button>
              <Button color="inherit" component={Link} to="/calendar">
                Calendar
              </Button>
              <Button color="inherit" component={Link} to="/analytics">
                Analytics
              </Button>
              <Button color="inherit" component={Link} to="/settings">
                Settings
              </Button>
            </Toolbar>
          </AppBar>

          {/* Main content area */}
          <Box sx={{ p: 2 }}>
            <Routes>
              {/* Redirect root to /dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Core pages */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/settings" element={<Settings />} />

              {/* Catch‑all 404 page */}
              <Route
                path="*"
                element={
                  <Typography variant="h5" align="center" sx={{ mt: 4 }}>
                    404 — Page Not Found
                  </Typography>
                }
              />
            </Routes>
          </Box>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
