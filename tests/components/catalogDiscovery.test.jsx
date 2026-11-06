// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import CurriculumHub from "../../src/CurriculumHub.jsx";
import CatalogStartGuide from "../../src/components/CatalogStartGuide.jsx";
import { publicTrackSummaries } from "../../src/content/publicTrackCatalog.js";

vi.mock("../../src/authState.js", () => ({ useSupabaseSession: () => ({ user: null }) }));
vi.mock("../../src/useLearningTracks.js", () => ({ useLearningTracks: () => ({ tracks: publicTrackSummaries, loading: false, error: null, reload: vi.fn() }) }));
vi.mock("../../src/learnerStorage.js", () => ({ getLearnerItem: () => null }));
afterEach(cleanup);

describe("Catalog discovery", () => {
  test("offers a direct lesson after choosing a goal, and allows changing goals", () => {
    render(<CurriculumHub />);
    expect(screen.queryByRole("link", { name: "Ouvrir ma première leçon" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Créer ma première page" }));
    expect(screen.getByRole("link", { name: "Ouvrir ma première leçon" })).toHaveAttribute("href", publicTrackSummaries.find(t => t.id === "html").firstHref);
    fireEvent.click(screen.getByRole("button", { name: "Mettre en forme ma page" }));
    expect(screen.getByRole("button", { name: "Créer ma première page" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("link", { name: "Ouvrir ma première leçon" })).toHaveAttribute("href", publicTrackSummaries.find(t => t.id === "css").firstHref);
  });

  test("does not recommend an unavailable course, even after a catalog refresh", () => {
    const view = render(<CatalogStartGuide tracks={publicTrackSummaries} locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: "Style my page" }));
    view.rerender(<CatalogStartGuide tracks={publicTrackSummaries.filter(t => t.id !== "css")} locale="en" />);
    expect(screen.queryByRole("button", { name: "Style my page" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Open my first lesson" })).not.toBeInTheDocument();
  });

  test("matches accent-free terms across title and summary, and resets empty results", () => {
    render(<CurriculumHub />);
    const catalog = screen.getByRole("region", { name: "Formations disponibles" });
    const search = screen.getByRole("searchbox", { name: "Rechercher une formation" });
    fireEvent.change(search, { target: { value: "HTML semantique" } });
    expect(within(catalog).getAllByRole("article")).toHaveLength(1);
    expect(within(catalog).getByRole("heading", { name: "HTML interactif" })).toBeInTheDocument();
    fireEvent.change(search, { target: { value: "introuvable" } });
    expect(within(catalog).queryByRole("article")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Effacer la recherche" }));
    expect(search).toHaveValue("");
    expect(within(catalog).getAllByRole("article")).toHaveLength(3);
  });

  test("renders the English recommendation and search", () => {
    render(<CurriculumHub locale="en" />);
    fireEvent.click(screen.getByRole("button", { name: "Set up my tools" }));
    expect(screen.getByRole("link", { name: "Open my first lesson" })).toHaveAttribute("href", publicTrackSummaries[0].firstHref);
    expect(screen.getByRole("searchbox", { name: "Search courses" })).toBeInTheDocument();
  });
});
