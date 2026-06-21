import { useEffect } from "react";
import InteractiveLearning from "../../InteractiveLearning.jsx";
import { currentPathSegments } from "../../navigation.js";
import { useLearningTracks } from "../../useLearningTracks.js";

export default function LearnPage({ locale }) {
  const { tracks, loadTrack } = useLearningTracks();

  useEffect(() => {
    const [route, trackId] = currentPathSegments();
    if (route === "learn" && trackId) loadTrack(trackId).catch(() => {});
  }, [loadTrack]);

  return <InteractiveLearning locale={locale} tracks={tracks} onRequireTrack={loadTrack} />;
}
