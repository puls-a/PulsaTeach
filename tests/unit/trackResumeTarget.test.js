import { describe, expect, test } from "vitest";
import { getTrackResumeTarget } from "../../src/features/catalog/TrackLandingPage.jsx";

const track = {
  id: "html",
  modules: [
    { id: "intro", lessons: [{ id: "one" }, { id: "two" }] },
    { id: "advanced", lessons: [{ id: "three" }] }
  ]
};

describe("track resume target", () => {
  test("opens the first unfinished lesson", () => {
    expect(getTrackResumeTarget(track, { completed: { one: true } })).toEqual({
      href: "/learn/html/intro/two",
      complete: false
    });
  });

  test("opens certifications after every lesson is complete", () => {
    expect(getTrackResumeTarget(track, { completed: { one: true, two: true, three: true } })).toEqual({
      href: "/certification",
      complete: true
    });
  });
});
