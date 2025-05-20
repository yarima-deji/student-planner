// src/pages/Dashboard.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import AddEditModal from "../components/AddEditModal";
import { useAppContext } from "../context/AppContext";

export default function Dashboard() {
  const { state, dispatch } = useAppContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("task");
  const [editingItem, setEditingItem] = useState(null);

  const openAddModal = (mode) => {
    setModalMode(mode);
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item, mode) => {
    setModalMode(mode);
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleSubmit = (data) => {
    const type =
      modalMode === "task"
        ? (editingItem ? "EDIT_TASK" : "ADD_TASK")
        : (editingItem ? "EDIT_EVENT" : "ADD_EVENT");
    dispatch({ type, payload: data });
    setModalOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      {/* Add Buttons */}
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          sx={{ mr: 1 }}
          onClick={() => openAddModal("task")}
        >
          + New Task
        </Button>
        <Button variant="outlined" onClick={() => openAddModal("event")}>
          + New Event
        </Button>
      </Box>

      {/* Task List */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Tasks
      </Typography>
      <List dense>
        {state.tasks.map((task, idx) => (
          <ListItem key={`${task.id}-${idx}`} disablePadding>
            <ListItemButton onClick={() => openEditModal(task, "task")}>
              <ListItemText
                primary={task.title}
                secondary={new Date(task.due).toLocaleString()}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Event List */}
      <Typography variant="h6">Events</Typography>
      <List dense>
        {state.events.map((evt, idx) => (
          <ListItem key={`${evt.id}-${idx}`} disablePadding>
            <ListItemButton onClick={() => openEditModal(evt, "event")}>
              <ListItemText
                primary={evt.title}
                secondary={new Date(evt.time).toLocaleString()}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Add/Edit Modal */}
      <AddEditModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        itemToEdit={editingItem}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
