import { createCssTrack, orderCssModules } from "./cssTrackMetadata.js";
import { cssTrackFoundationChunk } from "./cssTrackFoundationChunk.js";
import { cssTrackResponsiveChunk } from "./cssTrackResponsiveChunk.js";

const modules = orderCssModules([
  ...cssTrackFoundationChunk.modules,
  ...cssTrackResponsiveChunk.modules
]);

export const cssTrack = createCssTrack(modules, ["foundation", "responsive"]);
