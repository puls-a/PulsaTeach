// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import AppErrorBoundary from "../../src/components/AppErrorBoundary.jsx";
import { reportClientError } from "../../src/observability.js";

vi.mock("../../src/observability.js", () => ({ reportClientError: vi.fn() }));

function BrokenPage() {
  throw new Error("render failed");
}

describe("AppErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("shows a recovery screen and reports render failures", () => {
    render(<AppErrorBoundary><BrokenPage /></AppErrorBoundary>);

    expect(screen.getByRole("heading", { name: "La page n’a pas pu s’afficher" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Recharger la page" })).toBeInTheDocument();
    expect(reportClientError).toHaveBeenCalledWith("Error", expect.stringContaining("render failed"));
  });
});
