import { module, lesson, projectLesson, test } from "./trackBuilders.js";
import { htmlShell, step, workshopQuiz } from "./htmlWorkshopBuilders.js";

export const htmlWorkshopModules = [
  module("html-pulsaconf-workshop", "Atelier PulsaConf", "PulsaConf workshop", [
    step(1, lesson({
      id: "html-13-workshop-shell",
      title: ["Étape 1 : préparer le document", "Step 1: prepare the document"],
      brief: ["Crée le squelette complet de la page PulsaConf avec langue, encodage, titre et contenu principal.", "Create the full PulsaConf page skeleton with language, charset, title, and main content."],
      starterCode: `<html>
  <head></head>
  <body></body>
</html>`,
      solution: htmlShell(`    <main id="main-content">
      <h1>PulsaConf 2026</h1>
    </main>`),
      tests: [
        test("doctype", "doctype", "<!doctype html>"),
        test("contains", "document language", "lang=\"fr\""),
        test("contains", "charset", "charset=\"UTF-8\""),
        test("contains", "specific title", "<title>PulsaConf Atelier</title>"),
        test("selector", "main content", "main#main-content"),
        test("selector", "main heading", "h1")
      ],
      hint: ["Commence par le document, pas par les détails visuels.", "Start with the document, not visual details."],
      xp: 25
    })),
    step(2, lesson({
      id: "html-13-workshop-header",
      title: ["Étape 2 : ajouter l’en-tête", "Step 2: add the header"],
      brief: ["Ajoute un header avec le titre de l’événement et une baseline courte.", "Add a header with the event title and a short tagline."],
      starterCode: htmlShell(`    <main id="main-content"></main>`),
      solution: htmlShell(`    <header>
      <p>Conférence gratuite pour apprendre le web</p>
      <h1>PulsaConf 2026</h1>
    </header>
    <main id="main-content"></main>`),
      tests: [
        test("selector", "header landmark", "header"),
        test("selector", "single h1", "header h1"),
        test("selector", "tagline paragraph", "header p"),
        test("contains", "event name", "PulsaConf 2026"),
        test("selector", "main remains present", "main#main-content")
      ],
      hint: ["Le header présente la page avant la navigation ou le contenu détaillé.", "The header introduces the page before navigation or detailed content."],
      xp: 25
    }), "html-13-workshop-shell"),
    step(3, lesson({
      id: "html-13-workshop-nav",
      title: ["Étape 3 : relier les sections", "Step 3: link the sections"],
      brief: ["Crée une navigation avec trois liens internes vers programme, intervenants et inscription.", "Create navigation with three internal links to schedule, speakers, and registration."],
      starterCode: htmlShell(`    <header><h1>PulsaConf 2026</h1></header>
    <main id="main-content"></main>`),
      solution: htmlShell(`    <header><h1>PulsaConf 2026</h1></header>
    <nav aria-label="Navigation PulsaConf">
      <a href="#schedule">Programme</a>
      <a href="#speakers">Intervenants</a>
      <a href="#register">Inscription</a>
    </nav>
    <main id="main-content"></main>`),
      tests: [
        test("selector", "named navigation", "nav[aria-label]"),
        test("selector", "schedule link", "a[href=\"#schedule\"]"),
        test("selector", "speakers link", "a[href=\"#speakers\"]"),
        test("selector", "register link", "a[href=\"#register\"]"),
        test("minSelector", "three navigation links", "nav a", 3)
      ],
      hint: ["Un lien interne cible l’id exact de la section.", "An internal link targets the exact section id."],
      xp: 25
    }), "html-13-workshop-header"),
    workshopQuiz(4, "html-13-workshop-nav-quiz", ["Quiz : navigation", "Quiz: navigation"], {
      fr: "Pourquoi ajouter un aria-label sur ce nav ?",
      en: "Why add an aria-label to this nav?"
    }, [
      { id: "style", label: { fr: "Pour changer la couleur des liens", en: "To change link color" } },
      { id: "name", label: { fr: "Pour nommer cette zone de navigation", en: "To name this navigation region" } },
      { id: "speed", label: { fr: "Pour accélérer le chargement", en: "To speed up loading" } }
    ], "name", {
      fr: "Quand une page peut avoir plusieurs navigations, le nom aide les technologies d’assistance à les distinguer.",
      en: "When a page can have several navigations, the name helps assistive tech distinguish them."
    }, "html-13-workshop-nav"),
    step(5, lesson({
      id: "html-13-workshop-hero",
      title: ["Étape 5 : structurer le hero", "Step 5: structure the hero"],
      brief: ["Ajoute une section hero avec un h2, un texte d’intention et un lien d’action vers l’inscription.", "Add a hero section with an h2, intent copy, and an action link to registration."],
      starterCode: htmlShell(`    <main id="main-content">
      <!-- Hero ici -->
    </main>`),
      solution: htmlShell(`    <main id="main-content">
      <section aria-labelledby="hero-title">
        <h2 id="hero-title">Apprendre en construisant une vraie page</h2>
        <p>Une journée pour pratiquer HTML, accessibilité et publication.</p>
        <a href="#register">Réserver ma place</a>
      </section>
    </main>`),
      tests: [
        test("selector", "labelled hero section", "section[aria-labelledby]"),
        test("selector", "hero title id", "#hero-title"),
        test("selector", "hero paragraph", "section p"),
        test("selector", "registration call to action", "a[href=\"#register\"]"),
        test("notContains", "avoid vague cta", "clique ici")
      ],
      hint: ["Le h2 nomme la section, le lien d’action annonce la destination.", "The h2 names the section, the action link announces its destination."],
      xp: 30
    }), "html-13-workshop-nav"),
    step(6, lesson({
      id: "html-13-workshop-schedule",
      title: ["Étape 6 : publier le programme", "Step 6: publish the schedule"],
      brief: ["Ajoute une section programme avec une liste d’ateliers horodatés.", "Add a schedule section with a list of timed workshops."],
      starterCode: htmlShell(`    <main id="main-content">
      <section id="schedule"></section>
    </main>`),
      solution: htmlShell(`    <main id="main-content">
      <section id="schedule" aria-labelledby="schedule-title">
        <h2 id="schedule-title">Programme</h2>
        <ol>
          <li><time datetime="2026-09-12T09:00">9h00</time> — HTML sémantique</li>
          <li><time datetime="2026-09-12T11:00">11h00</time> — Formulaires accessibles</li>
          <li><time datetime="2026-09-12T14:00">14h00</time> — Audit final</li>
        </ol>
      </section>
    </main>`),
      tests: [
        test("selector", "schedule section", "section#schedule"),
        test("selector", "schedule heading", "#schedule-title"),
        test("selector", "ordered schedule", "ol"),
        test("minSelector", "three time slots", "time[datetime]", 3),
        test("minSelector", "three schedule items", "li", 3)
      ],
      hint: ["time garde une valeur machine lisible dans datetime.", "time keeps a machine-readable value in datetime."],
      xp: 30
    }), "html-13-workshop-hero"),
    step(7, lesson({
      id: "html-13-workshop-speakers",
      title: ["Étape 7 : présenter les intervenants", "Step 7: present speakers"],
      brief: ["Ajoute deux cartes d’intervenants avec article, image alternative et rôle.", "Add two speaker cards with article, alternative image text, and role."],
      starterCode: htmlShell(`    <section id="speakers">
      <h2>Intervenants</h2>
    </section>`),
      solution: htmlShell(`    <section id="speakers" aria-labelledby="speakers-title">
      <h2 id="speakers-title">Intervenants</h2>
      <article>
        <img src="maya.jpg" alt="Portrait de Maya, formatrice accessibilité" />
        <h3>Maya Chen</h3>
        <p>Accessibilité web</p>
      </article>
      <article>
        <img src="noe.jpg" alt="Portrait de Noé, intégrateur front-end" />
        <h3>Noé Martin</h3>
        <p>HTML et qualité</p>
      </article>
    </section>`),
      tests: [
        test("selector", "speakers section", "section#speakers"),
        test("minSelector", "two speaker cards", "article", 2),
        test("minSelector", "two speaker images with alt", "article img[alt]", 2),
        test("minSelector", "speaker names", "article h3", 2),
        test("minSelector", "speaker roles", "article p", 2)
      ],
      hint: ["Chaque intervenant est une petite unité autonome : article est adapté.", "Each speaker is a small standalone unit: article fits."],
      xp: 35
    }), "html-13-workshop-schedule"),
    step(8, lesson({
      id: "html-13-workshop-venue",
      title: ["Étape 8 : décrire le lieu", "Step 8: describe the venue"],
      brief: ["Ajoute une section lieu avec adresse structurée et informations pratiques.", "Add a venue section with structured address and practical information."],
      starterCode: htmlShell(`    <section id="venue">
      <h2>Lieu</h2>
    </section>`),
      solution: htmlShell(`    <section id="venue" aria-labelledby="venue-title">
      <h2 id="venue-title">Lieu</h2>
      <address>
        Maison du Web<br />
        12 rue des Ateliers<br />
        75010 Paris
      </address>
      <p>Métro accessible et accueil ouvert dès 8h30.</p>
    </section>`),
      tests: [
        test("selector", "venue section", "section#venue"),
        test("selector", "venue heading", "#venue-title"),
        test("selector", "structured address", "address"),
        test("selector", "practical info", "section#venue p"),
        test("contains", "accessible info", "accessible")
      ],
      hint: ["address sert aux coordonnées du lieu ou du contact lié au contenu.", "address is for contact or venue information related to the content."],
      xp: 30
    }), "html-13-workshop-speakers"),
    workshopQuiz(9, "html-13-workshop-content-quiz", ["Quiz : contenu structuré", "Quiz: structured content"], {
      fr: "Quel élément convient le mieux pour une carte intervenant autonome ?",
      en: "Which element best fits a standalone speaker card?"
    }, [
      { id: "span", label: { fr: "span", en: "span" } },
      { id: "article", label: { fr: "article", en: "article" } },
      { id: "br", label: { fr: "br", en: "br" } }
    ], "article", {
      fr: "Une carte intervenant peut être comprise seule : article exprime cette autonomie.",
      en: "A speaker card can be understood on its own: article expresses that independence."
    }, "html-13-workshop-venue"),
    step(10, lesson({
      id: "html-13-workshop-register-form",
      title: ["Étape 10 : créer le formulaire", "Step 10: create the form"],
      brief: ["Ajoute un formulaire d’inscription avec labels reliés, email requis et bouton explicite.", "Add a registration form with connected labels, required email, and explicit button."],
      starterCode: htmlShell(`    <section id="register">
      <h2>Inscription</h2>
      <form></form>
    </section>`),
      solution: htmlShell(`    <section id="register" aria-labelledby="register-title">
      <h2 id="register-title">Inscription</h2>
      <form>
        <label for="name">Nom</label>
        <input id="name" name="name" autocomplete="name" required />
        <label for="email">Email</label>
        <input id="email" name="email" type="email" autocomplete="email" required />
        <button type="submit">Réserver ma place</button>
      </form>
    </section>`),
      tests: [
        test("selector", "registration section", "section#register"),
        test("selector", "form", "form"),
        test("selector", "name label", "label[for=\"name\"]"),
        test("selector", "name input", "input#name[name=\"name\"]"),
        test("selector", "email label", "label[for=\"email\"]"),
        test("selector", "required email", "input[type=\"email\"][required]"),
        test("selector", "submit button", "button[type=\"submit\"]")
      ],
      hint: ["Un label relié reste visible, cliquable et annoncé.", "A connected label stays visible, clickable, and announced."],
      xp: 40
    }), "html-13-workshop-venue"),
    step(11, lesson({
      id: "html-13-workshop-form-help",
      title: ["Étape 11 : expliquer les contraintes", "Step 11: explain constraints"],
      brief: ["Ajoute une aide de champ reliée avec aria-describedby et une contrainte minlength.", "Add field help connected with aria-describedby and a minlength constraint."],
      starterCode: htmlShell(`    <form>
      <label for="name">Nom</label>
      <input id="name" name="name" required />
    </form>`),
      solution: htmlShell(`    <form>
      <label for="name">Nom</label>
      <p id="name-help">Indique au moins deux caractères.</p>
      <input id="name" name="name" required minlength="2" aria-describedby="name-help" />
      <button type="submit">Continuer</button>
    </form>`),
      tests: [
        test("selector", "help text id", "#name-help"),
        test("selector", "described field", "input[aria-describedby=\"name-help\"]"),
        test("selector", "minimum length", "input[minlength]"),
        test("selector", "required field", "input[required]"),
        test("selector", "submit button", "button[type=\"submit\"]")
      ],
      hint: ["La contrainte doit être expliquée avant l’erreur.", "The constraint should be explained before the error."],
      xp: 35
    }), "html-13-workshop-register-form"),
    step(12, lesson({
      id: "html-13-workshop-consent",
      title: ["Étape 12 : ajouter le consentement", "Step 12: add consent"],
      brief: ["Ajoute une case de consentement obligatoire avec un texte clair.", "Add a required consent checkbox with clear wording."],
      starterCode: htmlShell(`    <form>
      <!-- Consentement -->
    </form>`),
      solution: htmlShell(`    <form>
      <label>
        <input type="checkbox" name="updates" required />
        J’accepte de recevoir les informations pratiques de PulsaConf.
      </label>
      <button type="submit">Valider l’inscription</button>
    </form>`),
      tests: [
        test("selector", "checkbox", "input[type=\"checkbox\"]"),
        test("selector", "required checkbox", "input[type=\"checkbox\"][required]"),
        test("selector", "checkbox has label", "label input[type=\"checkbox\"]"),
        test("contains", "clear consent text", "informations pratiques"),
        test("selector", "submit button", "button[type=\"submit\"]")
      ],
      hint: ["Le texte du label doit expliquer ce que la personne accepte.", "The label text must explain what the person accepts."],
      xp: 35
    }), "html-13-workshop-form-help"),
    step(13, lesson({
      id: "html-13-workshop-status",
      title: ["Étape 13 : prévoir le statut", "Step 13: prepare status"],
      brief: ["Ajoute une zone de statut qui pourra annoncer la confirmation d’inscription.", "Add a status region that can announce registration confirmation."],
      starterCode: htmlShell(`    <form>
      <button type="submit">Valider</button>
    </form>`),
      solution: htmlShell(`    <form>
      <button type="submit">Valider</button>
      <p role="status" aria-live="polite">Inscription prête à être envoyée.</p>
    </form>`),
      tests: [
        test("selector", "status role", "[role=\"status\"]"),
        test("selector", "polite live region", "[aria-live=\"polite\"]"),
        test("contains", "registration status", "Inscription"),
        test("selector", "form still present", "form"),
        test("selector", "submit button", "button[type=\"submit\"]")
      ],
      hint: ["role=status annonce les changements sans interrompre brutalement.", "role=status announces changes without interrupting aggressively."],
      xp: 35
    }), "html-13-workshop-consent"),
    step(14, lesson({
      id: "html-13-workshop-footer",
      title: ["Étape 14 : finaliser le pied de page", "Step 14: finish the footer"],
      brief: ["Ajoute un footer avec copyright, contact et lien de retour au début.", "Add a footer with copyright, contact, and a back-to-top link."],
      starterCode: htmlShell(`    <main id="main-content"></main>
    <!-- Footer ici -->`),
      solution: htmlShell(`    <main id="main-content"></main>
    <footer>
      <p>&copy; 2026 PulsaTeach</p>
      <a href="mailto:hello@pulsateach.test">Contact organisation</a>
      <a href="#main-content">Retour au contenu principal</a>
    </footer>`),
      tests: [
        test("selector", "footer", "footer"),
        test("contains", "copyright entity", "&copy;"),
        test("selector", "contact email", "a[href^=\"mailto:\"]"),
        test("selector", "back to content", "a[href=\"#main-content\"]"),
        test("selector", "main target", "main#main-content")
      ],
      hint: ["Le footer contient les informations globales et les liens utiles de fin de page.", "The footer contains global information and useful end-of-page links."],
      xp: 30
    }), "html-13-workshop-status"),
    workshopQuiz(15, "html-13-workshop-a11y-quiz", ["Quiz : formulaire accessible", "Quiz: accessible form"], {
      fr: "Quelle combinaison aide le plus un champ obligatoire ?",
      en: "Which combination helps a required field the most?"
    }, [
      { id: "placeholder", label: { fr: "Placeholder seul + couleur rouge", en: "Placeholder only + red color" } },
      { id: "label-help", label: { fr: "Label relié + aide aria-describedby + required", en: "Connected label + aria-describedby help + required" } },
      { id: "emoji", label: { fr: "Emoji obligatoire dans le bouton", en: "Required emoji in the button" } }
    ], "label-help", {
      fr: "Le label donne le nom, aria-describedby ajoute l’aide, required expose la contrainte native.",
      en: "The label gives the name, aria-describedby adds help, required exposes the native constraint."
    }, "html-13-workshop-footer"),
    step(16, projectLesson({
      id: "html-13-workshop-capstone",
      title: ["Projet atelier : assembler PulsaConf", "Workshop project: assemble PulsaConf"],
      brief: ["Assemble une page PulsaConf complète avec structure, navigation, programme, intervenants, lieu, formulaire accessible, statut et footer.", "Assemble a complete PulsaConf page with structure, navigation, schedule, speakers, venue, accessible form, status, and footer."],
      starterCode: htmlShell(`    <!-- Assemble toutes les étapes de l’atelier ici -->`),
      solution: htmlShell(`    <a href="#main-content">Aller au contenu principal</a>
    <header>
      <p>Conférence gratuite pour apprendre le web</p>
      <h1>PulsaConf 2026</h1>
    </header>
    <nav aria-label="Navigation PulsaConf">
      <a href="#schedule">Programme</a>
      <a href="#speakers">Intervenants</a>
      <a href="#venue">Lieu</a>
      <a href="#register">Inscription</a>
    </nav>
    <main id="main-content">
      <section aria-labelledby="hero-title"><h2 id="hero-title">Apprendre en construisant une vraie page</h2><p>Une journée pour pratiquer HTML.</p><a href="#register">Réserver ma place</a></section>
      <section id="schedule" aria-labelledby="schedule-title"><h2 id="schedule-title">Programme</h2><ol><li><time datetime="2026-09-12T09:00">9h00</time> HTML sémantique</li><li><time datetime="2026-09-12T11:00">11h00</time> Formulaires accessibles</li><li><time datetime="2026-09-12T14:00">14h00</time> Audit final</li></ol></section>
      <section id="speakers" aria-labelledby="speakers-title"><h2 id="speakers-title">Intervenants</h2><article><img src="maya.jpg" alt="Portrait de Maya, formatrice accessibilité" /><h3>Maya Chen</h3><p>Accessibilité web</p></article><article><img src="noe.jpg" alt="Portrait de Noé, intégrateur front-end" /><h3>Noé Martin</h3><p>HTML et qualité</p></article></section>
      <section id="venue" aria-labelledby="venue-title"><h2 id="venue-title">Lieu</h2><address>Maison du Web<br />12 rue des Ateliers<br />75010 Paris</address><p>Métro accessible et accueil ouvert dès 8h30.</p></section>
      <section id="register" aria-labelledby="register-title"><h2 id="register-title">Inscription</h2><form><label for="name">Nom</label><p id="name-help">Indique au moins deux caractères.</p><input id="name" name="name" required minlength="2" aria-describedby="name-help" /><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email" required /><label><input type="checkbox" name="updates" required /> J’accepte de recevoir les informations pratiques.</label><button type="submit">Réserver ma place</button><p role="status" aria-live="polite">Inscription prête à être envoyée.</p></form></section>
    </main>
    <footer><p>&copy; 2026 PulsaTeach</p><a href="mailto:hello@pulsateach.test">Contact organisation</a><a href="#main-content">Retour au contenu principal</a></footer>`),
      tests: [
        test("doctype", "doctype", "<!doctype html>"),
        test("selector", "skip link", "a[href=\"#main-content\"]"),
        test("selector", "header", "header"),
        test("selector", "named nav", "nav[aria-label]"),
        test("selector", "main", "main#main-content"),
        test("minSelector", "five sections", "main section", 5),
        test("minSelector", "three schedule times", "time[datetime]", 3),
        test("minSelector", "two speaker cards", "#speakers article", 2),
        test("minSelector", "two speaker images", "#speakers img[alt]", 2),
        test("selector", "venue address", "address"),
        test("selector", "registration form", "form"),
        test("selector", "email input", "input[type=\"email\"][required]"),
        test("selector", "described name", "input[aria-describedby=\"name-help\"]"),
        test("selector", "consent checkbox", "input[type=\"checkbox\"][required]"),
        test("selector", "status region", "[role=\"status\"][aria-live=\"polite\"]"),
        test("selector", "footer", "footer")
      ],
      xp: 120
    }), "html-13-workshop-a11y-quiz")
  ])
];
