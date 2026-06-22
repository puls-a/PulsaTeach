import { getHtmlPedagogy } from "../htmlPedagogy.js";
import { getCssPedagogy } from "../cssPedagogy.js";
import { getJsPedagogy } from "../jsPedagogy.js";

export function getPedagogy(id, context = {}) {
  const source = getHtmlPedagogy(id) || getCssPedagogy(id) || getJsPedagogy(id);
  if (!source?.fr || source.en) return source;

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
