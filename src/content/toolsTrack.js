import { module } from "./trackBuilders.js";

const introVscode = {
  fr: {
    introduction: "L'éditeur de code est ta maison. C'est là que tu vas passer 90% de ton temps. Aujourd'hui, deux choix dominent le marché : VS Code (le standard classique) et Cursor (un outil ultra-moderne basé sur VS Code mais dopé à l'IA).",
    sections: [
      {
        title: "1. Télécharger Cursor (Recommandé)",
        paragraphs: [
          "<img src='/assets/tool-vscode.svg' alt='VS Code Logo' />",
          "Va sur <a href='https://cursor.sh' target='_blank'>cursor.sh</a> et télécharge l'installateur.",
          "Cursor comprend le code et peut autocompléter des fichiers entiers. Il est parfait pour apprendre car tu peux lui poser des questions sur ton code directement dans l'éditeur."
        ],
        example: ""
      },
      {
        title: "2. Visual Studio Code (L'alternative classique)",
        paragraphs: [
          "Si tu préfères rester sur le standard classique sans IA intégrée nativement, va sur <a href='https://code.visualstudio.com/' target='_blank'>code.visualstudio.com</a>.",
          "Installe-le, puis ajoute l'extension 'Prettier' pour formater ton code."
        ],
        example: ""
      }
    ],
    vocabulary: [["Éditeur", "Le logiciel où tu tapes ton code."], ["IDE", "Environnement de développement intégré."], ["IA", "Intelligence Artificielle (comme Cursor)."]],
    check: ["J'ai installé Cursor ou VS Code", "J'ai ouvert l'éditeur"]
  },
  en: {
    introduction: "The code editor is your home. It is where you will spend 90% of your time. Today, two choices dominate: VS Code (the classic standard) and Cursor (a modern AI-powered fork of VS Code).",
    sections: [
      {
        title: "1. Download Cursor (Recommended)",
        paragraphs: [
          "<img src='/assets/tool-vscode.svg' alt='VS Code Logo' />",
          "Go to <a href='https://cursor.sh' target='_blank'>cursor.sh</a> and download the installer.",
          "Cursor understands code and can autocomplete entire files. It's perfect for learning."
        ],
        example: ""
      }
    ],
    vocabulary: [["Editor", "Software where you write code."], ["IDE", "Integrated Development Environment."], ["AI", "Artificial Intelligence."]],
    check: ["I installed Cursor or VS Code", "I opened the editor"]
  }
};

const introPhp = {
  fr: {
    introduction: "PHP est un moteur puissant pour le back-end. Plus de 70% du web l'utilise (dont WordPress). Pour faire tourner du code PHP sur ton ordinateur, il faut installer le moteur PHP.",
    sections: [
      {
        title: "Installation sous Windows (Laragon ou XAMPP)",
        paragraphs: [
          "<img src='/assets/tool-php.svg' alt='PHP Logo' />",
          "La façon la plus simple sous Windows est d'utiliser <strong>Laragon</strong>. Va sur <a href='https://laragon.org/download/' target='_blank'>laragon.org/download</a> et télécharge la version 'Full'.",
          "Une fois installé, lance Laragon et clique sur 'Start All'. Ton PC est maintenant un serveur web !"
        ],
        example: ""
      },
      {
        title: "Installation sous Mac",
        paragraphs: [
          "Ouvre ton terminal et utilise Homebrew : <code>brew install php</code>.",
          "Vérifie ensuite l'installation en tapant <code>php -v</code> dans ton terminal."
        ],
        example: ""
      }
    ],
    vocabulary: [["Serveur Local", "Ton ordinateur qui simule un vrai serveur web."], ["Terminal", "L'écran noir pour taper des commandes."], ["Back-end", "La logique cachée du site."]],
    check: ["J'ai installé PHP", "J'ai vérifié avec php -v"]
  },
  en: {
    introduction: "PHP is a powerful back-end engine. Over 70% of the web uses it. To run PHP code on your machine, you need to install the PHP engine.",
    sections: [
      {
        title: "Install on Windows",
        paragraphs: [
          "<img src='/assets/tool-php.svg' alt='PHP Logo' />",
          "The easiest way is <strong>Laragon</strong>. Go to <a href='https://laragon.org/download/' target='_blank'>laragon.org/download</a> and download the 'Full' version.",
          "Click 'Start All'. Your PC is now a web server!"
        ],
        example: ""
      }
    ],
    vocabulary: [["Local Server", "Your PC acting as a web server."], ["Terminal", "Command-line interface."], ["Back-end", "Server-side logic."]],
    check: ["I installed PHP", "I verified with php -v"]
  }
};

const introDb = {
  fr: {
    introduction: "PostgreSQL est le roi des bases de données relationnelles open-source. C'est là que seront sauvegardés tes utilisateurs, tes articles, et toutes tes données.",
    sections: [
      {
        title: "Installer PostgreSQL",
        paragraphs: [
          "<img src='/assets/tool-postgresql.svg' alt='PostgreSQL Logo' />",
          "Va sur <a href='https://www.postgresql.org/download/' target='_blank'>postgresql.org/download</a> et choisis ton système.",
          "Lors de l'installation, choisis un mot de passe pour l'utilisateur <code>postgres</code> (ne l'oublie pas !).",
          "L'installateur inclut souvent <strong>pgAdmin</strong>, une interface visuelle pour voir tes bases de données.",
          "Après l'installation, ouvre pgAdmin ou le terminal et vérifie que le serveur démarre correctement. Note le port utilisé, souvent <code>5432</code>, car tes futures applications en auront besoin pour se connecter."
        ],
        example: ""
      }
    ],
    vocabulary: [["Base de données", "Où sont stockées les informations de manière permanente."], ["pgAdmin", "Logiciel pour gérer ta base avec des clics plutôt que du code."], ["SGBD", "Système de Gestion de Base de Données."]],
    check: ["J'ai installé PostgreSQL", "J'ai retenu mon mot de passe"]
  },
  en: {
    introduction: "PostgreSQL is the king of open-source relational databases. It stores your users, articles, and all data permanently.",
    sections: [
      {
        title: "Install PostgreSQL",
        paragraphs: [
          "<img src='/assets/tool-postgresql.svg' alt='PostgreSQL Logo' />",
          "Go to <a href='https://www.postgresql.org/download/' target='_blank'>postgresql.org/download</a> and choose your OS.",
          "Remember the password you set for the <code>postgres</code> user.",
          "After installation, open pgAdmin or a terminal and verify that the server starts correctly. Keep the port number, usually <code>5432</code>, because future apps will need it to connect."
        ],
        example: ""
      }
    ],
    vocabulary: [["Database", "Where information is permanently stored."], ["pgAdmin", "Visual interface for database management."], ["RDBMS", "Relational Database Management System."]],
    check: ["I installed PostgreSQL", "I saved my password"]
  }
};

function manualLesson(id, title, brief, courseData) {
  return {
    id,
    type: "html",
    title: { fr: title[0], en: title[1] },
    brief: { fr: brief[0], en: brief[1] },
    course: courseData,
    pedagogy: {
      fr: {
        why: courseData.fr.introduction,
        objectives: ["Installer l'outil", "Comprendre son rôle dans l'écosystème", "Vérifier l'installation"],
        prerequisites: ["Une connexion internet", "Droits administrateur sur ton PC"],
        vocabulary: courseData.fr.vocabulary,
        comparison: {
          good: { title: "PC prêt à coder", code: "/* Succès */", explanation: "L'outil est installé et configuré." },
          bad: { title: "Bricolage", code: "/* Erreur */", explanation: "Sauter ces étapes crée des bugs illisibles plus tard." }
        },
        guided: ["Lis le cours ci-dessus.", "Clique sur le lien de téléchargement.", "Suis l'installateur.", "Valide la leçon ici."],
        autonomous: "Es-tu sûr d'avoir bien installé l'outil ?",
        hints: ["Ouvre le lien", "Suis l'installateur", "Modifie le fichier de l'exercice pour valider"],
        correction: ["Outil validé !"],
        summary: brief[0],
        next: "Passe au prochain outil."
      },
      en: {
        why: courseData.en.introduction,
        objectives: ["Install the tool", "Understand its role", "Verify installation"],
        prerequisites: ["Internet connection", "Admin rights"],
        vocabulary: courseData.en.vocabulary,
        comparison: {
          good: { title: "Ready PC", code: "/* Success */", explanation: "Tool installed." },
          bad: { title: "Skipping steps", code: "/* Error */", explanation: "Creates weird bugs later." }
        },
        guided: ["Read course.", "Download.", "Install.", "Validate here."],
        autonomous: "Did you really install it?",
        hints: ["Click link", "Install", "Edit file to pass"],
        correction: ["Tool validated!"],
        summary: brief[1],
        next: "Next tool."
      }
    },
    theory: { fr: brief[0], en: brief[1] },
    guide: {
      fr: {
        objectives: ["Installer l'outil sans étape cachée", "Identifier à quoi il sert dans un projet web", "Conserver une preuve simple de validation"],
        steps: ["Lis le cours et ouvre le lien officiel.", "Installe l'outil avec les options recommandées.", "Vérifie l'installation puis écris OK dans l'exercice."],
        mistakes: ["Fermer l'installateur avant la fin", "Ignorer les mots de passe, ports ou chemins affichés", "Valider la leçon sans avoir lancé l'outil au moins une fois"]
      },
      en: {
        objectives: ["Install the tool without hidden steps", "Identify its role in a web project", "Keep a simple validation proof"],
        steps: ["Read the course and open the official link.", "Install the tool with the recommended options.", "Verify the installation, then write OK in the exercise."],
        mistakes: ["Closing the installer before it finishes", "Ignoring displayed passwords, ports, or paths", "Validating the lesson without launching the tool at least once"]
      }
    },
    skills: ["tools", "setup"],
    difficulty: "easy",
    durationMin: 15,
    starterCode: `<!-- Confirme ton installation en écrivant 'OK' ci-dessous -->\n<div id="status"></div>`,
    solution: `<div id="status">OK</div>`,
    tests: [{ type: "contains", label: "Confirmer avec OK", value: "OK" }],
    hint: { fr: "Écris simplement OK à l'intérieur du div.", en: "Just write OK inside the div." },
    xp: 50
  };
}

const toolsModule = module(
  "tools-setup",
  "Environnement de développement",
  "Development environment",
  [
    manualLesson("tools-01-vscode", ["Éditeur : VS Code & Cursor", "Editor: VS Code & Cursor"], ["L'outil principal du développeur.", "The developer's main tool."], introVscode),
    manualLesson("tools-02-php", ["Moteur : PHP", "Engine: PHP"], ["Le langage serveur le plus utilisé.", "The most used server language."], introPhp),
    manualLesson("tools-03-postgresql", ["Base de données : PostgreSQL", "Database: PostgreSQL"], ["Le stockage de données de référence.", "The reference data storage."], introDb)
  ]
);

Object.assign(toolsModule, {
  importance: { fr: "Un environnement fiable évite de confondre bug de code et problème d'installation.", en: "A reliable environment prevents confusing code bugs with setup problems." },
  prerequisites: { fr: "Avoir accès à son ordinateur, à Internet et aux droits d'installation.", en: "Have access to your computer, the internet, and installation permissions." },
  outcomes: { fr: "Installer un éditeur, un moteur serveur et une base relationnelle prêts pour les prochains cours.", en: "Install an editor, a server engine, and a relational database ready for the next courses." },
  mastery: { fr: "Tu sais expliquer quel outil sert à écrire, exécuter et stocker le code.", en: "You can explain which tool is used to write, run, and store code." }
});

export const toolsTrack = {
  id: "tools",
  label: "Outils",
  color: "slate",
  title: { fr: "Poste de travail", en: "Workstation Setup" },
  summary: { fr: "Installe VS Code, Cursor, PHP, PostgreSQL et prépare ton PC pour coder.", en: "Install VS Code, Cursor, PHP, PostgreSQL and prep your PC." },
  level: { fr: "Débutant", en: "Beginner" },
  prerequisites: { fr: ["Savoir allumer son ordinateur"], en: ["Know how to turn on a computer"] },
  outcomes: { fr: ["Installer un éditeur moderne", "Installer PHP", "Installer PostgreSQL"], en: ["Install a modern editor", "Install PHP", "Install PostgreSQL"] },
  capstone: { fr: "PC prêt à coder", en: "Dev PC ready" },
  profession: { fr: "Chaque développeur doit maîtriser son environnement. Un bon setup évite des heures de bugs.", en: "Every developer must master their environment. A good setup saves hours of bugs." },
  certification: { fr: ["Toutes les étapes installées"], en: ["All steps installed"] },
  modules: [toolsModule]
};
