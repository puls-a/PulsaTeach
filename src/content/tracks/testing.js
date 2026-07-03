import { createProfessionalTrack } from "../builders/createProfessionalTrack.js";
import { testingModules } from "./testingModules.js";

const v = {
  test: ["test", "test", "Vérification automatisée d’un comportement attendu.", "An automated check of expected behavior."],
  assertion: ["assertion", "assertion", "Comparaison entre un résultat observé et le résultat attendu.", "A comparison between an observed and expected result."],
  fixture: ["fixture", "fixture", "Données contrôlées préparées pour rendre un test reproductible.", "Controlled data prepared to make a test reproducible."],
  mock: ["mock", "mock", "Remplacement contrôlé d’une dépendance pendant un test.", "A controlled replacement for a dependency during a test."],
  integration: ["intégration", "integration", "Test de la collaboration entre plusieurs unités réelles.", "A test of collaboration between multiple real units."],
  e2e: ["test de bout en bout", "end-to-end test", "Test d’un parcours utilisateur dans l’application assemblée.", "A user-journey test in the assembled application."],
  flake: ["test instable", "flaky test", "Test dont le résultat varie sans changement fonctionnel pertinent.", "A test whose result changes without a relevant functional change."],
  coverage: ["couverture", "coverage", "Mesure des parties du code exécutées par la suite de tests.", "A measure of code exercised by the test suite."],
  ci: ["intégration continue", "continuous integration", "Validation automatisée exécutée à chaque changement partagé.", "Automated validation run for every shared change."]
};

export const testingTrack = createProfessionalTrack({
  id: "testing",
  label: "TEST",
  title: ["Testing frontend", "Frontend testing"],
  summary: ["Conçois une stratégie de tests fiable avec Vitest, React Testing Library, Playwright, axe et CI.", "Design a reliable testing strategy with Vitest, React Testing Library, Playwright, axe, and CI."],
  profession: ["Un bon test protège un comportement utile sans figer l’implémentation. Ce parcours apprend à choisir le bon niveau, contrôler les dépendances, réduire l’instabilité et produire des preuves exploitables en équipe.", "A good test protects useful behavior without freezing implementation. This track teaches how to choose the right level, control dependencies, reduce flakiness, and produce team-ready evidence."],
  prerequisites: [["Maîtriser JavaScript moderne", "Know modern JavaScript"], ["Comprendre les composants React", "Understand React components"], ["Savoir utiliser Git et le terminal", "Know Git and the terminal"]],
  outcomes: [["Écrire des tests unitaires utiles", "Write useful unit tests"], ["Tester composants et intégrations", "Test components and integrations"], ["Automatiser des parcours avec Playwright", "Automate journeys with Playwright"], ["Construire une CI rapide et fiable", "Build fast, reliable CI"]],
  capstone: ["Sécuriser une application existante avec une stratégie de tests priorisée, des parcours critiques et une CI documentée.", "Secure an existing application with a prioritized test strategy, critical journeys, and documented CI."],
  certification: [["Valider chaque quiz", "Pass every quiz"], ["Livrer les projets unitaires, composants et E2E", "Ship unit, component, and E2E projects"], ["Réussir l’examen final", "Pass the final exam"], ["Faire approuver le plan de sécurisation", "Get the test-hardening plan approved"]],
  modules: [
    {
      id: "testing-strategy",
      title: ["Stratégie et tests unitaires", "Strategy and unit tests"],
      description: ["Choisir le niveau de test et écrire des unités lisibles, déterministes et centrées sur le comportement.", "Choose the right test level and write readable, deterministic, behavior-focused units."],
      vocabulary: [v.test, v.assertion, v.coverage],
      lessons: [
        lesson("testing-01-pyramid", ["Pyramide et portefeuille de tests", "Test pyramid and portfolio"], ["Classe les risques d’une application entre tests unitaires, intégration et E2E.", "Classify application risks across unit, integration, and E2E tests."], ["unitaire", "intégration", "E2E"], ["test-strategy"], [v.test, v.integration, v.e2e]),
        lesson("testing-01-vitest", ["Écrire un test Vitest", "Write a Vitest test"], ["Teste une fonction de calcul avec arrange, act et assert.", "Test a calculation function with arrange, act, and assert."], ["describe(", "it(", "expect(", "toBe("], ["unit-testing", "vitest"], [v.test, v.assertion], "describe('total', () => {\n  it('additionne les lignes', () => {\n    const result = total([{ price: 20 }, { price: 5 }]);\n    expect(result).toBe(25);\n  });\n});"),
        lesson("testing-01-cases", ["Cas limites et tables de données", "Edge cases and data tables"], ["Couvre cas nominal, valeur vide, limite et entrée invalide sans dupliquer le test.", "Cover happy path, empty value, boundary, and invalid input without duplicating the test."], ["it.each", "attendu", "limite"], ["boundary-testing"], [v.fixture, v.assertion], "it.each([[[], 0], [[10], 10], [[-1], 0]])('calcule %j', (input, attendu) => {\n  expect(total(input)).toBe(attendu);\n});"),
        project("testing-01-unit-project", ["Mini-projet : sécuriser un moteur de score", "Mini-project: secure a scoring engine"], ["Écris une suite couvrant calcul, seuil, arrondi et erreurs d’entrée.", "Write a suite covering calculation, threshold, rounding, and invalid inputs."], ["describe(", "it.each", "expect(", "seuil", "entrée invalide"], ["unit-testing", "test-design"], [v.test, v.assertion, v.coverage]),
        quiz("testing-01-review", ["Quiz : stratégie unitaire", "Quiz: unit strategy"], [
          q("u1", ["Quel test doit rester majoritaire ?", "Which test should remain the majority?"], [["Unitaire rapide et ciblé", "Fast focused unit"], ["E2E de chaque détail", "E2E for every detail"], ["Capture d’écran manuelle", "Manual screenshot"]], "Unitaire rapide et ciblé", ["Les unités donnent un retour rapide sur les règles isolables.", "Units provide fast feedback on isolatable rules."], ["test-strategy"]),
          q("u2", ["Que protège une assertion utile ?", "What does a useful assertion protect?"], [["Un comportement observable", "Observable behavior"], ["Le nom d’une variable privée", "A private variable name"], ["L’ordre exact des fonctions internes", "Exact internal function order"]], "Un comportement observable", ["Le test doit tolérer les refactorings qui conservent le contrat.", "The test should tolerate refactors that preserve the contract."], ["unit-testing"]),
          q("u3", ["La couverture à 100 % garantit-elle la qualité ?", "Does 100% coverage guarantee quality?"], [["Non, elle ne mesure pas la pertinence des assertions", "No, it does not measure assertion relevance"], ["Oui, sans exception", "Yes, without exception"], ["Seulement avec React", "Only with React"]], "Non, elle ne mesure pas la pertinence des assertions", ["La couverture signale des zones non exécutées, pas la valeur des scénarios.", "Coverage flags unexecuted areas, not scenario value."], ["coverage"])
        ])
      ]
    },
    {
      id: "testing-components",
      title: ["Composants et intégration", "Components and integration"],
      description: ["Tester l’interface comme l’utilisateur, contrôler les frontières et vérifier les états asynchrones.", "Test the interface like a user, control boundaries, and verify asynchronous states."],
      vocabulary: [v.integration, v.mock, v.fixture],
      lessons: [
        lesson("testing-02-rtl", ["Interroger l’interface par rôle", "Query the UI by role"], ["Privilégie getByRole avec un nom accessible pour trouver les contrôles.", "Prefer getByRole with an accessible name to find controls."], ["getByRole", "name:", "button"], ["component-testing", "accessibility-testing"], [v.integration, v.assertion], "const save = screen.getByRole('button', { name: /enregistrer/i });\nexpect(save).toBeEnabled();"),
        lesson("testing-02-user", ["Simuler une interaction réelle", "Simulate a real interaction"], ["Utilise userEvent pour saisir, tabuler et soumettre un formulaire.", "Use userEvent to type, tab, and submit a form."], ["userEvent.setup", "user.type", "user.click"], ["component-testing"], [v.integration, v.fixture], "const user = userEvent.setup();\nawait user.type(screen.getByLabelText(/email/i), 'dev@example.com');\nawait user.click(screen.getByRole('button', { name: /envoyer/i }));"),
        lesson("testing-02-async", ["Tester chargement, succès et erreur", "Test loading, success, and error"], ["Vérifie les trois états d’une requête sans délai arbitraire.", "Verify all three request states without arbitrary delays."], ["findByRole", "status", "alert"], ["async-testing"], [v.integration, v.mock], "expect(screen.getByRole('status')).toHaveTextContent(/chargement/i);\nexpect(await screen.findByText(/profil chargé/i)).toBeVisible();"),
        project("testing-02-component-project", ["Mini-projet : formulaire de profil", "Mini-project: profile form"], ["Teste validation, soumission, erreur serveur, focus et message de confirmation.", "Test validation, submission, server error, focus, and confirmation message."], ["getByLabelText", "userEvent", "findByRole", "alert", "status"], ["component-testing", "accessible-forms", "async-testing"], [v.integration, v.mock, v.fixture]),
        quiz("testing-02-review", ["Quiz : composants", "Quiz: components"], [
          q("c1", ["Quel sélecteur résiste le mieux au refactoring visuel ?", "Which selector best survives visual refactoring?"], [["Le rôle et le nom accessible", "Role and accessible name"], ["La classe CSS générée", "Generated CSS class"], ["Le cinquième div", "The fifth div"]], "Le rôle et le nom accessible", ["Il correspond à la façon dont les personnes et technologies d’assistance trouvent le contrôle.", "It matches how people and assistive technologies find the control."], ["component-testing"]),
          q("c2", ["Quand faut-il mocker ?", "When should you mock?"], [["À une frontière lente ou non déterministe", "At a slow or nondeterministic boundary"], ["Chaque fonction du composant", "Every component function"], ["Le JSX rendu", "Rendered JSX"]], "À une frontière lente ou non déterministe", ["Conserve autant que possible les collaborations réelles utiles au test.", "Keep useful real collaborations whenever possible."], ["mocking"]),
          q("c3", ["Pourquoi éviter waitForTimeout ?", "Why avoid waitForTimeout?"], [["Il rend le test lent et dépendant du temps", "It makes the test slow and time-dependent"], ["Il désactive React", "It disables React"], ["Il supprime les assertions", "It removes assertions"]], "Il rend le test lent et dépendant du temps", ["Attends un état observable plutôt qu’une durée arbitraire.", "Wait for an observable state instead of an arbitrary duration."], ["async-testing"])
        ])
      ]
    },
    {
      id: "testing-e2e",
      title: ["Playwright et accessibilité", "Playwright and accessibility"],
      description: ["Automatiser les parcours critiques avec des données isolées, des attentes robustes et des audits axe complétés par des tests humains.", "Automate critical journeys with isolated data, robust expectations, and axe audits completed by human checks."],
      vocabulary: [v.e2e, v.flake, v.fixture],
      lessons: [
        lesson("testing-03-playwright", ["Construire un parcours Playwright", "Build a Playwright journey"], ["Automatise inscription, action principale et confirmation avec des locators accessibles.", "Automate signup, the primary action, and confirmation using accessible locators."], ["page.goto", "getByRole", "expect(", "toBeVisible"], ["e2e-testing"], [v.e2e, v.assertion]),
        lesson("testing-03-isolation", ["Isoler données et sessions", "Isolate data and sessions"], ["Crée une identité unique et nettoie seulement les données du test.", "Create a unique identity and clean up only test-owned data."], ["testInfo", "storageState", "unique"], ["test-isolation"], [v.fixture, v.e2e]),
        lesson("testing-03-axe", ["Combiner axe et vérifications fonctionnelles", "Combine axe and functional checks"], ["Ajoute axe puis vérifie clavier, focus, annonces et zoom.", "Add axe, then verify keyboard, focus, announcements, and zoom."], ["AxeBuilder", "keyboard", "focus", "zoom"], ["accessibility-testing"], [v.e2e, ["axe", "axe", "Moteur automatisé détectant certaines violations d’accessibilité.", "An automated engine detecting some accessibility violations."]]),
        project("testing-03-e2e-project", ["Mini-projet : parcours d’achat fiable", "Mini-project: reliable purchase journey"], ["Automatise le parcours critique avec fixtures, attente réseau et contrôle mobile.", "Automate the critical journey with fixtures, network waiting, and mobile coverage."], ["test(", "getByRole", "waitForResponse", "storageState", "mobile"], ["e2e-testing", "test-isolation", "responsive-testing"], [v.e2e, v.fixture, v.flake]),
        quiz("testing-03-review", ["Quiz : E2E et accessibilité", "Quiz: E2E and accessibility"], [
          q("e1", ["Que faut-il automatiser en E2E en priorité ?", "What should be automated in E2E first?"], [["Les parcours métier critiques", "Critical business journeys"], ["Chaque fonction utilitaire", "Every utility function"], ["Toutes les couleurs", "All colors"]], "Les parcours métier critiques", ["L’E2E est coûteux : réserve-le aux risques traversant le système.", "E2E is costly: reserve it for risks spanning the system."], ["e2e-testing"]),
          q("e2", ["Un audit axe vert suffit-il ?", "Is a green axe audit enough?"], [["Non, il faut des tests fonctionnels humains", "No, functional human tests are required"], ["Oui, toujours", "Yes, always"], ["Seulement sur desktop", "Only on desktop"]], "Non, il faut des tests fonctionnels humains", ["Le sens, le clavier et la qualité des annonces demandent une vérification humaine.", "Meaning, keyboard use, and announcement quality require human verification."], ["accessibility-testing"]),
          q("e3", ["Comment réduire un test instable ?", "How do you reduce a flaky test?"], [["Attendre un état observable et isoler les données", "Wait for observable state and isolate data"], ["Ajouter cinq secondes partout", "Add five seconds everywhere"], ["Relancer jusqu’au vert", "Retry until green"]], "Attendre un état observable et isoler les données", ["Il faut supprimer la cause temporelle ou partagée, pas la masquer.", "Remove the timing or shared-state cause instead of hiding it."], ["test-reliability"])
        ])
      ]
    },
    {
      id: "testing-ci",
      title: ["CI et sécurisation", "CI and hardening"],
      description: ["Organiser les validations, diagnostiquer les échecs et livrer une stratégie mesurable.", "Organize validation, diagnose failures, and deliver a measurable strategy."],
      vocabulary: [v.ci, v.coverage, v.flake],
      lessons: [
        lesson("testing-04-pipeline", ["Concevoir une pipeline rapide", "Design a fast pipeline"], ["Sépare lint, unités, build et E2E tout en conservant une installation déterministe.", "Separate lint, unit tests, build, and E2E while keeping deterministic installation."], ["npm ci", "lint", "test", "build", "e2e"], ["continuous-integration"], [v.ci, v.coverage]),
        lesson("testing-04-debug", ["Diagnostiquer un échec CI", "Diagnose a CI failure"], ["Conserve logs, trace, capture et version d’environnement pour reproduire l’échec.", "Keep logs, trace, screenshot, and environment version to reproduce the failure."], ["logs", "trace", "screenshot", "version"], ["ci-debugging"], [v.ci, v.flake]),
        project("testing-04-capstone", ["Projet final : sécuriser une application", "Final project: harden an application"], ["Cartographie les risques, ajoute les tests prioritaires et livre une CI avec preuves et budget de durée.", "Map risks, add priority tests, and ship CI with evidence and a duration budget."], ["matrice de risques", "unitaires", "intégration", "E2E", "accessibilité", "CI", "budget"], ["test-strategy", "continuous-integration", "quality-engineering"], [v.test, v.ci, v.coverage], true),
        quiz("testing-04-review", ["Quiz : qualité continue", "Quiz: continuous quality"], [
          q("i1", ["Pourquoi utiliser npm ci en CI ?", "Why use npm ci in CI?"], [["Installer exactement le lockfile", "Install exactly from the lockfile"], ["Mettre à jour toutes les dépendances", "Update every dependency"], ["Ignorer le lockfile", "Ignore the lockfile"]], "Installer exactement le lockfile", ["Une installation déterministe réduit les différences entre exécutions.", "A deterministic installation reduces differences between runs."], ["continuous-integration"]),
          q("i2", ["Quelle preuve aide le plus un échec navigateur ?", "Which artifact helps most with a browser failure?"], [["Une trace avec actions et réseau", "A trace with actions and network"], ["Un message “ça casse”", "A 'it breaks' message"], ["La couleur du terminal", "Terminal color"]], "Une trace avec actions et réseau", ["La trace permet de revoir l’état, les actions et les requêtes.", "A trace lets you review state, actions, and requests."], ["ci-debugging"]),
          q("i3", ["Quel indicateur suit la fiabilité ?", "Which metric tracks reliability?"], [["Taux de tests instables", "Flaky-test rate"], ["Nombre de fichiers CSS", "Number of CSS files"], ["Taille du logo", "Logo size"]], "Taux de tests instables", ["La fréquence des résultats non déterministes révèle la confiance réelle dans la suite.", "Nondeterministic result frequency reveals actual suite trustworthiness."], ["test-reliability"])
        ]),
        quiz("testing-final-exam", ["Examen Testing frontend", "Frontend testing exam"], [
          q("x1", ["Où tester une pure règle de score ?", "Where should a pure scoring rule be tested?"], [["Test unitaire", "Unit test"], ["E2E uniquement", "E2E only"], ["Audit visuel", "Visual audit"]], "Test unitaire", ["Une règle pure est rapide et précise à valider isolément.", "A pure rule is fast and precise to validate in isolation."], ["unit-testing"]),
          q("x2", ["Que doit privilégier un test de composant ?", "What should a component test prioritize?"], [["Le comportement perçu par l’utilisateur", "User-perceived behavior"], ["Les hooks privés", "Private hooks"], ["Le nombre exact de div", "Exact div count"]], "Le comportement perçu par l’utilisateur", ["Les détails internes peuvent changer sans modifier le contrat.", "Internal details may change without changing the contract."], ["component-testing"]),
          q("x3", ["Quand choisir un E2E ?", "When should you choose E2E?"], [["Quand le risque traverse plusieurs couches", "When risk spans several layers"], ["Pour chaque branche if", "For every if branch"], ["Pour remplacer tous les tests unitaires", "To replace all unit tests"]], "Quand le risque traverse plusieurs couches", ["Le parcours complet valide l’assemblage réel.", "The complete journey validates the real assembly."], ["e2e-testing"]),
          q("x4", ["Comment traiter un flake ?", "How should you handle a flake?"], [["Identifier et supprimer sa cause", "Identify and remove its cause"], ["Le masquer avec des retries infinis", "Hide it with infinite retries"], ["L’ignorer définitivement", "Ignore it forever"]], "Identifier et supprimer sa cause", ["Un retry peut collecter une preuve, mais ne remplace pas la correction.", "A retry may gather evidence but does not replace a fix."], ["test-reliability"]),
          q("x5", ["Que doit relier une stratégie de tests ?", "What should a test strategy connect?"], [["Risques, niveaux de test et preuves", "Risks, test levels, and evidence"], ["Couleurs et noms de fichiers", "Colors and file names"], ["Uniquement un pourcentage de couverture", "Only a coverage percentage"]], "Risques, niveaux de test et preuves", ["La stratégie justifie où investir et comment décider qu’un risque est couvert.", "Strategy explains where to invest and how to decide a risk is covered."], ["test-strategy"])
        ], "exam", 80)
      ]
    },
    ...testingModules
  ]
});

function lesson(id, title, brief, requirements, skills, vocabulary, solution) {
  return {
    id,
    type: "text",
    title,
    brief,
    solution: solution || requirements.map((item) => `- ${item}`).join("\n"),
    requirements,
    skills,
    vocabulary
  };
}

function project(id, title, brief, requirements, skills, vocabulary, finalProject = false) {
  return {
    ...lesson(id, title, brief, requirements, skills, vocabulary),
    project: true,
    exerciseType: "text",
    durationMin: finalProject ? 180 : 110,
    xp: finalProject ? 140 : 90
  };
}

function quiz(id, title, questions, purpose = "module-review", passingScore = 70) {
  return { id, type: "quiz", title, questions, purpose, passingScore, brief: ["Justifie le niveau de test et la preuve attendue.", "Justify the test level and expected evidence."] };
}

function q(id, prompt, options, answer, explanation, skills) {
  return {
    id,
    type: "single",
    prompt,
    choices: options.map((option) => ({ id: option[0], label: option })),
    answer,
    explanation,
    points: 1,
    skills,
    glossaryTerms: []
  };
}
