import { useCallback, useEffect, useRef, useState } from "react";
import { getCatalog, getTrack } from "./apiClient.js";
import { loadAllLocalTracks, loadLocalTrack } from "./content/localTrackLoader.js";
import { publicTrackSummaries } from "./content/publicTrackCatalog.js";

export function useLearningTracks({ remoteCatalog = false, mode = "summary" } = {}) {
  const summaryMode = mode !== "full";
  const [tracks, setTracks] = useState(summaryMode ? publicTrackSummaries : []);
  const [loading, setLoading] = useState(remoteCatalog || !summaryMode);
  const [error, setError] = useState(null);
  const pendingLoads = useRef(new Map());

  const loadTrack = useCallback(async (trackId) => {
    const current = tracks.find((track) => track.id === trackId);
    if (current && !current.isSummary) return current;
    if (pendingLoads.current.has(trackId)) return pendingLoads.current.get(trackId);

    const pending = loadLocalTrack(trackId)
      .catch(async () => {
        const response = await getTrack(trackId);
        return response.track;
      })
      .then((track) => {
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
    if (summaryMode && !remoteCatalog) {
      setTracks(publicTrackSummaries);
      setLoading(false);
      setError(null);
      return undefined;
    }

    let active = true;
    setLoading(true);
    const source = summaryMode ? Promise.resolve(publicTrackSummaries) : loadAllLocalTracks();
    source
      .then((localTracks) => {
        if (!active) return;
        if (!remoteCatalog) {
          setTracks(localTracks);
          setError(null);
          return;
        }
        return getCatalog()
          .then((catalog) => {
            if (!active) return;
            const remoteTracks = Array.isArray(catalog?.tracks) ? catalog.tracks : [];
            const localById = new Map(localTracks.map((track) => [track.id, track]));
            setTracks(remoteTracks.map((track) => localById.get(track.id) || track));
            setError(null);
          })
          .catch((nextError) => {
            if (!active) return;
            setTracks(localTracks);
            setError(nextError);
          });
      })
      .catch((nextError) => active && setError(nextError))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [remoteCatalog, summaryMode]);

  return { tracks, loading, error, loadTrack };
}
