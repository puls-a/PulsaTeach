import React from "react";
import { reportClientError } from "../observability.js";

export default class AppErrorBoundary extends React.Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    reportClientError(error?.name || "RenderError", `${error?.message || "unknown"}:${info?.componentStack || ""}`);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="app-page grid min-h-screen place-items-center bg-slate-50">
        <section className="surface max-w-xl text-center" role="alert">
          <p className="eyebrow">PulsaTeach</p>
          <h1 className="mt-3 font-display text-3xl font-black text-ink">La page n’a pas pu s’afficher</h1>
          <p className="mt-3 leading-7 text-slate-600">Une erreur inattendue a été signalée. Recharge la page pour reprendre ton travail.</p>
          <button type="button" className="primary-button mt-6" onClick={() => window.location.reload()}>Recharger la page</button>
        </section>
      </main>
    );
  }
}
