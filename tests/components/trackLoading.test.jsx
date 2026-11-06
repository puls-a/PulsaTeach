// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { TrackLandingPage } from "../../src/features/catalog/TrackLandingPage.jsx";

const state = vi.hoisted(() => ({ tracks: [], loading: false, error: null, loadTrack: vi.fn() }));
vi.mock("../../src/authState.js", () => ({ useSupabaseSession: () => ({ user: null }) }));
vi.mock("../../src/useLearningTracks.js", () => ({ useLearningTracks: () => state }));
vi.mock("../../src/learnerStorage.js", () => ({ getLearnerItem: () => null }));
beforeEach(() => {
  state.tracks = [{ id: "html", isSummary: true }, { id: "css", isSummary: true }];
  state.loading = false;
  state.error = null;
  state.loadTrack.mockReset();
});
afterEach(cleanup);

test("an individual course failure exposes recovery and a retry can succeed", async () => {
  state.loadTrack.mockRejectedValueOnce(new Error("Internal API information"));
  const view = render(<TrackLandingPage trackId="html" locale="en" />);
  expect(await screen.findByRole("heading", { name: "Unable to load this course" })).toBeInTheDocument();
  expect(screen.queryByText("Internal API information")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Back to catalog" })).toHaveAttribute("href", "/catalog");
  state.loadTrack.mockImplementationOnce(async () => {
    state.tracks = [{ id: "html", title: { en: "HTML recovered" }, modules: [] }];
  });
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  await waitFor(() => expect(state.loadTrack).toHaveBeenCalledTimes(2));
  view.rerender(<TrackLandingPage trackId="html" locale="en" />);
  expect(screen.getByRole("heading", { name: "HTML recovered" })).toBeInTheDocument();
});

test("an old request failure cannot replace the newly selected course", async () => {
  let rejectOld;
  state.loadTrack.mockImplementationOnce(() => new Promise((_, reject) => { rejectOld = reject; })).mockResolvedValue(null);
  const view = render(<TrackLandingPage trackId="html" />);
  view.rerender(<TrackLandingPage trackId="css" />);
  await act(async () => rejectOld(new Error("Old request failed")));
  expect(screen.getByRole("status")).toHaveTextContent("Chargement de la formation");
  expect(screen.queryByRole("button", { name: "Réessayer" })).not.toBeInTheDocument();
});

test("a fully loaded course stays visible while the catalog refreshes", () => {
  state.tracks = [{ id: "html", title: { fr: "HTML disponible" }, modules: [] }];
  state.loading = true;
  state.loadTrack.mockResolvedValue(null);
  render(<TrackLandingPage trackId="html" />);
  expect(screen.getByRole("heading", { name: "HTML disponible" })).toBeInTheDocument();
  expect(screen.queryByText("Chargement de la formation...")).not.toBeInTheDocument();
});
