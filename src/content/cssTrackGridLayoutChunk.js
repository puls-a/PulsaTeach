import { createCssModuleGroup } from "./cssModuleFactory.js";
import { cssFoundationEntries } from "./cssFoundationEntries.js";
import { createCssTrack } from "./cssTrackMetadata.js";

const [module] = createCssModuleGroup([cssFoundationEntries[3]], 3, ["css-grid-layout"]);

export const cssTrackGridLayoutChunk = createCssTrack([module], ["foundation"]);
