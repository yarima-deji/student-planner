import React, { createContext, useReducer, useContext, useEffect } from "react";

// ——— INITIAL LOAD HELPERS ———
const loadTasks = () => {
  try {
    const raw = localStorage.getItem("tasks");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const loadEvents = () => {
  try {
    const raw = localStorage.getItem("events");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const loadSettings = () => {
  try {
    const raw = localStorage.getItem("settings");
    return raw
      ? JSON.parse(raw)
      : { notifications: true, darkMode: false };
  } catch {
    return { notifications: true, darkMode: false };
  }
};

// ——— INITIAL STATE ———
const initialState = {
  tasks: loadTasks(),
  events: loadEvents(),
  settings: loadSettings(),
};

// ——— REDUCER ———
function appReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };
    case "TOGGLE_NOTIFICATION":
      return {
        ...state,
        settings: {
          ...state.settings,
          notifications: !state.settings.notifications,
        },
      };
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        settings: {
          ...state.settings,
          darkMode: !state.settings.darkMode,
        },
      };
    default:
      return state;
  }
}

// ——— CONTEXT & PROVIDER ———
const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist to localStorage whenever relevant state updates
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(state.events));
  }, [state.events]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(state.settings));
  }, [state.settings]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// ——— CUSTOM HOOK ———
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return ctx;
}
