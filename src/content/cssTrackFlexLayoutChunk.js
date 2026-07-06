import { createCssModuleGroup } from "./cssModuleFactory.js";
import { cssFoundationEntries } from "./cssFoundationEntries.js";
import { createCssTrack } from "./cssTrackMetadata.js";

const [module] = createCssModuleGroup([cssFoundationEntries[2]], 2, ["css-flex-layout"]);

export const cssTrackFlexLayoutChunk = createCssTrack([module], ["foundation"]);
