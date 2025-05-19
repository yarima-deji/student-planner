import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./context/AppContext";
import AppWrapper from "./App.jsx";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AppWrapper />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
