import { learningTracks as coreTracks } from "../learningContent.js";

export const learningTracks = [...coreTracks];

export function findTrack(trackId) {
  return learningTracks.find((track) => track.id === trackId) || null;
}

export function listPublishedTrackIds() {
  return learningTracks.map((track) => track.id);
}
