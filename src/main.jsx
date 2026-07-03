import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { startObservability } from "./observability.js";

startObservability();

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <React.StrictMode>
    <Boot />
  </React.StrictMode>
);

function Boot() {
  React.useLayoutEffect(() => {
    rootElement?.removeAttribute("data-prerendered");
  }, []);

  return <App />;
}
