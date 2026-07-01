import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { startObservability } from "./observability.js";

startObservability();

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

requestAnimationFrame(() => {
  rootElement?.removeAttribute("data-prerendered");
});
