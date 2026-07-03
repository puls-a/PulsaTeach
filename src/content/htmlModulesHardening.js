import { lesson, module, projectLesson, test } from "./trackBuilders.js";
import { htmlShell } from "./htmlWorkshopBuilders.js";

const page = (head, body) => `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
${head}
  </head>
  <body>
${body}
  </body>
</html>`;

export const htmlProductionHardeningModules = [
  module("html-production-hardening", "HTML production et publication", "Production HTML and publishing", [
    unique(lesson({
      id: "html-14-production-head",
      title: ["Head publiable", "Publishable head"],
      brief: ["Prépare un head complet avec title, description, canonical, Open Graph, viewport et favicon.", "Prepare a complete head with title, description, canonical, Open Graph, viewport, and favicon."],
      starterCode: page("    <title>PulsaTeach</title>", "    <main><h1>Cours HTML</h1></main>"),
      solution: page(`    <title>Apprendre HTML gratuitement | PulsaTeach</title>
    <meta name="description" content="Cours HTML gratuit avec exercices interactifs, accessibilité, SEO et projet PulsaConf." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href="https://pulsateach.vercel.app/learn/html" />
    <link rel="icon" href="/assets/favicon.ico" />
    <meta property="og:title" content="Apprendre HTML gratuitement | PulsaTeach" />
    <meta property="og:description" content="Construis des pages HTML accessibles avec des tests guidés." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://pulsateach.vercel.app/learn/html" />`, "    <main><h1>Cours HTML</h1></main>"),
      tests: [test("doctype", "doctype", "<!doctype html>"), test("contains", "lang fr", "lang=\"fr\""), test("contains", "charset", "charset=\"UTF-8\""), test("contains", "specific title", "Apprendre HTML gratuitement"), test("contains", "meta description", "meta name=\"description\""), test("contains", "viewport", "name=\"viewport\""), test("contains", "canonical", "rel=\"canonical\""), test("contains", "favicon", "rel=\"icon\""), test("contains", "og title", "property=\"og:title\""), test("contains", "og url", "property=\"og:url\"")],
      hint: ["Le head décrit la page pour le navigateur, les moteurs et le partage social.", "The head describes the page for browsers, search engines, and social sharing."],
      xp: 45
    })),
    unique(lesson({
      id: "html-14-navigation-keyboard",
      title: ["Navigation robuste", "Robust navigation"],
      brief: ["Ajoute skip link, header, nav nommée, main ciblé, aria-current et footer.", "Add skip link, header, named nav, targeted main, aria-current, and footer."],
      starterCode: htmlShell(`    <header><h1>PulsaTeach</h1></header>
    <main><h2>HTML</h2></main>`),
      solution: htmlShell(`    <a href="#main-content">Aller au contenu principal</a>
    <header><h1>PulsaTeach</h1></header>
    <nav aria-label="Navigation principale">
      <a href="/catalog">Formations</a>
      <a href="/learn/html" aria-current="page">HTML</a>
      <a href="/glossary">Vocabulaire</a>
    </nav>
    <main id="main-content" tabindex="-1"><h2>HTML</h2></main>
    <footer><a href="/legal/mentions-legales">Mentions légales</a></footer>`),
      tests: [test("selector", "skip link", "a[href=\"#main-content\"]"), test("selector", "header", "header"), test("selector", "named nav", "nav[aria-label]"), test("minSelector", "three nav links", "nav a", 3), test("selector", "current page", "a[aria-current=\"page\"]"), test("selector", "main target", "main#main-content"), test("selector", "focusable main", "main[tabindex=\"-1\"]"), test("selector", "footer", "footer"), test("selector", "legal link", "footer a[href*=\"mentions-legales\"]"), test("notContains", "no vague link", "clique ici")],
      hint: ["Le lien d’évitement doit pointer vers le même id que main.", "The skip link must point to the same id as main."],
      xp: 45
    })),
    unique(lesson({
      id: "html-14-form-production",
      title: ["Formulaire publiable", "Publishable form"],
      brief: ["Construis un formulaire avec labels, aides, contraintes, fieldset, consentement, statut et autocomplete.", "Build a form with labels, help text, constraints, fieldset, consent, status, and autocomplete."],
      starterCode: htmlShell(`    <form>
      <!-- Inscription -->
    </form>`),
      solution: htmlShell(`    <form aria-describedby="form-help">
      <p id="form-help">Inscription gratuite, aucun paiement demandé.</p>
      <fieldset>
        <legend>Profil apprenant</legend>
        <label for="name">Nom</label>
        <input id="name" name="name" autocomplete="name" required minlength="2" />
        <label for="email">Email</label>
        <input id="email" name="email" type="email" autocomplete="email" required aria-describedby="email-help" />
        <p id="email-help">Utilise une adresse valide pour retrouver ta progression.</p>
      </fieldset>
      <label><input type="checkbox" name="privacy" required /> J’accepte l’usage local de ma progression.</label>
      <button type="submit">Créer mon espace</button>
      <p role="status" aria-live="polite">Prêt à envoyer.</p>
    </form>`),
      tests: [test("selector", "described form", "form[aria-describedby]"), test("selector", "fieldset", "fieldset"), test("selector", "legend", "legend"), test("selector", "name label", "label[for=\"name\"]"), test("selector", "name autocomplete", "input[autocomplete=\"name\"]"), test("selector", "email label", "label[for=\"email\"]"), test("selector", "email input", "input[type=\"email\"][required]"), test("selector", "email help", "input[aria-describedby=\"email-help\"]"), test("selector", "checkbox consent", "input[type=\"checkbox\"][required]"), test("selector", "status", "[role=\"status\"][aria-live=\"polite\"]"), test("selector", "submit", "button[type=\"submit\"]")],
      hint: ["Chaque contrainte doit être annoncée avant l’erreur.", "Every constraint should be announced before the error."],
      xp: 50
    })),
    unique(lesson({
      id: "html-14-rich-data",
      title: ["Données riches", "Rich data"],
      brief: ["Publie un tableau de progression avec caption, thead, tbody, scope, time, data et résumé.", "Publish a progress table with caption, thead, tbody, scope, time, data, and summary."],
      starterCode: htmlShell(`    <!-- Tableau progression -->`),
      solution: htmlShell(`    <section aria-labelledby="progress-title">
      <h2 id="progress-title">Progression HTML</h2>
      <table>
        <caption>Progression hebdomadaire sur PulsaTeach</caption>
        <thead><tr><th scope="col">Date</th><th scope="col">Module</th><th scope="col">Score</th></tr></thead>
        <tbody>
          <tr><th scope="row"><time datetime="2026-06-30">30 juin</time></th><td>Formulaires</td><td><data value="82">82 %</data></td></tr>
          <tr><th scope="row"><time datetime="2026-07-01">1 juillet</time></th><td>SEO</td><td><data value="90">90 %</data></td></tr>
        </tbody>
      </table>
      <p>Objectif : conserver un score supérieur à 80 %.</p>
    </section>`),
      tests: [test("selector", "labelled section", "section[aria-labelledby]"), test("selector", "heading id", "#progress-title"), test("selector", "table", "table"), test("selector", "caption", "caption"), test("selector", "thead", "thead"), test("selector", "tbody", "tbody"), test("minSelector", "column headers", "th[scope=\"col\"]", 3), test("minSelector", "row headers", "th[scope=\"row\"]", 2), test("minSelector", "machine dates", "time[datetime]", 2), test("minSelector", "machine scores", "data[value]", 2), test("selector", "summary paragraph", "section p")],
      hint: ["Un tableau utile annonce son sujet avant les cellules.", "A useful table announces its subject before its cells."],
      xp: 50
    })),
    unique(lesson({
      id: "html-14-media-accessible",
      title: ["Médias accessibles", "Accessible media"],
      brief: ["Ajoute figure, image alt, figcaption, vidéo avec piste de sous-titres et transcription.", "Add figure, image alt, figcaption, video with captions track, and transcript."],
      starterCode: htmlShell(`    <section>
      <!-- Média de cours -->
    </section>`),
      solution: htmlShell(`    <section aria-labelledby="media-title">
      <h2 id="media-title">Comprendre une balise</h2>
      <figure>
        <img src="/assets/html-structure.webp" width="960" height="540" alt="Schéma montrant html, head et body" loading="lazy" />
        <figcaption>Structure minimale d’un document HTML moderne.</figcaption>
      </figure>
      <video controls width="960" height="540" aria-describedby="transcript">
        <source src="/assets/html-intro.mp4" type="video/mp4" />
        <track kind="captions" src="/assets/html-intro-fr.vtt" srclang="fr" label="Français" default />
      </video>
      <p id="transcript">Transcription : la vidéo explique le rôle de doctype, head, body et main.</p>
    </section>`),
      tests: [test("selector", "labelled media section", "section[aria-labelledby]"), test("selector", "figure", "figure"), test("selector", "image alt", "img[alt]"), test("selector", "image dimensions", "img[width][height]"), test("selector", "lazy image", "img[loading=\"lazy\"]"), test("selector", "figcaption", "figcaption"), test("selector", "video controls", "video[controls]"), test("selector", "video source", "video source[type=\"video/mp4\"]"), test("selector", "captions track", "track[kind=\"captions\"]"), test("selector", "default captions", "track[default]"), test("selector", "transcript link", "video[aria-describedby=\"transcript\"]"), test("selector", "transcript", "#transcript")],
      hint: ["Une vidéo accessible a besoin de sous-titres et d’un texte consultable.", "Accessible video needs captions and readable text."],
      xp: 50
    })),
    unique(projectLesson({
      id: "html-14-production-audit-project",
      title: ["Projet : page HTML publiable", "Project: publishable HTML page"],
      brief: ["Assemble une page de cours publique avec head SEO, landmarks, formulaire, données, médias et statut accessible.", "Assemble a public course page with SEO head, landmarks, form, data, media, and accessible status."],
      starterCode: `<!doctype html>
<html lang="fr">
  <head><meta charset="UTF-8" /><title>Cours</title></head>
  <body><!-- Page complète ici --></body>
</html>`,
      solution: page(`    <title>Cours HTML publiable | PulsaTeach</title>
    <meta name="description" content="Page de cours HTML avec SEO, accessibilité, formulaire, médias et données." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href="https://pulsateach.vercel.app/learn/html/html-14-production-audit-project" />
    <meta property="og:title" content="Cours HTML publiable | PulsaTeach" />`, `    <a href="#main-content">Aller au contenu principal</a>
    <header><h1>Cours HTML publiable</h1></header>
    <nav aria-label="Navigation du cours"><a href="#form">Inscription</a><a href="#progress">Progression</a><a href="#media">Média</a></nav>
    <main id="main-content">
      <section id="form" aria-labelledby="form-title"><h2 id="form-title">Inscription</h2><form><label for="email">Email</label><input id="email" type="email" required autocomplete="email" /><button type="submit">Commencer</button><p role="status" aria-live="polite">Formulaire prêt.</p></form></section>
      <section id="progress" aria-labelledby="progress-title"><h2 id="progress-title">Progression</h2><table><caption>Suivi</caption><tr><th scope="col">Module</th><th scope="col">Score</th></tr><tr><th scope="row">HTML</th><td><data value="90">90 %</data></td></tr></table></section>
      <section id="media" aria-labelledby="media-title"><h2 id="media-title">Média</h2><figure><img src="/assets/html.webp" width="960" height="540" alt="Structure HTML" /><figcaption>Document structuré.</figcaption></figure></section>
    </main>
    <footer><a href="/legal/mentions-legales">Mentions légales</a></footer>`),
      tests: [test("doctype", "doctype", "<!doctype html>"), test("contains", "lang", "lang=\"fr\""), test("contains", "meta description", "meta name=\"description\""), test("contains", "canonical", "rel=\"canonical\""), test("selector", "skip link", "a[href=\"#main-content\"]"), test("selector", "header", "header"), test("selector", "named nav", "nav[aria-label]"), test("selector", "main", "main#main-content"), test("selector", "form", "form"), test("selector", "email", "input[type=\"email\"][required]"), test("selector", "status", "[role=\"status\"][aria-live=\"polite\"]"), test("selector", "table", "table"), test("selector", "caption", "caption"), test("selector", "scoped header", "th[scope]"), test("selector", "data score", "data[value]"), test("selector", "figure", "figure"), test("selector", "image alt", "img[alt]"), test("selector", "figcaption", "figcaption"), test("selector", "footer", "footer"), test("notContains", "no vague link", "clique ici")],
      xp: 130
    }))
  ])
];

function unique(item) {
  const intro = `${item.title.fr} — ${item.brief.fr}`;
  const mistake = `${item.id} : utiliser une structure générique sans prouver le rôle, la navigation et l’accessibilité.`;
  return {
    ...item,
    course: {
      ...item.course,
      fr: { ...item.course?.fr, introduction: intro },
      en: { ...item.course?.en, introduction: `${item.title.en} — ${item.brief.en}` }
    },
    guide: {
      ...item.guide,
      fr: { ...item.guide?.fr, mistakes: [mistake, ...(item.guide?.fr?.mistakes || []).slice(1)] },
      en: { ...item.guide?.en, mistakes: [`${item.id}: using generic markup without proving role, navigation, and accessibility.`, ...(item.guide?.en?.mistakes || []).slice(1)] }
    }
  };
}
