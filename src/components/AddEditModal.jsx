// src/components/AddEditModal.jsx

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export default function AddEditModal({
  open,
  onClose,
  onSubmit,
  mode,
  itemToEdit
}) {
  const [title, setTitle] = useState("");
  const [datetime, setDatetime] = useState("");

  // When editing an existing item, prefill the inputs
  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title);
      setDatetime(itemToEdit.due ?? itemToEdit.time ?? "");
    } else {
      setTitle("");
      setDatetime("");
    }
  }, [itemToEdit]);

  const handleSave = () => {
    const newItem = {
      id: itemToEdit?.id || uuidv4(),
      title,
      // use "due" for tasks, "time" for events
      ...(mode === "task" ? { due: datetime } : { time: datetime })
    };
    onSubmit(newItem);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {itemToEdit ? `Edit ${mode === "task" ? "Task" : "Event"}` : `Add New ${mode === "task" ? "Task" : "Event"}`}
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
          label={mode === "task" ? "Due Date & Time" : "Event Date & Time"}
          type="datetime-local"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={!title || !datetime}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
