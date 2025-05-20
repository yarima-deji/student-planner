// src/context/AppContext.js

import React, { createContext, useContext, useReducer, useEffect } from "react";

// 1) App defaults
const defaultState = {
  tasks: [],
  events: [],
  settings: {
    darkMode: false,
    notificationsEnabled: true,
    quietHours: { start: "22:00", end: "07:00" },
  },
};

// 2) Hydrate from localStorage if present
let stored = null;
try {
  const raw = localStorage.getItem("appState");
  if (raw) stored = JSON.parse(raw);
} catch (err) {
  console.warn("Failed to parse stored state:", err);
}

const initialState = stored
  ? {
      ...defaultState,
      ...stored,
      settings: {
        ...defaultState.settings,
        ...stored.settings,
        quietHours: {
          ...defaultState.settings.quietHours,
          ...(stored.settings?.quietHours || {}),
        },
      },
    }
  : defaultState;

// 3) Create context & reducer
const AppContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    // Settings
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        settings: { ...state.settings, darkMode: !state.settings.darkMode },
      };

    case "TOGGLE_NOTIFICATIONS":
      return {
        ...state,
        settings: {
          ...state.settings,
          notificationsEnabled: !state.settings.notificationsEnabled,
        },
      };

    case "SET_QUIET_HOURS":
      return {
        ...state,
        settings: { ...state.settings, quietHours: action.payload },
      };

    // Tasks CRUD
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload),
      };

    case "TOGGLE_TASK_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed,
    completedAt: !t.completed ? new Date().toISOString() : t.completedAt
 } : t
        ),
      };
    case "SET_TASK_PRIORITY":
  return {
    ...state,
    tasks: state.tasks.map((t) =>
      t.id === action.payload.id
        ? { ...t, priority: action.payload.priority }
        : t
    ),
  };
    // Events CRUD
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };

    case "EDIT_EVENT":
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? { ...e, ...action.payload } : e
        ),
      };

    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.payload),
      };

    default:
      return state;
  }
}

// 4) Provider w/ persistence
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist entire appState (tasks, events, settings)
  useEffect(() => {
    try {
      localStorage.setItem("appState", JSON.stringify(state));
    } catch (err) {
      console.warn("Failed to save state:", err);
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// 5) Custom hook
export const useAppContext = () => useContext(AppContext);
