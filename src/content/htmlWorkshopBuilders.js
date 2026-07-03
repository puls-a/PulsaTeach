import { quizLesson } from "./trackBuilders.js";
import { getPedagogy } from "./pedagogy.js";

const threadId = "html-pulsaconf-workshop";

export const htmlShell = (body) => `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>PulsaConf Atelier</title>
  </head>
  <body>
${body}
  </body>
</html>`;

export function step(stepNumber, item, buildsOn) {
  const enriched = {
    ...item,
    projectThreadId: threadId,
    stepNumber,
    buildsOn: buildsOn || null
  };
  enriched.course = workshopCourse(enriched, stepNumber);
  enriched.guide = workshopGuide(enriched, stepNumber);
  enriched.pedagogy = getPedagogy(enriched.id, {
    course: enriched.course,
    guide: enriched.guide,
    title: enriched.title,
    brief: enriched.brief,
    solution: enriched.solution,
    type: enriched.type
  });
  return enriched;
}

function workshopCourse(item, stepNumber) {
  const frTitle = item.title.fr.replace(/^Étape \d+\s*:\s*/, "");
  const enTitle = item.title.en.replace(/^Step \d+\s*:\s*/, "");
  return {
    fr: {
      introduction: `Dans cette micro-étape ${stepNumber}, tu ajoutes « ${frTitle} » au projet PulsaConf. L’objectif n’est pas de finir toute la page d’un coup : tu ajoutes une pièce observable, tu lances les tests, puis tu gardes cette base pour la suite.`,
      sections: [
        {
          title: "Une étape, une preuve",
          paragraphs: [
            "Le format atelier fonctionne comme une construction professionnelle : on isole une petite décision HTML, puis on vérifie qu’elle améliore réellement le document.",
            "Cette granularité évite les grands exercices flous. Chaque test correspond à une exigence que tu peux expliquer."
          ],
          example: item.solution?.slice(0, 220) || ""
        },
        {
          title: "Le rôle HTML avant l’apparence",
          paragraphs: [
            "Choisis d’abord les éléments selon leur signification : navigation, section, article, formulaire, statut ou adresse.",
            "CSS pourra améliorer l’interface plus tard, mais le HTML doit déjà porter le sens et les relations."
          ],
          example: "<section aria-labelledby=\"section-title\">\n  <h2 id=\"section-title\">Titre</h2>\n</section>"
        },
        {
          title: "Lecture des tests",
          paragraphs: [
            "Un test de présence vérifie qu’un élément existe. Un test de relation vérifie qu’un attribut pointe vers la bonne cible.",
            "Quand un test échoue, corrige la plus petite partie nécessaire au lieu de remplacer tout le fichier."
          ],
          example: "a[href=\"#register\"]"
        }
      ],
      vocabulary: [
        ["Micro-étape", "Exercice court qui ajoute une capacité vérifiable au même projet."],
        ["Assertion", "Test automatique qui vérifie une exigence précise."],
        ["Fil rouge", "Projet continu construit progressivement."],
        ["Relation", "Lien entre deux éléments via href, id, for ou aria-describedby."]
      ],
      check: [
        `Je sais expliquer pourquoi « ${frTitle} » améliore PulsaConf.`,
        "Je peux relier chaque test à une exigence utilisateur.",
        "Je garde le code lisible pour l’étape suivante."
      ]
    },
    en: {
      introduction: `In micro-step ${stepNumber}, you add “${enTitle}” to the PulsaConf project. The goal is not to finish the entire page at once: add one observable piece, run the tests, then keep this foundation for the next step.`,
      sections: [
        {
          title: "One step, one proof",
          paragraphs: [
            "The workshop format mirrors professional building: isolate one HTML decision, then verify that it really improves the document.",
            "This granularity avoids vague large exercises. Every test maps to a requirement you can explain."
          ],
          example: item.solution?.slice(0, 220) || ""
        },
        {
          title: "HTML role before appearance",
          paragraphs: [
            "Choose elements by meaning first: navigation, section, article, form, status, or address.",
            "CSS can improve the interface later, but HTML must already carry meaning and relationships."
          ],
          example: "<section aria-labelledby=\"section-title\">\n  <h2 id=\"section-title\">Title</h2>\n</section>"
        },
        {
          title: "Reading tests",
          paragraphs: [
            "A presence test checks that an element exists. A relationship test checks that an attribute points to the right target.",
            "When a test fails, fix the smallest necessary part instead of replacing the whole file."
          ],
          example: "a[href=\"#register\"]"
        }
      ],
      vocabulary: [
        ["Micro-step", "A short exercise adding one verifiable capability to the same project."],
        ["Assertion", "An automated test checking one precise requirement."],
        ["Project thread", "A continuous project built progressively."],
        ["Relationship", "A link between two elements through href, id, for, or aria-describedby."]
      ],
      check: [
        `I can explain why “${enTitle}” improves PulsaConf.`,
        "I can connect every test to a user-facing requirement.",
        "I keep the code readable for the next step."
      ]
    }
  };
}

function workshopGuide(item, stepNumber) {
  const frTitle = item.title.fr.replace(/^Étape \d+\s*:\s*/, "");
  const enTitle = item.title.en.replace(/^Step \d+\s*:\s*/, "");
  return {
    fr: {
      objectives: [
        `Ajouter « ${frTitle} » sans casser les étapes précédentes.`,
        "Lire chaque test comme une exigence observable.",
        "Préparer une base claire pour l’étape suivante de PulsaConf."
      ],
      prerequisites: [
        "Avoir lu la consigne de l’étape.",
        "Comprendre les éléments HTML déjà présents dans le starter.",
        "Savoir lancer les tests après une petite modification."
      ],
      steps: [
        `Repère dans le starter l’endroit où « ${frTitle} » doit être ajouté.`,
        "Écris uniquement les balises et attributs demandés avant de compléter le texte.",
        "Lance les tests, corrige le premier échec, puis relis le rendu dans l’aperçu sécurisé."
      ],
      mistakes: [
        `Ajouter « ${frTitle} » avec une div générique alors qu’un élément natif porte déjà le bon sens — étape ${stepNumber}.`,
        "Copier un gros bloc sans comprendre quelle exigence chaque ligne satisfait.",
        "Corriger plusieurs tests en même temps sans vérifier la cause du premier échec."
      ]
    },
    en: {
      objectives: [
        `Add “${enTitle}” without breaking previous steps.`,
        "Read each test as an observable requirement.",
        "Prepare a clear foundation for the next PulsaConf step."
      ],
      prerequisites: [
        "Read the step brief.",
        "Understand the HTML elements already present in the starter.",
        "Know how to run tests after a small change."
      ],
      steps: [
        `Find where “${enTitle}” belongs in the starter.`,
        "Write only the requested tags and attributes before filling in text.",
        "Run tests, fix the first failure, then review the result in the secured preview."
      ],
      mistakes: [
        `Adding “${enTitle}” with a generic div even though a native element carries the right meaning — step ${stepNumber}.`,
        "Copying a large block without understanding which requirement each line satisfies.",
        "Fixing several tests at once without checking the cause of the first failure."
      ]
    }
  };
}

export function workshopQuiz(stepNumber, id, title, question, options, answer, explanation, buildsOn) {
  return step(stepNumber, quizLesson({
    id,
    title,
    brief: ["Vérifie que tu peux justifier les choix faits dans l’atelier PulsaConf.", "Check that you can justify the choices made in the PulsaConf workshop."],
    question,
    options,
    answer,
    explanation,
    xp: 20
  }), buildsOn);
}
