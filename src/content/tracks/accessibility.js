import { createProfessionalTrack } from "../builders/createProfessionalTrack.js";
import { accessibilityV9Modules } from "./accessibilityV9Modules.js";

const vocab = {
  accessibility: ["accessibilité", "accessibility", "Qualité d’un produit utilisable par des personnes aux capacités et contextes variés.", "The quality of a product usable by people with varied abilities and contexts."],
  semantic: ["sémantique", "semantics", "Sens porté par la structure et les éléments du document.", "Meaning conveyed by document structure and elements."],
  landmark: ["repère", "landmark", "Grande région nommée permettant de naviguer rapidement.", "A named major region enabling quick navigation."],
  focus: ["focus", "focus", "Élément qui reçoit actuellement les actions du clavier.", "The element currently receiving keyboard actions."],
  contrast: ["contraste", "contrast", "Différence de luminosité entre texte et arrière-plan.", "The luminance difference between text and background."],
  aria: ["ARIA", "ARIA", "Attributs complétant l’accessibilité lorsque le HTML natif ne suffit pas.", "Attributes supplementing accessibility when native HTML is insufficient."],
  label: ["label", "label", "Nom accessible relié à un champ de formulaire.", "An accessible name connected to a form control."],
  alt: ["texte alternatif", "alternative text", "Description textuelle de la fonction ou du contenu utile d’une image.", "A textual description of an image's useful content or function."],
  audit: ["audit", "audit", "Évaluation combinant outils automatiques et vérifications humaines.", "An assessment combining automated tools and human checks."]
};

export const accessibilityTrack = createProfessionalTrack({
  id: "accessibility",
  label: "A11Y",
  title: ["Accessibilité web", "Web accessibility"],
  summary: ["Conçois, teste et corrige des interfaces utilisables au clavier et avec les technologies d’assistance.", "Design, test, and fix interfaces usable by keyboard and assistive technologies."],
  profession: ["L’accessibilité transforme des contraintes techniques en qualité d’usage mesurable. Elle concerne la structure, le clavier, les formulaires, les médias, les composants dynamiques et les méthodes de test.", "Accessibility turns technical constraints into measurable usability. It covers structure, keyboard use, forms, media, dynamic components, and testing methods."],
  prerequisites: [["Connaître les bases HTML et CSS", "Know HTML and CSS basics"], ["Savoir utiliser les outils développeur", "Know how to use developer tools"]],
  outcomes: [["Construire une structure sémantique", "Build semantic structure"], ["Gérer clavier et focus", "Manage keyboard and focus"], ["Créer des formulaires accessibles", "Create accessible forms"], ["Réaliser un audit WCAG 2.2 AA", "Perform a WCAG 2.2 AA audit"]],
  capstone: ["Auditer puis corriger une application complète avec preuves manuelles et automatisées.", "Audit and fix a complete application with manual and automated evidence."],
  certification: [["Valider les quiz de chaque module", "Pass every module quiz"], ["Livrer deux mini-projets", "Ship two mini-projects"], ["Réussir l’examen final", "Pass the final exam"], ["Faire approuver l’audit final", "Get the final audit approved"]],
  modules: [
    ...accessibilityV9Modules,
    {
      id: "a11y-foundations",
      title: ["Comprendre et structurer", "Understand and structure"],
      description: ["Comprendre les besoins et produire une structure navigable.", "Understand user needs and produce navigable structure."],
      vocabulary: [vocab.accessibility, vocab.semantic, vocab.landmark],
      lessons: [
        textLesson("a11y-01-users", ["Handicaps, contextes et barrières", "Disabilities, contexts, and barriers"], ["Relie quatre barrières d’interface à leurs conséquences pour l’utilisateur.", "Connect four interface barriers to their user consequences."], ["clavier", "vision", "audition"], ["user-needs"]),
        htmlLesson("a11y-01-semantics", ["Choisir le HTML sémantique", "Choose semantic HTML"], ["Remplace les conteneurs génériques par header, nav, main et footer.", "Replace generic containers with header, nav, main, and footer."], "<header></header>\n<nav aria-label=\"Navigation principale\"></nav>\n<main><h1>Tableau de bord</h1></main>\n<footer></footer>", ["<header", "<nav", "<main", "<footer"], [vocab.semantic, vocab.landmark], ["semantic-html"]),
        htmlLesson("a11y-01-headings", ["Construire un plan de titres", "Build a heading outline"], ["Crée un h1 unique puis des h2 décrivant les sections.", "Create one h1 followed by h2 headings that describe sections."], "<main><h1>Compte</h1><section><h2>Profil</h2></section><section><h2>Sécurité</h2></section></main>", ["<h1", "<h2", "<section"], [vocab.semantic, ["titre", "heading", "Élément donnant un nom à une section.", "An element naming a section."]], ["heading-structure"]),
        htmlLesson("a11y-01-language", ["Langue et titre de page", "Page language and title"], ["Déclare la langue française et un titre précis.", "Declare French as the page language and provide a precise title."], "<!doctype html><html lang=\"fr\"><head><meta charset=\"UTF-8\"><title>Paramètres du compte | PulsaTeach</title></head><body><main><h1>Paramètres</h1></main></body></html>", ["lang=\"fr\"", "<title>", "<h1>"], [["langue du document", "document language", "Langue principale annoncée aux outils d’assistance.", "The primary language announced to assistive tools."], vocab.semantic], ["document-metadata"]),
        quiz("a11y-01-review", ["Quiz : structure accessible", "Quiz: accessible structure"], [
          question("s1", ["Quel élément doit contenir le contenu principal unique ?", "Which element should contain the unique main content?"], [["main", "main"], ["section", "section"], ["div", "div"]], "main", ["main fournit un repère principal aux technologies d’assistance.", "main provides the primary landmark to assistive technologies."], ["semantic-html"]),
          question("s2", ["Pourquoi déclarer lang sur html ?", "Why declare lang on html?"], [["Pour la prononciation et la traduction", "For pronunciation and translation"], ["Pour changer la couleur", "To change color"], ["Pour charger JavaScript", "To load JavaScript"]], "Pour la prononciation et la traduction", ["La langue influence la synthèse vocale et les outils linguistiques.", "Language affects speech synthesis and language tools."], ["document-metadata"]),
          question("s3", ["Un plan de titres utile doit…", "A useful heading outline should…"], [["Décrire la hiérarchie du contenu", "Describe content hierarchy"], ["Choisir les niveaux selon leur taille", "Choose levels by visual size"], ["Multiplier les h1", "Multiply h1 elements"]], "Décrire la hiérarchie du contenu", ["Le niveau traduit une relation structurelle, pas un style.", "Level expresses structure, not visual style."], ["heading-structure"])
        ])
      ]
    },
    {
      id: "a11y-keyboard-focus",
      title: ["Clavier et focus", "Keyboard and focus"],
      description: ["Rendre toutes les actions utilisables et compréhensibles sans souris.", "Make every action usable and understandable without a mouse."],
      vocabulary: [vocab.focus, ["ordre de tabulation", "tab order", "Ordre de déplacement du focus avec Tab.", "The order in which focus moves with Tab."], ["lien d’évitement", "skip link", "Lien permettant d’atteindre directement le contenu principal.", "A link that jumps directly to main content."]],
      lessons: [
        htmlLesson("a11y-02-native-controls", ["Utiliser des contrôles natifs", "Use native controls"], ["Remplace une div cliquable par un vrai bouton.", "Replace a clickable div with a real button."], "<button type=\"button\">Ouvrir les préférences</button>", ["<button", "type=\"button\""], [vocab.focus, ["bouton natif", "native button", "Contrôle clavier et sémantique fourni par le navigateur.", "A control with browser-provided keyboard behavior and semantics."]], ["keyboard-controls"]),
        cssLesson("a11y-02-focus-visible", ["Afficher un focus visible", "Show visible focus"], ["Ajoute un contour contrasté avec :focus-visible.", "Add a contrasting outline with :focus-visible."], "button:focus-visible {\n  outline: 3px solid #1d4ed8;\n  outline-offset: 3px;\n}", [":focus-visible", "outline", "outline-offset"], [vocab.focus, vocab.contrast], ["focus-styling"]),
        htmlLesson("a11y-02-skip-link", ["Ajouter un lien d’évitement", "Add a skip link"], ["Ajoute un lien vers #main-content et la cible correspondante.", "Add a link to #main-content and its target."], "<a class=\"skip-link\" href=\"#main-content\">Aller au contenu</a>\n<header>Navigation</header>\n<main id=\"main-content\" tabindex=\"-1\"><h1>Accueil</h1></main>", ["href=\"#main-content\"", "id=\"main-content\"", "tabindex=\"-1\""], [vocab.focus, ["lien d’évitement", "skip link", "Lien court-circuitant les blocs répétés.", "A link bypassing repeated blocks."]], ["skip-links"]),
        project("a11y-02-keyboard-project", ["Mini-projet : navigation clavier", "Mini-project: keyboard navigation"], ["Corrige une navigation avec lien d’évitement, boutons natifs et focus visible.", "Fix navigation with a skip link, native buttons, and visible focus."], "<a href=\"#content\" class=\"skip-link\">Contenu</a>\n<nav aria-label=\"Principale\"><button type=\"button\">Menu</button></nav>\n<main id=\"content\" tabindex=\"-1\"><h1>Catalogue</h1></main>\n<style>button:focus-visible,.skip-link:focus{outline:3px solid #1d4ed8;outline-offset:3px}</style>", ["href=\"#content\"", "<button", ":focus-visible", "outline"], [vocab.focus, vocab.landmark, vocab.contrast], ["keyboard-navigation", "focus-management"]),
        quiz("a11y-02-review", ["Quiz : clavier et focus", "Quiz: keyboard and focus"], [
          question("k1", ["Pourquoi préférer button à div onclick ?", "Why prefer button over div onclick?"], [["Le bouton possède déjà sémantique et clavier", "The button already has semantics and keyboard support"], ["Le bouton est toujours bleu", "The button is always blue"], ["La div ne peut pas contenir de texte", "A div cannot contain text"]], "Le bouton possède déjà sémantique et clavier", ["Le contrôle natif réduit le code et les erreurs d’interaction.", "The native control reduces code and interaction errors."], ["keyboard-controls"]),
          question("k2", ["Que doit faire un menu fermé avec Escape ?", "What should a menu do when closed with Escape?"], [["Restituer le focus au déclencheur", "Return focus to the trigger"], ["Envoyer le focus au footer", "Send focus to the footer"], ["Supprimer le déclencheur", "Remove the trigger"]], "Restituer le focus au déclencheur", ["La personne reprend son parcours là où elle l’avait interrompu.", "The user resumes where interaction was interrupted."], ["focus-management"]),
          question("k3", ["À quoi sert :focus-visible ?", "What is :focus-visible for?"], [["Afficher le focus quand il est utile", "Show focus when it is useful"], ["Masquer tous les contours", "Hide all outlines"], ["Bloquer Tab", "Block Tab"]], "Afficher le focus quand il est utile", ["Il conserve un repère clavier sans imposer le même style à chaque clic souris.", "It preserves a keyboard cue without forcing the same style on every mouse click."], ["focus-styling"])
        ])
      ]
    },
    {
      id: "a11y-forms-media",
      title: ["Formulaires et médias", "Forms and media"],
      description: ["Nommer, expliquer et valider les informations et contenus visuels.", "Name, explain, and validate information and visual content."],
      vocabulary: [vocab.label, vocab.alt, ["message d’erreur", "error message", "Texte expliquant quoi corriger et comment.", "Text explaining what to fix and how."]],
      lessons: [
        htmlLesson("a11y-03-labels", ["Relier labels et champs", "Connect labels and fields"], ["Relie chaque label à son input avec for et id.", "Connect every label to its input with for and id."], "<form><label for=\"email\">Adresse email</label><input id=\"email\" name=\"email\" type=\"email\" autocomplete=\"email\"></form>", ["for=\"email\"", "id=\"email\"", "autocomplete=\"email\""], [vocab.label, ["nom accessible", "accessible name", "Nom annoncé pour identifier un contrôle.", "The name announced to identify a control."]], ["accessible-forms"]),
        htmlLesson("a11y-03-errors", ["Associer aide et erreur", "Connect help and error"], ["Relie l’aide et le message d’erreur avec aria-describedby.", "Connect help and error text with aria-describedby."], "<label for=\"password\">Mot de passe</label><p id=\"password-help\">8 caractères minimum.</p><input id=\"password\" aria-describedby=\"password-help password-error\"><p id=\"password-error\" role=\"alert\">Ajoute deux caractères.</p>", ["aria-describedby", "role=\"alert\"", "password-error"], [["description accessible", "accessible description", "Information complémentaire annoncée après le nom.", "Additional information announced after the name."], ["alerte", "alert", "Message important annoncé dès son apparition.", "Important message announced when it appears."]], ["form-errors"]),
        htmlLesson("a11y-03-images", ["Écrire un texte alternatif utile", "Write useful alternative text"], ["Décris l’information utile et laisse vide l’alt décoratif.", "Describe useful information and leave decorative alt empty."], "<figure><img src=\"chart.png\" alt=\"Les inscriptions progressent de 20 % en juin\"><figcaption>Évolution mensuelle</figcaption></figure><img src=\"spark.svg\" alt=\"\" aria-hidden=\"true\">", ["alt=\"Les inscriptions", "<figcaption>", "alt=\"\"", "aria-hidden=\"true\""], [vocab.alt, ["image décorative", "decorative image", "Image n’apportant aucune information supplémentaire.", "An image adding no extra information."]], ["alternative-text"]),
        project("a11y-03-form-project", ["Mini-projet : formulaire accessible", "Mini-project: accessible form"], ["Construis un formulaire avec labels, aide, erreur et statut de confirmation.", "Build a form with labels, help, error, and confirmation status."], "<form><label for=\"name\">Nom</label><input id=\"name\" aria-describedby=\"name-help name-error\"><p id=\"name-help\">Nom public.</p><p id=\"name-error\" role=\"alert\">Le nom est requis.</p><button type=\"submit\">Enregistrer</button><p role=\"status\" aria-live=\"polite\">Profil enregistré.</p></form>", ["<label", "aria-describedby", "role=\"alert\"", "role=\"status\"", "aria-live=\"polite\""], [vocab.label, ["statut", "status", "Message non urgent annonçant le résultat d’une action.", "A non-urgent message announcing an action result."]], ["accessible-forms", "live-regions"]),
        quiz("a11y-03-review", ["Quiz : formulaires et médias", "Quiz: forms and media"], [
          question("f1", ["Quel texte alt convient à une icône purement décorative ?", "What alt text suits a purely decorative icon?"], [["alt vide", "empty alt"], ["Le nom du fichier", "The file name"], ["Le mot image", "The word image"]], "alt vide", ["Un alt vide retire l’image décorative de l’expérience vocale.", "An empty alt removes a decorative image from the spoken experience."], ["alternative-text"]),
          question("f2", ["Comment relier une erreur à un champ ?", "How do you connect an error to a field?"], [["aria-describedby avec l’id du message", "aria-describedby with the message id"], ["placeholder uniquement", "placeholder only"], ["style rouge uniquement", "red style only"]], "aria-describedby avec l’id du message", ["La relation reste disponible sans dépendre de la couleur ou de la position.", "The relationship remains available without relying on color or position."], ["form-errors"]),
          question("f3", ["Quel rôle convient à une confirmation non urgente ?", "Which role suits a non-urgent confirmation?"], [["status", "status"], ["alertdialog", "alertdialog"], ["presentation", "presentation"]], "status", ["role=status annonce poliment un résultat sans interrompre brutalement.", "role=status politely announces a result without abrupt interruption."], ["live-regions"])
        ])
      ]
    },
    {
      id: "a11y-audit",
      title: ["ARIA, contrastes et audit", "ARIA, contrast, and audit"],
      description: ["Corriger les composants dynamiques et produire un audit reproductible.", "Fix dynamic components and produce a reproducible audit."],
      vocabulary: [vocab.aria, vocab.contrast, vocab.audit],
      lessons: [
        textLesson("a11y-04-contrast", ["Évaluer couleurs et contraste", "Evaluate color and contrast"], ["Documente les ratios attendus pour texte, grands textes et composants.", "Document expected ratios for text, large text, and components."], ["4.5:1", "3:1", "état"], ["color-contrast"], [vocab.contrast]),
        htmlLesson("a11y-04-disclosure", ["Construire un composant repliable", "Build a disclosure component"], ["Utilise un bouton avec aria-expanded et aria-controls.", "Use a button with aria-expanded and aria-controls."], "<button type=\"button\" aria-expanded=\"false\" aria-controls=\"details\">Afficher les détails</button><div id=\"details\" hidden>Contenu détaillé</div>", ["<button", "aria-expanded", "aria-controls", "id=\"details\""], [vocab.aria, ["disclosure", "disclosure", "Composant affichant ou masquant une zone contrôlée.", "A component showing or hiding a controlled region."]], ["aria-state"]),
        project("a11y-04-capstone", ["Projet final : audit et correction", "Final project: audit and remediation"], ["Audite une page, priorise les défauts puis livre une version corrigée avec preuves.", "Audit a page, prioritize defects, then deliver a fixed version with evidence."], "# Audit WCAG 2.2 AA\n\n## Critique\n- Navigation clavier et focus\n- Noms accessibles des champs\n\n## Correction\n- HTML sémantique\n- Focus visible\n- Messages reliés\n\n## Preuves\n- Parcours clavier\n- axe sans violation critique\n- Contrastes vérifiés", ["WCAG 2.2 AA", "Navigation clavier", "HTML sémantique", "axe", "Contrastes"], [vocab.audit, vocab.contrast, vocab.aria], ["accessibility-audit", "remediation"], true),
        quiz("a11y-04-review", ["Quiz : audit accessible", "Quiz: accessibility audit"], [
          question("a1", ["Un audit axe sans erreur prouve-t-il l’accessibilité complète ?", "Does an axe audit with no errors prove full accessibility?"], [["Non, il faut aussi des tests humains", "No, human testing is also required"], ["Oui, toujours", "Yes, always"], ["Seulement sur mobile", "Only on mobile"]], "Non, il faut aussi des tests humains", ["Les outils automatiques ne comprennent pas tous les usages, contenus et parcours.", "Automated tools cannot understand every use, content, and journey."], ["accessibility-audit"]),
          question("a2", ["Quand utiliser ARIA ?", "When should ARIA be used?"], [["Quand le HTML natif ne décrit pas suffisamment le composant", "When native HTML cannot sufficiently describe the component"], ["Pour remplacer tous les boutons", "To replace every button"], ["Pour modifier le style", "To change styling"]], "Quand le HTML natif ne décrit pas suffisamment le composant", ["Le premier choix reste le contrôle natif avec comportement intégré.", "The first choice remains a native control with built-in behavior."], ["aria-state"]),
          question("a3", ["Comment prioriser une correction ?", "How should a fix be prioritized?"], [["Impact utilisateur, fréquence et blocage", "User impact, frequency, and blocking severity"], ["Ordre alphabétique", "Alphabetical order"], ["Facilité visuelle uniquement", "Visual ease only"]], "Impact utilisateur, fréquence et blocage", ["La priorité suit le risque réel et la capacité à accomplir la tâche.", "Priority follows real risk and ability to complete the task."], ["remediation"])
        ]),
        quiz("a11y-final-exam", ["Examen Accessibilité web", "Web accessibility exam"], [
          question("e1", ["Quel duo fournit nom et description à un champ ?", "Which pair provides a field name and description?"], [["label + aria-describedby", "label + aria-describedby"], ["placeholder + couleur", "placeholder + color"], ["title + border", "title + border"]], "label + aria-describedby", ["Le label nomme et aria-describedby complète.", "The label names and aria-describedby supplements."], ["accessible-forms"]),
          question("e2", ["Que vérifier dans une modale clavier ?", "What should be checked in a keyboard modal?"], [["Focus initial, piège, Escape et restitution", "Initial focus, trap, Escape, and restoration"], ["Animation uniquement", "Animation only"], ["Largeur fixe", "Fixed width"]], "Focus initial, piège, Escape et restitution", ["Le cycle complet du focus doit rester prévisible.", "The complete focus cycle must remain predictable."], ["focus-management"]),
          question("e3", ["Quel contraste minimal pour un petit texte normal AA ?", "What is the AA minimum contrast for normal small text?"], [["4.5:1", "4.5:1"], ["2:1", "2:1"], ["1:1", "1:1"]], "4.5:1", ["WCAG demande 4.5:1 pour le texte normal.", "WCAG requires 4.5:1 for normal text."], ["color-contrast"]),
          question("e4", ["Pourquoi tester avec un lecteur d’écran ?", "Why test with a screen reader?"], [["Pour vérifier noms, rôles, états et ordre d’annonce", "To verify names, roles, states, and announcement order"], ["Pour mesurer le débit réseau", "To measure network throughput"], ["Pour minifier le CSS", "To minify CSS"]], "Pour vérifier noms, rôles, états et ordre d’annonce", ["L’arbre d’accessibilité doit produire une expérience cohérente.", "The accessibility tree should produce a coherent experience."], ["screen-reader-testing"]),
          question("e5", ["Quelle preuve rend un audit reproductible ?", "What evidence makes an audit reproducible?"], [["Étapes, environnement, résultat attendu et observé", "Steps, environment, expected and observed result"], ["Une note vague", "A vague note"], ["Une couleur de priorité seule", "A priority color alone"]], "Étapes, environnement, résultat attendu et observé", ["Une autre personne doit pouvoir reproduire le constat.", "Another person should be able to reproduce the finding."], ["accessibility-audit"])
        ], "exam", 80)
      ]
    }
  ]
});

function htmlLesson(id, title, brief, solution, requirements, vocabulary, skills) {
  return { id, type: "html", title, brief, solution, starterCode: "<main>\n  <!-- Corrige la structure ici -->\n</main>", requirements, vocabulary, skills };
}

function cssLesson(id, title, brief, solution, requirements, vocabulary, skills) {
  return { id, type: "css", title, brief, solution, starterCode: "/* Corrige le style ici */", requirements, vocabulary, skills };
}

function textLesson(id, title, brief, requirements, skills, vocabulary = [vocab.accessibility, vocab.audit]) {
  return { id, type: "text", title, brief, solution: requirements.map((item) => `- ${item}`).join("\n"), requirements, vocabulary, skills };
}

function project(id, title, brief, solution, requirements, vocabulary, skills, finalProject = false) {
  return {
    id,
    project: true,
    exerciseType: solution.trim().startsWith("<") ? "html" : "text",
    title,
    brief,
    solution,
    starterCode: solution.trim().startsWith("<") ? "<main>\n  <!-- Livre la version accessible -->\n</main>" : "# Audit et plan de correction",
    requirements,
    vocabulary,
    skills,
    durationMin: finalProject ? 180 : 110,
    xp: finalProject ? 140 : 90
  };
}

function quiz(id, title, questions, purpose = "module-review", passingScore = 70) {
  return { id, type: "quiz", title, questions, purpose, passingScore, brief: ["Analyse chaque scénario avant de répondre.", "Analyze every scenario before answering."] };
}

function question(id, prompt, options, answerFr, explanation, skills) {
  const answerPair = options.find((option) => option[0] === answerFr) || [answerFr, answerFr];
  return {
    id,
    type: "single",
    prompt,
    choices: options.map((option) => ({ id: option[0], label: option })),
    answer: answerPair[0],
    explanation,
    points: 1,
    skills,
    glossaryTerms: []
  };
}
