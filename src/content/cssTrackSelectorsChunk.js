import { createCssModuleGroup } from "./cssModuleFactory.js";
import { cssFoundationEntries } from "./cssFoundationEntries.js";
import { createCssTrack } from "./cssTrackMetadata.js";

const [module] = createCssModuleGroup([cssFoundationEntries[4]], 4, ["css-selectors"]);

export const cssTrackSelectorsChunk = createCssTrack([module], ["foundation"]);
