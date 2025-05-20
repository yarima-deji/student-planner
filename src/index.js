import React from "react";
import ReactDOM from "react-dom/client";
import AppWrapper from "./App.jsx";
import { AppProvider } from "./context/AppContext.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <AppWrapper />
    </AppProvider>
  </React.StrictMode>
);
