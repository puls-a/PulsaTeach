import { getPedagogy } from "./pedagogy.js";
import { transferBriefs } from "./htmlTransferBriefs.js";
import { atlasIllustration } from "./atlasIllustration.js";
import { transferEnglishExamples } from "./htmlTransferEnglishExamples.js";

const shell = (title, body, locale = "fr") => `<!doctype html><html lang="${locale}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description" content="${locale === "fr" ? "Projet HTML de transfert" : "Independent HTML project"}"></head><body>${body}</body></html>`;
const rubric = ["Le document répond au contexte sans réutiliser la structure PulsaConf.", "Les éléments natifs portent les relations importantes.", "Les contrôles et liens restent compréhensibles sans CSS.", "Le livrable explique une décision et une vérification effectuée."];

function project(id, title, brief, solution, tests, focus) {
  const content = transferBriefs[id];
  const course = Object.fromEntries(["fr", "en"].map((locale) => [locale, {
    introduction: content.brief[locale],
    sections: ["context", "constraints", "evidence"].map((key, index) => ({
      title: (locale === "fr" ? ["Contexte", "Contraintes", "Preuves"] : ["Context", "Constraints", "Evidence"])[index],
      paragraphs: [content[key][locale]]
    }))
  }]));
  const guide = { fr: { mistakes: [`Ne transforme pas ${focus} en une copie de PulsaConf.`] }, en: { mistakes: ["Do not copy a conference template without adapting it to this project's requirements."] } };
  const base = { course, guide, title: content.title, brief: { fr: content.brief.fr || brief, en: content.brief.en }, type: "project" };
  if (id === "html-transfer-product") solution = solution.replace("/assets/atlas-lamp.svg", atlasIllustration);
  if (id === "html-transfer-documentation") solution = solution.replace('<main id="main">', '<main id="main" tabindex="-1">');
  if (id === "html-transfer-survey") solution = solution.replace('<form ', '<p>Démonstration sans inscription réelle. Dans cet aperçu, les champs email, workshop et consent sont vérifiés localement sans envoi.</p><form ').replace('<p role="status" aria-live="polite">Prêt.</p>', '');
  const starter = id === "html-transfer-legacy-repair"
    ? '<main><div>Rapport annuel</div><section aria-labelledby="missing"><div>Résultats</div><div>Trimestre | Participants</div><div>T1 | 30</div><a href="#results">Relire les résultats</a></section></main>'
    : '<main></main>';
  const sharedTests = [
    { type: "documentSanity", label: "complete document" },
    { type: "uniqueIds", label: "unique identifiers" },
    { type: "exactSelector", label: "one main heading", value: "h1", amount: 1 },
    { type: "safeBlankLinks", label: "safe new-tab links" }
  ];
  const pedagogy = getPedagogy(id, base);
  for (const locale of ["fr", "en"]) {
    pedagogy[locale] = { ...pedagogy[locale], why: content.context[locale], autonomous: content.evidence[locale], summary: content.constraints[locale], next: locale === "fr" ? "Présente ta preuve de vérification et les limites de ton livrable à une autre personne." : "Present your verification evidence and the limitations of your deliverable to another person." };
  }
  const englishStarter = id === "html-transfer-legacy-repair" ? '<main><div>Annual report</div><section aria-labelledby="missing"><div>Results</div><div>Quarter | Participants</div><div>Q1 | 30</div><a href="#results">Read the results again</a></section></main>' : '<main></main>';
  return { id, type: "project", title: base.title, brief: base.brief, course, guide, pedagogy, theory: { fr: { points: ["Le contexte détermine la structure.", "HTML natif fournit des contrats testables.", "Une preuve ne remplace pas une revue."], example: "" }, en: { points: ["Context determines structure.", "Native HTML provides testable contracts.", "Evidence does not replace review."], example: "" } }, skills: ["semantic-html", "accessibility", "independent-build"], difficulty: "project", durationMin: 120, starterCode: { fr: shell(title, starter), en: shell(content.title.en, englishStarter, "en") }, solution: { fr: solution, en: shell(content.title.en, transferEnglishExamples[id], "en") }, tests: [...sharedTests.filter((test) => !tests.some((existing) => existing.type === test.type)), ...tests], rubric: { fr: [...rubric, content.evidence.fr], en: ["The document meets the brief without copying the conference template.", "Native elements express the important relationships.", "Controls and links remain understandable without CSS.", "The submission explains a decision and an actual verification.", content.evidence.en] }, hint: { fr: "Écris le contenu et les landmarks avant les détails.", en: "Write content and landmarks before details." }, xp: 180 };
}

export const htmlTransferProjectModules = [{
  id: "html-transfer-projects", title: { fr: "Projets HTML de transfert", en: "HTML transfer projects" }, totalMinutes: 480,
  importance: { fr: "Prouver que les choix HTML survivent à un changement de contexte.", en: "Prove HTML decisions transfer across contexts." }, prerequisites: { fr: ["Parcours HTML principal terminé"], en: ["Complete the main HTML path"] }, outcomes: { fr: ["Structurer quatre produits distincts"], en: ["Structure four distinct products"] }, vocabulary: { fr: ["contrat", "contexte", "régression"], en: ["contract", "context", "regression"] }, mastery: { fr: "Choisir et défendre une structure native.", en: "Choose and defend native structure." },
  lessons: [
    project("html-transfer-survey", "Enquête inclusive", "un formulaire de recherche utilisateur", shell("Enquête", `<main><h1>Enquête de lecture</h1><form action="/api/pulsaconf/register" method="post"><fieldset><legend>Profil</legend><label for="email">Email</label><input id="email" name="email" type="email" required><label for="workshop">Format</label><select id="workshop" name="workshop"><option value="html">Article</option><option value="forms">Audio</option></select></fieldset><label><input type="checkbox" name="consent" required> J'accepte l'utilisation de mes réponses.</label><button type="submit">Envoyer</button><p role="status" aria-live="polite">Prêt.</p></form></main>`), [{ type: "labelsAssociated", label: "labels resolve" }, { type: "formControlsNamed", label: "controls are named" }, { type: "selector", label: "explicit consent", value: "input[name=consent][required]" }], "un formulaire de recherche"),
    project("html-transfer-documentation", "Documentation API", "une documentation technique navigable", shell("Documentation", `<a href="#main">Aller au contenu</a><header><h1>Guide API</h1><nav aria-label="Sections"><a href="#auth">Authentification</a><a href="#errors">Erreurs</a></nav></header><main id="main"><article><h2 id="auth">Authentification</h2><pre><code>Authorization: Bearer TOKEN</code></pre><h2 id="errors">Erreurs</h2><p>401 indique un jeton invalide.</p></article></main>`), [{ type: "validFragmentTargets", label: "targets resolve" }, { type: "selector", label: "skip link", value: "a[href='#main']" }, { type: "domOrder", label: "landmarks order", value: ["header", "main"] }], "une documentation technique"),
    project("html-transfer-product", "Fiche produit honnête", "une fiche produit sans fausse promesse", shell("Lampe Atlas", `<main><article><h1>Lampe Atlas</h1><p>Produit fictif de démonstration : aucune commande possible.</p><figure><img src="/assets/atlas-lamp.svg" alt="Illustration d'une lampe de bureau à abat-jour orienté vers le bas" width="640" height="360"><figcaption>Illustration de démonstration.</figcaption></figure><p><data value="49.90">49,90 EUR</data></p><details><summary>Livraison</summary><p>Exemple de conditions : expédition sous trois jours.</p></details></article></main>`), [{ type: "documentSanity", label: "complete document" }, { type: "meaningfulAlt", label: "specific image alternative", value: { selector: "img" } }, { type: "selector", label: "machine price", value: "data[value]" }, { type: "selector", label: "native delivery disclosure", value: "details > summary" }], "une fiche produit"),
    project("html-transfer-legacy-repair", "Réparation HTML legacy", "un rapport inaccessible à remettre en état", shell("Rapport", `<main><h1>Rapport annuel</h1><section aria-labelledby="results"><h2 id="results">Résultats</h2><table><caption>Progression trimestrielle</caption><thead><tr><th scope="col">Trimestre</th><th scope="col">Participants</th></tr></thead><tbody><tr><td>T1</td><td>30</td></tr></tbody></table><a href="#results">Relire les résultats</a></section></main>`), [{ type: "documentSanity", label: "complete document" }, { type: "validFragmentTargets", label: "link resolves" }, { type: "allMatch", label: "headers scoped", value: { selector: "thead th", matches: "[scope=col]" } }], "un HTML legacy"),
  ]
}];
