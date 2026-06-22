import { htmlFoundationModules } from "./legacyHtmlModulesFoundation.js";
import { htmlAdvancedModules } from "./legacyHtmlModulesAdvanced.js";

export const htmlTrack = {
    id: "html",
    label: "HTML",
    color: "orange",
    title: { fr: "HTML interactif", en: "Interactive HTML" },
    summary: {
      fr: "Structure, sémantique, formulaires, accessibilité et SEO avec tests DOM.",
      en: "Structure, semantics, forms, accessibility, and SEO with DOM tests."
    },
    level: { fr: "Débutant", en: "Beginner" },
    prerequisites: { fr: ["Aucun prérequis", "Savoir utiliser un navigateur et un clavier"], en: ["No prerequisites", "Know how to use a browser and keyboard"] },
    outcomes: {
      fr: ["Structurer une page complète et sémantique", "Créer des formulaires accessibles", "Auditer le HTML, l'accessibilité et le SEO", "Livrer un site événementiel prêt pour un portfolio"],
      en: ["Structure a complete semantic page", "Create accessible forms", "Audit HTML, accessibility, and SEO", "Ship a portfolio-ready event website"]
    },
    capstone: { fr: "PulsaConf : site événementiel accessible", en: "PulsaConf: accessible event website" },
    profession: {
      fr: "HTML est la compétence de base des développeurs front-end, intégrateurs web, créateurs de contenu et spécialistes accessibilité. Elle consiste à transformer une information en document structuré, navigable et compréhensible.",
      en: "HTML is a core skill for front-end developers, web integrators, content creators, and accessibility specialists."
    },
    certification: {
      fr: ["Valider toutes les leçons et quiz HTML", "Réussir les deux mini-projets", "Corriger l'audit d'accessibilité", "Livrer PulsaConf avec tous les tests réussis"],
      en: ["Pass every HTML lesson and quiz", "Complete both mini projects", "Fix the accessibility audit", "Ship PulsaConf with every test passing"]
    },
    modules: [...htmlFoundationModules, ...htmlAdvancedModules]
  };
