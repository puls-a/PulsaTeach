// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { LearnerPageHero } from "../../src/components/LearnerUI.jsx";

afterEach(() => { cleanup(); window.history.replaceState(null, "", "/"); });

test("legacy learning routes are left to navigation instead of parsed as CSS selectors", () => {
  const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  const errors = [];
  const onError = event => { errors.push(event.error); event.preventDefault(); };
  window.addEventListener("error", onError);
  try {
    render(<LearnerPageHero title="Parcours" action={{ label: "Continuer", href: "#/learn/tools/tools-setup/tools-01-vscode" }} />);
    expect(fireEvent.click(screen.getByRole("link", { name: "Continuer" }))).toBe(true);
    expect(scroll).not.toHaveBeenCalled();
    expect(errors).toEqual([]);
  } finally { window.removeEventListener("error", onError); }
});

test("ordinary section anchors still scroll to their target", () => {
  const scroll = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  render(<><LearnerPageHero title="Projets" action={{ label: "Soumettre", href: "#nouvelle-soumission" }} /><section id="nouvelle-soumission">Formulaire</section></>);
  fireEvent.click(screen.getByRole("link", { name: "Soumettre" }));
  expect(scroll).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  expect(window.location.hash).toBe("#nouvelle-soumission");
});
