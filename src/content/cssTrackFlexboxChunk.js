import { createCssModuleGroup } from "./cssModuleFactory.js";
import { cssFoundationEntries } from "./cssFoundationEntries.js";
import { createCssTrack } from "./cssTrackMetadata.js";

const [module] = createCssModuleGroup([cssFoundationEntries[6]], 6, ["css-flexbox"]);

export const cssTrackFlexboxChunk = createCssTrack([module], ["foundation"]);
