import { useCallback, useEffect, useRef, useState } from "react";
import { getCatalog, getTrack } from "./apiClient.js";
import { loadAllLocalTracks, loadLocalTrack, mergeLoadedTrack } from "./content/localTrackLoader.js";
import { publicTrackSummaries } from "./content/publicTrackCatalog.js";

export function useLearningTracks({ remoteCatalog = false, mode = "summary", freshCatalog = false } = {}) {
  const summaryMode = mode !== "full";
  const [tracks, setTracks] = useState(summaryMode ? publicTrackSummaries : []);
  const [loading, setLoading] = useState(remoteCatalog || !summaryMode);
  const [error, setError] = useState(null);
  const pendingLoads = useRef(new Map());

  const loadTrack = useCallback(async (trackId, options = {}) => {
    const current = tracks.find((track) => track.id === trackId);
    if (current && !current.isSummary && (!options.moduleId || current.modules.some((module) => module.id === options.moduleId))) return current;
    const pendingKey = `${trackId}:${options.moduleId || "full"}`;
    if (pendingLoads.current.has(pendingKey)) return pendingLoads.current.get(pendingKey);

    const pending = loadLocalTrack(trackId, options)
      .catch(async () => {
        const response = await getTrack(trackId);
        return response.track;
      })
      .then((track) => {
        if (!track) throw new Error(`Track ${trackId} is unavailable.`);
        const nextTrack = mergeLoadedTrack(current, track);
        setTracks((items) => {
          const currentTrack = items.find((item) => item.id === track.id) || null;
          const mergedTrack = mergeLoadedTrack(currentTrack, track);
          const exists = items.some((item) => item.id === nextTrack.id);
          return exists
            ? items.map((item) => item.id === mergedTrack.id ? mergedTrack : item)
            : [...items, mergedTrack];
        });
        return nextTrack;
      })
      .finally(() => pendingLoads.current.delete(pendingKey));
    pendingLoads.current.set(pendingKey, pending);
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
        return getCatalog({ fresh: freshCatalog })
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
  }, [freshCatalog, remoteCatalog, summaryMode]);

  return { tracks, loading, error, loadTrack };
}
