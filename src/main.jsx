import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
import { startObservability } from "./observability.js";
import AppErrorBoundary from "./components/AppErrorBoundary.jsx";

startObservability();

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <Boot />
    </AppErrorBoundary>
  </React.StrictMode>
);

function Boot() {
  React.useLayoutEffect(() => {
    rootElement?.removeAttribute("data-prerendered");
  }, []);

  return <App />;
}
