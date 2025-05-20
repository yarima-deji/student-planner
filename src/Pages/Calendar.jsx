// src/pages/Calendar.jsx
import React, { useState, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Typography } from "@mui/material";
import { useAppContext } from "../context/AppContext";
import AddItemModal from "../components/AddEditModal";

export default function CalendarPage() {
  const { state, dispatch } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedEvent(null);
  }, []);

  const handleEventClick = ({ event }) => {
    const evt = state.events.find((e) => e.id === event.id);
    setSelectedEvent(evt);
    setModalOpen(true);
  };

  const handleDateClick = ({ dateStr }) => {
    setSelectedEvent({ id: null, title: "", time: dateStr });
    setModalOpen(true);
  };

  const handleSubmit = (eventData) => {
    dispatch({
      type: eventData.id ? "EDIT_EVENT" : "ADD_EVENT",
      payload: eventData,
    });
    closeModal();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Calendar View
      </Typography>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={state.events.map((e) => ({
          id: e.id,
          title: e.title,
          date: e.time,
        }))}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        height="auto"
      />

      <AddItemModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode="event"
        itemToEdit={selectedEvent}
      />
    </Box>
  );
}
