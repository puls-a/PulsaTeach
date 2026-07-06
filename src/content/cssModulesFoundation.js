import { createCssModuleGroup } from "./cssModuleFactory.js";
import { cssFoundationEntries } from "./cssFoundationEntries.js";

export const cssModulesFoundation = createCssModuleGroup(cssFoundationEntries, 0, ["css-flex-layout", "css-grid-layout"]);
