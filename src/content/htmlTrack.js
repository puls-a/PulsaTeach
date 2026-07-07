import { htmlFoundationModules } from "./htmlModulesFoundation.js";
import { htmlAdvancedModules } from "./htmlModulesAdvanced.js";
import { htmlWorkshopModules } from "./htmlModulesWorkshop.js";
import { htmlProductionHardeningModules } from "./htmlModulesHardening.js";
import { htmlTrackMetadata } from "./htmlTrackMetadata.js";

export const htmlTrack = {
  ...htmlTrackMetadata,
  modules: [...htmlFoundationModules, ...htmlAdvancedModules, ...htmlWorkshopModules, ...htmlProductionHardeningModules]
};
