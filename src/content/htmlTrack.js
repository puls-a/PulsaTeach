import { htmlPulsaConfModules } from "./htmlPulsaConfCurriculum.js";
import { htmlTransferProjectModules } from "./htmlTransferProjects.js";
import { htmlTrackMetadata } from "./htmlTrackMetadata.js";

export const htmlTrack = {
  ...htmlTrackMetadata,
  modules: [...htmlPulsaConfModules, ...htmlTransferProjectModules]
};
