import { createCssModuleGroup } from "./cssModuleFactory.js";
import { cssFoundationEntries } from "./cssFoundationEntries.js";
import { createCssTrack } from "./cssTrackMetadata.js";

const [module] = createCssModuleGroup([cssFoundationEntries[1]], 1, []);

export const cssTrackBoxTypeChunk = createCssTrack([module], ["foundation"]);
