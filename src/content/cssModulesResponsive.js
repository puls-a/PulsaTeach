import { createCssModuleGroup } from "./cssModuleFactory.js";

const responsiveEntries = [
  ["css-responsive", ["Responsive mobile-first", "Mobile-first responsive"], ".panel", ["width", "max-width", "@media", "min-width", "clamp(", "container-type", "@container", "auto-fit"]],
  ["css-a11y-states", ["Etats accessibles", "Accessible states"], ".action", [":focus-visible", "outline", "outline-offset", ":hover", ":disabled", "cursor", "contrast-color", "forced-color-adjust"]],
  ["css-motion", ["Motion responsable", "Responsible motion"], ".card", ["transition", "transform", ":hover", "prefers-reduced-motion", "animation", "transform-origin", "will-change", "transition: none"]],
  ["css-capstone", ["Capstone responsive", "Responsive capstone"], ".landing", ["--space", "clamp(", "display: grid", "auto-fit", "object-fit", "@container", "@media", "overflow-wrap"]]
];

export const cssModulesResponsive = createCssModuleGroup(responsiveEntries, 4, ["css-responsive", "css-a11y-states", "css-motion", "css-capstone"]);
