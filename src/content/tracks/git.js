import { gitModules } from "./gitModules.js";
import { gitScenarioFor } from "./gitLessonScenarios.js";
import { expandQuizQuestions } from "../../features/quizzes/quizEngine.js";

const sharedVocabulary = {
  repository: ["dépôt", "repository", "Dossier suivi par Git avec son historique.", "A folder tracked by Git with its history."],
  commit: ["commit", "commit", "Instantané nommé d’un ensemble cohérent de modifications.", "A named snapshot of a coherent set of changes."],
  branch: ["branche", "branch", "Ligne de travail indépendante pointant vers un commit.", "An independent line of work pointing to a commit."],
  remote: ["dépôt distant", "remote", "Référence vers un dépôt hébergé sur un autre emplacement.", "A reference to a repository hosted elsewhere."],
  staging: ["index", "staging area", "Zone où Git prépare le contenu du prochain commit.", "The area where Git prepares the next commit."],
  conflict: ["conflit", "conflict", "Situation où Git ne peut pas fusionner automatiquement deux modifications.", "A situation where Git cannot automatically merge two changes."],
  pullRequest: ["pull request", "pull request", "Proposition de fusion relue et discutée sur une forge.", "A reviewed and discussed merge proposal on a forge."],
  workflow: ["workflow", "workflow", "Suite automatisée d’étapes déclenchée par un événement.", "An automated sequence of steps triggered by an event."]
};

export const gitTrack = {
  id: "git",
  label: "GIT",
  title: { fr: "Git et GitHub", en: "Git and GitHub" },
  summary: { fr: "Versionne ton code, collabore proprement et automatise les contrôles essentiels.", en: "Version your code, collaborate cleanly, and automate essential checks." },
  level: { fr: "Débutant à intermédiaire", en: "Beginner to intermediate" },
  profession: { fr: "Git est la mémoire d’un projet logiciel. Il permet de comprendre, relire, partager et restaurer chaque évolution sans dépendre de copies manuelles.", en: "Git is a software project's memory. It makes every change understandable, reviewable, shareable, and recoverable without manual copies." },
  prerequisites: { fr: ["Savoir utiliser des fichiers et dossiers", "Connaître quelques commandes de terminal"], en: ["Know how to use files and folders", "Know a few terminal commands"] },
  outcomes: { fr: ["Créer un historique lisible", "Travailler avec des branches", "Collaborer par pull request", "Automatiser une vérification GitHub Actions"], en: ["Create readable history", "Work with branches", "Collaborate through pull requests", "Automate a GitHub Actions check"] },
  capstone: { fr: "Publier un dépôt portfolio avec historique, branches, pull request et CI.", en: "Publish a portfolio repository with history, branches, pull request, and CI." },
  certification: { fr: ["Livrer les deux mini-projets", "Réussir l’examen final", "Livrer le dépôt final"], en: ["Ship both mini-projects", "Pass the final exam", "Ship the final repository"] },
  modules: [
    ...gitModules,
    gitModule("git-foundations", ["Fondations et historique", "Foundations and history"], [
      terminalLesson("git-01-terminal", ["Se repérer dans le terminal", "Navigate the terminal"], ["Crée un dossier de travail et place-toi dedans.", "Create a working folder and enter it."], "pwd\nls\nmkdir pulsa-git\ncd pulsa-git", ["pwd", "mkdir", "cd"], [sharedVocabulary.repository, ["chemin", "path", "Adresse d’un fichier ou dossier.", "The address of a file or folder."]], ["terminal", "filesystem"]),
      terminalLesson("git-01-init", ["Initialiser un dépôt", "Initialize a repository"], ["Initialise Git puis vérifie son état.", "Initialize Git and check its state."], "git init\ngit status", ["git init", "git status"], [sharedVocabulary.repository, ["répertoire de travail", "working tree", "Fichiers actuellement présents dans le projet.", "Files currently present in the project."]], ["git-init", "repository"]),
      terminalLesson("git-01-config", ["Configurer son identité", "Configure your identity"], ["Configure un nom et un email Git au niveau du dépôt.", "Configure a repository-level Git name and email."], "git config user.name \"Maya Dev\"\ngit config user.email \"maya@example.test\"\ngit config --list", ["git config user.name", "git config user.email", "git config --list"], [["configuration locale", "local configuration", "Réglage appliqué au dépôt courant.", "A setting applied to the current repository."], sharedVocabulary.commit], ["git-config", "identity"]),
      terminalLesson("git-01-first-commit", ["Créer un premier commit", "Create a first commit"], ["Prépare README.md puis crée un commit explicite.", "Stage README.md and create an explicit commit."], "git status\ngit add README.md\ngit diff --staged\ngit commit -m \"docs: add project overview\"\ngit log --oneline", ["git add README.md", "git diff --staged", "git commit -m", "git log --oneline"], [sharedVocabulary.staging, sharedVocabulary.commit], ["staging", "commit-history"]),
      gitQuiz("git-01-review", ["Quiz : préparer un commit", "Quiz: prepare a commit"], [
        q("q1", ["Quelle commande place README.md dans l’index ?", "Which command stages README.md?"], ["git add README.md", "git commit README.md", "git push README.md"], "git add README.md", ["git add sélectionne le contenu du prochain commit.", "git add selects content for the next commit."], ["staging"]),
        q("q2", ["Que montre git diff --staged ?", "What does git diff --staged show?"], ["Les modifications préparées", "Tous les dépôts distants", "Les branches supprimées"], "Les modifications préparées", ["Cette vue permet de relire exactement le prochain commit.", "This view lets you review the exact next commit."], ["staging"]),
        q("q3", ["Pourquoi écrire un message de commit précis ?", "Why write a precise commit message?"], ["Pour expliquer l’intention", "Pour accélérer Internet", "Pour créer une branche"], "Pour expliquer l’intention", ["L’historique doit rester compréhensible sans ouvrir chaque diff.", "History should remain understandable without opening every diff."], ["commit-history"])
      ])
    ], ["Comprendre le cycle fichier → index → commit.", "Understand the file → staging → commit cycle."], [sharedVocabulary.repository, sharedVocabulary.staging, sharedVocabulary.commit]),
    gitModule("git-branches", ["Branches et fusions", "Branches and merges"], [
      terminalLesson("git-02-status-diff", ["Lire l’état et les différences", "Read status and differences"], ["Inspecte les changements avant de les préparer.", "Inspect changes before staging them."], "git status --short\ngit diff\ngit diff --stat", ["git status --short", "git diff", "git diff --stat"], [["diff", "diff", "Comparaison ligne par ligne entre deux états.", "A line-by-line comparison between two states."], sharedVocabulary.staging], ["diff-review", "working-tree"]),
      terminalLesson("git-02-branch", ["Créer une branche de fonctionnalité", "Create a feature branch"], ["Crée et ouvre une branche dédiée à la navigation.", "Create and switch to a branch dedicated to navigation."], "git switch -c feature/navigation\ngit branch --show-current", ["git switch -c", "feature/navigation", "git branch --show-current"], [sharedVocabulary.branch, ["HEAD", "HEAD", "Référence vers le commit ou la branche actuellement ouverte.", "A reference to the currently checked-out commit or branch."]], ["branching", "feature-workflow"]),
      terminalLesson("git-02-merge", ["Fusionner une branche", "Merge a branch"], ["Reviens sur main, fusionne la fonctionnalité puis supprime la branche locale.", "Return to main, merge the feature, then remove the local branch."], "git switch main\ngit merge feature/navigation\ngit branch -d feature/navigation", ["git switch main", "git merge", "git branch -d"], [sharedVocabulary.branch, ["fusion", "merge", "Opération qui réunit deux historiques compatibles.", "The operation that combines two compatible histories."]], ["merge", "branch-cleanup"]),
      terminalProject("git-02-conflict-project", ["Mini-projet : résoudre un conflit", "Mini-project: resolve a conflict"], ["Simule une fusion, inspecte le conflit, résous-le et termine le commit.", "Simulate a merge, inspect the conflict, resolve it, and finish the commit."], "git switch main\ngit merge feature/header\n# corrige les marqueurs dans header.html\ngit add header.html\ngit commit -m \"merge: resolve header conflict\"", ["git merge", "git add header.html", "git commit -m"], [sharedVocabulary.conflict, sharedVocabulary.branch], ["conflict-resolution", "merge"], false),
      gitQuiz("git-02-review", ["Quiz : branches et conflits", "Quiz: branches and conflicts"], [
        q("q1", ["Pourquoi isoler une fonctionnalité dans une branche ?", "Why isolate a feature in a branch?"], ["Pour travailler sans déstabiliser main", "Pour supprimer l’historique", "Pour éviter les commits"], "Pour travailler sans déstabiliser main", ["Une branche isole une intention tout en conservant l’historique.", "A branch isolates an intent while preserving history."], ["branching"]),
        q("q2", ["Que faut-il faire après avoir corrigé les marqueurs d’un conflit ?", "What should you do after fixing conflict markers?"], ["Ajouter les fichiers résolus puis terminer la fusion", "Relancer git init", "Supprimer le dépôt"], "Ajouter les fichiers résolus puis terminer la fusion", ["Git doit recevoir explicitement la version résolue.", "Git must explicitly receive the resolved version."], ["conflict-resolution"]),
        q("q3", ["Quelle commande refuse de supprimer une branche non fusionnée ?", "Which command refuses to delete an unmerged branch?"], ["git branch -d", "git branch -D", "git reset --hard"], "git branch -d", ["L’option -d protège les travaux non fusionnés.", "The -d option protects unmerged work."], ["branch-cleanup"])
      ])
    ], ["Organiser le travail sans perdre l’historique.", "Organize work without losing history."], [sharedVocabulary.branch, sharedVocabulary.conflict]),
    gitModule("git-collaboration", ["Dépôts distants et pull requests", "Remotes and pull requests"], [
      terminalLesson("git-03-clone-remote", ["Cloner et identifier le remote", "Clone and inspect the remote"], ["Clone un dépôt puis affiche ses remotes.", "Clone a repository and display its remotes."], "git clone https://github.com/example/pulsa-app.git\ncd pulsa-app\ngit remote -v", ["git clone", "git remote -v"], [sharedVocabulary.remote, ["clone", "clone", "Copie locale complète d’un dépôt et de son historique.", "A complete local copy of a repository and its history."]], ["clone", "remotes"]),
      terminalLesson("git-03-fetch-pull", ["Récupérer sans confondre fetch et pull", "Fetch without confusing fetch and pull"], ["Télécharge les références distantes, inspecte-les puis intègre main.", "Download remote references, inspect them, then integrate main."], "git fetch origin\ngit log --oneline main..origin/main\ngit pull --ff-only origin main", ["git fetch origin", "origin/main", "git pull --ff-only"], [["fetch", "fetch", "Télécharge les références sans modifier la branche courante.", "Downloads references without changing the current branch."], ["pull", "pull", "Télécharge puis intègre une branche distante.", "Downloads and integrates a remote branch."]], ["fetch", "pull"]),
      terminalLesson("git-03-push", ["Publier une branche", "Publish a branch"], ["Publie une branche et configure son upstream.", "Publish a branch and configure its upstream."], "git switch -c feature/profile\ngit push -u origin feature/profile\ngit status -sb", ["git push -u origin", "feature/profile", "git status -sb"], [["upstream", "upstream", "Branche distante suivie par une branche locale.", "The remote branch tracked by a local branch."], sharedVocabulary.remote], ["push", "upstream"]),
      terminalProject("git-03-pr-project", ["Mini-projet : préparer une pull request", "Mini-project: prepare a pull request"], ["Crée une branche, deux commits ciblés, publie-la et prépare une PR.", "Create a branch, two focused commits, publish it, and prepare a PR."], "git switch -c feature/accessibility\ngit add src/form.html\ngit commit -m \"feat: add explicit form labels\"\ngit add tests/form.spec.js\ngit commit -m \"test: cover form labels\"\ngit push -u origin feature/accessibility", ["git switch -c", "git commit -m \"feat:", "git commit -m \"test:", "git push -u"], [sharedVocabulary.pullRequest, sharedVocabulary.commit], ["pull-request", "commit-history"], false),
      gitQuiz("git-03-review", ["Quiz : collaboration distante", "Quiz: remote collaboration"], [
        q("q1", ["Quelle commande télécharge sans fusionner ?", "Which command downloads without merging?"], ["git fetch", "git pull", "git commit"], "git fetch", ["fetch met à jour les références distantes sans toucher au travail courant.", "fetch updates remote references without touching current work."], ["fetch"]),
        q("q2", ["À quoi sert -u lors du premier push ?", "What does -u do on the first push?"], ["Configurer le suivi de branche", "Annuler le commit", "Créer un tag"], "Configurer le suivi de branche", ["L’upstream simplifie les prochains push et pull.", "The upstream simplifies later pushes and pulls."], ["upstream"]),
        q("q3", ["Une pull request de qualité doit surtout…", "A quality pull request should mainly…"], ["Expliquer le changement et sa vérification", "Contenir tous les sujets du projet", "Masquer les tests"], "Expliquer le changement et sa vérification", ["Une PR réduit l’effort de review grâce à un périmètre et des preuves clairs.", "A PR reduces review effort through clear scope and evidence."], ["pull-request"])
      ])
    ], ["Synchroniser et faire relire un changement.", "Synchronize and review a change."], [sharedVocabulary.remote, sharedVocabulary.pullRequest]),
    gitModule("git-quality", ["Qualité, automatisation et livraison", "Quality, automation, and delivery"], [
      terminalLesson("git-04-issues", ["Relier issue, branche et commits", "Connect issue, branch, and commits"], ["Nomme une branche et des commits traçables depuis une issue.", "Name a branch and commits traceable to an issue."], "git switch -c fix/42-mobile-menu\ngit add src/menu.js\ngit commit -m \"fix: trap focus in mobile menu refs #42\"\ngit log --oneline -1", ["fix/42-mobile-menu", "refs #42", "git log --oneline -1"], [["issue", "issue", "Élément de suivi décrivant un besoin, un bug ou une décision.", "A tracking item describing a need, bug, or decision."], sharedVocabulary.commit], ["issues", "traceability"]),
      terminalLesson("git-04-actions", ["Créer un contrôle GitHub Actions", "Create a GitHub Actions check"], ["Prépare le fichier de workflow et vérifie sa présence avant commit.", "Prepare a workflow file and verify it before committing."], "mkdir -p .github/workflows\n# crée .github/workflows/ci.yml\ngit add .github/workflows/ci.yml\ngit commit -m \"ci: validate project on push\"", [".github/workflows", "git add .github/workflows/ci.yml", "git commit -m \"ci:"], [sharedVocabulary.workflow, ["CI", "CI", "Intégration continue exécutant automatiquement des contrôles.", "Continuous integration that automatically runs checks."]], ["github-actions", "ci"]),
      terminalProject("git-04-capstone", ["Projet final : dépôt portfolio professionnel", "Final project: professional portfolio repository"], ["Prépare un dépôt avec README, historique ciblé, branche, tag et workflow CI.", "Prepare a repository with README, focused history, a branch, a tag, and a CI workflow."], "git init\ngit add README.md\ngit commit -m \"docs: explain portfolio project\"\ngit switch -c feature/portfolio\ngit add .\ngit commit -m \"feat: publish accessible portfolio\"\ngit tag -a v1.0.0 -m \"First portfolio release\"\ngit log --oneline --decorate --graph --all", ["git init", "git add README.md", "git switch -c", "git tag -a v1.0.0", "git log --oneline --decorate --graph --all"], [sharedVocabulary.workflow, sharedVocabulary.branch, sharedVocabulary.commit], ["release", "portfolio", "ci"], true),
      gitQuiz("git-04-review", ["Quiz : qualité du dépôt", "Quiz: repository quality"], [
        q("q1", ["Où placer un workflow GitHub Actions ?", "Where should a GitHub Actions workflow live?"], [".github/workflows", "src/actions", ".git/commits"], ".github/workflows", ["GitHub charge les fichiers YAML de ce dossier conventionnel.", "GitHub loads YAML files from this conventional directory."], ["github-actions"]),
        q("q2", ["Pourquoi relier un commit à une issue ?", "Why link a commit to an issue?"], ["Pour conserver le contexte de la décision", "Pour réduire la taille du dépôt", "Pour chiffrer le code"], "Pour conserver le contexte de la décision", ["La traçabilité relie besoin, changement et vérification.", "Traceability connects need, change, and verification."], ["traceability"]),
        q("q3", ["Que représente un tag v1.0.0 ?", "What does a v1.0.0 tag represent?"], ["Un repère de version stable", "Une branche temporaire", "Un fichier ignoré"], "Un repère de version stable", ["Un tag nomme un commit important, souvent une livraison.", "A tag names an important commit, often a release."], ["release"])
      ]),
      gitExam()
    ], ["Livrer un dépôt traçable et automatiquement vérifié.", "Ship a traceable and automatically checked repository."], [sharedVocabulary.workflow, sharedVocabulary.pullRequest])
  ]
};

function gitModule(id, title, lessons, deliverable, vocabulary) {
  return {
    id,
    title: { fr: title[0], en: title[1] },
    description: { fr: deliverable[0], en: deliverable[1] },
    importance: { fr: deliverable[0], en: deliverable[1] },
    deliverable: { fr: deliverable[0], en: deliverable[1] },
    prerequisites: { fr: ["Avoir terminé le module précédent ou maîtriser ses notions."], en: ["Complete the previous module or master its concepts."] },
    outcomes: { fr: [deliverable[0]], en: [deliverable[1]] },
    vocabulary: { fr: vocabulary.map((item) => item[0]), en: vocabulary.map((item) => item[1]) },
    mastery: { fr: [deliverable[0], "Expliquer les commandes utilisées."], en: [deliverable[1], "Explain the commands used."] },
    totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.durationMin, 0),
    lessons
  };
}

function terminalLesson(id, title, brief, solution, requirements, vocabulary, skills) {
  const command = requirements[0];
  return richLesson({
    id,
    type: "terminal",
    title,
    brief,
    starterCode: { fr: "# Écris les commandes dans l’ordre\n", en: "# Write the commands in order\n" },
    solution: { fr: solution, en: englishGitArtifact(solution) },
    tests: requirements.map((value) => ({ type: "contains", label: { fr: `La commande « ${value} » est présente`, en: `Command “${value}” is present` }, value })),
    vocabulary,
    skills,
    durationMin: 25,
    xp: 35,
    command
  });
}

function terminalProject(id, title, brief, solution, requirements, vocabulary, skills, finalProject) {
  return {
    ...richLesson({
      id,
      type: "project",
      runtime: "terminal",
      title,
      brief,
      starterCode: { fr: "# Documente ici les commandes et décisions du projet\n", en: "# Document the project's commands and decisions here\n" },
      solution: { fr: solution, en: englishGitArtifact(solution) },
      tests: requirements.map((value) => ({ type: "contains", label: { fr: `La preuve « ${value} » est présente`, en: `Evidence “${value}” is present` }, value })),
      vocabulary,
      skills,
      durationMin: finalProject ? 180 : 100,
      xp: finalProject ? 140 : 80,
      command: requirements[0]
    }),
    rubric: {
      fr: ["Historique composé de commits ciblés", "Commandes justifiées", "Aucune perte de travail", "README ou compte rendu clair", finalProject ? "Workflow CI et tag de version présents" : "Résolution reproductible"],
      en: ["History made of focused commits", "Commands are justified", "No work is lost", "Clear README or report", finalProject ? "CI workflow and version tag are present" : "Reproducible resolution"]
    }
  };
}

function gitQuiz(id, title, questions) {
  return richLesson({
    id,
    type: "quiz",
    title,
    brief: ["Vérifie ta compréhension avant de continuer.", "Check your understanding before continuing."],
    starterCode: "",
    solution: "",
    tests: [{ type: "quiz", label: { fr: "Score requis", en: "Required score" }, value: "70" }],
    vocabulary: [sharedVocabulary.repository, sharedVocabulary.commit, sharedVocabulary.branch],
    skills: questions.flatMap((question) => question.skills),
    durationMin: 20,
    xp: 30,
    command: "git status",
    questions,
    passingScore: 70,
    randomizeQuestions: true,
    feedbackMode: "immediate"
  });
}

function gitExam() {
  return {
    ...gitQuiz("git-final-exam", ["Examen Git et GitHub", "Git and GitHub exam"], [
      q("e1", ["Quel ordre produit un commit relu ?", "Which order produces a reviewed commit?"], ["git add → git diff --staged → git commit", "git push → git init → git add", "git merge → git clone → git status"], "git add → git diff --staged → git commit", ["Préparer, relire puis enregistrer réduit les commits accidentels.", "Stage, review, then record to reduce accidental commits."], ["staging"]),
      q("e2", ["Comment synchroniser sans modifier immédiatement la branche ?", "How do you synchronize without immediately changing the branch?"], ["git fetch", "git pull", "git reset --hard"], "git fetch", ["fetch sépare téléchargement et intégration.", "fetch separates downloading from integration."], ["fetch"]),
      q("e3", ["Quelle preuve facilite le plus une review ?", "Which evidence helps a review most?"], ["Une PR ciblée avec tests", "Un commit géant sans description", "Une capture sans code"], "Une PR ciblée avec tests", ["Le reviewer doit comprendre le périmètre et reproduire la vérification.", "The reviewer should understand scope and reproduce verification."], ["pull-request"]),
      q("e4", ["Quelle action protège le travail avant une fusion risquée ?", "What protects work before a risky merge?"], ["Créer un commit ou une branche de sauvegarde", "Supprimer .git", "Forcer systématiquement"], "Créer un commit ou une branche de sauvegarde", ["Un point d’historique restaurable évite les pertes.", "A restorable history point prevents loss."], ["safety"]),
      q("e5", ["Quel fichier définit une CI GitHub ?", "Which file defines GitHub CI?"], [".github/workflows/ci.yml", "package-lock.txt", ".git/HEAD.yml"], ".github/workflows/ci.yml", ["Les workflows GitHub Actions sont des fichiers YAML versionnés.", "GitHub Actions workflows are versioned YAML files."], ["github-actions"])
    ]),
    purpose: "exam",
    passingScore: 80,
    xp: 100
  };
}

function q(id, prompt, options, answer, explanation, skills) {
  return {
    id,
    type: "single",
    prompt: { fr: prompt[0], en: prompt[1] },
    choices: options.map((option) => ({ id: option, label: { fr: option, en: option } })),
    answer,
    explanation: { fr: explanation[0], en: explanation[1] },
    points: 1,
    skills,
    glossaryTerms: [],
    requiresRationale: false
  };
}

function richLesson(spec) {
  const vocabulary = [...(spec.vocabulary || [])];
  for (const fallback of [sharedVocabulary.repository, sharedVocabulary.commit, sharedVocabulary.branch, sharedVocabulary.remote]) {
    if (vocabulary.length >= 3) break;
    if (!vocabulary.some((item) => item[0] === fallback[0])) vocabulary.push(fallback);
  }
  const scenario = gitScenarioFor(spec.id);
  const localizedVocabulary = {
    fr: vocabulary.map((item) => [item[0], item[2]]),
    en: vocabulary.map((item) => [item[1], item[3]])
  };
  const createLocale = (locale) => {
    const fr = locale === "fr";
    const title = spec.title[fr ? 0 : 1];
    const brief = spec.brief[fr ? 0 : 1];
    const command = spec.command;
    return {
      introduction: fr ? `${title} sert à construire un historique Git compréhensible et restaurable. ${brief}` : `${title} helps build understandable, restorable Git history. ${brief}`,
      objectives: fr ? [`Expliquer l’objectif de ${command}.`, "Prévoir son effet sur le dépôt.", "Vérifier le résultat avant de continuer."] : [`Explain the purpose of ${command}.`, "Predict its effect on the repository.", "Verify the result before continuing."],
      vocabulary: localizedVocabulary[locale],
      sections: [
        {
          title: fr ? "Modèle mental" : "Mental model",
          paragraphs: [
            fr ? "Git compare des états et déplace des références. Une commande utile doit donc être comprise par son entrée, son effet visible et la preuve qui confirme que le dépôt est resté cohérent." : "Git compares states and moves references. A useful command should therefore be understood through its input, visible effect, and the evidence that confirms the repository stayed coherent.",
            fr ? scenario.context.fr : scenario.context.en
          ],
          example: command
        },
        {
          title: fr ? "Exécuter avec intention" : "Run with intent",
          paragraphs: [
            fr ? `La consigne demande : ${brief}` : `The task asks: ${brief}`,
            fr ? scenario.example.fr : scenario.example.en
          ],
           example: solutionFor(spec.solution, locale)
        },
        {
          title: fr ? "Vérifier avant de poursuivre" : "Verify before continuing",
          paragraphs: [
            fr ? "Relis la sortie, l’état et le diff. N’enchaîne pas une commande risquée sans point de retour ni sans comprendre ce qui va changer dans l’historique." : "Review output, status, and diff. Do not chain a risky command without a recovery point or without understanding what will change in history.",
            fr ? scenario.validation.fr : scenario.validation.en,
            fr ? scenario.pitfall.fr : scenario.pitfall.en
          ],
          example: "git status --short\ngit log --oneline -5"
        }
      ],
      rules: fr ? ["Une intention cohérente par commit.", "Toujours relire status et diff.", "Préférer les opérations réversibles."] : ["One coherent intent per commit.", "Always review status and diff.", "Prefer reversible operations."],
      check: fr ? ["Je comprends l’effet de chaque commande.", "Je peux vérifier le résultat.", "Je sais revenir à un état sûr."] : ["I understand every command's effect.", "I can verify the result.", "I know how to return to a safe state."],
      summary: fr ? `${title} relie une commande à une intention et à une preuve observable.` : `${title} connects a command to an intent and observable evidence.`,
      next: fr ? "Réutilise cette méthode dans la prochaine situation Git." : "Reuse this method in the next Git situation."
    };
  };
  const pedagogyLocale = (locale) => {
    const fr = locale === "fr";
    const title = spec.title[fr ? 0 : 1];
    return {
      why: fr ? `${title} réduit les erreurs et rend la collaboration explicable.` : `${title} reduces mistakes and makes collaboration explainable.`,
      objectives: createLocale(locale).objectives,
      prerequisites: fr ? ["Savoir ouvrir un terminal.", "Travailler dans un dossier de test.", "Lire une commande avant de l’exécuter."] : ["Know how to open a terminal.", "Work in a test folder.", "Read a command before running it."],
      vocabulary: localizedVocabulary[locale],
      comparison: {
       good: { title: fr ? "Commande ciblée et vérifiée" : "Focused, verified command", code: `${solutionFor(spec.solution, locale)}\ngit status --short`, explanation: fr ? "La commande répond à une intention puis son résultat est contrôlé." : "The command serves an intent and its result is checked." },
        bad: { title: fr ? "Suite aveugle de commandes" : "Blind command sequence", code: "git add .\ngit commit -m update\ngit push --force", explanation: fr ? "Le périmètre, le message et le risque ne sont pas maîtrisés." : "Scope, message, and risk are uncontrolled." }
      },
      guided: fr ? ["Lis l’état initial avec git status.", "Exécute une commande à la fois.", "Contrôle le résultat avec status, diff ou log."] : ["Read the initial state with git status.", "Run one command at a time.", "Check the result with status, diff, or log."],
      autonomous: fr ? `Reproduis « ${title} » dans un dépôt jetable et explique chaque sortie.` : `Reproduce “${title}” in a disposable repository and explain every output.`,
      hints: fr ? ["Commence par identifier l’état actuel.", `Cherche la commande ${spec.command}.`, "Ajoute une commande de vérification à la fin."] : ["Start by identifying current state.", `Look for the ${spec.command} command.`, "Add a verification command at the end."],
      correction: fr ? ["La première commande établit le contexte.", "Les commandes centrales réalisent une seule intention.", "La dernière commande fournit une preuve contrôlable."] : ["The first command establishes context.", "The central commands perform one intent.", "The last command provides verifiable evidence."],
      summary: createLocale(locale).summary,
      next: createLocale(locale).next
    };
  };
  return {
    id: spec.id,
    type: spec.type,
    runtime: spec.runtime,
    purpose: spec.purpose,
    title: { fr: spec.title[0], en: spec.title[1] },
    brief: { fr: spec.brief[0], en: spec.brief[1] },
    course: { fr: createLocale("fr"), en: createLocale("en") },
    pedagogy: { fr: pedagogyLocale("fr"), en: pedagogyLocale("en") },
    theory: { fr: { points: createLocale("fr").rules, example: spec.solution }, en: { points: createLocale("en").rules, example: spec.solution } },
    guide: {
      fr: { objectives: createLocale("fr").objectives, steps: pedagogyLocale("fr").guided, mistakes: [`${spec.title[0]} : exécuter sans lire l’état.`, "Mélanger plusieurs intentions.", "Utiliser force sans comprendre."] },
      en: { objectives: createLocale("en").objectives, steps: pedagogyLocale("en").guided, mistakes: [`${spec.title[1]}: run commands without reading state.`, "Mix several intents.", "Use force without understanding."] }
    },
    skills: [...new Set(spec.skills || [])],
    difficulty: "starter",
    durationMin: spec.durationMin,
    starterCode: spec.starterCode,
    solution: spec.solution,
    tests: spec.tests,
    questions: spec.questions ? expandQuizQuestions(spec.questions, 10) : spec.questions,
    passingScore: spec.passingScore,
    randomizeQuestions: spec.randomizeQuestions,
    feedbackMode: spec.feedbackMode,
    hint: { fr: pedagogyLocale("fr").hints[0], en: pedagogyLocale("en").hints[0] },
    xp: spec.xp
  };
}

function solutionFor(value, locale) {
  return value && typeof value === "object" ? value[locale] : value;
}

function englishGitArtifact(value) {
  return value
    .replace("# corrige les marqueurs dans header.html", "# resolve the conflict markers in header.html")
    .replace("# crée .github/workflows/ci.yml", "# create .github/workflows/ci.yml");
}
