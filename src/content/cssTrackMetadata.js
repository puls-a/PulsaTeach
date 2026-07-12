export const cssTrackMetadata = {
  id: "css",
  label: "CSS",
  color: "aqua",
  title: { fr: "CSS interactif", en: "Interactive CSS" },
  summary: {
    fr: "Sélecteurs, box model, Flexbox, Grid, responsive et animations avec rendu visuel.",
    en: "Selectors, box model, Flexbox, Grid, responsive, and motion with visual output."
  },
  level: { fr: "Debutant à intermediaire", en: "Beginner to intermediate" },
  prerequisites: { fr: ["Connaitre les bases du HTML", "Savoir lire une structure de page"], en: ["Know HTML basics", "Know how to read a page structure"] },
  outcomes: {
    fr: ["Construire un systeme visuel coherent", "Maitriser Flexbox et Grid", "Créer des interfaces responsive modernes", "Gerer les interactions et préférences de mouvement", "Auditer une interface sur plusieurs contraintes réelles"],
    en: ["Build a coherent visual system", "Master Flexbox and Grid", "Create modern responsive interfaces", "Handle interactions and motion preferences", "Audit an interface across real constraints"]
  },
  capstone: { fr: "Landing page et audit responsive complet", en: "Landing page and complete responsive audit" },
  profession: {
    fr: "CSS est au coeur du travail des developpeurs front-end, integrateurs web et designers UI. Cette competence transforme une structure HTML en interface lisible, coherente, responsive et accessible, capable de resister aux vrais contenus.",
    en: "CSS is central to front-end development, web integration, and UI design. It turns HTML structure into readable, coherent, responsive, and accessible interfaces."
  },
  certification: {
    fr: ["Valider toutes les lecons et le quiz CSS", "Livrer une navbar Flexbox responsive", "Justifier les choix de layout, mouvement et fluidite", "Livrer la landing finale sans débordement", "Reussir l'audit responsive avance avec container queries et medias robustes"],
    en: ["Pass every CSS lesson and quiz", "Ship a responsive Flexbox navbar", "Justify layout, motion, and fluidity choices", "Ship the final landing without overflow", "Pass the advanced responsive audit with container queries and robust media"]
  }
};

export const cssFoundationModuleIds = [
  "css-getting-started",
  "css-selectors-colors",
  "css-box-type",
  "css-flex-layout",
  "css-grid-layout",
  "css-selectors",
  "css-box-model",
  "css-flexbox",
  "css-grid"
];

export const cssResponsiveModuleIds = [
  "css-responsive",
  "css-a11y-states",
  "css-motion",
  "css-capstone",
  "css-responsive-motion",
  "css-advanced-responsive"
];

export const cssModuleOrder = [...cssFoundationModuleIds, ...cssResponsiveModuleIds];

export function createCssTrack(modules, loadedGroups = []) {
  return {
    ...cssTrackMetadata,
    modules,
    loadedGroups,
    isPartialTrack: loadedGroups.length > 0 && loadedGroups.length < 2
  };
}

export function resolveCssGroup(moduleId) {
  if (cssResponsiveModuleIds.includes(moduleId)) return "responsive";
  return "foundation";
}

export function getCssNextDeferredGroup(currentModuleId, loadedGroups = []) {
  if (resolveCssGroup(currentModuleId) === "foundation" && !loadedGroups.includes("responsive")) return "responsive";
  return null;
}

export function orderCssModules(modules) {
  return [...modules].sort((left, right) => cssModuleOrder.indexOf(left.id) - cssModuleOrder.indexOf(right.id));
}
