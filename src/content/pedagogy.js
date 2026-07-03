import { getHtmlPedagogy } from "../htmlPedagogy.js";
import { getCssPedagogy } from "../cssPedagogy.js";
import { getJsPedagogy } from "../jsPedagogy.js";

export function getPedagogy(id, context = {}) {
  const source = getHtmlPedagogy(id) || getCssPedagogy(id) || getJsPedagogy(id) || createFallbackSource(context);
  if (!source?.fr) return source;
  if (source.en) return source;

  const course = context.course?.en || {};
  const guide = context.guide?.en || {};
  const brief = context.brief?.en || context.title?.en || "Complete the requested implementation.";
  const objectives = nonEmpty(guide.objectives, course.check, ["Understand the requested concept.", "Apply it in the starter code.", "Verify the result with the automated tests."]);
  const steps = nonEmpty(guide.steps, ["Read the goal and inspect the starter code.", "Implement one requirement at a time.", "Run the tests and correct every failing case."]);
  const vocabulary = normalizeVocabulary(course.vocabulary, source.fr.vocabulary);
  const good = source.fr.comparison?.good || {};
  const bad = source.fr.comparison?.bad || {};

  return {
    ...source,
    en: {
      why: course.introduction || brief,
      objectives,
      prerequisites: [
        "Complete the preceding lessons in this module.",
        "Be able to read the starter code and automated test feedback."
      ],
      vocabulary,
      comparison: {
        good: {
          title: "Explicit and testable approach",
          code: good.code || "",
          explanation: "This version keeps the intent visible, uses the appropriate native mechanism, and remains straightforward to verify."
        },
        bad: {
          title: "Fragile approach",
          code: bad.code || "",
          explanation: "This version hides intent, skips an important constraint, or creates avoidable maintenance and accessibility risks."
        }
      },
      guided: steps,
      autonomous: brief,
      hints: [
        `Start with this objective: ${objectives[0]}`,
        "Use the failing test message to identify the missing requirement.",
        "Compare your implementation with the explicit, testable approach before opening the correction."
      ],
      correction: [
        ...steps.slice(0, 3),
        "Run the complete test suite and explain why the final implementation satisfies each requirement."
      ],
      summary: course.introduction || `This lesson applies ${context.title?.en || id} through a verifiable implementation.`,
      next: "Continue with the next lesson and reuse the same reasoning on a slightly broader problem."
    }
  };
}

function createFallbackSource(context) {
  const title = context.title?.fr || context.title?.en || "Exercice guidé";
  const brief = context.brief?.fr || context.brief?.en || "Complète l’étape demandée puis valide les tests.";
  const course = context.course?.fr || {};
  const guide = context.guide?.fr || {};
  const objectives = nonEmpty(guide.objectives, course.check, [
    `Comprendre le rôle de « ${title} ».`,
    "Appliquer une modification courte et vérifiable.",
    "Expliquer pourquoi les tests prouvent la réussite."
  ]);
  const vocabulary = Array.isArray(course.vocabulary) && course.vocabulary.length >= 3
    ? course.vocabulary
    : [["Étape", "Un changement court qui fait progresser le même projet."], ["Assertion", "Vérification automatique d’une exigence précise."], ["Fil rouge", "Projet continu construit morceau par morceau."]];
  const steps = nonEmpty(guide.steps, [
    "Observe le code de départ et repère la zone à modifier.",
    "Ajoute uniquement les éléments ou attributs demandés.",
    "Lance les tests, lis le premier échec, puis corrige sans repartir de zéro."
  ]);

  return {
    fr: {
      why: course.introduction || brief,
      objectives,
      prerequisites: nonEmpty(guide.prerequisites, [
        "Avoir terminé l’étape précédente du même atelier.",
        "Savoir lire une balise ouvrante, une balise fermante et un attribut.",
        "Comprendre que les tests valident une exigence observable."
      ]),
      vocabulary,
      comparison: {
        good: {
          title: "Approche progressive et testable",
          code: context.solution || "",
          explanation: "Cette version ajoute une seule capacité claire au projet, conserve l’intention visible dans le HTML et reste facile à valider."
        },
        bad: {
          title: "Approche fragile",
          code: "<div>Contenu</div>",
          explanation: "Cette version cache le rôle du contenu, complique l’accessibilité et rend les tests moins significatifs."
        }
      },
      guided: steps,
      autonomous: `Refais l’étape « ${title} » sans regarder la solution, puis explique chaque test réussi.`,
      hints: [
        `Commence par l’objectif : ${objectives[0]}`,
        "Si un test échoue, cherche d’abord l’élément ou l’attribut nommé dans son libellé.",
        "Garde la modification petite : une étape réussie vaut mieux qu’un grand bloc difficile à corriger."
      ],
      correction: [
        "La solution ajoute la structure minimale demandée avant toute décoration.",
        "Chaque attribut important est relié à un besoin : navigation, nom accessible, validation ou information machine.",
        "Les tests confirment la présence, le nombre ou la relation attendue ; ils ne valident pas seulement du texte décoratif."
      ],
      summary: `Cette étape transforme « ${title} » en preuve concrète dans le projet fil rouge.`,
      next: "Continue avec l’étape suivante : elle réutilise cette base et ajoute une contrainte plus réaliste."
    }
  };
}

function nonEmpty(...candidates) {
  return candidates.find((items) => Array.isArray(items) && items.length >= 3);
}

function normalizeVocabulary(english = [], french = []) {
  if (Array.isArray(english) && english.length >= 3) return english;
  return (french || []).slice(0, 6).map((entry) => {
    const term = Array.isArray(entry) ? entry[0] : String(entry);
    return [term, `A key concept used in this lesson; identify it in the example and explain its role.`];
  });
}
