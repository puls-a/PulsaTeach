import { createCssModuleGroup } from "./cssModuleFactory.js";
import { cssModulesResponsive } from "./cssModulesResponsive.js";
import { createCssTrack } from "./cssTrackMetadata.js";

const cssAdvancedResponsiveModule = createCssModuleGroup([
  ["css-advanced-responsive", ["Systèmes responsive avancés", "Advanced responsive systems"], ".audit-page", ["clamp(", "--audit-space", "object-fit", "object-position", "container-name", "@container", "overflow-x", "overscroll-behavior-inline"]]
], 9, ["css-advanced-responsive"]);

const responsiveModules = [...cssModulesResponsive, ...cssAdvancedResponsiveModule];

export const cssTrackResponsiveChunk = createCssTrack(responsiveModules, ["responsive"]);
export const cssTrackAccessibleStatesChunk = createCssTrack(responsiveModules.filter((item) => item.id === "css-a11y-states"), ["responsive"]);
export const cssTrackMotionChunk = createCssTrack(responsiveModules.filter((item) => item.id === "css-motion"), ["responsive"]);
export const cssTrackResponsiveMotionChunk = createCssTrack(responsiveModules.filter((item) => item.id === "css-responsive-motion"), ["responsive"]);
export const cssTrackAdvancedResponsiveChunk = createCssTrack(responsiveModules.filter((item) => item.id === "css-advanced-responsive"), ["responsive"]);
