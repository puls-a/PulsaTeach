import { module, lesson, quizLesson, projectLesson, test } from "./legacyTrackBuilders.js";

const htmlShell = (body) => `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <title>PulsaTeach Lab</title>
  </head>
  <body>
${body}
  </body>
</html>`;

export const htmlAdvancedModules = [module("html-forms-seo", "Données, formulaires, SEO", "Data, forms, SEO", [
        lesson({
          id: "html-06-tables",
          title: ["Tableaux accessibles", "Accessible tables"],
          brief: ["Construis un tableau avec caption, th scope et au moins deux lignes.", "Build a table with caption, scoped th cells, and at least two rows."],
          starterCode: htmlShell(`    <!-- Planning de cours -->`),
          solution: htmlShell(`    <table>
      <caption>Planning PulsaTeach</caption>
      <tr><th scope="col">Jour</th><th scope="col">Sujet</th></tr>
      <tr><td>Lundi</td><td>HTML</td></tr>
      <tr><td>Mardi</td><td>CSS</td></tr>
    </table>`),
          tests: [test("selector", "table", "table"), test("selector", "caption", "caption"), test("selector", "scope", "th[scope]"), test("minSelector", "rows", "tr", 3)],
          hint: ["caption explique le tableau avant les lignes.", "caption explains the table before the rows."],
          xp: 30
        }),
        lesson({
          id: "html-07-forms-basics",
          title: ["Formulaire de base", "Basic form"],
          brief: ["Crée un formulaire avec label, input email et bouton.", "Create a form with label, email input, and button."],
          starterCode: htmlShell(`    <form>
    </form>`),
          solution: htmlShell(`    <form>
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required />
      <button type="submit">Rejoindre</button>
    </form>`),
          tests: [test("selector", "form", "form"), test("selector", "label", "label[for]"), test("selector", "email input", "input[type=\"email\"]"), test("selector", "button", "button")],
          hint: ["Le for du label doit pointer vers l'id du champ.", "The label for attribute must point to the field id."],
          xp: 30
        }),
        lesson({
          id: "html-09-semantic-layout",
          title: ["Layout sémantique", "Semantic layout"],
          brief: ["Remplace les div génériques par header, nav, main, section et footer.", "Replace generic divs with header, nav, main, section, and footer."],
          starterCode: `<div>Logo</div>
<div>Menu</div>
<div>Contenu</div>
<div>Bas de page</div>`,
          solution: `<header>Logo</header>
<nav><a href="#learn">Apprendre</a></nav>
<main>
  <section id="learn"><h1>Apprendre HTML</h1></section>
</main>
<footer>Bas de page</footer>`,
          tests: [test("selector", "header", "header"), test("selector", "nav", "nav"), test("selector", "main", "main"), test("selector", "section", "section"), test("selector", "footer", "footer")],
          hint: ["La sémantique décrit le rôle du bloc.", "Semantics describe the role of the block."],
          xp: 35
        }),
        lesson({
          id: "html-09-fieldset-groups",
          title: ["Regrouper les champs", "Group form fields"],
          brief: ["Structure un formulaire de préférences avec fieldset, legend, radios et noms cohérents.", "Structure a preferences form with fieldset, legend, radio buttons, and coherent names."],
          starterCode: htmlShell(`    <form>
      <!-- Choix du rythme d'apprentissage -->
    </form>`),
          solution: htmlShell(`    <form>
      <fieldset>
        <legend>Rythme d'apprentissage</legend>
        <label><input type="radio" name="pace" value="calm" /> Calme</label>
        <label><input type="radio" name="pace" value="intensive" /> Intensif</label>
      </fieldset>
      <button type="submit">Sauvegarder</button>
    </form>`),
          tests: [test("selector", "fieldset", "fieldset"), test("selector", "legend", "legend"), test("minSelector", "two radio choices", "input[type=\"radio\"]", 2), test("selector", "named radio group", "input[type=\"radio\"][name=\"pace\"]"), test("selector", "submit button", "button[type=\"submit\"]")],
          hint: ["Tous les boutons radio d'un même choix partagent le même name.", "All radio buttons in one choice share the same name."],
          xp: 35
        }),
        lesson({
          id: "html-09-native-validation",
          title: ["Validation HTML native", "Native HTML validation"],
          brief: ["Ajoute des contraintes utiles avec required, minlength, maxlength et pattern.", "Add useful constraints with required, minlength, maxlength, and pattern."],
          starterCode: htmlShell(`    <form>
      <label for="username">Identifiant</label>
      <input id="username" name="username" />
      <button type="submit">Créer le compte</button>
    </form>`),
          solution: htmlShell(`    <form>
      <label for="username">Identifiant</label>
      <input id="username" name="username" required minlength="3" maxlength="20" pattern="[a-z0-9-]+" aria-describedby="username-help" />
      <p id="username-help">3 à 20 caractères : lettres minuscules, chiffres et tirets.</p>
      <button type="submit">Créer le compte</button>
    </form>`),
          tests: [test("selector", "required username", "input[required]"), test("selector", "minimum length", "input[minlength]"), test("selector", "maximum length", "input[maxlength]"), test("selector", "validation pattern", "input[pattern]"), test("selector", "described help", "input[aria-describedby]")],
          hint: ["Explique toujours les contraintes avant que la validation échoue.", "Always explain constraints before validation fails."],
          xp: 40
        })
      ]),
      module("html-a11y-final", "Accessibilité et projet final", "Accessibility and final project", [
        lesson({
          id: "html-08-form-controls-validation",
          title: ["Contrôles et validation", "Controls and validation"],
          brief: ["Ajoute un champ email requis, une checkbox de consentement et un select de niveau.", "Add a required email field, a consent checkbox, and a level select."],
          starterCode: htmlShell(`    <form>
      <!-- Ajoute les contrôles ici -->
    </form>`),
          solution: htmlShell(`    <form>
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required />

      <label for="level">Niveau</label>
      <select id="level" name="level">
        <option>Débutant</option>
        <option>Intermédiaire</option>
      </select>

      <label>
        <input type="checkbox" name="consent" required />
        J'accepte de recevoir les consignes du cours
      </label>
      <button type="submit">Valider</button>
    </form>`),
          tests: [test("selector", "required email", "input[type=\"email\"][required]"), test("selector", "select", "select"), test("selector", "checkbox", "input[type=\"checkbox\"]"), test("selector", "labels", "label", 3)],
          hint: ["required se place directement sur les champs obligatoires.", "required goes directly on mandatory fields."],
          xp: 35
        }),
        lesson({
          id: "html-09-aria-status",
          title: ["Message de statut", "Status message"],
          brief: ["Ajoute une zone de statut accessible qui annonce la sauvegarde d'un exercice.", "Add an accessible status region that announces that an exercise was saved."],
          starterCode: htmlShell(`    <form>
      <button type="submit">Sauver</button>
      <!-- Message de statut ici -->
    </form>`),
          solution: htmlShell(`    <form>
      <button type="submit">Sauver</button>
      <p role="status" aria-live="polite">Exercice sauvegardé.</p>
    </form>`),
          tests: [test("selector", "status role", "[role=\"status\"]"), test("selector", "aria live", "[aria-live=\"polite\"]"), test("contains", "saved text", "sauvegard")],
          hint: ["role=status et aria-live=polite permettent d'annoncer un changement sans interrompre brutalement.", "role=status and aria-live=polite announce a change without interrupting too aggressively."],
          xp: 30
        }),
        quizLesson({
          id: "html-10-accessibility-quiz",
          title: ["Quiz accessibilité", "Accessibility quiz"],
          brief: ["Choisis la meilleure correction pour un champ de formulaire accessible.", "Choose the best fix for an accessible form field."],
          question: {
            fr: "Quel élément rend un input compréhensible par un lecteur d'écran ?",
            en: "Which element makes an input understandable to a screen reader?"
          },
          options: [
            { id: "placeholder", label: { fr: "Un placeholder seulement", en: "A placeholder only" } },
            { id: "label", label: { fr: "Un label relié avec for/id", en: "A label connected with for/id" } },
            { id: "color", label: { fr: "Une couleur plus vive", en: "A brighter color" } }
          ],
          answer: "label",
          explanation: {
            fr: "Le label explicite reste disponible même quand le champ est rempli et il est annoncé par les aides techniques.",
            en: "An explicit label remains available after typing and is announced by assistive technologies."
          },
          xp: 20
        }),
        lesson({
          id: "html-11-seo-best-practices",
          title: ["SEO de base", "Basic SEO"],
          brief: ["Améliore head avec un title précis, une meta description et un seul h1.", "Improve head with a precise title, meta description, and one h1."],
          starterCode: `<head>
  <title>Page</title>
</head>
<body>
  <h1>Atelier</h1>
</body>`,
          solution: `<head>
  <meta charset="UTF-8" />
  <title>Atelier HTML débutant | PulsaTeach</title>
  <meta name="description" content="Un atelier simple pour apprendre les bases du HTML avec PulsaTeach." />
</head>
<body>
  <h1>Atelier HTML</h1>
</body>`,
          tests: [test("contains", "meta description", "meta name=\"description\""), test("contains", "specific title", "PulsaTeach"), test("selector", "one h1", "h1")],
          hint: ["La meta description résume la page pour les moteurs et les humains.", "The meta description summarizes the page for search engines and humans."],
          xp: 30
        }),
        lesson({
          id: "html-11-landmarks-skip-link",
          title: ["Landmarks et lien d'évitement", "Landmarks and skip link"],
          brief: ["Ajoute un lien d'évitement et des zones header, nav, main et footer clairement identifiables.", "Add a skip link and clearly identifiable header, nav, main, and footer regions."],
          starterCode: htmlShell(`    <header><h1>Documentation</h1></header>
    <nav><a href="#guide">Guide</a></nav>
    <main><section id="guide"><h2>Guide</h2></section></main>
    <footer>Aide</footer>`),
          solution: htmlShell(`    <a href="#main-content">Aller au contenu principal</a>
    <header><h1>Documentation</h1></header>
    <nav aria-label="Navigation principale"><a href="#guide">Guide</a></nav>
    <main id="main-content"><section id="guide"><h2>Guide</h2></section></main>
    <footer>Aide</footer>`),
          tests: [test("selector", "skip link", "a[href=\"#main-content\"]"), test("selector", "main target", "main#main-content"), test("selector", "named navigation", "nav[aria-label]"), test("selector", "footer landmark", "footer")],
          hint: ["Le href du lien d'évitement doit viser l'id du contenu principal.", "The skip link href must target the main content id."],
          xp: 35
        }),
        projectLesson({
          id: "html-11-accessibility-audit",
          title: ["Audit : corriger une page", "Audit: fix a page"],
          brief: ["Corrige une page volontairement mauvaise : langue, hiérarchie, image, navigation, formulaire et bouton.", "Fix an intentionally poor page: language, hierarchy, image, navigation, form, and button."],
          starterCode: `<html>
  <body>
    <div>Mon service</div>
    <div><a href="#">Clique ici</a></div>
    <div><img src="team.jpg" /></div>
    <div><input type="email" placeholder="Email" /><div>Envoyer</div></div>
  </body>
</html>`,
          solution: `<!doctype html>
<html lang="fr">
  <head><meta charset="UTF-8" /><title>Mon service accessible</title></head>
  <body>
    <header><h1>Mon service</h1></header>
    <nav aria-label="Navigation principale"><a href="#team">Découvrir l'équipe</a></nav>
    <main id="main-content"><section id="team"><h2>Notre équipe</h2><img src="team.jpg" alt="Équipe réunie dans le bureau" /></section><form><label for="email">Email</label><input id="email" type="email" required /><button type="submit">Envoyer</button></form></main>
  </body>
</html>`,
          tests: [test("contains", "doctype", "<!doctype html>"), test("contains", "document language", "lang=\"fr\""), test("selector", "main heading", "h1"), test("selector", "descriptive image", "img[alt]"), test("selector", "form label", "label[for]"), test("selector", "real button", "button[type=\"submit\"]")],
          xp: 80
        }),
        projectLesson({
          id: "html-12-final-project",
          title: ["Projet PulsaConf", "PulsaConf project"],
          brief: ["Construis une page événementielle avec header, nav, sections, tableau, images alt, formulaire et footer.", "Build an event page with header, nav, sections, table, alt images, form, and footer."],
          starterCode: htmlShell(`    <!-- Construis PulsaConf ici -->`),
          solution: htmlShell(`    <header>
      <h1>PulsaConf 2026</h1>
      <nav><a href="#schedule">Programme</a><a href="#register">Inscription</a></nav>
    </header>
    <main>
      <section><h2>Le code en couleur</h2><p>Une journée pour apprendre.</p></section>
      <section id="schedule"><h2>Programme</h2><table><caption>Planning</caption><tr><th scope="col">Heure</th><th scope="col">Sujet</th></tr><tr><td>9h</td><td>HTML</td></tr></table></section>
      <section><h2>Intervenants</h2><img src="speaker.jpg" alt="Intervenante PulsaTeach" /></section>
      <section id="register"><h2>Inscription</h2><form><label for="email">Email</label><input id="email" type="email" /><button>Réserver</button></form></section>
    </main>
    <footer>© PulsaTeach</footer>`),
          tests: [test("selector", "header", "header"), test("selector", "nav", "nav"), test("minSelector", "four sections", "section", 4), test("selector", "table", "table"), test("selector", "form", "form"), test("selector", "image alt", "img[alt]"), test("selector", "footer", "footer")],
          xp: 100
        })
      ])
];
