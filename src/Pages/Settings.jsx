// src/pages/Settings.jsx
import React from "react";
import {
  Typography,
  Box,
  Switch,
  FormControlLabel,
  TextField,
  Divider
} from "@mui/material";
import { useAppContext } from "../context/AppContext";

export default function Settings() {
  const { state, dispatch } = useAppContext();
  const { darkMode, notificationsEnabled, quietHours } = state.settings;

  const handleQuietHourChange = (key, value) => {
    dispatch({
      type: "SET_QUIET_HOURS",
      payload: {
        ...quietHours,
        [key]: value
      }
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* Theme Toggle */}
      <FormControlLabel
        control={
          <Switch
            checked={darkMode}
            onChange={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
          />
        }
        label="Dark Mode"
      />

      {/* Notification Toggle */}
      <FormControlLabel
        control={
          <Switch
            checked={notificationsEnabled}
            onChange={() => dispatch({ type: "TOGGLE_NOTIFICATIONS" })}
          />
        }
        label="Enable Notifications"
      />

      <Divider sx={{ my: 3 }} />

      {/* Quiet Hours */}
      <Typography variant="h6" gutterBottom>
        Quiet Hours
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Start Time"
          type="time"
          value={quietHours.start}
          onChange={(e) => handleQuietHourChange("start", e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Time"
          type="time"
          value={quietHours.end}
          onChange={(e) => handleQuietHourChange("end", e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Box>
    </Box>
  );
}
