import Dashboard from "./pages/Dashboard";
import AddItemModal from "./components/AddItemModal";
import { useAppContext } from "./context/AppContext";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // we’ll build this next

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
