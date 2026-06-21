// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import CookieConsent from "../../src/components/CookieConsent.jsx";

describe("CookieConsent", () => {
  beforeEach(() => localStorage.clear());

  test("keeps optional analytics disabled when only necessary storage is accepted", () => {
    render(<CookieConsent locale="fr" />);
    fireEvent.click(screen.getByRole("button", { name: "Nécessaires uniquement" }));

    expect(screen.queryByRole("region", { name: "Préférences de confidentialité" })).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("pulsateach-privacy-consent"))).toMatchObject({
      optionalAnalytics: false
    });
  });

  test("opens accessible details and stores explicit analytics consent", () => {
    render(<CookieConsent locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: "Customize" }));

    expect(screen.getByRole("dialog", { name: "Privacy preferences" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Accept all" }));
    expect(JSON.parse(localStorage.getItem("pulsateach-privacy-consent"))).toMatchObject({
      optionalAnalytics: true
    });
  });
});
