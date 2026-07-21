const threadId = "pulsaconf-ticket-quote";

const practices = [
  {
    id: "js-functions-scope-declare-function",
    title: ["1. Un contrat nommé", "1. A named contract"],
    brief: ["Écris getCurrencyLabel(code) : EUR devient €, les autres codes restent inchangés.", "Write getCurrencyLabel(code): EUR becomes €, while other codes stay unchanged."],
    why: ["PulsaConf reçoit des codes de devise depuis plusieurs sources. Une fonction isole la règle d’affichage et lui donne un nom testable.", "PulsaConf receives currency codes from several sources. A function isolates the display rule and gives it a testable name."],
    concept: ["Une fonction est un contrat : elle reçoit une entrée, exécute une règle et retourne une sortie. Son nom doit annoncer cette transformation.", "A function is a contract: it receives input, applies a rule, and returns output. Its name should announce that transformation."],
    workedCode: "function getTrackLabel(code) {\n  return code === 'JS' ? 'JavaScript' : code;\n}",
    workedExplanation: ["L’exemple utilise un autre domaine : observe la forme du contrat sans recopier la réponse.", "The example uses another domain: observe the contract shape without copying the answer."],
    badCode: "const label = currency === 'EUR' ? '€' : currency;",
    badExplanation: ["Cette règle globale est difficile à réutiliser et impossible à tester avec plusieurs entrées sans réécrire le scénario.", "This global rule is hard to reuse and impossible to test with several inputs without rewriting the scenario."],
    guided: [["Repère l’entrée code.", "Traite explicitement EUR.", "Retourne l’entrée pour les autres devises."], ["Identify the code input.", "Handle EUR explicitly.", "Return the input for other currencies."]],
    autonomous: ["Ajoute mentalement le cas GBP : ton contrat doit déjà le gérer sans nouvelle branche.", "Mentally add GBP: your contract should already handle it without a new branch."],
    hints: [["Commence par comparer code à 'EUR'.", "Le second return doit conserver code."], ["Start by comparing code with 'EUR'.", "The second return should preserve code."]],
    correction: [["La fonction nomme la règle.", "Le cas spécial retourne €.", "Le retour final couvre toutes les autres entrées."], ["The function names the rule.", "The special case returns €.", "The final return covers every other input."]],
    starter: "function getCurrencyLabel(code) {\n  return code;\n}",
    solution: "function getCurrencyLabel(code) {\n  if (code === 'EUR') return '€';\n  return code;\n}",
    tests: [
      behavior("EUR produit le symbole euro", "EUR produces the euro symbol", "return getCurrencyLabel('EUR') === '€';"),
      behavior("USD reste USD", "USD stays USD", "return getCurrencyLabel('USD') === 'USD';"),
      behavior("GBP reste GBP sans branche supplémentaire", "GBP stays GBP without another branch", "return getCurrencyLabel('GBP') === 'GBP';")
    ],
    skills: ["function-contract", "return-value"], difficulty: "easy", duration: 18, xp: 30
  },
  {
    id: "js-functions-scope-parameter-message",
    title: ["2. Un paramètre qui change le résultat", "2. A parameter that changes the result"],
    brief: ["Complète formatAttendee(name) pour produire Participant : suivi du nom reçu.", "Complete formatAttendee(name) to produce Participant: followed by the received name."],
    why: ["Un message codé en dur semble fonctionner avec Maya, puis échoue dès qu’un autre participant arrive.", "A hardcoded message appears to work for Maya, then fails as soon as another attendee arrives."],
    concept: ["Le paramètre est le nom local de l’entrée. Deux appels différents doivent produire deux résultats différents.", "A parameter is the local name of the input. Two different calls should produce two different outputs."],
    workedCode: "function formatRoom(room) {\n  return 'Salle : ' + room;\n}",
    workedExplanation: ["Le paramètre room circule jusqu’au résultat. Applique le même raisonnement au participant.", "The room parameter flows into the output. Apply the same reasoning to the attendee."],
    badCode: "function formatAttendee(name) {\n  return 'Participant : Maya';\n}",
    badExplanation: ["Le paramètre existe mais n’influence pas la sortie : le contrat ment.", "The parameter exists but does not influence the output: the contract lies."],
    guided: [["Lis le paramètre name.", "Assemble le préfixe et name.", "Teste au moins deux noms."], ["Read the name parameter.", "Join the prefix and name.", "Test at least two names."]],
    autonomous: ["Vérifie avec un prénom contenant un espace ou un accent : aucune liste de noms ne doit être nécessaire.", "Check a name containing a space or accent: no name list should be needed."],
    hints: [["Utilise name dans l’expression retournée.", "La concaténation avec + suffit ici."], ["Use name in the returned expression.", "String concatenation with + is enough here."]],
    correction: [["Le paramètre représente chaque appelant.", "La sortie est construite à partir de cette entrée.", "Plusieurs scénarios détectent le hardcoding."], ["The parameter represents each caller.", "The output is built from that input.", "Several scenarios detect hardcoding."]],
    starter: "function formatAttendee(name) {\n  return 'Participant : Maya';\n}",
    solution: "function formatAttendee(name) {\n  return 'Participant : ' + name;\n}",
    tests: [
      behavior("Maya est formatée", "Maya is formatted", "return formatAttendee('Maya') === 'Participant : Maya';"),
      behavior("Noa change réellement le résultat", "Noa actually changes the result", "return formatAttendee('Noa') === 'Participant : Noa';"),
      behavior("Le nom reçu n’est pas remplacé", "The received name is not replaced", "return formatAttendee('Ana Cruz') === 'Participant : Ana Cruz';")
    ],
    skills: ["parameters-arguments", "return-value"], difficulty: "easy", duration: 20, xp: 32
  },
  {
    id: "js-functions-scope-default-goal",
    title: ["3. Un prix par défaut, pas un prix forcé", "3. A default price, not a forced price"],
    brief: ["Complète ticketSubtotal(quantity, unitPrice = 20) sans ignorer un prix personnalisé.", "Complete ticketSubtotal(quantity, unitPrice = 20) without ignoring a custom price."],
    why: ["Le tarif standard vaut 20 €, mais certains ateliers ont un tarif différent. La valeur par défaut ne doit s’appliquer qu’en l’absence d’argument.", "The standard price is €20, but some workshops have a different price. The default should apply only when an argument is missing."],
    concept: ["Un paramètre par défaut s’active quand l’argument est omis ou vaut undefined. Il ne remplace pas une valeur explicite.", "A default parameter applies when the argument is omitted or undefined. It does not replace an explicit value."],
    workedCode: "function sessionDuration(blocks, minutes = 25) {\n  return blocks * minutes;\n}",
    workedExplanation: ["L’exemple montre la règle sur une durée. Le calcul des billets suit le même contrat.", "The example demonstrates the rule with duration. Ticket calculation follows the same contract."],
    badCode: "function ticketSubtotal(quantity, unitPrice) {\n  return quantity * 20;\n}",
    badExplanation: ["Le paramètre unitPrice est ignoré : un appel avec 35 € retourne un faux total.", "The unitPrice parameter is ignored: a call with €35 returns the wrong total."],
    guided: [["Déclare 20 dans la signature.", "Multiplie quantity par unitPrice.", "Compare appel standard et appel personnalisé."], ["Declare 20 in the signature.", "Multiply quantity by unitPrice.", "Compare default and custom calls."]],
    autonomous: ["Prédit le résultat avec undefined comme second argument avant de lancer les tests.", "Predict the result with undefined as the second argument before running tests."],
    hints: [["La syntaxe attendue est unitPrice = 20.", "Le corps ne doit contenir aucun 20."], ["The expected syntax is unitPrice = 20.", "The body should contain no hardcoded 20."]],
    correction: [["La valeur standard appartient à la signature.", "Le calcul utilise toujours le paramètre.", "Un prix explicite reste prioritaire."], ["The standard value belongs in the signature.", "The calculation always uses the parameter.", "An explicit price remains authoritative."]],
    starter: "function ticketSubtotal(quantity, unitPrice) {\n  return quantity * 20;\n}",
    solution: "function ticketSubtotal(quantity, unitPrice = 20) {\n  return quantity * unitPrice;\n}",
    tests: [
      behavior("Deux billets utilisent le prix standard", "Two tickets use the standard price", "return ticketSubtotal(2) === 40;"),
      behavior("undefined active aussi le prix standard", "undefined also activates the default", "return ticketSubtotal(3, undefined) === 60;"),
      behavior("Un prix personnalisé reste prioritaire", "A custom price remains authoritative", "return ticketSubtotal(2, 35) === 70;")
    ],
    skills: ["default-parameters", "parameters-arguments"], difficulty: "easy", duration: 22, xp: 34
  },
  {
    id: "js-functions-scope-multi-return",
    title: ["4. Sortir tôt d’un cas invalide", "4. Return early from an invalid case"],
    brief: ["Implémente normalizeQuantity : entier positif conservé, toute autre valeur devient 0.", "Implement normalizeQuantity: keep a positive integer, turn every other value into 0."],
    why: ["Une quantité invalide ne doit pas traverser tous les calculs de prix. La fonction la bloque à la frontière.", "An invalid quantity should not flow through every price calculation. The function stops it at the boundary."],
    concept: ["Une clause de garde traite d’abord les entrées impossibles puis laisse le chemin nominal lisible.", "A guard clause handles impossible inputs first and keeps the happy path readable."],
    workedCode: "function normalizeSeats(seats) {\n  if (!Number.isInteger(seats) || seats < 1) return 0;\n  return seats;\n}",
    workedExplanation: ["Le cas travaillé concerne des places, pas la quantité demandée dans l’exercice.", "The worked case concerns seats, not the quantity requested in the exercise."],
    badCode: "function normalizeQuantity(quantity) {\n  return quantity;\n}",
    badExplanation: ["Les valeurs négatives, décimales ou textuelles restent actives et contaminent le total.", "Negative, decimal, and textual values stay active and corrupt the total."],
    guided: [["Teste Number.isInteger.", "Bloque les valeurs inférieures à 1.", "Retourne quantity seulement après la garde."], ["Check Number.isInteger.", "Block values lower than 1.", "Return quantity only after the guard."]],
    autonomous: ["Explique pourquoi 2.5 doit être refusé même s’il est supérieur à zéro.", "Explain why 2.5 must be rejected even though it is greater than zero."],
    hints: [["Combine les deux causes invalides avec ||.", "Le premier return doit produire 0."], ["Combine both invalid causes with ||.", "The first return should produce 0."]],
    correction: [["La garde regroupe les entrées invalides.", "Elle termine immédiatement l’appel.", "Le dernier return décrit uniquement le cas valide."], ["The guard groups invalid inputs.", "It ends the call immediately.", "The final return describes only the valid case."]],
    starter: "function normalizeQuantity(quantity) {\n  return quantity;\n}",
    solution: "function normalizeQuantity(quantity) {\n  if (!Number.isInteger(quantity) || quantity < 1) return 0;\n  return quantity;\n}",
    tests: [
      behavior("Une quantité valide est conservée", "A valid quantity is preserved", "return normalizeQuantity(3) === 3;"),
      behavior("Zéro et les négatifs sont bloqués", "Zero and negatives are blocked", "return normalizeQuantity(0) === 0 && normalizeQuantity(-2) === 0;"),
      behavior("Une décimale est refusée", "A decimal is rejected", "return normalizeQuantity(2.5) === 0;"),
      behavior("Une chaîne est refusée", "A string is rejected", "return normalizeQuantity('3') === 0;")
    ],
    skills: ["guard-clauses", "return-value"], difficulty: "medium", duration: 24, xp: 36
  },
  {
    id: "js-functions-scope-scope-counter",
    title: ["5. Déboguer une variable masquée", "5. Debug a shadowed variable"],
    brief: ["Corrige remainingTickets(reserved) sans modifier totalTickets ni masquer son nom.", "Fix remainingTickets(reserved) without changing totalTickets or shadowing its name."],
    why: ["Le compteur global représente la capacité de la salle. Une variable locale portant le même nom cache la source de vérité.", "The global counter represents room capacity. A local variable with the same name hides the source of truth."],
    concept: ["La portée détermine quelle variable un nom désigne. Le shadowing crée deux variables différentes derrière le même nom.", "Scope determines which variable a name refers to. Shadowing creates two different variables behind the same name."],
    workedCode: "const roomCapacity = 80;\nfunction freeSeats(booked) {\n  const remaining = roomCapacity - booked;\n  return remaining;\n}",
    workedExplanation: ["Le nom remaining évite toute collision avec roomCapacity.", "The remaining name avoids any collision with roomCapacity."],
    badCode: "const totalTickets = 120;\nfunction remainingTickets(reserved) {\n  const totalTickets = reserved;\n  return totalTickets - reserved;\n}",
    badExplanation: ["Dans la fonction, totalTickets désigne reserved et le calcul retourne toujours zéro.", "Inside the function, totalTickets refers to reserved and the calculation always returns zero."],
    guided: [["Repère les deux déclarations totalTickets.", "Supprime la déclaration locale concurrente.", "Calcule depuis la constante externe sans la modifier."], ["Find both totalTickets declarations.", "Remove the competing local declaration.", "Calculate from the outer constant without changing it."]],
    autonomous: ["Appelle la fonction deux fois : le second résultat ne doit pas dépendre du premier appel.", "Call the function twice: the second result must not depend on the first call."],
    hints: [["La ligne const totalTickets = reserved est la cause.", "Un nom local comme remaining décrit mieux le résultat."], ["The const totalTickets = reserved line is the cause.", "A local name such as remaining better describes the result."]],
    correction: [["La constante externe reste la source de vérité.", "La fonction lit cette constante sans la réassigner.", "Chaque appel produit un résultat indépendant."], ["The outer constant remains the source of truth.", "The function reads it without reassigning it.", "Each call produces an independent result."]],
    starter: "const totalTickets = 120;\nfunction remainingTickets(reserved) {\n  const totalTickets = reserved;\n  return totalTickets - reserved;\n}",
    solution: "const totalTickets = 120;\nfunction remainingTickets(reserved) {\n  const remaining = totalTickets - reserved;\n  return remaining;\n}",
    tests: [
      behavior("Vingt réservations laissent cent places", "Twenty bookings leave one hundred seats", "return remainingTickets(20) === 100;"),
      behavior("La capacité globale reste inchangée", "The global capacity stays unchanged", "remainingTickets(40); return totalTickets === 120;"),
      behavior("Deux appels restent indépendants", "Two calls remain independent", "return remainingTickets(10) === 110 && remainingTickets(30) === 90;")
    ],
    skills: ["local-scope", "debugging"], difficulty: "medium", duration: 28, xp: 40
  },
  {
    id: "js-functions-scope-arrow-transform",
    title: ["6. Une flèche qui retourne vraiment", "6. An arrow that actually returns"],
    brief: ["Complète formatPrice(amount) pour retourner un prix avec deux décimales et le symbole €.", "Complete formatPrice(amount) to return a price with two decimals and the € symbol."],
    why: ["Les callbacks courts sont fréquents, mais les accolades font disparaître le return implicite.", "Short callbacks are common, but braces remove the implicit return."],
    concept: ["Sans accolades, l’expression est retournée. Avec accolades, écris return explicitement.", "Without braces, the expression is returned. With braces, write return explicitly."],
    workedCode: "const formatMinutes = (minutes) => {\n  return minutes + ' min';\n};",
    workedExplanation: ["L’exemple choisit le return explicite. Tu peux garder ce style ou utiliser une expression concise.", "The example uses an explicit return. You may keep that style or use a concise expression."],
    badCode: "const formatPrice = (amount) => {\n  amount.toFixed(2) + ' €';\n};",
    badExplanation: ["L’expression est calculée puis perdue : la fonction retourne undefined.", "The expression is computed then discarded: the function returns undefined."],
    guided: [["Décide entre corps bloc et expression concise.", "Utilise amount.toFixed(2).", "Retourne la chaîne terminée par €."], ["Choose between a block body and concise expression.", "Use amount.toFixed(2).", "Return the string ending with €. "]],
    autonomous: ["Vérifie 0 et 19.5 : le format doit rester stable dans les deux cas.", "Check 0 and 19.5: the format must remain stable in both cases."],
    hints: [["Ajoute return devant amount si tu gardes les accolades.", "toFixed reçoit le nombre 2."], ["Add return before amount if you keep the braces.", "toFixed receives the number 2."]],
    correction: [["La flèche reçoit amount.", "toFixed normalise les décimales.", "Le return rend la chaîne observable par les tests."], ["The arrow receives amount.", "toFixed normalizes decimals.", "The return makes the string observable to tests."]],
    starter: "const formatPrice = (amount) => {\n  amount.toFixed(2) + ' €';\n};",
    solution: "const formatPrice = (amount) => {\n  return amount.toFixed(2) + ' €';\n};",
    tests: [
      behavior("Un entier affiche deux décimales", "An integer shows two decimals", "return formatPrice(20) === '20.00 €';"),
      behavior("Une décimale est complétée", "A decimal is completed", "return formatPrice(19.5) === '19.50 €';"),
      behavior("Zéro garde le même format", "Zero keeps the same format", "return formatPrice(0) === '0.00 €';")
    ],
    skills: ["arrow-functions", "return-value"], difficulty: "medium", duration: 24, xp: 42
  },
  {
    id: "js-functions-scope-callback-filter",
    title: ["7. Passer une fonction comme valeur", "7. Pass a function as a value"],
    brief: ["Écris isValidQuantity puis utilise-la dans filterValidQuantities sans modifier le tableau source.", "Write isValidQuantity, then use it in filterValidQuantities without changing the source array."],
    why: ["Séparer le prédicat du parcours permet de tester la règle métier indépendamment de la collection.", "Separating the predicate from iteration lets you test the business rule independently from the collection."],
    concept: ["Un callback est une fonction passée à une autre fonction. filter l’appelle pour chaque élément et construit un nouveau tableau.", "A callback is a function passed to another function. filter calls it for each item and builds a new array."],
    workedCode: "function isPublished(course) {\n  return course.status === 'published';\n}\nconst visible = courses.filter(isPublished);",
    workedExplanation: ["Le prédicat nommé rend la règle lisible et réutilisable. L’exercice applique ce modèle aux quantités.", "The named predicate makes the rule readable and reusable. The exercise applies this model to quantities."],
    badCode: "function isValidQuantity(value) { return true; }",
    badExplanation: ["Un callback qui retourne toujours true ne filtre rien et donne une fausse impression de validation.", "A callback that always returns true filters nothing and gives a false sense of validation."],
    guided: [["Fais retourner true uniquement aux entiers positifs.", "Passe isValidQuantity à filter sans l’appeler.", "Retourne le nouveau tableau."], ["Return true only for positive integers.", "Pass isValidQuantity to filter without calling it.", "Return the new array."]],
    autonomous: ["Explique pourquoi filter(isValidQuantity()) serait faux avant même l’exécution.", "Explain why filter(isValidQuantity()) would be wrong before execution."],
    hints: [["Réutilise Number.isInteger.", "Écris quantities.filter(isValidQuantity)."], ["Reuse Number.isInteger.", "Write quantities.filter(isValidQuantity)."]],
    correction: [["Le prédicat porte une seule règle.", "filter reçoit la fonction elle-même.", "La source reste intacte car filter produit un nouveau tableau."], ["The predicate owns one rule.", "filter receives the function itself.", "The source stays intact because filter creates a new array."]],
    starter: "function isValidQuantity(value) {\n  return true;\n}\nfunction filterValidQuantities(quantities) {\n  return quantities.filter(isValidQuantity);\n}",
    solution: "function isValidQuantity(value) {\n  return Number.isInteger(value) && value > 0;\n}\nfunction filterValidQuantities(quantities) {\n  return quantities.filter(isValidQuantity);\n}",
    tests: [
      behavior("Le prédicat distingue les valeurs valides", "The predicate distinguishes valid values", "return isValidQuantity(2) && !isValidQuantity(0) && !isValidQuantity(2.5);"),
      behavior("Le callback filtre la collection", "The callback filters the collection", "return JSON.stringify(filterValidQuantities([2, 0, 3, -1])) === '[2,3]';"),
      behavior("Le tableau source reste intact", "The source array stays intact", "const source = [2, 0, 3]; filterValidQuantities(source); return JSON.stringify(source) === '[2,0,3]';")
    ],
    skills: ["callbacks", "pure-functions"], difficulty: "hard", duration: 28, xp: 46
  },
  {
    id: "js-functions-scope-pure-helper",
    title: ["8. Défi autonome : calcul pur", "8. Independent challenge: pure calculation"],
    brief: ["Implémente applyDiscount(amount, rate) : un nouveau total prévisible, sans état caché.", "Implement applyDiscount(amount, rate): a predictable new total with no hidden state."],
    why: ["Le moteur de devis doit pouvoir recalculer plusieurs scénarios sans dépendre de l’ordre des appels.", "The quote engine must recalculate several scenarios without depending on call order."],
    concept: ["Une fonction pure dépend uniquement de ses arguments et ne modifie rien à l’extérieur.", "A pure function depends only on its arguments and changes nothing outside itself."],
    workedCode: "function addTax(amount, rate) {\n  return amount + amount * rate;\n}",
    workedExplanation: ["Observe l’équation et la sortie, puis construis toi-même l’opération inverse demandée.", "Observe the equation and output, then build the requested inverse operation yourself."],
    badCode: "let lastTotal = 0;\nfunction applyDiscount(amount, rate) {\n  lastTotal = amount - rate;\n  return lastTotal;\n}",
    badExplanation: ["Le calcul mélange unité monétaire et taux, puis écrit dans un état extérieur inutile.", "The calculation mixes money and rate units, then writes to unnecessary external state."],
    guided: [[], []],
    autonomous: ["À toi de choisir les noms intermédiaires et la forme du calcul. Le contrat et les tests sont toute la consigne.", "Choose the intermediate names and calculation shape yourself. The contract and tests are the entire brief."],
    hints: [["Un taux de 0.1 représente 10 %.", "Calcule d’abord amount * rate."], ["A rate of 0.1 represents 10%.", "First calculate amount * rate."]],
    correction: [["Le montant de remise dérive des deux arguments.", "Le résultat est retourné sans mutation.", "Deux appels identiques restent identiques."], ["The discount derives from both arguments.", "The result is returned without mutation.", "Two identical calls remain identical."]],
    starter: "function applyDiscount(amount, rate) {\n  return amount - rate;\n}",
    solution: "function applyDiscount(amount, rate) {\n  return amount - amount * rate;\n}",
    tests: [
      behavior("Une remise de 10 % est calculée", "A 10% discount is calculated", "return applyDiscount(100, 0.1) === 90;"),
      behavior("Un taux nul conserve le montant", "A zero rate preserves the amount", "return applyDiscount(80, 0) === 80;"),
      behavior("Deux appels identiques restent déterministes", "Two identical calls remain deterministic", "return applyDiscount(50, 0.2) === applyDiscount(50, 0.2);"),
      behavior("Aucun état global parasite n’est créé", "No stray global state is created", "applyDiscount(40, 0.25); return typeof lastTotal === 'undefined';")
    ],
    skills: ["pure-functions", "function-contract"], difficulty: "hard", duration: 30, xp: 50
  }
];

export const javascriptFunctionsScopeModule = {
  id: "js-functions-scope",
  title: { fr: "Fonctions et portée", en: "Functions and scope" },
  description: { fr: "Construire une API de prix par contrats testables, du premier return au projet autonome.", en: "Build a pricing API through testable contracts, from the first return to an independent project." },
  deliverable: { fr: "Un moteur de devis PulsaConf testé sur ses cas limites", en: "A PulsaConf quote engine tested at its boundaries" },
  importance: { fr: "Les fonctions rendent une règle métier nommable, réutilisable et vérifiable sans dépendre de l’interface.", en: "Functions make a business rule nameable, reusable, and verifiable without depending on the interface." },
  prerequisites: { fr: ["Déclarer const et let", "Lire une condition", "Lancer un test qui échoue"], en: ["Declare const and let", "Read a condition", "Run a failing test"] },
  outcomes: { fr: ["Définir un contrat entrée-sortie", "Utiliser paramètres et valeurs par défaut", "Déboguer la portée", "Composer des fonctions pures"], en: ["Define an input-output contract", "Use parameters and defaults", "Debug scope", "Compose pure functions"] },
  vocabulary: ["fonction", "paramètre", "argument", "return", "portée", "callback", "pureté"],
  mastery: { fr: ["Chaque starter compile mais échoue avant correction", "Chaque règle est prouvée sur plusieurs scénarios", "Le projet compose quatre fonctions sans état caché"], en: ["Every starter compiles but fails before correction", "Every rule is proven through several scenarios", "The project composes four functions without hidden state"] },
  lessons: [...practices.map(makePractice), makeQuiz(), makeProject()],
  totalMinutes: 329
};

function makePractice(config, index) {
  const [titleFr, titleEn] = config.title;
  const [briefFr, briefEn] = config.brief;
  const guidedFr = config.guided[0];
  const guidedEn = config.guided[1];
  return {
    id: config.id,
    type: "js",
    title: { fr: titleFr, en: titleEn },
    brief: { fr: briefFr, en: briefEn },
    course: {
      fr: chapter(config, "fr"),
      en: chapter(config, "en")
    },
    pedagogy: {
      fr: pedagogy(config, "fr"),
      en: pedagogy(config, "en")
    },
    theory: { fr: { points: [config.concept[0], config.why[0]] }, en: { points: [config.concept[1], config.why[1]] } },
    guide: {
      fr: { objectives: [briefFr, `Prouver ${config.tests.length} scénarios observables.`, `Expliquer la décision propre à « ${titleFr} ».`], prerequisites: ["Lire une fonction", "Interpréter un test"], steps: guidedFr.length ? guidedFr : ["Lire le contrat autonome", "Écrire une première hypothèse sans guide", "Utiliser l’échec comme diagnostic"], mistakes: [config.badExplanation[0], `Recopier l’exemple analogue au lieu de raisonner sur « ${titleFr} ».`] },
      en: { objectives: [briefEn, `Prove ${config.tests.length} observable scenarios.`, `Explain the decision specific to “${titleEn}”.`], prerequisites: ["Read a function", "Interpret a test"], steps: guidedEn.length ? guidedEn : ["Read the independent contract", "Write a first hypothesis without guidance", "Use failure as diagnosis"], mistakes: [config.badExplanation[1], `Copying the analogous example instead of reasoning about “${titleEn}”.`] }
    },
    skills: config.skills,
    difficulty: config.difficulty,
    durationMin: config.duration,
    starterCode: config.starter,
    solution: config.solution,
    tests: config.tests,
    hint: { fr: config.hints[0][0], en: config.hints[1][0] },
    xp: config.xp,
    projectThreadId: threadId,
    stepNumber: index + 1
  };
}

function chapter(config, locale) {
  const index = locale === "fr" ? 0 : 1;
  return {
    introduction: config.why[index],
    sections: [
      { title: locale === "fr" ? "Le contrat" : "The contract", paragraphs: [config.concept[index], config.brief[index]] },
      { title: locale === "fr" ? "Exemple analogue" : "Analogous example", paragraphs: [config.workedExplanation[index]], example: config.workedCode },
      { title: locale === "fr" ? "Ce que les tests vont prouver" : "What the tests will prove", paragraphs: [locale === "fr" ? `${config.tests.length} scénarios différents empêchent une solution codée en dur.` : `${config.tests.length} different scenarios prevent a hardcoded solution.`, locale === "fr" ? "Lis chaque libellé comme une exigence métier : une réussite isolée ne suffit pas si les autres entrées contredisent le contrat." : "Read each label as a business requirement: one isolated success is not enough when other inputs contradict the contract."] }
    ],
    vocabulary: locale === "fr"
      ? [["contrat", "Relation explicite entre entrée et sortie."], ["scénario", "Exemple exécutable qui peut confirmer ou réfuter le comportement."]]
      : [["contract", "Explicit relationship between input and output."], ["scenario", "Executable example that can confirm or refute behavior."]],
    check: locale === "fr" ? ["Je peux nommer l’entrée.", "Je peux prédire la sortie avant d’exécuter."] : ["I can name the input.", "I can predict the output before running."]
  };
}

function pedagogy(config, locale) {
  const index = locale === "fr" ? 0 : 1;
  return {
    why: config.why[index],
    objectives: [config.brief[index], locale === "fr" ? "Expliquer pourquoi chaque scénario passe." : "Explain why each scenario passes.", locale === "fr" ? "Relier le résultat au contrat entrée-sortie." : "Connect the result to the input-output contract."],
    prerequisites: locale === "fr" ? ["Lire une déclaration de fonction", "Distinguer entrée et sortie"] : ["Read a function declaration", "Distinguish input from output"],
    vocabulary: locale === "fr" ? ["entrée", "sortie", "scénario"] : ["input", "output", "scenario"],
    comparison: {
      good: { title: locale === "fr" ? "Même raisonnement, autre problème" : "Same reasoning, different problem", code: config.workedCode, explanation: config.workedExplanation[index] },
      bad: { title: locale === "fr" ? "Le piège à diagnostiquer" : "The trap to diagnose", code: config.badCode, explanation: config.badExplanation[index] }
    },
    guided: config.guided[index].length >= 3 ? config.guided[index] : (locale === "fr" ? ["Lire le contrat sans ouvrir la correction.", "Écrire une hypothèse minimale.", "Lancer un scénario puis expliquer l’écart."] : ["Read the contract without opening the correction.", "Write a minimal hypothesis.", "Run one scenario and explain the gap."]),
    autonomous: config.autonomous[index],
    hints: [...config.hints[index], locale === "fr" ? "Relis le libellé du premier test qui échoue : il nomme le contrat manquant." : "Reread the first failing test label: it names the missing contract."],
    correction: config.correction[index],
    summary: config.concept[index],
    next: locale === "fr" ? "Réutilise cette preuve dans l’étape suivante du moteur de devis." : "Reuse this evidence in the next quote-engine step."
  };
}

function makeQuiz() {
  const explanation = (fr, en) => ({ fr, en });
  const choice = (id, fr, en) => ({ id, label: { fr, en } });
  const questions = [
    { id: "js-functions-scope-quiz-contract", type: "single", prompt: { fr: "Quel test détecte qu’une fonction ignore son paramètre ?", en: "Which test detects that a function ignores its parameter?" }, choices: [choice("two", "Deux appels avec des arguments différents", "Two calls with different arguments"), choice("one", "Un seul appel qui correspond à la valeur codée", "One call matching the hardcoded value"), choice("style", "Un contrôle du point-virgule", "A semicolon check")], answer: "two", explanation: explanation("Deux entrées différentes révèlent un résultat codé en dur.", "Two different inputs reveal a hardcoded output."), points: 1, skills: ["function-contract"] },
    { id: "js-functions-scope-quiz-default", type: "multiple", prompt: { fr: "Quand la valeur par défaut d’un paramètre s’applique-t-elle ?", en: "When does a default parameter apply?" }, choices: [choice("omit", "Argument omis", "Argument omitted"), choice("undefined", "Argument undefined", "Argument is undefined"), choice("custom", "Toute valeur personnalisée", "Any custom value")], answer: ["omit", "undefined"], explanation: explanation("Une valeur explicite, même 0, reste prioritaire.", "An explicit value, even 0, remains authoritative."), points: 1, skills: ["default-parameters"] },
    { id: "js-functions-scope-quiz-scope", type: "error-identification", prompt: { fr: "const total = 120; function remaining(total) { return total - total; } Quel défaut fausse le résultat ?", en: "const total = 120; function remaining(total) { return total - total; } Which defect breaks the result?" }, choices: [choice("shadow", "Le paramètre masque la constante externe", "The parameter shadows the outer constant"), choice("return", "return est interdit", "return is forbidden"), choice("const", "const doit devenir var", "const must become var")], answer: "shadow", explanation: explanation("Le même nom désigne l’argument dans toute la fonction.", "The same name refers to the argument throughout the function."), points: 1, skills: ["local-scope"] },
    { id: "js-functions-scope-quiz-order", type: "ordering", prompt: { fr: "Ordonne l’exécution d’un appel de fonction.", en: "Order the execution of a function call." }, choices: [choice("call", "Appeler la fonction", "Call the function"), choice("bind", "Associer arguments et paramètres", "Bind arguments to parameters"), choice("run", "Exécuter le corps", "Execute the body"), choice("return", "Renvoyer la sortie", "Return the output")], answer: ["call", "bind", "run", "return"], explanation: explanation("L’appel fournit les arguments avant l’exécution et le retour.", "The call supplies arguments before execution and return."), points: 1, skills: ["parameters-arguments"] },
    { id: "js-functions-scope-quiz-arrow", type: "code-reading", prompt: { fr: "const double = (value) => { value * 2; }; Que retourne double(4) ?", en: "const double = (value) => { value * 2; }; What does double(4) return?" }, choices: [choice("undefined", "undefined", "undefined"), choice("eight", "8", "8"), choice("four", "4", "4")], answer: "undefined", explanation: explanation("Avec des accolades, return doit être explicite.", "With braces, return must be explicit."), points: 1, skills: ["arrow-functions"] },
    { id: "js-functions-scope-quiz-callback", type: "single", prompt: { fr: "Pourquoi écrit-on values.filter(isValid) plutôt que values.filter(isValid()) ?", en: "Why write values.filter(isValid) rather than values.filter(isValid())?" }, choices: [choice("function", "filter attend la fonction à appeler", "filter expects the function to call"), choice("string", "filter attend toujours une chaîne", "filter always expects a string"), choice("style", "C’est seulement une convention de style", "It is only a style convention")], answer: "function", explanation: explanation("Le callback est passé comme valeur puis appelé pour chaque élément.", "The callback is passed as a value, then called for each item."), points: 1, skills: ["callbacks"] },
    { id: "js-functions-scope-quiz-pure", type: "true-false", prompt: { fr: "Une fonction pure peut produire un résultat différent pour les mêmes arguments.", en: "A pure function may produce a different output for the same arguments." }, choices: [choice("true", "Vrai", "True"), choice("false", "Faux", "False")], answer: "false", explanation: explanation("À arguments identiques, une fonction pure reste déterministe.", "For identical arguments, a pure function remains deterministic."), points: 1, skills: ["pure-functions"] },
    { id: "js-functions-scope-quiz-open", type: "short-open", prompt: { fr: "Pourquoi tester au moins deux arguments différents ?", en: "Why test at least two different arguments?" }, choices: [], answer: ["argument"], keywords: ["argument"], explanation: explanation("Cela prouve que le paramètre influence réellement la sortie.", "It proves that the parameter actually affects the output."), points: 1, skills: ["function-contract"] }
  ];
  return {
    id: "js-functions-scope-quiz", type: "quiz",
    title: { fr: "9. Diagnostic : fonctions et portée", en: "9. Diagnosis: functions and scope" },
    brief: { fr: "Récupère de mémoire les contrats, valeurs par défaut, retours, callbacks et règles de portée.", en: "Retrieve contracts, defaults, returns, callbacks, and scope rules from memory." },
    course: simpleCourse("Le quiz mélange lecture de code et diagnostic. Explique chaque réponse avant de la valider.", "The quiz mixes code reading and diagnosis. Explain each answer before validating it."),
    pedagogy: simplePedagogy("Réponds sans rouvrir les corrections, puis transforme chaque erreur en révision espacée.", "Answer without reopening corrections, then turn each mistake into spaced review."),
    theory: { fr: { points: ["Prédire avant d’exécuter", "Justifier avec le contrat"] }, en: { points: ["Predict before running", "Justify from the contract"] } },
    guide: bilingualGuide("Rappeler les règles sans recopier", "Retrieve rules without copying"),
    skills: ["function-contract", "parameters-arguments", "default-parameters", "local-scope", "callbacks", "pure-functions"],
    difficulty: "quiz", durationMin: 30, questions, passingScore: 80, randomizeQuestions: false, feedbackMode: "immediate",
    starterCode: "", solution: "", tests: [{ type: "quiz", label: "80%", value: "80" }], hint: { fr: "Prédit le résultat avant de choisir.", en: "Predict the output before choosing." }, xp: 55, projectThreadId: threadId, stepNumber: 9
  };
}

function makeProject() {
  const starter = "function normalizeQuantity(quantity) {\n  // retourne 0 ou la quantité valide\n}\n\nfunction ticketSubtotal(quantity, unitPrice = 20) {\n  // calcule le sous-total\n}\n\nfunction applyDiscount(amount, rate) {\n  // retourne le montant remisé\n}\n\nfunction createQuote(quantity, unitPrice = 20, discountRate = 0) {\n  // compose les trois fonctions\n}";
  const solution = "function normalizeQuantity(quantity) {\n  if (!Number.isInteger(quantity) || quantity < 1) return 0;\n  return quantity;\n}\n\nfunction ticketSubtotal(quantity, unitPrice = 20) {\n  return normalizeQuantity(quantity) * unitPrice;\n}\n\nfunction applyDiscount(amount, rate) {\n  return amount - amount * rate;\n}\n\nfunction createQuote(quantity, unitPrice = 20, discountRate = 0) {\n  const normalizedQuantity = normalizeQuantity(quantity);\n  const subtotal = ticketSubtotal(normalizedQuantity, unitPrice);\n  const total = applyDiscount(subtotal, discountRate);\n  return { quantity: normalizedQuantity, unitPrice, subtotal, discountRate, total };\n}";
  const tests = [
    behavior("Une quantité invalide devient zéro", "An invalid quantity becomes zero", "return normalizeQuantity(-1) === 0 && normalizeQuantity(2.5) === 0;"),
    behavior("Une quantité valide est conservée", "A valid quantity is preserved", "return normalizeQuantity(3) === 3;"),
    behavior("Le prix standard produit le bon sous-total", "The default price produces the right subtotal", "return ticketSubtotal(2) === 40;"),
    behavior("Le prix personnalisé est respecté", "The custom price is respected", "return ticketSubtotal(2, 35) === 70;"),
    behavior("Une remise nulle conserve le total", "A zero discount preserves the total", "return applyDiscount(80, 0) === 80;"),
    behavior("La remise de 25 % est correcte", "The 25% discount is correct", "return applyDiscount(80, 0.25) === 60;"),
    behavior("Le devis expose toutes les preuves", "The quote exposes all evidence", "const quote = createQuote(2, 30, 0.1); return quote.quantity === 2 && quote.subtotal === 60 && quote.total === 54;"),
    behavior("Les appels ne partagent aucun état caché", "Calls share no hidden state", "return createQuote(1).total === 20 && createQuote(3).total === 60;"),
    behavior("Une quantité invalide produit un devis à zéro", "An invalid quantity produces a zero quote", "const quote = createQuote('2'); return quote.quantity === 0 && quote.total === 0;")
  ];
  return {
    id: "js-functions-scope-lab", type: "project",
    title: { fr: "10. Projet : moteur de devis PulsaConf", en: "10. Project: PulsaConf quote engine" },
    brief: { fr: "Compose quatre fonctions pour produire un devis déterministe, testable et sans état caché.", en: "Compose four functions to produce a deterministic, testable quote with no hidden state." },
    course: simpleCourse("Le projet final rassemble les contrats du module. Les signatures sont fournies, pas les implémentations.", "The final project combines the module contracts. Signatures are provided, implementations are not."),
    pedagogy: simplePedagogy("Travaille fonction par fonction. Fais passer les tests du bas niveau avant de composer createQuote.", "Work one function at a time. Pass low-level tests before composing createQuote."),
    theory: { fr: { points: ["Une fonction par responsabilité", "Composition sans état global"] }, en: { points: ["One function per responsibility", "Composition without global state"] } },
    guide: bilingualGuide("Composer une API de calcul testable", "Compose a testable calculation API"),
    skills: ["function-contract", "guard-clauses", "default-parameters", "pure-functions", "composition"],
    difficulty: "project", durationMin: 105, starterCode: starter, solution, tests,
    rubric: { fr: ["Les quatre fonctions ont une responsabilité unique.", "Les entrées invalides sont normalisées à la frontière.", "Aucun état global n’influence les résultats.", "Les neuf scénarios passent sans modifier les tests.", "Les noms rendent le calcul lisible sans commentaire superflu."], en: ["All four functions have one responsibility.", "Invalid inputs are normalized at the boundary.", "No global state influences results.", "All nine scenarios pass without changing tests.", "Names make the calculation readable without redundant comments."] },
    hint: { fr: "Commence par normalizeQuantity, puis remonte vers createQuote.", en: "Start with normalizeQuantity, then work upward to createQuote." },
    xp: 120, projectThreadId: threadId, stepNumber: 10
  };
}

function behavior(fr, en, value) {
  return { type: "jsExpression", label: { fr, en }, value };
}

function simpleCourse(fr, en) {
  return {
    fr: { introduction: fr, sections: [{ title: "Lire le contrat", paragraphs: [fr, "Sépare les entrées, la règle appliquée et la sortie attendue avant de toucher au code."], example: "entrée → fonction → sortie" }, { title: "Construire la preuve", paragraphs: ["Prédit un résultat avant d’exécuter.", "Utilise plusieurs scénarios pour éviter qu’un seul exemple heureux masque une règle incomplète."], example: "sortie réelle === sortie attendue" }, { title: "Expliquer l’écart", paragraphs: ["Le premier échec localise la règle à corriger.", "Corrige une cause à la fois afin de conserver un lien clair entre modification et résultat."], example: "échec → cause → correction → nouvelle preuve" }], vocabulary: [["composition", "Relier plusieurs fonctions simples."], ["preuve", "Scénario exécutable qui confirme un contrat."], ["diagnostic", "Explication de la cause d’un échec."]], check: ["Je sais quelle fonction tester en premier.", "Je prédis avant d’exécuter."] },
    en: { introduction: en, sections: [{ title: "Read the contract", paragraphs: [en, "Separate inputs, the applied rule, and expected output before touching the code."], example: "input → function → output" }, { title: "Build evidence", paragraphs: ["Predict an output before running.", "Use several scenarios so one happy example cannot hide an incomplete rule."], example: "actual output === expected output" }, { title: "Explain the gap", paragraphs: ["The first failure locates the rule to fix.", "Fix one cause at a time to preserve a clear link between change and result."], example: "failure → cause → fix → new evidence" }], vocabulary: [["composition", "Connect several small functions."], ["evidence", "Executable scenario confirming a contract."], ["diagnosis", "Explanation of a failure cause."]], check: ["I know which function to test first.", "I predict before running."] }
  };
}

function simplePedagogy(fr, en) {
  const make = (text, locale) => ({
    why: text,
    objectives: [text, locale === "fr" ? "Prédire chaque sortie avant exécution." : "Predict every output before execution.", locale === "fr" ? "Justifier la correction avec un scénario." : "Justify the fix with a scenario."],
    prerequisites: [locale === "fr" ? "Avoir pratiqué les huit étapes" : "Complete the eight practice steps"],
    vocabulary: locale === "fr" ? ["contrat", "preuve", "diagnostic"] : ["contract", "evidence", "diagnosis"],
    comparison: {
      good: { title: locale === "fr" ? "Preuve ciblée" : "Targeted evidence", code: "assert(output === expected)", explanation: locale === "fr" ? "Un scénario nomme exactement le contrat vérifié." : "A scenario names the exact contract being verified." },
      bad: { title: locale === "fr" ? "Validation vague" : "Vague validation", code: "// cela semble fonctionner", explanation: locale === "fr" ? "Une impression ne remplace pas une sortie observable." : "An impression does not replace observable output." }
    },
    guided: [locale === "fr" ? "Prédire avant d’exécuter." : "Predict before running.", locale === "fr" ? "Lire le premier échec comme un diagnostic." : "Read the first failure as a diagnosis.", locale === "fr" ? "Corriger une seule cause puis relancer." : "Fix one cause, then rerun."],
    autonomous: locale === "fr" ? "Justifie chaque décision avec un scénario." : "Justify every decision with a scenario.",
    hints: [locale === "fr" ? "Commence par le contrat le plus petit." : "Start with the smallest contract.", locale === "fr" ? "Observe la première sortie fausse." : "Inspect the first wrong output.", locale === "fr" ? "Compose seulement des fonctions déjà validées." : "Compose only functions that already pass."],
    correction: [locale === "fr" ? "Isoler chaque règle." : "Isolate each rule.", locale === "fr" ? "Valider les cas limites." : "Validate boundary cases.", locale === "fr" ? "Composer seulement après validation." : "Compose only after validation."],
    summary: text,
    next: locale === "fr" ? "Réutiliser ces fonctions avec des collections." : "Reuse these functions with collections."
  });
  return { fr: make(fr, "fr"), en: make(en, "en") };
}

function bilingualGuide(fr, en) {
  return {
    fr: { objectives: [fr], prerequisites: ["Connaître les contrats du module"], steps: ["Lire le scénario", "Prédire", "Exécuter", "Expliquer"], mistakes: [`Pour « ${fr} », modifier plusieurs règles à la fois masque la cause.`, "Se contenter d’un cas nominal"] },
    en: { objectives: [en], prerequisites: ["Know the module contracts"], steps: ["Read the scenario", "Predict", "Run", "Explain"], mistakes: [`For “${en}”, changing several rules at once hides the cause.`, "Testing only the happy path"] }
  };
}
