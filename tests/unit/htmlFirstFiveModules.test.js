// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { existsSync, readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { htmlPulsaConfModules } from "../../src/content/htmlPulsaConfCurriculum.js";
import { resolveLocaleValue } from "../../src/localeValue.js";
import { validateLesson } from "../../src/lessonRuntime.js";

const firstFive = htmlPulsaConfModules.slice(0, 5);
const lessons = firstFive.flatMap((module) => module.lessons);
const byId = (id) => lessons.find((lesson) => lesson.id === id);

describe("first five active HTML modules", () => {
  test("preserves module and lesson identifiers", () => {
    expect(firstFive.map((module) => module.id)).toEqual([
      "html-getting-started", "html-modern-document", "html-text-sections",
      "html-navigation-links", "html-media-content"
    ]);
    expect(byId("html-04-décorative-image-alt-empty")).toBeDefined();
    expect(new Set(lessons.map((lesson) => lesson.id)).size).toBe(lessons.length);
  });

  test("keeps every learner-facing lesson bilingual and substantial", () => {
    for (const lesson of lessons) {
      expect(lesson.title.fr).toBeTruthy();
      expect(lesson.title.en).toBeTruthy();
      expect(lesson.brief.fr.length).toBeGreaterThan(25);
      expect(lesson.brief.en.length).toBeGreaterThan(25);
      expect(lesson.course.fr.sections.length).toBeGreaterThanOrEqual(3);
      expect(lesson.course.en.sections.length).toBeGreaterThanOrEqual(3);
    }
  });

  test("does not pre-solve the viewport exercise", () => {
    const viewport = byId("html-01-viewport-mobile");
    expect(resolveLocaleValue(viewport.starterCode, "fr")).not.toContain('name="viewport"');
    expect(resolveLocaleValue(viewport.solution, "fr")).toContain('name="viewport"');
  });

  test("uses location for same-document current links and avoids redundant ARIA", () => {
    const navigation = byId("html-03-current-external-safe");
    expect(resolveLocaleValue(navigation.solution, "fr")).toContain('aria-current="location"');
    expect(resolveLocaleValue(navigation.solution, "fr")).not.toContain('aria-current="page"');
    expect(resolveLocaleValue(byId("html-04-décorative-image-alt-empty").solution, "fr")).not.toContain("aria-hidden");
  });

  test("provides equivalent transcripts for audio and video", () => {
    expect(resolveLocaleValue(byId("html-04-audio-fallback").solution, "fr")).toContain("Transcription");
    expect(resolveLocaleValue(byId("html-04-video-captions").solution, "fr")).toContain("La vidéo montre");
    const project = byId("html-04-project-speakers-gallery");
    expect(resolveLocaleValue(project.solution, "fr")).toContain("La vidéo montre");
    expect(resolveLocaleValue(project.solution, "fr")).toContain("neuf heures trente");
  });

  test("gives each project module-specific tests and a richer solution", () => {
    const projects = firstFive.map((module) => module.lessons.at(-1));
    expect(projects.every((project) => project.type === "project")).toBe(true);
    expect(projects.every((project) => project.tests.length >= 5)).toBe(true);
    expect(new Set(projects.map((project) => project.tests.map((item) => resolveLocaleValue(item.label, "en")).join("|"))).size).toBe(5);
    expect(projects.every((project) => resolveLocaleValue(project.solution, "en").length > 500)).toBe(true);
  });

  test("uses concept-specific quiz scenarios instead of a repeated template", () => {
    const quizzes = firstFive.map((module) => module.lessons.find((lesson) => lesson.type === "quiz"));
    expect(quizzes.every((quiz) => quiz.questions.length === 6)).toBe(true);
    expect(quizzes.every((quiz) => new Set(quiz.questions.map((question) => question.type)).size >= 5)).toBe(true);
    for (let index = 0; index < 6; index += 1) {
      expect(new Set(quizzes.map((quiz) => quiz.questions[index].prompt.fr)).size).toBe(5);
      expect(new Set(quizzes.map((quiz) => quiz.questions[index].prompt.en)).size).toBe(5);
    }
  });

  test("keeps onboarding beginner-safe and honest about local file operations", () => {
    const onboarding = firstFive[0].lessons.filter((lesson) => lesson.type === "html");
    const indexLesson = byId("html-00-create-index-file");

    expect(onboarding.every((lesson) => lesson.guide.fr.prerequisites[0].startsWith("Aucun prérequis HTML"))).toBe(true);
    expect(onboarding.flatMap((lesson) => lesson.course.fr.sections).map((section) => section.example).join("\n")).not.toContain("aria-labelledby");
    expect(indexLesson.title.fr).toBe("Vérifier la convention index.html");
    expect(indexLesson.brief.fr).toContain("ne peut pas renommer");
    expect(indexLesson.brief.en).toContain("cannot rename");
  });

  test("uses authored English onboarding artifacts", () => {
    const englishArtifacts = [
      byId("html-00-open-in-browser").starterCode,
      byId("html-00-devtools-inspector").starterCode,
      byId("html-00-read-tests").starterCode,
      byId("html-00-project-local-setup").solution
    ].map((value) => resolveLocaleValue(value, "en"));

    expect(englishArtifacts.join("\n")).not.toMatch(/Écrire du code|La page s'affiche|Je vais essayer|Cet artefact|Manifeste de préparation/);
    expect(englishArtifacts.at(-1)).toContain('<html lang="en">');
    expect(englishArtifacts.at(-1)).toContain("Verification log");
  });

  test("aligns the setup quiz with the browser workflow it asks about", () => {
    const quiz = byId("html-00-setup-quiz");

    expect(quiz.questions[2].answer).toEqual(["saved", "visible"]);
    expect(quiz.questions[4].answer).toEqual(["open", "edit", "save", "reload"]);
    expect(quiz.questions[5].answer).toEqual(expect.arrayContaining(["fichier", "filename", "observé", "observed"]));
    expect(quiz.questions[5].answer).not.toContain("transcription");
  });

  test("introduces modern document declarations one step at a time", () => {
    const doctype = byId("html-01-doctype-standard-mode");
    const language = byId("html-01-root-lang");
    const charset = byId("html-01-charset-utf8");
    const viewport = byId("html-01-viewport-mobile");
    const title = byId("html-01-title-description");

    expect(resolveLocaleValue(doctype.solution, "fr")).not.toMatch(/lang=|charset|viewport|<title>/);
    expect(resolveLocaleValue(language.solution, "fr")).not.toMatch(/charset|viewport|<title>/);
    expect(resolveLocaleValue(charset.starterCode, "fr")).not.toContain("charset");
    expect(resolveLocaleValue(viewport.starterCode, "fr")).not.toContain("viewport");
    expect(resolveLocaleValue(title.starterCode, "fr")).toContain("À compléter");
    expect(resolveLocaleValue(title.starterCode, "en")).toContain("Complete me");
  });

  test("keeps document examples and project artifacts authored in each language", () => {
    const module = firstFive[1];
    const englishExamples = module.lessons
      .filter((lesson) => lesson.type === "html")
      .flatMap((lesson) => lesson.course.en.sections.map((section) => section.example));
    const project = byId("html-01-project-skeleton");
    const englishProject = resolveLocaleValue(project.solution, "en");

    expect(englishExamples.join("\n")).not.toMatch(/Ajoute|Vérifie|français|Accessibilité/);
    expect(englishProject).toContain('<html lang="en">');
    expect(englishProject).toContain("accessible HTML workshops");
    expect(englishProject).not.toMatch(/\b(?:une|débutants|autour|document en)\b/i);
  });

  test("requires real work and accepts the solution throughout the document module", async () => {
    const exercises = firstFive[1].lessons.filter((lesson) => lesson.type !== "quiz");

    for (const lesson of exercises) {
      for (const locale of ["fr", "en"]) {
        const starterResults = await validateLesson(lesson, resolveLocaleValue(lesson.starterCode, locale), locale);
        const solutionResults = await validateLesson(lesson, resolveLocaleValue(lesson.solution, locale), locale);
        expect(starterResults.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solutionResults.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
      }
    }
  });

  test("aligns the document quiz answers with its prompts", () => {
    const quiz = byId("html-01-document-quiz");

    expect(quiz.questions[0].answer).toBe("doctype");
    expect(quiz.questions[1].answer).toBe("charset");
    expect(quiz.questions[2].answer).toEqual(["doctype", "lang", "charset", "viewport"]);
    expect(quiz.questions[4].answer).toEqual(["doctype", "html", "body", "main"]);
    expect(quiz.questions[5].answer).toEqual(expect.arrayContaining(["viewport", "missing"]));
    expect(quiz.questions[5].answer).not.toContain("transcription");
  });

  test("carries the semantic document from one lesson into the next", () => {
    const moduleLessons = firstFive[2].lessons.filter((lesson) => lesson.type === "html");

    for (let index = 1; index < moduleLessons.length; index += 1) {
      for (const locale of ["fr", "en"]) {
        expect(resolveLocaleValue(moduleLessons[index].starterCode, locale)).toBe(resolveLocaleValue(moduleLessons[index - 1].solution, locale));
      }
    }
  });

  test("keeps semantic artifacts bilingual and validates every exercise", async () => {
    const exercises = firstFive[2].lessons.filter((lesson) => lesson.type !== "quiz");

    for (const lesson of exercises) {
      for (const locale of ["fr", "en"]) {
        const starter = resolveLocaleValue(lesson.starterCode, locale);
        const solution = resolveLocaleValue(lesson.solution, locale);
        const starterResults = await validateLesson(lesson, starter, locale);
        const solutionResults = await validateLesson(lesson, solution, locale);
        expect(starterResults.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solutionResults.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
        if (locale === "en") expect(solution).not.toMatch(/\b(?:Programme|Lieu|Atelier|Faut-il|Non,|Contact :)\b/);
      }
    }
  });

  test("covers every semantic module outcome in the program project", () => {
    const project = byId("html-02-project-program");
    const solution = resolveLocaleValue(project.solution, "en");

    expect(solution).toContain('<html lang="en">');
    expect(solution).toMatch(/<strong>|<em>|<blockquote|<cite>|<details>|<abbr|<code>|<address>/g);
    expect(project.tests.length).toBeGreaterThanOrEqual(12);
  });

  test("aligns the semantics quiz with headings, articles, and section names", () => {
    const quiz = byId("html-02-semantics-quiz");

    expect(quiz.questions[0].answer).toBe("outline");
    expect(quiz.questions[1].answer).toBe("article");
    expect(quiz.questions[2].answer).toEqual(["headings", "names", "articles"]);
    expect(quiz.questions[4].answer).toEqual(["event", "program", "session", "detail"]);
    expect(quiz.questions[5].answer).toEqual(expect.arrayContaining(["aria-labelledby", "id", "heading"]));
    expect(quiz.questions[5].answer).not.toContain("transcription");
  });

  test("carries navigation decisions from one lesson into the next", () => {
    const moduleLessons = firstFive[3].lessons.filter((lesson) => lesson.type === "html");

    for (let index = 1; index < moduleLessons.length; index += 1) {
      for (const locale of ["fr", "en"]) {
        expect(resolveLocaleValue(moduleLessons[index].starterCode, locale)).toBe(resolveLocaleValue(moduleLessons[index - 1].solution, locale));
      }
    }
  });

  test("validates navigation destinations and bilingual solutions", async () => {
    const exercises = firstFive[3].lessons.filter((lesson) => lesson.type !== "quiz");

    for (const lesson of exercises) {
      for (const locale of ["fr", "en"]) {
        const starter = resolveLocaleValue(lesson.starterCode, locale);
        const solution = resolveLocaleValue(lesson.solution, locale);
        const starterResults = await validateLesson(lesson, starter, locale);
        const solutionResults = await validateLesson(lesson, solution, locale);
        expect(starterResults.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solutionResults.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
        if (locale === "en") expect(solution).not.toMatch(/\b(?:Programme|Intervenants|Inscription|Aller|Écrire|Télécharger|nouvel onglet)\b/);
      }
    }
  });

  test("uses complete teaching examples instead of navigation solutions", () => {
    const lessons = firstFive[3].lessons.filter((lesson) => lesson.type === "html");
    const englishExamples = lessons.flatMap((lesson) => lesson.course.en.sections.map((section) => section.example));

    expect(englishExamples.join("\n")).not.toContain('<html lang="fr">');
    expect(englishExamples.join("\n")).not.toMatch(/Aller|Navigation principale|nouvel onglet/);
    expect(englishExamples.every((example) => !example.endsWith("<") && !example.endsWith("\""))).toBe(true);
  });

  test("covers every navigation outcome in the project", async () => {
    const project = byId("html-03-project-navigation");
    const englishSolution = resolveLocaleValue(project.solution, "en");

    expect(englishSolution).toContain('<html lang="en">');
    expect(englishSolution).toContain('href="tel:+33123456789"');
    expect(englishSolution).toContain("download");
    expect(englishSolution).toContain("new tab");
    expect(project.tests.length).toBeGreaterThanOrEqual(12);
    expect((await validateLesson(project, englishSolution, "en")).every((result) => result.pass)).toBe(true);
  });

  test("aligns the navigation quiz with link and target behavior", () => {
    const quiz = byId("html-03-navigation-quiz");

    expect(quiz.questions[0].answer).toBe("unknown");
    expect(quiz.questions[1].answer).toBe("location");
    expect(quiz.questions[2].answer).toEqual(["destination", "warning", "rel"]);
    expect(quiz.questions[4].answer).toEqual(["label", "href", "target", "activate"]);
    expect(quiz.questions[5].answer).toEqual(["main-content"]);
  });

  test("carries media decisions from one lesson into the next", () => {
    const moduleLessons = firstFive[4].lessons.filter((lesson) => lesson.type === "html");

    for (let index = 1; index < moduleLessons.length; index += 1) {
      for (const locale of ["fr", "en"]) {
        expect(resolveLocaleValue(moduleLessons[index].starterCode, locale)).toBe(resolveLocaleValue(moduleLessons[index - 1].solution, locale));
      }
    }
  });

  test("validates every media exercise and requires meaningful work", async () => {
    const exercises = firstFive[4].lessons.filter((lesson) => lesson.type !== "quiz");

    for (const lesson of exercises) {
      for (const locale of ["fr", "en"]) {
        const starter = resolveLocaleValue(lesson.starterCode, locale);
        const solution = resolveLocaleValue(lesson.solution, locale);
        const starterResults = await validateLesson(lesson, starter, locale);
        const solutionResults = await validateLesson(lesson, solution, locale);
        expect(starterResults.some((result) => !result.pass), `${lesson.id} ${locale} starter`).toBe(true);
        expect(solutionResults.every((result) => result.pass), `${lesson.id} ${locale} solution`).toBe(true);
        if (locale === "en") expect(solution).not.toMatch(/Intervenants|Télécharger|Bienvenue à|neuf heures|La vidéo montre/);
      }
    }
  });

  test("ships every media file referenced by the module", () => {
    const exercises = firstFive[4].lessons.filter((lesson) => lesson.type !== "quiz");
    const references = new Set(exercises.flatMap((lesson) => ["fr", "en"].flatMap((locale) => resolveLocaleValue(lesson.solution, locale).match(/\/assets\/[^"']+/g) || [])));

    for (const reference of references) {
      const asset = resolve(process.cwd(), `public${reference}`);
      expect(existsSync(asset), reference).toBe(true);
      expect(statSync(asset).size, reference).toBeGreaterThan(20);
    }
    expect(readFileSync(resolve(process.cwd(), "public/assets/pulsaconf-captions-fr.vtt"), "utf8")).toMatch(/^WEBVTT/);
    expect(readFileSync(resolve(process.cwd(), "public/assets/pulsaconf-captions-en.vtt"), "utf8")).toMatch(/^WEBVTT/);
  });

  test("keeps teaching examples distinct from media corrections", () => {
    const mediaLessons = firstFive[4].lessons.filter((lesson) => lesson.type === "html");

    for (const lesson of mediaLessons) {
      for (const locale of ["fr", "en"]) {
        const solution = resolveLocaleValue(lesson.solution, locale);
        const examples = lesson.course[locale].sections.map((section) => section.example);
        expect(examples.every((example) => example !== solution), `${lesson.id} ${locale}`).toBe(true);
        expect(lesson.pedagogy[locale].comparison.good.code).not.toBe(solution);
      }
    }
  });

  test("aligns the media quiz with alternatives and equivalent content", () => {
    const quiz = byId("html-04-media-quiz");

    expect(quiz.questions[0].answer).toBe("generic");
    expect(quiz.questions[1].answer).toBe("captions");
    expect(quiz.questions[2].answer).toEqual(["alt", "dimensions", "captions", "transcript"]);
    expect(quiz.questions[3].answer).toBe("false");
    expect(quiz.questions[4].answer).toEqual(["purpose", "alternative", "controls", "without"]);
    expect(quiz.questions[5].answer).toEqual(expect.arrayContaining(["horaire", "time", "9 h 30", "9:30"]));
  });
});
