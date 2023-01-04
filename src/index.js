import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Start from "./Start";
import Showcase from "./Showcase";
import Admin from "./Admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/prices-showcase/" element={<Start />} />
        <Route path="/prices-showcase/showcase" element={<Showcase />} />
        <Route path="/prices-showcase/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
