import { learningTracks as legacyCoreTracks } from "../learningContent.js";

export const learningTracks = [...legacyCoreTracks];

export function findTrack(trackId) {
  return learningTracks.find((track) => track.id === trackId) || null;
}

export function listPublishedTrackIds() {
  return learningTracks.map((track) => track.id);
}
