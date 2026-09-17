import { useEffect, useState } from "react";
import InteractiveLearning from "../../InteractiveLearning.jsx";
import { currentPathSegments } from "../../navigation.js";
import { useLearningTracks } from "../../useLearningTracks.js";

export default function LearnPage({ locale }) {
  const { tracks, loadTrack } = useLearningTracks({ mode: "summary" });
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const [route, trackId, moduleId] = currentPathSegments();
    if (route === "learn" && trackId) {
      setLoadError("");
      loadTrack(trackId, { moduleId }).catch(() => setLoadError(locale === "fr" ? "Cette formation ou cette leçon est indisponible." : "This course or lesson is unavailable."));
    }
  }, [loadTrack, locale]);

  return <InteractiveLearning locale={locale} tracks={tracks} onRequireTrack={loadTrack} initialLoadError={loadError} />;
}
