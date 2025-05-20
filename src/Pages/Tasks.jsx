// src/pages/Tasks.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddEditModal from "../components/AddEditModal";
import { useAppContext } from "../context/AppContext";

export default function Tasks() {
  const { state, dispatch } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openAdd = () => {
    setEditingTask(null);
    setModalOpen(true);
  };
  const openEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSubmit = (data) => {
    dispatch({
      type: editingTask ? "EDIT_TASK" : "ADD_TASK",
      payload: data
    });
    setModalOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Task Management
      </Typography>

      <Button variant="contained" onClick={openAdd} sx={{ mb: 2 }}>
        + New Task
      </Button>

      <List>
        {state.tasks.map((task) => (
          <ListItem key={task.id}>
            <Checkbox
              edge="start"
              checked={!!task.completed}
              onChange={() =>
                dispatch({ type: "TOGGLE_TASK_COMPLETED", payload: task.id })
              }
            />
            <ListItemText
              primary={task.title}
              secondary={new Date(task.due).toLocaleString()}
            />

            {/* Priority chip */}
            {task.priority && (
              <Chip
                label={task.priority}
                size="small"
                sx={{ mr: 1 }}
              />
            )}

            {/* Inline priority selector */}
            <FormControl size="small" sx={{ minWidth: 120, mr: 1 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={task.priority || ""}
                label="Priority"
                onChange={(e) =>
                  dispatch({
                    type: "SET_TASK_PRIORITY",
                    payload: { id: task.id, priority: e.target.value }
                  })
                }
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>

            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => openEdit(task)}>
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={() =>
                  dispatch({ type: "DELETE_TASK", payload: task.id })
                }
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Reuse AddEditModal for tasks */}
      <AddEditModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode="task"
        itemToEdit={editingTask}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
