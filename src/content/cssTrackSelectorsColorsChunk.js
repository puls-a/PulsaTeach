import { createCssModuleGroup } from "./cssModuleFactory.js";
import { cssFoundationEntries } from "./cssFoundationEntries.js";
import { createCssTrack } from "./cssTrackMetadata.js";

const [module] = createCssModuleGroup([cssFoundationEntries[0]], 0, []);

export const cssTrackSelectorsColorsChunk = createCssTrack([module], ["foundation"]);
