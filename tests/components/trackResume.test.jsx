// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { TrackLandingPage, getModuleResumeTarget } from "../../src/features/catalog/TrackLandingPage.jsx";

const fixture = vi.hoisted(() => ({
  track: { id: "html", title: { fr: "HTML", en: "HTML" }, modules: [{ id: "intro", title: { fr: "Les bases", en: "Basics" }, lessons: [{ id: "one" }, { id: "two" }], totalMinutes: 20 }] },
  loadTrack: vi.fn().mockResolvedValue(null)
}));
vi.mock("../../src/authState.js", () => ({ useSupabaseSession: () => ({ user: null }) }));
vi.mock("../../src/useLearningTracks.js", () => ({ useLearningTracks: () => ({ tracks: [fixture.track], loading: false, error: null, loadTrack: fixture.loadTrack }) }));
vi.mock("../../src/learnerStorage.js", () => ({ getLearnerItem: () => JSON.stringify({ completed: { one: true } }) }));
afterEach(cleanup);

test("module links resume pending lessons and update after progress synchronization", () => {
  render(<TrackLandingPage trackId="html" />);
  expect(screen.getByRole("link", { name: /Les bases/ })).toHaveAttribute("href", "/learn/html/intro/two");
  expect(screen.getByText("Reprendre le module")).toBeInTheDocument();
  act(() => window.dispatchEvent(new CustomEvent("pulsateach-progress-synced", { detail: { completed: { one: true, two: true } } })));
  expect(screen.getByRole("link", { name: /Les bases/ })).toHaveAttribute("href", "/learn/html/intro/one");
  expect(screen.getByText("Revoir le module")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Voir mes certifications" })).toHaveAttribute("href", "/certification");
  expect(screen.getByRole("status")).toHaveTextContent("2/2 leçons validées");
});

test("module resume handles nonsequential progress and empty modules", () => {
  expect(getModuleResumeTarget("html", fixture.track.modules[0], { completed: { two: true } }).href).toBe("/learn/html/intro/one");
  expect(getModuleResumeTarget("html", { id: "empty", lessons: [] }, { completed: {} }).href).toBe("/formations/html");
});

test("English module action is localized", () => {
  render(<TrackLandingPage trackId="html" locale="en" />);
  expect(screen.getByText("Resume module")).toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("1/2 lessons completed");
});
