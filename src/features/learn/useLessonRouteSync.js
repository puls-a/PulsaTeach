import { useEffect } from "react";
import { readLessonRoute } from "./learningState.js";

export function useLessonRouteSync({ locale, onRequireTrack, requestedRoute, setActiveTrackId, setActiveModuleId, setActiveLessonId, setTrackLoadError }) {
  useEffect(() => {
    let cancelled = false;
    const syncFromLocation = async () => {
      const requested = readLessonRoute();
      requestedRoute.current = requested;
      setTrackLoadError("");
      setActiveTrackId(requested.trackId);
      try {
        if (onRequireTrack) await onRequireTrack(requested.trackId, { moduleId: requested.moduleId });
        if (cancelled) return;
        setActiveModuleId(requested.moduleId);
        setActiveLessonId(requested.lessonId);
      } catch {
        if (!cancelled) setTrackLoadError(locale === "fr" ? "Impossible de charger cette formation." : "Unable to load this course.");
      }
    };
    window.addEventListener("popstate", syncFromLocation);
    return () => {
      cancelled = true;
      window.removeEventListener("popstate", syncFromLocation);
    };
  }, [locale, onRequireTrack, requestedRoute, setActiveLessonId, setActiveModuleId, setActiveTrackId, setTrackLoadError]);
}
