import { createCssModuleGroup } from "./cssModuleFactory.js";
import { cssFoundationEntries } from "./cssFoundationEntries.js";
import { createCssTrack } from "./cssTrackMetadata.js";

const [module] = createCssModuleGroup([cssFoundationEntries[7]], 7, ["css-grid"]);

export const cssTrackGridChunk = createCssTrack([module], ["foundation"]);
