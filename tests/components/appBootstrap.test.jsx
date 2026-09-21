// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import App from "../../src/App.jsx";

const authState = vi.hoisted(() => ({ current: { user: null, loading: true } }));

vi.mock("../../src/authState.js", () => ({
  signOutSupabase: vi.fn(),
  useSupabaseSession: () => authState.current
}));

describe("App bootstrap", () => {
  beforeEach(() => {
    authState.current = { user: null, loading: true };
    localStorage.clear();
    window.history.replaceState(null, "", "/");
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("renders public content while authentication is still loading", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /Apprends le web en construisant des preuves/i })).toBeInTheDocument();
    expect(screen.queryByText("Chargement de la page…")).not.toBeInTheDocument();
  });

  test("recovers from an unsupported stored locale", () => {
    localStorage.setItem("pulsateach-locale", "de");
    authState.current = { user: null, loading: false };

    render(<App />);

    expect(screen.getByRole("heading", { name: /Apprends le web en construisant des preuves/i })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("lang", "fr");
  });

  test("falls back to French when locale storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Storage denied", "SecurityError");
    });
    authState.current = { user: null, loading: false };

    render(<App />);

    expect(screen.getByRole("heading", { name: /Apprends le web en construisant des preuves/i })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute("lang", "fr");
  });
});
