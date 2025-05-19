import React, { createContext, useReducer, useContext, useEffect } from "react";

// Helpers: load from localStorage or provide defaults
const loadSettings = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("settings"));
    return saved || {
      notifications: true,
      darkMode: false,
      reminderLeadTime: "10 minutes",
      quietHoursStart: "22:00",
      quietHoursEnd: "07:00"
    };
  } catch {
    return {
      notifications: true,
      darkMode: false,
      reminderLeadTime: "10 minutes",
      quietHoursStart: "22:00",
      quietHoursEnd: "07:00"
    };
  }
};

const loadTasks = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    return Array.isArray(saved)
      ? saved
      : [
          { id: 1, title: "Finish Math Homework", due: "Tomorrow", completed: false },
          { id: 2, title: "Submit Project Report", due: "In 2 Days", completed: false }
        ];
  } catch {
    return [
      { id: 1, title: "Finish Math Homework", due: "Tomorrow", completed: false },
      { id: 2, title: "Submit Project Report", due: "In 2 Days", completed: false }
    ];
  }
};

const loadEvents = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("events"));
    return Array.isArray(saved)
      ? saved
      : [
          { id: 1, title: "Team Meeting", time: "Today at 3 PM" },
          { id: 2, title: "Doctor Appointment", time: "Tomorrow at 10 AM" }
        ];
  } catch {
    return [
      { id: 1, title: "Team Meeting", time: "Today at 3 PM" },
      { id: 2, title: "Doctor Appointment", time: "Tomorrow at 10 AM" }
    ];
  }
};

// Initial global state
const initialState = {
  tasks: loadTasks(),
  events: loadEvents(),
  settings: loadSettings()
};

// Reducer to handle all actions
function appReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        )
      };

    case "DELETE_TASK":
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };

    case "TOGGLE_TASK_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        )
      };

    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };

    case "TOGGLE_SETTING":
      return {
        ...state,
        settings: {
          ...state.settings,
          [action.payload]: !state.settings[action.payload]
        }
      };

    case "UPDATE_SETTINGS":
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      };

    default:
      return state;
  }
}

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist slices to localStorage on change
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(state.settings));
  }, [state.settings]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(state.events));
  }, [state.events]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for consuming the context
export const useAppContext = () => useContext(AppContext);
