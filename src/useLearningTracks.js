import { useCallback, useEffect, useRef, useState } from "react";
import { getCatalog, getTrack } from "./apiClient.js";
import { learningTracks } from "./content/allTrackRegistry.js";

export function useLearningTracks({ remoteCatalog = false } = {}) {
  const [tracks, setTracks] = useState(learningTracks);
  const [loading, setLoading] = useState(remoteCatalog);
  const [error, setError] = useState(null);
  const pendingLoads = useRef(new Map());

  const loadTrack = useCallback(async (trackId) => {
    const current = tracks.find((track) => track.id === trackId);
    if (current && !current.isSummary) return current;
    if (pendingLoads.current.has(trackId)) return pendingLoads.current.get(trackId);

    const pending = getTrack(trackId)
      .then(({ track }) => {
        if (!track) throw new Error(`Track ${trackId} is unavailable.`);
        setTracks((items) => {
          const exists = items.some((item) => item.id === track.id);
          return exists
            ? items.map((item) => item.id === track.id ? track : item)
            : [...items, track];
        });
        return track;
      })
      .finally(() => pendingLoads.current.delete(trackId));
    pendingLoads.current.set(trackId, pending);
    return pending;
  }, [tracks]);

  useEffect(() => {
    if (!remoteCatalog) {
      setTracks(learningTracks);
      setLoading(false);
      setError(null);
      return undefined;
    }

    let active = true;
    setLoading(true);
    getCatalog()
      .then((catalog) => {
        if (!active) return;
        const remoteTracks = Array.isArray(catalog?.tracks) ? catalog.tracks : [];
        const localById = new Map(learningTracks.map((track) => [track.id, track]));
        setTracks(remoteTracks.map((track) => localById.get(track.id) || track));
        setError(null);
      })
      .catch((nextError) => active && setError(nextError))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [remoteCatalog]);

  return { tracks, loading, error, loadTrack };
}
