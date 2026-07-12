import { module } from "./trackBuilders.js";

const lessons = [
  setupLesson({
    id: "tools-01-vscode",
    title: ["Choisir son espace de travail", "Choose your workspace"],
    brief: ["Choisis un éditeur accessible et crée un vrai dossier de travail.", "Choose an accessible editor and create a real workspace folder."],
    durationMin: 30,
    course: bilingualCourse(
      "Un éditeur sert à lire et modifier des fichiers. Il n'est ni le langage, ni le navigateur. Le bon choix est celui que tu peux utiliser régulièrement, y compris sur une machine où tu ne peux rien installer.",
      "An editor reads and changes files. It is neither the language nor the browser. The right choice is one you can use regularly, including on a machine where you cannot install software.",
      [
        ["1. Identifier les trois pièces", "Un projet débutant a besoin d'un dossier, d'un éditeur et d'un navigateur. Le dossier conserve les fichiers; l'éditeur les modifie; le navigateur interprète la page. Séparer ces rôles aide à localiser une erreur.", "1. Identify the three pieces", "A beginner project needs a folder, an editor, and a browser. The folder stores files; the editor changes them; the browser interprets the page. Separating these roles helps locate errors."],
        ["2. Choisir sans classement de marques", "Windows, macOS et Linux proposent tous des éditeurs graphiques et textuels. VS Code, VSCodium, Zed, Sublime Text, Notepad++, TextEdit en texte brut, nano ou un éditeur déjà fourni conviennent si les fichiers restent du texte standard. Une extension est optionnelle, jamais une condition pour commencer.", "2. Choose without ranking brands", "Windows, macOS, and Linux all offer graphical and text editors. VS Code, VSCodium, Zed, Sublime Text, Notepad++, TextEdit in plain-text mode, nano, or an existing editor work if files remain standard text. Extensions are optional, never a requirement to begin."],
        ["3. Prévoir un accès limité", "Sur un poste scolaire ou professionnel verrouillé, utilise l'éditeur intégré à la plateforme, un environnement web autorisé ou un simple bloc-notes. Si la création de dossiers est bloquée, garde les fichiers dans l'espace de projet fourni. Ne contourne pas les règles de la machine.", "3. Plan for restricted access", "On a locked-down school or work computer, use the platform's built-in editor, an approved browser environment, or a plain-text editor. If folder creation is blocked, keep files in the provided project area. Do not bypass machine policies."],
        ["4. Créer une preuve observable", "Crée un dossier nommé <code>atelier-outils</code> et un fichier <code>index.html</code>. Dans l'exercice, produis une fiche qui nomme ton éditeur, ton navigateur et l'emplacement du dossier. Cette fiche est une preuve plus utile qu'une déclaration de réussite.", "4. Create observable evidence", "Create a folder named <code>tools-workshop</code> and an <code>index.html</code> file. In the exercise, produce a record naming your editor, browser, and folder location. This record is more useful evidence than a success claim."]
      ],
      [["Éditeur", "Logiciel qui modifie des fichiers texte.", "Editor", "Software that changes text files."], ["Dossier de travail", "Dossier racine d'un projet.", "Workspace folder", "The root folder of a project."], ["Texte brut", "Texte sans mise en forme propriétaire.", "Plain text", "Text without proprietary formatting."]]
    ),
    artifact: {
      starterCode: `<main>\n  <h1>Mon espace de travail</h1>\n  <!-- Ajoute une liste avec les trois informations demandées. -->\n</main>`,
      solution: `<main>\n  <h1>Mon espace de travail</h1>\n  <ul class="setup-record">\n    <li>Éditeur : éditeur intégré</li>\n    <li>Navigateur : Firefox</li>\n    <li>Dossier : atelier-outils</li>\n  </ul>\n</main>`,
      tests: [contains("Une fiche de configuration", "class=\"setup-record\""), contains("Le dossier du projet", "atelier-outils"), contains("Un éditeur identifié", "Éditeur"), contains("Un navigateur identifié", "Navigateur")],
      hint: ["Ajoute une liste <code>ul</code> de classe <code>setup-record</code>, puis renseigne éditeur, navigateur et dossier.", "Add a <code>ul</code> with class <code>setup-record</code>, then record the editor, browser, and folder."]
    }
  }),
  setupLesson({
    id: "tools-02-php",
    title: ["Fichiers, chemins et terminal", "Files, paths, and the terminal"],
    brief: ["Navigue dans un projet sans dépendre d'un système d'exploitation.", "Navigate a project without depending on one operating system."],
    durationMin: 35,
    course: bilingualCourse(
      "Le terminal est une autre façon de demander au système de lister, créer ou déplacer des fichiers. Il est utile, mais il ne doit pas bloquer l'apprentissage: les mêmes opérations peuvent être réalisées avec l'explorateur de fichiers ou l'interface de la plateforme.",
      "A terminal is another way to ask the system to list, create, or move files. It is useful, but it must not block learning: the same operations can be completed with a file manager or the platform interface.",
      [
        ["1. Lire un chemin", "Un chemin absolu part de la racine du disque; un chemin relatif part du dossier courant. Dans un projet web, préfère les chemins relatifs comme <code>images/logo.svg</code>: ils restent valides lorsque le projet change de machine.", "1. Read a path", "An absolute path starts at the drive or filesystem root; a relative path starts at the current folder. In a web project, prefer relative paths such as <code>images/logo.svg</code>: they remain valid when the project moves to another machine."],
        ["2. Ouvrir le terminal disponible", "Sous Windows, PowerShell ou l'invite de commandes conviennent. Sous macOS, utilise Terminal; sous Linux, l'émulateur fourni par l'environnement de bureau. Place-toi dans le dossier du projet avec <code>cd</code>, puis affiche son contenu avec <code>dir</code> sous Windows ou <code>ls</code> sous macOS/Linux.", "2. Open the available terminal", "On Windows, PowerShell or Command Prompt works. On macOS, use Terminal; on Linux, use the terminal emulator provided by the desktop. Enter the project folder with <code>cd</code>, then display its contents with <code>dir</code> on Windows or <code>ls</code> on macOS/Linux."],
        ["3. Travailler sans terminal", "Si le terminal est désactivé, ouvre le dossier dans l'explorateur, Finder, le gestionnaire de fichiers Linux ou l'arborescence de l'éditeur intégré. Vérifie les mêmes faits: nom du dossier courant, présence de <code>index.html</code> et absence d'une extension cachée comme <code>.txt</code>.", "3. Work without a terminal", "If the terminal is disabled, open the folder in Explorer, Finder, a Linux file manager, or the built-in editor tree. Verify the same facts: current folder name, presence of <code>index.html</code>, and absence of a hidden extension such as <code>.txt</code>."],
        ["4. Diagnostiquer avant de recommencer", "« Fichier introuvable » signifie souvent que le dossier courant ou le nom diffère. Affiche le chemin, compare majuscules et minuscules, puis liste les fichiers. Ne réinstalle pas un outil pour corriger un simple chemin.", "4. Diagnose before restarting", "“File not found” often means the current folder or filename differs. Display the path, compare letter case, then list files. Do not reinstall a tool to fix a simple path."]
      ],
      [["Chemin relatif", "Chemin calculé depuis le dossier courant.", "Relative path", "A path calculated from the current folder."], ["Dossier courant", "Emplacement où une commande s'exécute.", "Current directory", "The location where a command runs."], ["Terminal", "Interface textuelle envoyant des commandes au système.", "Terminal", "A text interface that sends commands to the system."]]
    ),
    artifact: {
      starterCode: `<section class="path-report">\n  <h1>Rapport de fichiers</h1>\n  <!-- Documente le dossier, le fichier et une commande ou alternative graphique. -->\n</section>`,
      solution: `<section class="path-report">\n  <h1>Rapport de fichiers</h1>\n  <p>Dossier courant : atelier-outils</p>\n  <p>Fichier vérifié : index.html</p>\n  <code>ls</code>\n  <p>Alternative graphique : arborescence de l'éditeur</p>\n</section>`,
      tests: [contains("Un rapport de chemin", "class=\"path-report\""), contains("Le fichier d'entrée", "index.html"), contains("Le dossier courant", "Dossier courant"), contains("Une méthode de vérification", "Alternative graphique")],
      hint: ["Conserve la classe <code>path-report</code> et écris le dossier courant, <code>index.html</code> et une alternative graphique au terminal.", "Keep the <code>path-report</code> class and record the current folder, <code>index.html</code>, and a graphical terminal alternative."]
    }
  }),
  setupLesson({
    id: "tools-03-postgresql",
    title: ["Navigateur, aperçu et DevTools", "Browser, preview, and DevTools"],
    brief: ["Observe ce que le navigateur charge réellement et collecte un diagnostic.", "Observe what the browser actually loads and collect a diagnosis."],
    durationMin: 35,
    course: bilingualCourse(
      "Le navigateur est à la fois le lecteur de la page et un instrument de diagnostic. Savoir distinguer le fichier modifié du fichier affiché évite de nombreuses fausses pistes.",
      "The browser is both the page reader and a diagnostic instrument. Knowing how to distinguish the edited file from the displayed file prevents many false leads.",
      [
        ["1. Choisir un mode d'aperçu", "Tu peux ouvrir <code>index.html</code> directement, utiliser l'aperçu intégré de la plateforme ou démarrer un serveur local déjà disponible. Pour ce module, aucun moteur PHP, serveur de base de données ou gestionnaire de paquets n'est nécessaire.", "1. Choose a preview mode", "You can open <code>index.html</code> directly, use the platform's built-in preview, or start an already available local server. This module requires no PHP engine, database server, or package manager."],
        ["2. Faire une boucle courte", "Modifie un titre, enregistre le fichier, puis recharge la page. Si rien ne change, vérifie l'onglet ouvert, le chemin affiché et l'indicateur de fichier non enregistré. Un rechargement forcé vient seulement après ces contrôles.", "2. Use a short loop", "Change a heading, save the file, then reload the page. If nothing changes, check the open tab, displayed path, and unsaved-file indicator. A hard reload comes only after these checks."],
        ["3. Ouvrir les outils de développement", "Les navigateurs de bureau proposent généralement Inspecter ou une touche comme <code>F12</code>; les raccourcis varient. Dans une webview ou sur mobile, utilise la console et l'inspecteur fournis par la plateforme, ou poursuis avec l'aperçu visuel si ces outils sont indisponibles.", "3. Open developer tools", "Desktop browsers generally offer Inspect or a key such as <code>F12</code>; shortcuts vary. In a webview or on mobile, use the console and inspector provided by the platform, or continue with the visual preview if those tools are unavailable."],
        ["4. Transformer une erreur en indice", "Dans l'onglet Console, lis le premier message et son emplacement. Dans Réseau, un statut <code>404</code> indique une ressource absente à l'adresse demandée. Copie le message exact, le fichier et l'action qui l'a déclenché avant de modifier le code.", "4. Turn an error into a clue", "In the Console tab, read the first message and its location. In Network, a <code>404</code> status means a resource is absent at the requested address. Record the exact message, file, and action that triggered it before changing code."]
      ],
      [["Recharger", "Demander au navigateur de relire la page.", "Reload", "Ask the browser to read the page again."], ["Console", "Vue des messages et erreurs d'exécution.", "Console", "A view of runtime messages and errors."], ["404", "Réponse indiquant qu'une ressource est introuvable.", "404", "A response indicating that a resource cannot be found."]]
    ),
    artifact: {
      starterCode: `<article class="diagnostic">\n  <h1>Diagnostic d'aperçu</h1>\n  <!-- Ajoute observation, emplacement et prochaine vérification. -->\n</article>`,
      solution: `<article class="diagnostic">\n  <h1>Diagnostic d'aperçu</h1>\n  <p class="observation">Observation : image absente, statut 404</p>\n  <p class="location">Emplacement : images/logo.svg</p>\n  <p class="next-check">Prochaine vérification : comparer le chemin au nom du fichier</p>\n</article>`,
      tests: [contains("Une fiche de diagnostic", "class=\"diagnostic\""), contains("Une observation", "class=\"observation\""), contains("Un emplacement", "class=\"location\""), contains("Une prochaine vérification", "class=\"next-check\"")],
      hint: ["Ajoute trois paragraphes avec les classes <code>observation</code>, <code>location</code> et <code>next-check</code>.", "Add three paragraphs with the classes <code>observation</code>, <code>location</code>, and <code>next-check</code>."]
    }
  }),
  setupLesson({
    id: "tools-04-project-notes",
    title: ["Documenter un projet reproductible", "Document a reproducible project"],
    brief: ["Écris des instructions qu'une autre personne peut vérifier.", "Write instructions another person can verify."],
    durationMin: 30,
    course: bilingualCourse(
      "Une configuration n'est maîtrisée que si une autre personne peut comprendre comment ouvrir le projet et constater son état. Une courte documentation réduit les suppositions et protège contre l'oubli.",
      "A setup is only understood when another person can learn how to open the project and observe its state. Short documentation reduces assumptions and protects against forgetting.",
      [
        ["1. Décrire le résultat, pas la marque", "Commence par ce que le projet produit: une page locale, son fichier d'entrée et la façon de l'observer. Évite les phrases qui supposent un éditeur, un système ou un abonnement précis.", "1. Describe the result, not the brand", "Start with what the project produces: a local page, its entry file, and how to observe it. Avoid instructions that assume a specific editor, system, or subscription."],
        ["2. Écrire des étapes testables", "Une bonne étape contient une action et un résultat attendu: « Ouvre <code>index.html</code>; le titre Atelier apparaît ». « Configure le projet » est trop vague pour diagnostiquer un échec.", "2. Write testable steps", "A good step contains an action and an expected result: “Open <code>index.html</code>; the Workshop heading appears.” “Configure the project” is too vague to diagnose a failure."],
        ["3. Signaler les variantes", "Donne une voie terminal et une voie graphique seulement lorsqu'elles apportent quelque chose. Mentionne l'aperçu intégré pour les environnements verrouillés. N'exige pas de droits administrateur si le projet n'en a pas besoin.", "3. Record alternatives", "Provide a terminal route and a graphical route only when useful. Mention built-in preview for locked-down environments. Do not require administrator rights when the project does not need them."],
        ["4. Conserver une preuve", "Note le nom du fichier observé, le résultat attendu et un contrôle de dépannage. Ces éléments forment un contrat léger que l'on peut relire après une mise à jour ou sur une autre machine.", "4. Keep evidence", "Record the observed filename, expected result, and one troubleshooting check. These form a lightweight contract that can be reread after an update or on another machine."]
      ],
      [["Reproductible", "Qui peut être refait avec le même résultat.", "Reproducible", "Able to be repeated with the same result."], ["Résultat attendu", "Observation précise après une action.", "Expected result", "A precise observation after an action."], ["Prérequis", "Condition nécessaire avant de commencer.", "Prerequisite", "A condition required before starting."]]
    ),
    artifact: {
      starterCode: `<article class="project-readme">\n  <h1>Mode d'emploi</h1>\n  <!-- Ajoute prérequis, étapes et résultat attendu. -->\n</article>`,
      solution: `<article class="project-readme">\n  <h1>Mode d'emploi</h1>\n  <h2>Prérequis</h2><p>Un éditeur de texte et un navigateur, ou l'aperçu intégré.</p>\n  <h2>Étapes</h2><ol><li>Ouvrir index.html.</li><li>Recharger l'aperçu.</li></ol>\n  <h2>Résultat attendu</h2><p>Le titre Mon espace de travail apparaît.</p>\n  <aside>Dépannage : vérifier le nom et le chemin du fichier.</aside>\n</article>`,
      tests: [contains("Une documentation de projet", "class=\"project-readme\""), contains("Des prérequis", "Prérequis"), contains("Des étapes ordonnées", "<ol>"), contains("Un résultat observable", "Résultat attendu"), contains("Une piste de dépannage", "<aside>")],
      hint: ["Structure la fiche avec les titres Prérequis, Étapes et Résultat attendu, puis ajoute un <code>aside</code> de dépannage.", "Structure the record with Prerequisites, Steps, and Expected result headings, then add a troubleshooting <code>aside</code>."]
    }
  }),
  setupLesson({
    id: "tools-05-troubleshooting",
    title: ["Diagnostiquer méthodiquement", "Troubleshoot methodically"],
    brief: ["Passe d'un symptôme à une hypothèse testable sans tout réinstaller.", "Move from a symptom to a testable hypothesis without reinstalling everything."],
    durationMin: 35,
    course: bilingualCourse(
      "Le dépannage n'est pas une suite d'essais au hasard. On protège le travail, on décrit le symptôme, on réduit le problème, puis on ne change qu'une chose à la fois.",
      "Troubleshooting is not a sequence of random attempts. Protect the work, describe the symptom, reduce the problem, then change one thing at a time.",
      [
        ["1. Capturer le symptôme", "Écris ce que tu attendais, ce que tu as observé et l'action précédente. « Ça ne marche pas » ne distingue pas une page vide, un ancien contenu, un fichier absent ou une permission refusée.", "1. Capture the symptom", "Write what you expected, what you observed, and the preceding action. “It does not work” does not distinguish a blank page, stale content, a missing file, or denied permission."],
        ["2. Classer la couche", "Si le fichier n'apparaît pas dans le dossier, inspecte le système de fichiers. S'il existe mais ne s'affiche pas, inspecte le chemin et le navigateur. Si la structure apparaît mais qu'une interaction échoue, lis la console. Cette classification évite de modifier une couche saine.", "2. Classify the layer", "If the file is absent from the folder, inspect the filesystem. If it exists but does not display, inspect the path and browser. If structure appears but an interaction fails, read the console. This classification avoids changing a healthy layer."],
        ["3. Formuler une hypothèse", "Une hypothèse relie une cause à un contrôle: « Le navigateur montre un ancien fichier; je vais comparer l'adresse avec le dossier ouvert ». Après le contrôle, garde ou rejette l'hypothèse selon la preuve.", "3. Form a hypothesis", "A hypothesis connects a cause to a check: “The browser shows an old file; I will compare its address with the open folder.” After the check, retain or reject the hypothesis based on evidence."],
        ["4. Demander de l'aide efficacement", "Partage le système ou le type d'environnement, les étapes minimales, le message exact et les contrôles déjà faits. Masque mots de passe, jetons, adresses privées et données personnelles avant une capture d'écran.", "4. Ask for help effectively", "Share the operating system or environment type, minimal steps, exact message, and checks already performed. Hide passwords, tokens, private addresses, and personal data before taking a screenshot."]
      ],
      [["Symptôme", "Effet observé sans supposer sa cause.", "Symptom", "An observed effect without assuming its cause."], ["Hypothèse", "Cause possible que l'on peut contrôler.", "Hypothesis", "A possible cause that can be checked."], ["Reproduction minimale", "Plus petite suite d'étapes qui déclenche le problème.", "Minimal reproduction", "The smallest sequence of steps that triggers the problem."]]
    ),
    artifact: {
      starterCode: `<article class="incident-report">\n  <h1>Rapport d'incident</h1>\n  <!-- Décris le symptôme, l'hypothèse, le contrôle et le résultat. -->\n</article>`,
      solution: `<article class="incident-report">\n  <h1>Rapport d'incident</h1>\n  <p class="symptom">Symptôme : l'ancien titre reste affiché après enregistrement.</p>\n  <p class="hypothesis">Hypothèse : le navigateur affiche un autre index.html.</p>\n  <p class="check">Contrôle : comparer l'adresse et le dossier de travail.</p>\n  <p class="result">Résultat : les chemins diffèrent; ouvrir le bon fichier.</p>\n</article>`,
      tests: [contains("Un rapport d'incident", "class=\"incident-report\""), contains("Un symptôme précis", "class=\"symptom\""), contains("Une hypothèse testable", "class=\"hypothesis\""), contains("Un contrôle unique", "class=\"check\""), contains("Un résultat", "class=\"result\"")],
      hint: ["Ajoute quatre paragraphes: <code>symptom</code>, <code>hypothesis</code>, <code>check</code> et <code>result</code>.", "Add four paragraphs: <code>symptom</code>, <code>hypothesis</code>, <code>check</code>, and <code>result</code>."]
    }
  }),
  setupLesson({
    id: "tools-06-workstation-project",
    type: "project",
    title: ["Projet : passeport de poste de travail", "Project: workstation passport"],
    brief: ["Assemble une preuve portable de ton environnement et de ta méthode.", "Assemble portable evidence of your environment and workflow."],
    durationMin: 60,
    course: bilingualCourse(
      "Ce projet rassemble les preuves du module dans une page autonome. Il n'évalue pas le prix ou la marque de tes outils, mais ta capacité à expliquer un flux de travail, vérifier un artefact et préparer un diagnostic sûr.",
      "This project gathers the module evidence in a standalone page. It does not assess tool price or brand; it assesses your ability to explain a workflow, verify an artifact, and prepare a safe diagnosis.",
      [
        ["1. Définir le périmètre", "Présente l'éditeur ou l'interface intégrée, le navigateur ou l'aperçu, et le dossier de projet. Une personne lisant la page doit comprendre où le travail est enregistré sans recevoir de chemin privé complet.", "1. Define the scope", "Present the editor or built-in interface, the browser or preview, and the project folder. A reader should understand where work is stored without receiving a full private path."],
        ["2. Montrer la boucle", "Décris dans l'ordre: ouvrir le fichier, modifier un élément, enregistrer, afficher ou recharger, puis observer. Associe à la dernière étape un résultat visible et précis.", "2. Show the loop", "Describe in order: open the file, change an element, save, display or reload, then observe. Attach a precise visible result to the final step."],
        ["3. Préparer deux voies", "Indique une voie locale pour Windows, macOS ou Linux et une alternative sans installation utilisant l'aperçu intégré. Les deux voies doivent aboutir au même artefact, sans exiger de contourner une restriction.", "3. Prepare two routes", "Give a local route for Windows, macOS, or Linux and a no-install alternative using built-in preview. Both routes must lead to the same artifact without requiring anyone to bypass a restriction."],
        ["4. Faire une revue autonome", "Avant de valider, masque toute donnée sensible, relis chaque instruction comme un débutant et vérifie que chaque affirmation possède une observation. Les tests contrôlent la structure; toi, tu contrôles la justesse des informations.", "4. Conduct an independent review", "Before submitting, hide sensitive data, reread each instruction as a beginner, and verify that every claim has an observation. Tests check structure; you check whether the information is accurate."]
      ],
      [["Artefact", "Objet produit et observable, ici une page de preuve.", "Artifact", "A produced, observable object; here, an evidence page."], ["Flux de travail", "Suite ordonnée d'actions menant à un résultat.", "Workflow", "An ordered sequence of actions leading to a result."], ["Donnée sensible", "Information à ne pas publier, comme un secret ou chemin personnel.", "Sensitive data", "Information not to publish, such as a secret or personal path."]]
    ),
    artifact: {
      starterCode: `<main class="workstation-passport">\n  <h1>Passeport de poste de travail</h1>\n  <!-- Assemble environnement, boucle de travail, alternative et diagnostic. -->\n</main>`,
      solution: `<main class="workstation-passport">\n  <h1>Passeport de poste de travail</h1>\n  <section id="environment"><h2>Environnement</h2><p>Éditeur texte, navigateur et dossier atelier-outils.</p></section>\n  <section id="workflow"><h2>Boucle de travail</h2><ol><li>Ouvrir index.html</li><li>Modifier et enregistrer</li><li>Recharger et observer le titre</li></ol></section>\n  <section id="alternative"><h2>Alternative sans installation</h2><p>Utiliser l'éditeur et l'aperçu intégrés.</p></section>\n  <section id="diagnosis"><h2>Diagnostic</h2><p>Noter symptôme, hypothèse et contrôle sans donnée sensible.</p></section>\n</main>`,
      tests: [contains("Le passeport", "class=\"workstation-passport\""), contains("L'environnement", "id=\"environment\""), contains("La boucle ordonnée", "id=\"workflow\""), contains("Une alternative sans installation", "id=\"alternative\""), contains("Une méthode de diagnostic", "id=\"diagnosis\"")],
      hint: ["Crée quatre sections identifiées par <code>environment</code>, <code>workflow</code>, <code>alternative</code> et <code>diagnosis</code>.", "Create four sections identified by <code>environment</code>, <code>workflow</code>, <code>alternative</code>, and <code>diagnosis</code>."]
    }
  })
];

const toolsModule = module("tools-setup", "Démarrer avec des outils fiables", "Getting started with reliable tools", lessons);

Object.assign(toolsModule, {
  importance: { fr: "Une méthode observable évite de confondre fichier, aperçu et problème d'outil.", en: "An observable method prevents confusing files, previews, and tool problems." },
  prerequisites: { fr: ["Pouvoir modifier un fichier texte, localement ou dans la plateforme"], en: ["Ability to edit a text file locally or in the platform"] },
  outcomes: { fr: ["Choisir un environnement accessible", "Naviguer dans les fichiers", "Observer et diagnostiquer une page", "Documenter un flux reproductible"], en: ["Choose an accessible environment", "Navigate files", "Observe and diagnose a page", "Document a reproducible workflow"] },
  vocabulary: ["éditeur", "chemin", "terminal", "aperçu", "artefact", "diagnostic"],
  mastery: { fr: ["Produire un artefact vérifiable", "Expliquer la boucle modifier-enregistrer-observer", "Diagnostiquer une erreur sans essais aléatoires"], en: ["Produce a verifiable artifact", "Explain the edit-save-observe loop", "Diagnose an error without random attempts"] }
});

export const toolsTrack = {
  id: "tools",
  label: "Outils",
  color: "slate",
  title: { fr: "Premiers outils de développement", en: "Development Tools Foundations" },
  summary: { fr: "Prépare un espace de travail accessible, observe tes fichiers et apprends à diagnostiquer avec des preuves.", en: "Prepare an accessible workspace, observe your files, and learn evidence-based troubleshooting." },
  level: { fr: "Débutant", en: "Beginner" },
  prerequisites: { fr: ["Aucune installation obligatoire"], en: ["No required installation"] },
  outcomes: { fr: ["Créer un espace de projet", "Utiliser fichiers et chemins", "Vérifier un aperçu", "Documenter et diagnostiquer"], en: ["Create a project workspace", "Use files and paths", "Verify a preview", "Document and troubleshoot"] },
  capstone: { fr: "Passeport de poste de travail vérifiable", en: "Verifiable workstation passport" },
  profession: { fr: "Dans une équipe, décrire précisément son environnement et fournir une reproduction accélère l'entraide.", en: "On a team, accurately describing an environment and providing a reproduction makes collaboration faster." },
  certification: { fr: ["Artefacts complets", "Flux reproductible", "Alternative sans installation", "Diagnostic sans donnée sensible"], en: ["Complete artifacts", "Reproducible workflow", "No-install alternative", "Diagnosis without sensitive data"] },
  modules: [toolsModule]
};

function setupLesson({ id, type = "html", title, brief, durationMin, course, artifact }) {
  artifact = localizeArtifact(id, artifact);
  const pedagogy = {
    fr: lessonPedagogy(course.fr, brief[0], type === "project"),
    en: lessonPedagogy(course.en, brief[1], type === "project")
  };
  return {
    id,
    type,
    title: { fr: title[0], en: title[1] },
    brief: { fr: brief[0], en: brief[1] },
    course,
    pedagogy,
    theory: { fr: course.fr.introduction, en: course.en.introduction },
    guide: {
      fr: { objectives: pedagogy.fr.objectives, steps: pedagogy.fr.guided, mistakes: ["Valider sans observer l'artefact", "Changer plusieurs éléments pendant un diagnostic", "Publier un chemin personnel ou un secret"] },
      en: { objectives: pedagogy.en.objectives, steps: pedagogy.en.guided, mistakes: ["Submitting without observing the artifact", "Changing several things during diagnosis", "Publishing a personal path or secret"] }
    },
    skills: ["tools", "workflow", "troubleshooting"],
    difficulty: type === "project" ? "project" : "easy",
    durationMin,
    starterCode: artifact.starterCode,
    solution: artifact.solution,
    tests: artifact.tests,
    hint: { fr: artifact.hint[0], en: artifact.hint[1] },
    xp: type === "project" ? 120 : 60
  };
}

function lessonPedagogy(course, summary, project) {
  const english = course === undefined || course.introduction.startsWith("A ") || /\b(the|your|work|tool)\b/i.test(course.introduction);
  return english ? {
    why: course.introduction,
    objectives: ["Distinguish each tool's role", "Produce observable evidence", "Choose an accessible alternative"],
    prerequisites: ["Access to a text editor or the built-in editor", "No administrator rights required"],
    vocabulary: course.vocabulary,
    comparison: { good: { title: "Observable evidence", code: "artifact + expected result", explanation: "Another learner can repeat the check." }, bad: { title: "Unverifiable claim", code: "it works", explanation: "No one can locate or reproduce a failure." } },
    guided: ["Read the platform-neutral routes and choose one you can use.", "Build the requested artifact one field at a time.", "Run the checks, then compare the preview with the expected result.", "If a check fails, record the symptom before changing one element."],
    autonomous: project ? "Build the passport without copying the correction, then review it on a second route if available." : "Adapt the artifact to your real environment without exposing personal data.",
    hints: ["Check the required class or id.", "Name the observed file and result.", "Compare your structure with the requested artifact, not with a success word."],
    correction: ["The solution names a concrete artifact.", "Each required field leaves evidence that static checks can inspect.", "The wording stays valid for local and built-in environments."],
    summary,
    next: "Keep this artifact; the next lesson adds another part of the workflow."
  } : {
    why: course.introduction,
    objectives: ["Distinguer le rôle de chaque outil", "Produire une preuve observable", "Choisir une alternative accessible"],
    prerequisites: ["Accès à un éditeur texte ou à l'éditeur intégré", "Aucun droit administrateur obligatoire"],
    vocabulary: course.vocabulary,
    comparison: { good: { title: "Preuve observable", code: "artefact + résultat attendu", explanation: "Une autre personne peut refaire le contrôle." }, bad: { title: "Affirmation invérifiable", code: "ça marche", explanation: "Personne ne peut localiser ni reproduire l'échec." } },
    guided: ["Lis les voies indépendantes de la plateforme et choisis celle qui t'est accessible.", "Construis l'artefact demandé un champ après l'autre.", "Lance les contrôles, puis compare l'aperçu au résultat attendu.", "Si un contrôle échoue, note le symptôme avant de changer un seul élément."],
    autonomous: project ? "Construis le passeport sans copier la correction, puis relis-le avec une seconde voie si elle est disponible." : "Adapte l'artefact à ton environnement réel sans exposer de donnée personnelle.",
    hints: ["Vérifie la classe ou l'identifiant demandé.", "Nomme le fichier observé et le résultat.", "Compare ta structure à l'artefact demandé, pas à un mot de réussite."],
    correction: ["La solution nomme un artefact concret.", "Chaque champ requis laisse une preuve inspectable par les tests statiques.", "La formulation reste valable en environnement local ou intégré."],
    summary,
    next: "Conserve cet artefact: la leçon suivante ajoute une partie du flux de travail."
  };
}

function bilingualCourse(frIntroduction, enIntroduction, sections, vocabulary) {
  return {
    fr: {
      introduction: frIntroduction,
      sections: sections.map(([frTitle, frParagraph]) => ({ title: frTitle, paragraphs: [frParagraph], example: "" })),
      vocabulary: vocabulary.map(([frTerm, frDefinition]) => [frTerm, frDefinition]),
      check: ["J'ai produit l'artefact demandé", "J'ai observé le résultat", "Je peux expliquer une alternative"]
    },
    en: {
      introduction: enIntroduction,
      sections: sections.map(([, , enTitle, enParagraph]) => ({ title: enTitle, paragraphs: [enParagraph], example: "" })),
      vocabulary: vocabulary.map(([, , enTerm, enDefinition]) => [enTerm, enDefinition]),
      check: ["I produced the requested artifact", "I observed the result", "I can explain an alternative"]
    }
  };
}

function contains(label, value) {
  return { type: "contains", label, value };
}

function localizeArtifact(id, artifact) {
  const labels = new Map([
    ["Une fiche de configuration", "A setup record"], ["Le dossier du projet", "The project folder"], ["Un éditeur identifié", "An identified editor"], ["Un navigateur identifié", "An identified browser"],
    ["Un rapport de chemin", "A path report"], ["Le fichier d'entrée", "The entry file"], ["Le dossier courant", "The current folder"], ["Une méthode de vérification", "A verification method"],
    ["Une fiche de diagnostic", "A diagnosis record"], ["Une observation", "An observation"], ["Un emplacement", "A location"], ["Une prochaine vérification", "A next check"],
    ["Une documentation de projet", "Project documentation"], ["Des prérequis", "Prerequisites"], ["Des étapes ordonnées", "Ordered steps"], ["Un résultat observable", "An observable result"], ["Une piste de dépannage", "A troubleshooting lead"],
    ["Un rapport d'incident", "An incident report"], ["Un symptôme précis", "A precise symptom"], ["Une hypothèse testable", "A testable hypothesis"], ["Un contrôle unique", "A single check"], ["Un résultat", "A result"],
    ["Le passeport", "The passport"], ["L'environnement", "The environment"], ["La boucle ordonnée", "The ordered workflow"], ["Une alternative sans installation", "A no-install alternative"], ["Une méthode de diagnostic", "A diagnosis method"]
  ]);
  const replacements = {
    "tools-01-vscode": [["Mon espace de travail", "My workspace"], ["Ajoute une liste avec les trois informations demandées.", "Add a list with the three requested details."], ["Éditeur", "Editor"], ["Navigateur", "Browser"], ["Dossier", "Folder"], ["éditeur intégré", "built-in editor"], ["atelier-outils", "tools-workshop"]],
    "tools-02-php": [["Rapport de fichiers", "File report"], ["Documente le dossier, le fichier et une commande ou alternative graphique.", "Document the folder, file, and a command or graphical alternative."], ["Dossier courant", "Current folder"], ["Fichier vérifié", "Verified file"], ["Alternative graphique", "Graphical alternative"], ["atelier-outils", "tools-workshop"], ["arborescence de l'éditeur", "editor file tree"]],
    "tools-03-postgresql": [["Diagnostic d'aperçu", "Preview diagnosis"], ["Ajoute observation, emplacement et prochaine vérification.", "Add an observation, location, and next check."], ["Observation", "Observation"], ["Emplacement", "Location"], ["Prochaine vérification", "Next check"], ["image absente, statut", "missing image, status"], ["comparer le chemin au nom du fichier", "compare the path with the filename"]],
    "tools-04-project-notes": [["Mode d'emploi", "Project instructions"], ["Ajoute prérequis, étapes et résultat attendu.", "Add prerequisites, steps, and the expected result."], ["Prérequis", "Prerequisites"], ["Étapes", "Steps"], ["Résultat attendu", "Expected result"], ["Un éditeur de texte et un navigateur, ou l'aperçu intégré.", "A text editor and browser, or the built-in preview."], ["Ouvrir", "Open"], ["Recharger l'aperçu", "Reload the preview"], ["Le titre Mon espace de travail apparaît.", "The My workspace heading appears."], ["Dépannage : vérifier le nom et le chemin du fichier.", "Troubleshooting: check the filename and path."]],
    "tools-05-troubleshooting": [["Rapport d'incident", "Incident report"], ["Décris le symptôme, l'hypothèse, le contrôle et le résultat.", "Describe the symptom, hypothesis, check, and result."], ["Symptôme", "Symptom"], ["Hypothèse", "Hypothesis"], ["Contrôle", "Check"], ["Résultat", "Result"], ["l'ancien titre reste affiché après enregistrement", "the old heading remains after saving"], ["le navigateur affiche un autre", "the browser displays another"], ["comparer l'adresse et le dossier de travail", "compare the address and workspace folder"], ["les chemins diffèrent; ouvrir le bon fichier", "the paths differ; open the correct file"]],
    "tools-06-workstation-project": [["Passeport de poste de travail", "Workstation passport"], ["Assemble environnement, boucle de travail, alternative et diagnostic.", "Assemble the environment, workflow, alternative, and diagnosis."], ["Environnement", "Environment"], ["Boucle de travail", "Workflow"], ["Alternative sans installation", "No-install alternative"], ["Diagnostic", "Diagnosis"], ["Éditeur texte, navigateur et dossier atelier-outils.", "Text editor, browser, and tools-workshop folder."], ["Ouvrir", "Open"], ["Modifier et enregistrer", "Edit and save"], ["Recharger et observer le titre", "Reload and observe the heading"], ["Utiliser l'éditeur et l'aperçu intégrés.", "Use the built-in editor and preview."], ["Noter symptôme, hypothèse et contrôle sans donnée sensible.", "Record symptom, hypothesis, and check without sensitive data."]]
  };
  const pairs = replacements[id] || [];
  const translate = (value) => pairs.reduce((text, [fr, en]) => text.replaceAll(fr, en), value);
  return {
    ...artifact,
    starterCode: { fr: artifact.starterCode, en: translate(artifact.starterCode) },
    solution: { fr: artifact.solution, en: translate(artifact.solution) },
    tests: artifact.tests.map((item) => ({
      ...item,
      label: { fr: item.label, en: labels.get(item.label) || translate(item.label) },
      value: { fr: item.value, en: translate(item.value) }
    }))
  };
}
