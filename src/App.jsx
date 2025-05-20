// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

import { useReminders }  from "./hooks/useReminders";
import { useAppContext } from "./context/AppContext";

// pages
import Dashboard from "./pages/Dashboard";
import Calendar  from "./pages/Calendar";
import Tasks     from "./pages/Tasks";
import Settings  from "./pages/Settings";

export default function App() {
  // grab darkMode from context
  const { state } = useAppContext();

  // run reminders logic on mount & whenever tasks/events change
  useReminders();

  // build MUI theme based on darkMode toggle
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

          {/* Top nav */}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Student Planner
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/tasks">
                Tasks
              </Button>
              <Button color="inherit" component={Link} to="/calendar">
                Calendar
              </Button>
              <Button color="inherit" component={Link} to="/settings">
                Settings
              </Button>
            </Toolbar>
          </AppBar>

          {/* Main content */}
          <Box sx={{ p: 2 }}>
            <Routes>
              <Route path="/"         element={<Dashboard />} />
              <Route path="/tasks"    element={<Tasks />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
