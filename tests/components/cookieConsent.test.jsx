// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import CookieConsent from "../../src/components/CookieConsent.jsx";

describe("CookieConsent", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => cleanup());

  test("does not interrupt a first visit when no optional tracker is used", () => {
    render(<CookieConsent locale="fr" />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("opens an accessible information dialog on request", () => {
    render(<CookieConsent locale="en" />);
    act(() => window.dispatchEvent(new Event("pulsateach-open-privacy-settings")));
    expect(screen.getByRole("dialog", { name: "Local storage in use" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Got it" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
