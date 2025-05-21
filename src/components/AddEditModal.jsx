// src/components/AddEditModal.jsx

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function AddEditModal({
  open,
  onClose,
  onSubmit,
  mode,
  itemToEdit,
  onDelete,
  onToggleComplete,
}) {
  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");

  // Prefill when editing
  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title || "");
      setDatetime(itemToEdit.due ?? itemToEdit.time ?? "");
    } else {
      setTitle("");
      setDatetime("");
    }
  }, [itemToEdit]);

  const handleSave = () => {
    const newItem = {
      id: itemToEdit?.id || uuidv4(),
      title: title.trim(),
      ...(mode === "task" ? { due: datetime } : { time: datetime }),
    };
    onSubmit(newItem);
    onClose();
  };

  const isTask = mode === "task";
  const canToggle = isTask && typeof itemToEdit?.completed === "boolean";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {itemToEdit
          ? `Edit ${isTask ? "Task" : "Event"}`
          : `Add New ${isTask ? "Task" : "Event"}`}
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          fullWidth
          margin="normal"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label={isTask ? "Due Date & Time" : "Event Date & Time"}
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        {itemToEdit?.id && (
          <>
            {onDelete && (
              <Button color="error" onClick={() => {
                onDelete(itemToEdit.id);
                onClose();
              }}>
                Delete
              </Button>
            )}

            {canToggle && onToggleComplete && (
              <Button onClick={() => {
                onToggleComplete(itemToEdit.id);
                onClose();
              }}>
                {itemToEdit.completed ? "Mark Incomplete" : "Mark Complete"}
              </Button>
            )}
          </>
        )}

        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!title.trim() || !datetime}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
