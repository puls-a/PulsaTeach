import { createCssModuleGroup } from "./cssModuleFactory.js";

const foundationEntries = [
  ["css-selectors-colors", ["Selecteurs, cascade et couleurs", "Selectors, cascade, and colors"], ".course-card", ["color", "background", "border-color", "font-weight", "text-decoration", "outline", "box-shadow", "opacity"]],
  ["css-box-type", ["Box model et typographie", "Box model and typography"], ".card", ["box-sizing", "padding", "margin", "max-width", "line-height", "font-size", "overflow-wrap", "border-radius"]],
  ["css-flex-layout", ["Flexbox professionnel", "Professional Flexbox"], ".toolbar", ["display: flex", "gap", "align-items", "justify-content", "flex-wrap", "flex-direction", "order", "min-width"]],
  ["css-grid-layout", ["Grid et compositions", "Grid and compositions"], ".gallery", ["display: grid", "grid-template-columns", "repeat", "minmax", "gap", "grid-auto-flow", "place-items", "align-content"]]
];

export const cssModulesFoundation = createCssModuleGroup(foundationEntries, 0, ["css-flex-layout", "css-grid-layout"]);
