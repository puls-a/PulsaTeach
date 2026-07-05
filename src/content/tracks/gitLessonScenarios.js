export const gitLessonScenarios = {
  "git-01-terminal": {
    context: {
      fr: "Dans un vrai projet, savoir où tu te trouves dans l’arborescence t’évite d’initialiser Git dans le mauvais dossier ou de créer des fichiers au mauvais endroit.",
      en: "In a real project, knowing where you are in the tree prevents initializing Git in the wrong folder or creating files in the wrong place."
    },
    example: {
      fr: "Exemple concret : avant de créer un atelier de tests, prépare un dossier jetable puis confirme que README, src ou tests seront bien créés dans cet espace de travail.",
      en: "Concrete example: before creating a testing workshop, prepare a disposable folder and confirm that README, src, or tests will be created in that workspace."
    },
    validation: {
      fr: "Validation pratique : affiche le chemin courant, liste les fichiers présents, puis explique à voix haute pourquoi ce dossier est sûr pour expérimenter sans risquer le vrai dépôt de production.",
      en: "Practical validation: print the current path, list the present files, then explain why this folder is safe for experimenting without risking the real production repository."
    },
    pitfall: {
      fr: "Piège fréquent : lancer les commandes depuis le dossier parent et croire que Git ou les nouveaux fichiers appartiennent déjà au projet attendu.",
      en: "Common pitfall: run commands from the parent folder and assume Git or new files already belong to the intended project."
    }
  },
  "git-01-init": {
    context: {
      fr: "Initialiser un dépôt crée la mémoire du projet. C’est le point de départ quand une idée quitte le brouillon pour devenir un produit que l’on veut relire, partager et restaurer.",
      en: "Initializing a repository creates the project's memory. It is the starting point when an idea leaves the draft stage to become a product you want to review, share, and restore."
    },
    example: {
      fr: "Exemple concret : juste après avoir créé une maquette PulsaTeach locale, initialise Git puis vérifie que le working tree est propre avant d’ajouter le premier fichier métier.",
      en: "Concrete example: right after creating a local PulsaTeach mockup, initialize Git and verify that the working tree is clean before adding the first product file."
    },
    validation: {
      fr: "Validation pratique : exécute git init, lis le dossier .git créé, puis confirme avec git status que Git suit bien ce projet et aucun autre.",
      en: "Practical validation: run git init, inspect the created .git folder, then confirm with git status that Git is tracking this project and no other."
    },
    pitfall: {
      fr: "Piège fréquent : initialiser un sous-dossier au lieu de la racine produit, puis découvrir trop tard un historique fragmenté ou imbriqué.",
      en: "Common pitfall: initialize a subfolder instead of the product root, then discover too late that history is fragmented or nested."
    }
  },
  "git-01-config": {
    context: {
      fr: "Une identité Git correcte rend chaque contribution traçable. C’est indispensable quand plusieurs personnes relisent les commits, attribuent une correction ou vérifient une preuve de compétence.",
      en: "A correct Git identity makes every contribution traceable. It is essential when several people review commits, attribute a fix, or verify competence evidence."
    },
    example: {
      fr: "Exemple concret : sur un atelier partagé, configure l’identité locale du dépôt de formation pour éviter d’utiliser par erreur l’email personnel ou professionnel d’un autre contexte.",
      en: "Concrete example: in a shared workshop, configure the repository-local identity to avoid accidentally using a personal or work email from another context."
    },
    validation: {
      fr: "Validation pratique : liste la configuration du dépôt, repère user.name et user.email, puis explique pourquoi ce réglage doit parfois rester local plutôt que global.",
      en: "Practical validation: list repository configuration, locate user.name and user.email, then explain why this setting sometimes must stay local rather than global."
    },
    pitfall: {
      fr: "Piège fréquent : croire qu’une configuration globale convient partout, alors qu’un dépôt d’école, de freelance et d’entreprise peut exiger des identités distinctes.",
      en: "Common pitfall: assume one global configuration fits everywhere even though school, freelance, and company repositories may require distinct identities."
    }
  },
  "git-01-first-commit": {
    context: {
      fr: "Le premier commit fixe le socle du projet. S’il est clair, un reviewer comprend immédiatement le périmètre initial et peut comparer les évolutions suivantes sans ambiguïté.",
      en: "The first commit sets the project's foundation. If it is clear, a reviewer immediately understands the initial scope and can compare later changes without ambiguity."
    },
    example: {
      fr: "Exemple concret : ajoute un README qui explique le but du dépôt, relis le diff préparé, puis crée un commit dont le message décrit précisément cette première preuve de travail.",
      en: "Concrete example: add a README explaining the repository's goal, review the staged diff, then create a commit whose message precisely describes that first proof of work."
    },
    validation: {
      fr: "Validation pratique : compare git status avant et après git add, relis git diff --staged, puis vérifie dans git log --oneline que le message raconte bien l’intention du changement.",
      en: "Practical validation: compare git status before and after git add, review git diff --staged, then verify in git log --oneline that the message truly tells the change intent."
    },
    pitfall: {
      fr: "Piège fréquent : tout ajouter avec git add . sans relire, puis créer un commit qui mélange README, fichiers temporaires et réglages accidentels.",
      en: "Common pitfall: add everything with git add . without reviewing, then create a commit that mixes README, temporary files, and accidental settings."
    }
  },
  "git-02-status-diff": {
    context: {
      fr: "Status et diff sont le tableau de bord du développeur prudent. Ils évitent d’envoyer en review une modification cassée, incomplète ou hors sujet.",
      en: "Status and diff are the careful developer's dashboard. They prevent sending a broken, incomplete, or off-topic change for review."
    },
    example: {
      fr: "Exemple concret : avant de committer une correction de menu mobile, inspecte les fichiers touchés et le détail des lignes modifiées pour vérifier que seul le bug visé est présent.",
      en: "Concrete example: before committing a mobile menu fix, inspect the touched files and changed lines to verify that only the intended bug is present."
    },
    validation: {
      fr: "Validation pratique : utilise git status --short pour nommer chaque état, puis git diff --stat pour estimer l’ampleur de la modification et décider si le commit reste focalisé.",
      en: "Practical validation: use git status --short to name each state, then git diff --stat to estimate change size and decide whether the commit stays focused."
    },
    pitfall: {
      fr: "Piège fréquent : relire uniquement l’aperçu visuel et oublier qu’un diff peut encore contenir du code mort, du debug ou un changement de fichier non voulu.",
      en: "Common pitfall: review only the visual preview and forget that a diff can still contain dead code, debugging leftovers, or an unintended file change."
    }
  },
  "git-02-branch": {
    context: {
      fr: "Une branche de fonctionnalité protège main et rend le sujet de travail explicite. Elle sert aussi de support naturel pour une review ou une démonstration intermédiaire.",
      en: "A feature branch protects main and makes the work topic explicit. It also provides a natural support for a review or an intermediate demo."
    },
    example: {
      fr: "Exemple concret : crée feature/navigation avant de toucher le header. Tu peux alors tester, committer et demander un avis sans mélanger ce chantier avec d’autres corrections urgentes.",
      en: "Concrete example: create feature/navigation before touching the header. You can then test, commit, and ask for feedback without mixing that effort with other urgent fixes."
    },
    validation: {
      fr: "Validation pratique : crée la branche, affiche son nom courant, puis explique quel ticket ou objectif produit elle représente et quand elle devra revenir sur main.",
      en: "Practical validation: create the branch, display its current name, then explain which product ticket or goal it represents and when it should come back to main."
    },
    pitfall: {
      fr: "Piège fréquent : rester sur main par habitude, accumuler plusieurs sujets non liés, puis rendre la relecture et le rollback beaucoup plus coûteux.",
      en: "Common pitfall: stay on main out of habit, accumulate several unrelated topics, then make review and rollback far more expensive."
    }
  },
  "git-02-merge": {
    context: {
      fr: "Fusionner proprement termine un cycle de travail. La qualité du merge montre si la branche est restée ciblée, testée et prête à rejoindre l’historique principal.",
      en: "Merging cleanly ends a work cycle. Merge quality shows whether the branch stayed focused, tested, and ready to join main history."
    },
    example: {
      fr: "Exemple concret : après validation de la navigation, reviens sur main, fusionne la branche puis supprime-la pour garder une liste locale lisible et éviter les faux retours arrière.",
      en: "Concrete example: after the navigation is validated, return to main, merge the branch, then delete it to keep the local list readable and avoid false backtracking."
    },
    validation: {
      fr: "Validation pratique : vérifie que main reçoit bien le commit attendu, relis le log récent, puis confirme que la suppression de branche n’efface aucun travail non fusionné.",
      en: "Practical validation: verify that main receives the expected commit, review the recent log, then confirm that branch deletion removes no unmerged work."
    },
    pitfall: {
      fr: "Piège fréquent : fusionner sans s’être replacé sur main ou supprimer une branche avec -D avant d’avoir prouvé que son contenu est déjà intégré.",
      en: "Common pitfall: merge without switching back to main or delete a branch with -D before proving its content is already integrated."
    }
  },
  "git-02-conflict-project": {
    context: {
      fr: "Les conflits apparaissent quand deux décisions modifient la même zone. Savoir les résoudre calmement est essentiel dans un produit vivant où plusieurs branches évoluent en parallèle.",
      en: "Conflicts appear when two decisions modify the same area. Knowing how to resolve them calmly is essential in a living product where several branches evolve in parallel."
    },
    example: {
      fr: "Exemple concret : deux développeurs changent le header, l’un pour le branding, l’autre pour l’accessibilité. Tu dois choisir ou combiner les lignes utiles sans perdre l’une des intentions métier.",
      en: "Concrete example: two developers change the header, one for branding and the other for accessibility. You must choose or combine the useful lines without losing either product intent."
    },
    validation: {
      fr: "Validation pratique : identifie les marqueurs de conflit, décris la version retenue, puis termine par un commit de merge capable d’expliquer la résolution à un reviewer absent.",
      en: "Practical validation: identify conflict markers, describe the kept version, then finish with a merge commit able to explain the resolution to an absent reviewer."
    },
    pitfall: {
      fr: "Piège fréquent : supprimer les marqueurs trop vite, faire disparaître une ligne importante, puis découvrir plus tard une régression visuelle ou fonctionnelle.",
      en: "Common pitfall: remove markers too quickly, erase an important line, then discover a visual or functional regression later."
    }
  },
  "git-03-clone-remote": {
    context: {
      fr: "Cloner est souvent la première étape d’onboarding. Comprendre ce que tu récupères t’aide à démarrer vite sans casser la configuration ou pousser vers le mauvais dépôt.",
      en: "Cloning is often the first onboarding step. Understanding what you retrieve helps you start quickly without breaking configuration or pushing to the wrong repository."
    },
    example: {
      fr: "Exemple concret : tu rejoins PulsaTeach sur un nouveau poste, tu clones le dépôt puis tu vérifies immédiatement que origin pointe bien vers le remote attendu par l’équipe.",
      en: "Concrete example: you join PulsaTeach on a new machine, clone the repository, then immediately verify that origin points to the remote expected by the team."
    },
    validation: {
      fr: "Validation pratique : compare l’URL affichée par git remote -v avec le projet attendu, puis explique si tu as seulement un remote de lecture ou un dépôt personnel forké.",
      en: "Practical validation: compare the URL shown by git remote -v with the expected project, then explain whether you only have a read remote or a personal fork."
    },
    pitfall: {
      fr: "Piège fréquent : cloner un fork obsolète ou un miroir de démonstration, puis s’étonner que les branches, issues ou pull requests de l’équipe ne correspondent pas.",
      en: "Common pitfall: clone an outdated fork or demo mirror, then wonder why team branches, issues, or pull requests do not match."
    }
  },
  "git-03-fetch-pull": {
    context: {
      fr: "Savoir distinguer fetch et pull protège ton travail local. Tu peux d’abord inspecter les nouveautés de l’équipe avant de décider comment les intégrer.",
      en: "Knowing the difference between fetch and pull protects your local work. You can inspect team updates first, then decide how to integrate them."
    },
    example: {
      fr: "Exemple concret : avant de reprendre une branche de fondation, télécharge origin/main, lis les commits nouveaux, puis utilise un pull fast-forward uniquement si l’historique reste simple.",
      en: "Concrete example: before resuming a foundation branch, download origin/main, read the new commits, then use a fast-forward pull only if history stays simple."
    },
    validation: {
      fr: "Validation pratique : montre la différence entre main et origin/main, explique ce qui sera intégré, puis vérifie après le pull que l’historique ne contient pas de merge inutile.",
      en: "Practical validation: show the difference between main and origin/main, explain what will be integrated, then verify after pull that history contains no unnecessary merge."
    },
    pitfall: {
      fr: "Piège fréquent : lancer pull par réflexe alors que le dépôt local contient déjà des changements non relus ou une branche qui mériterait d’être comparée avant fusion.",
      en: "Common pitfall: run pull by reflex even though the local repository already contains unreviewed changes or a branch that should be compared before integration."
    }
  },
  "git-03-push": {
    context: {
      fr: "Publier une branche rend ton travail visible, sauvegardé et relisible par l’équipe. C’est aussi le moment où la CI et les reviewers peuvent confirmer la qualité réelle du changement.",
      en: "Publishing a branch makes your work visible, backed up, and reviewable by the team. It is also when CI and reviewers can confirm the real quality of the change."
    },
    example: {
      fr: "Exemple concret : après avoir corrigé l’écran profil, pousse feature/profile avec son upstream pour que la prochaine commande git push reste simple et moins sujette aux erreurs.",
      en: "Concrete example: after fixing the profile screen, push feature/profile with its upstream so that the next git push stays simple and less error-prone."
    },
    validation: {
      fr: "Validation pratique : pousse la branche, vérifie le suivi avec git status -sb, puis confirme depuis l’historique local que le remote reflète bien la version destinée à la review.",
      en: "Practical validation: push the branch, verify tracking with git status -sb, then confirm from local history that the remote reflects the version intended for review."
    },
    pitfall: {
      fr: "Piège fréquent : pousser la mauvaise branche ou oublier l’upstream, puis croire que le code visible sur la forge correspond déjà au dernier état local.",
      en: "Common pitfall: push the wrong branch or forget the upstream, then assume the code visible on the forge already matches the latest local state."
    }
  },
  "git-03-pr-project": {
    context: {
      fr: "Une bonne pull request transforme un changement en discussion professionnelle. Elle doit être petite, vérifiable, reliée à un besoin et assez claire pour accélérer la review.",
      en: "A good pull request turns a change into a professional discussion. It should be small, verifiable, connected to a need, and clear enough to accelerate review."
    },
    example: {
      fr: "Exemple concret : sépare l’accessibilité du formulaire et le test associé en deux commits ciblés, puis publie la branche pour qu’un reviewer voie à la fois l’intention et la preuve.",
      en: "Concrete example: separate form accessibility and its test into two focused commits, then publish the branch so a reviewer sees both intent and evidence."
    },
    validation: {
      fr: "Validation pratique : relis l’historique de la branche, justifie l’ordre des commits, puis prépare dans la description de PR le contexte, la vérification et le risque résiduel.",
      en: "Practical validation: review branch history, justify commit order, then prepare PR description context, verification, and residual risk."
    },
    pitfall: {
      fr: "Piège fréquent : ouvrir une PR énorme ou sans contexte, ce qui augmente le temps de review et laisse passer des régressions pourtant évitables.",
      en: "Common pitfall: open a huge PR or one without context, which increases review time and lets avoidable regressions slip through."
    }
  },
  "git-04-issues": {
    context: {
      fr: "Relier issue, branche et commit renforce la traçabilité. Dans une équipe mature, on doit pouvoir remonter d’un bug corrigé jusqu’à la décision qui l’a fait naître.",
      en: "Connecting issue, branch, and commit strengthens traceability. In a mature team, you should be able to move from a fixed bug back to the decision that created it."
    },
    example: {
      fr: "Exemple concret : pour un bug mobile #42, utilise un nom de branche explicite et un message de commit qui conserve l’identifiant afin de relier besoin, preuve et livraison.",
      en: "Concrete example: for mobile bug #42, use an explicit branch name and a commit message that keeps the identifier so need, evidence, and delivery stay connected."
    },
    validation: {
      fr: "Validation pratique : montre le dernier commit, retrouve l’issue associée, puis explique comment un collègue pourrait comprendre le contexte sans te poser de question supplémentaire.",
      en: "Practical validation: show the last commit, find the linked issue, then explain how a teammate could understand the context without asking you another question."
    },
    pitfall: {
      fr: "Piège fréquent : écrire fix mobile menu sans numéro ni contexte, puis perdre la raison métier du changement quelques semaines plus tard.",
      en: "Common pitfall: write fix mobile menu without an issue number or context, then lose the product reason for the change a few weeks later."
    }
  },
  "git-04-actions": {
    context: {
      fr: "La CI transforme une bonne habitude locale en garde-fou d’équipe. Elle prouve qu’un dépôt n’est pas seulement beau à lire, mais aussi vérifié automatiquement avant intégration.",
      en: "CI turns a good local habit into a team guardrail. It proves that a repository is not only nice to read but also automatically checked before integration."
    },
    example: {
      fr: "Exemple concret : ajoute un workflow qui exécute validation ou tests sur chaque push afin qu’une PR cassée soit repérée avant d’atteindre la branche principale.",
      en: "Concrete example: add a workflow that runs validation or tests on every push so that a broken PR is detected before reaching main."
    },
    validation: {
      fr: "Validation pratique : crée le fichier YAML au bon emplacement, ajoute-le au commit, puis explique quel événement le déclenche et quelle commande garantit la qualité visée.",
      en: "Practical validation: create the YAML file in the right place, add it to the commit, then explain which event triggers it and which command guarantees the targeted quality."
    },
    pitfall: {
      fr: "Piège fréquent : versionner un workflow flou, trop lent ou jamais relu, qui finit contourné par l’équipe au lieu de renforcer la fiabilité du dépôt.",
      en: "Common pitfall: version a vague, slow, or never-reviewed workflow that the team eventually bypasses instead of using as a reliability check."
    }
  },
  "git-04-capstone": {
    context: {
      fr: "Ce projet final assemble les preuves attendues d’un dépôt professionnel : historique lisible, branchement propre, livraison nommée et contrôle automatisé. C’est le format qu’un recruteur ou un mentor peut réellement évaluer.",
      en: "This capstone assembles the expected evidence of a professional repository: readable history, clean branching, named delivery, and automated checks. It is a format a recruiter or mentor can actually assess."
    },
    example: {
      fr: "Exemple concret : prépare un portfolio versionné comme un vrai produit, avec README utile, commit de fondation, branche de fonctionnalité, tag de release et workflow CI reproductible.",
      en: "Concrete example: prepare a versioned portfolio like a real product, with a useful README, foundation commit, feature branch, release tag, and reproducible CI workflow."
    },
    validation: {
      fr: "Validation pratique : relis le graphe complet, vérifie la présence du tag et du workflow, puis demande-toi si un tiers peut comprendre ce qui a été livré, quand et comment cela a été contrôlé.",
      en: "Practical validation: review the full graph, verify the tag and workflow are present, then ask whether a third party can understand what was delivered, when, and how it was checked."
    },
    pitfall: {
      fr: "Piège fréquent : viser un dépôt seulement joli en surface, sans preuves de revue, d’automatisation ou de progression réelle dans l’historique.",
      en: "Common pitfall: aim for a repository that only looks good on the surface, without evidence of review, automation, or real progression in history."
    }
  }
};

export function gitScenarioFor(id) {
  return gitLessonScenarios[id] || {
    context: {
      fr: "Cette étape doit rester reliée à une intention de produit, pas à une simple suite de commandes mécaniques.",
      en: "This step must stay connected to a product intent, not just a mechanical command sequence."
    },
    example: {
      fr: "Cherche un exemple de dépôt réel où cette commande clarifie le travail plutôt que d’ajouter du bruit dans l’historique.",
      en: "Look for a real repository example where this command clarifies work instead of adding noise to history."
    },
    validation: {
      fr: "Vérifie le résultat avec status, diff ou log et reformule ce que Git vient réellement de changer.",
      en: "Verify the result with status, diff, or log and restate what Git actually changed."
    },
    pitfall: {
      fr: "Évite d’exécuter la commande sans comprendre l’état initial ni la preuve finale attendue.",
      en: "Avoid running the command without understanding the initial state or the expected final proof."
    }
  };
}
