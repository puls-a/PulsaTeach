import { useEffect, useState } from "react";
import { getCatalog } from "./apiClient.js";
import { learningTracks } from "./learningContent.js";

export function useLearningTracks() {
  const [tracks, setTracks] = useState(learningTracks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    getCatalog()
      .then((catalog) => {
        if (!active) return;
        setTracks(Array.isArray(catalog?.tracks) && catalog.tracks.length ? catalog.tracks : learningTracks);
        setError(null);
      })
      .catch((nextError) => active && setError(nextError))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { tracks, loading, error };
}
