import { createCssModuleGroup } from "./cssModuleFactory.js";
import { cssFoundationEntries } from "./cssFoundationEntries.js";
import { createCssTrack } from "./cssTrackMetadata.js";

const [module] = createCssModuleGroup([cssFoundationEntries[5]], 5, ["css-box-model"]);

export const cssTrackBoxModelChunk = createCssTrack([module], ["foundation"]);
