const t = {
  threat: ["modèle de menace", "threat model", "Carte des actifs, acteurs, abus et protections.", "Map of assets, actors, abuse cases, and controls."],
  header: ["en-tête de sécurité", "security header", "Directive HTTP qui réduit une capacité navigateur risquée.", "HTTP directive reducing risky browser capability."],
  xss: ["XSS", "XSS", "Exécution de contenu actif injecté dans le contexte du site.", "Execution of injected active content in the site context."],
  csrf: ["CSRF", "CSRF", "Action forcée via une session existante.", "Action forced through an existing session."],
  authz: ["autorisation objet", "object authorization", "Vérification serveur sur chaque ressource visée.", "Server check for each target resource."],
  secret: ["secret", "secret", "Valeur donnant accès à un système ou une capacité.", "Value granting access to a system or capability."],
  upload: ["upload non fiable", "untrusted upload", "Fichier dont taille, type, nom et contenu doivent être contrôlés.", "File whose size, type, name, and content must be controlled."],
  dependency: ["dépendance", "dependency", "Code tiers à auditer, verrouiller et mettre à jour.", "Third-party code to audit, lock, and update."],
  incident: ["incident", "incident", "Événement à détecter, contenir, corriger et documenter.", "Event to detect, contain, fix, and document."],
  proof: ["test d'abus", "abuse test", "Test qui prouve qu'une action interdite échoue.", "Test proving that a forbidden action fails."]
};

const modules = [
  {
    id: "sec-risk-modeling",
    title: ["Penser comme un défenseur", "Think like a defender"],
    description: ["Partir des actifs et des abus réels avant de choisir un contrôle.", "Start with real assets and abuse cases before choosing a control."],
    vocabulary: [t.threat, t.proof, t.incident],
    lessons: [
      ["assets", "Lister les actifs critiques", "Inventory critical assets", "Distingue ce qui a de la valeur de la technologie qui le porte.", "Separate what has value from the technology that carries it."],
      ["boundaries", "Tracer les frontières de confiance", "Trace trust boundaries", "Suis une requête du navigateur aux services qui changent son niveau de confiance.", "Follow a request from the browser through services that change its trust level."],
      ["abuse-case", "Écrire un cas d'abus testable", "Write a testable abuse case", "Décris acteur, précondition, action interdite, impact et signal observable.", "Describe actor, precondition, forbidden action, impact, and observable signal."],
      ["risk-score", "Prioriser sans fausse précision", "Prioritize without false precision", "Compare vraisemblance, impact et exposition, puis documente l'incertitude.", "Compare likelihood, impact, and exposure, then document uncertainty."],
      ["negative-test", "Créer une preuve négative", "Create negative evidence", "Fais agir user A sur la ressource de user B et observe le refus serveur.", "Make user A act on user B's resource and observe the server denial."],
      ["control-map", "Relier risque, contrôle et preuve", "Link risk, control, and evidence", "Choisis un contrôle par abus et précise comment sa défaillance sera détectée.", "Choose a control for each abuse case and state how its failure will be detected."]
    ],
    project: ["sec-threat-model-project", "Mini-projet : modèle de menace PulsaTeach", "Mini-project: PulsaTeach threat model", "Produis une matrice actifs/frontières/abus/contrôles/preuves pour la publication d'un cours.", "Produce an asset/boundary/abuse/control/evidence matrix for course publishing."],
    quiz: ["sec-threat-quiz", "Quiz : risques et preuves", "Quiz: risks and evidence", "security-threat-modeling"]
  },
  {
    id: "sec-browser-defenses",
    title: ["Défenses navigateur : XSS, CSP, cookies", "Browser defenses: XSS, CSP, cookies"],
    description: ["Traiter le navigateur comme une frontière exposée et superposer des défenses.", "Treat the browser as an exposed boundary and layer defenses."],
    vocabulary: [t.xss, t.header, t.csrf],
    lessons: [
      ["escape", "Rendre du texte sans HTML actif", "Render text without active HTML", "Conserve le commentaire comme donnée quand aucun balisage n'est requis.", "Keep the comment as data when no markup is required."],
      ["sanitize", "Sanitiser avec une politique fermée", "Sanitize with a closed policy", "Si le HTML est nécessaire, autorise seulement les éléments et attributs justifiés.", "If HTML is required, allow only justified elements and attributes."],
      ["csp", "Déployer une CSP restrictive", "Deploy a restrictive CSP", "Réduis les sources exécutables et vérifie les rapports avant enforcement.", "Reduce executable sources and inspect reports before enforcement."],
      ["cookies", "Réduire le pouvoir d'un cookie", "Reduce cookie power", "Combine transport sûr, accès HTTP seul, portée et durée minimales.", "Combine secure transport, HTTP-only access, minimal scope, and lifetime."],
      ["csrf-token", "Refuser une mutation forcée", "Reject a forced mutation", "Vérifie origine et jeton indépendant de la session avant tout changement d'état.", "Verify origin and a session-independent token before any state change."],
      ["clickjacking", "Empêcher l'encapsulation hostile", "Prevent hostile framing", "Interdis les ancêtres de frame et teste la réponse réellement servie.", "Forbid frame ancestors and test the response actually served."]
    ],
    project: ["sec-browser-project", "Mini-projet : commentaires durcis", "Mini-project: hardened comments", "Protège rendu, cookies, mutations et framing, puis démontre trois attaques refusées.", "Protect rendering, cookies, mutations, and framing, then demonstrate three rejected attacks."],
    quiz: ["sec-browser-quiz", "Quiz : navigateur sécurisé", "Quiz: secure browser", "browser-security"]
  },
  {
    id: "sec-api-abuse",
    title: ["API : validation, autorisation et abus", "APIs: validation, authorization, and abuse"],
    description: ["Faire appliquer les décisions à la frontière serveur, y compris entre utilisateurs authentifiés.", "Enforce decisions at the server boundary, including between authenticated users."],
    vocabulary: [t.authz, t.proof, ["limitation de débit", "rate limit", "Quota qui réduit les abus répétitifs.", "Quota reducing repetitive abuse."]],
    lessons: [
      ["schema", "Parser un body strict", "Parse a strict request body", "Refuse champs inconnus, tailles extrêmes, protocoles et enums invalides.", "Reject unknown fields, extreme sizes, protocols, and invalid enums."],
      ["mass-assignment", "Bloquer l'affectation massive", "Block mass assignment", "Construis explicitement les champs persistés au lieu de copier request.body.", "Build persisted fields explicitly instead of copying request.body."],
      ["idor", "Reproduire un IDOR", "Reproduce an IDOR", "Teste un identifiant valide appartenant à un autre compte, pas un identifiant absent.", "Test a valid identifier owned by another account, not a missing identifier."],
      ["rbac", "Combiner capacité et propriété", "Combine capability and ownership", "Décide avec l'identité, le rôle, l'action et la ressource chargée côté serveur.", "Decide with identity, role, action, and the server-loaded resource."],
      ["rate", "Limiter une mutation sensible", "Rate-limit a sensitive mutation", "Définis clé, fenêtre, quota et réponse 429 selon le scénario d'abus.", "Define key, window, quota, and 429 response from the abuse scenario."],
      ["safe-error", "Répondre sans fuite interne", "Respond without internal leakage", "Expose un code stable et un requestId, jamais stack, SQL ou secret.", "Expose a stable code and requestId, never a stack, SQL, or secret."]
    ],
    project: ["sec-api-project", "Mini-projet : API résistante aux abus", "Mini-project: abuse-resistant API", "Implémente parsing, isolation objet, quota et erreurs sûres avec une suite d'attaques.", "Implement parsing, object isolation, quotas, and safe errors with an attack suite."],
    quiz: ["sec-api-quiz", "Quiz : décisions côté serveur", "Quiz: server-side decisions", "api-security"]
  },
  {
    id: "sec-files-secrets",
    title: ["Uploads, secrets et chaîne logicielle", "Uploads, secrets, and software supply chain"],
    description: ["Réduire les capacités des contenus, clés et composants qui entrent dans le système.", "Reduce the capabilities of content, keys, and components entering the system."],
    vocabulary: [t.upload, t.secret, t.dependency],
    lessons: [
      ["upload-size", "Limiter volume et fréquence", "Limit upload volume and frequency", "Refuse le fichier avant traitement coûteux et borne aussi le nombre d'envois.", "Reject the file before expensive processing and also bound upload frequency."],
      ["mime-signature", "Vérifier type et signature", "Verify type and signature", "Compare le contenu réel à une courte liste de formats nécessaires.", "Compare actual content against a short list of required formats."],
      ["storage-name", "Générer un nom de stockage", "Generate a storage name", "Ignore le chemin client et crée une clé serveur non devinable.", "Ignore the client path and create an unguessable server key."],
      ["server-secret", "Garder les clés côté serveur", "Keep keys server-side", "Fais échouer le build si une clé privilégiée atteint le bundle public.", "Fail the build if a privileged key reaches the public bundle."],
      ["rotation", "Faire tourner sans panne", "Rotate without an outage", "Chevauche brièvement signature active et vérification ancienne, puis révoque.", "Briefly overlap active signing and old-key verification, then revoke."],
      ["dependency-audit", "Décider face à une vulnérabilité", "Decide on a dependency vulnerability", "Évalue atteignabilité, criticité et correctif plutôt que compter les alertes.", "Assess reachability, severity, and remediation rather than counting alerts."]
    ],
    project: ["sec-supply-project", "Mini-projet : pipeline de contenu non fiable", "Mini-project: untrusted-content pipeline", "Livre upload isolé, détection de secrets, audit de dépendances et procédure de rotation.", "Ship isolated upload handling, secret detection, dependency review, and a rotation procedure."],
    quiz: ["sec-files-quiz", "Quiz : fichiers, clés et dépendances", "Quiz: files, keys, and dependencies", "files-secrets-security"]
  },
  {
    id: "sec-monitoring-incident",
    title: ["Détection et réponse à incident", "Detection and incident response"],
    description: ["Transformer les refus en signaux, contenir sans détruire les preuves et apprendre.", "Turn denials into signals, contain without destroying evidence, and learn."],
    vocabulary: [t.incident, t.proof, ["expurgation", "redaction", "Suppression automatique des champs sensibles dans les logs.", "Automatic removal of sensitive fields from logs."]],
    lessons: [
      ["log-redact", "Journaliser une décision sans secret", "Log a decision without secrets", "Conserve identité corrélée, route, décision et durée en expurgeant les credentials.", "Keep correlated identity, route, decision, and duration while redacting credentials."],
      ["security-event", "Émettre un événement exploitable", "Emit an actionable security event", "Utilise un type stable, l'acteur, la cible, la sévérité et le requestId.", "Use a stable type, actor, target, severity, and requestId."],
      ["alert", "Construire une alerte actionnable", "Build an actionable alert", "Alerte sur une tendance avec fenêtre, seuil, propriétaire et procédure.", "Alert on a trend with a window, threshold, owner, and runbook."],
      ["contain", "Contenir en préservant les preuves", "Contain while preserving evidence", "Révoque capacités compromises, isole le chemin et fige une chronologie.", "Revoke compromised capabilities, isolate the path, and preserve a timeline."],
      ["postmortem", "Apprendre sans chercher un coupable", "Learn without assigning blame", "Relie cause systémique, impact, détection et actions vérifiables.", "Connect systemic cause, impact, detection, and verifiable actions."],
      ["final-check", "Clore par une preuve reproductible", "Close with reproducible evidence", "Pour chaque risque prioritaire, exige correction, test négatif et propriétaire.", "For every priority risk, require a fix, negative test, and owner."]
    ],
    project: ["sec-final-capstone", "Projet final : audit et réponse", "Final project: audit and response", "Audite une application, corrige les risques prioritaires et simule un incident de clé volée.", "Audit an application, remediate priority risks, and simulate a stolen-key incident.", true],
    quiz: ["sec-incident-quiz", "Quiz : détection et incident", "Quiz: detection and incident", "security-incident"]
  }
];

function lesson(module, [slug, frTitle, enTitle, frBrief, enBrief], index) {
  const name = `${camel(slug)}Control`;
  const solution = controlSolution(module.id, slug, name);
  return {
    id: `${module.id}-${slug}`,
    type: "node",
    title: [frTitle, enTitle],
    brief: [frBrief, enBrief],
    solution,
    requirements: [...behaviorChecks(module.id, slug, name), ...robustnessChecks(module.id, name)],
    skills: [module.quiz[3], `sec-${index + 1}`],
    vocabulary: module.vocabulary,
    verification: ["Exécute au moins un cas autorisé et un cas hostile; compare la décision et la preuve produite.", "Run at least one allowed case and one hostile case; compare the decision and produced evidence."],
    durationMin: 32,
    starterCode: {
      fr: `export function ${name}() {\n  // Implémente le contrôle défensif.\n}`,
      en: `export function ${name}() {\n  // Implement the defensive control.\n}`
    },
    xp: 38
  };
}

function project([id, frTitle, enTitle, frBrief, enBrief, finalProject = false], module) {
  const name = `${camel(id)}Audit`;
  return {
    id,
    project: true,
    exerciseType: "node",
    title: [frTitle, enTitle],
    brief: [frBrief, enBrief],
    solution: projectSolution(module.id, name),
    requirements: [...projectChecks(module.id, name), ...projectRobustnessChecks(name)],
    skills: [module.quiz[3], "security-project", finalProject ? "capstone" : "module-project"],
    vocabulary: module.vocabulary,
    verification: ["Lance la suite avec une preuve d'attaque par risque; une simple liste de mots ne valide pas le projet.", "Run the suite with attack evidence for each risk; a list of keywords does not validate the project."],
    rubric: [["Chaque risque est relié à un abus réaliste.", "Each risk maps to a realistic abuse case."], ["Les contrôles refusent les cas hostiles.", "Controls reject hostile cases."], ["Les preuves sont reproductibles et sans secret.", "Evidence is reproducible and secret-free."], ["Les limites et responsables sont explicites.", "Limitations and owners are explicit."]],
    durationMin: finalProject ? 240 : 130,
    starterCode: {
      fr: `export function ${name}(scenarios) {\n  // Évalue chaque scénario et conserve sa preuve.\n}`,
      en: `export function ${name}(scenarios) {\n  // Evaluate each scenario and retain its evidence.\n}`
    },
    xp: finalProject ? 180 : 100
  };
}

function controlSolution(moduleId, slug, name) {
  if (moduleId === "sec-risk-modeling") return `export function ${name}(scenario) {\n  const complete = ["asset", "actor", "boundary", "abuse", "impact", "evidence"].every((key) => Boolean(scenario?.[key]));\n  return { accepted: complete, risk: complete ? scenario.likelihood * scenario.impact : null, reason: complete ? "MODELED" : "INCOMPLETE_MODEL" };\n}`;
  if (moduleId === "sec-browser-defenses") return `export function ${name}(request) {\n  const trustedOrigin = request.origin === "https://app.pulsateach.test";\n  const safeText = String(request.body || "").replaceAll("<", "&lt;");\n  const allowed = trustedOrigin && request.csrfToken === request.sessionToken;\n  return { allowed, status: allowed ? 200 : 403, rendered: safeText, headers: { "content-security-policy": "default-src 'self'; object-src 'none'; frame-ancestors 'none'" } };\n}`;
  if (moduleId === "sec-api-abuse") return `export function ${name}(request) {\n  const bodyKeys = Object.keys(request.body || {});\n  const validBody = bodyKeys.every((key) => ["title", "visibility"].includes(key)) && String(request.body?.title || "").length <= 120;\n  const owns = request.userId === request.resourceOwnerId;\n  const allowed = validBody && owns && request.attempts <= 5;\n  return { allowed, status: !validBody ? 400 : request.attempts > 5 ? 429 : allowed ? 200 : 403, code: allowed ? "OK" : "REQUEST_DENIED", requestId: request.requestId };\n}`;
  if (moduleId === "sec-files-secrets") return `export function ${name}(file, context = {}) {\n  const signatures = { "image/png": "89504e47", "image/jpeg": "ffd8ff" };\n  const safeFile = file.size <= 1_000_000 && signatures[file.type] === file.signature;\n  const secretFree = !String(context.bundle || "").includes("SUPABASE_SERVICE_ROLE_KEY");\n  return { accepted: safeFile && secretFree, status: !safeFile ? 415 : secretFree ? 201 : 500, storageKey: safeFile ? context.userId + "/generated-object" : null };\n}`;
  return `export function ${name}(event) {\n  const redacted = { ...event, authorization: "[Redacted]", cookie: "[Redacted]", token: "[Redacted]" };\n  const actionable = Boolean(event.eventType && event.requestId && event.owner);\n  return { actionable, preserveEvidence: true, contained: event.compromised ? Boolean(event.revokedAt) : true, event: redacted };\n}`;
}

function behaviorChecks(moduleId, slug, name) {
  if (moduleId === "sec-risk-modeling") return [
    js("Un scénario incomplet est refusé", `return ${name}({ asset: "account" }).accepted === false;`),
    js("Un scénario complet produit un score", `const r=${name}({asset:"account",actor:"attacker",boundary:"API",abuse:"cross-user read",impact:4,evidence:"403 test",likelihood:3}); return r.accepted && r.risk===12;`)
  ];
  if (moduleId === "sec-browser-defenses") return [
    js("Une origine hostile est refusée", `return ${name}({origin:"https://evil.test",csrfToken:"a",sessionToken:"a",body:"ok"}).status===403;`),
    js("Le contenu actif reste du texte", `const r=${name}({origin:"https://app.pulsateach.test",csrfToken:"a",sessionToken:"a",body:"<script>alert(1)</script>"}); return r.allowed && !r.rendered.includes("<script>") && r.headers["content-security-policy"].includes("frame-ancestors 'none'");`)
  ];
  if (moduleId === "sec-api-abuse") return [
    js("Un champ privilégié injecté est refusé", `return ${name}({body:{title:"x",role:"admin"},userId:"a",resourceOwnerId:"a",attempts:1,requestId:"r1"}).status===400;`),
    js("Une ressource d'un autre compte est refusée", `return ${name}({body:{title:"x"},userId:"a",resourceOwnerId:"b",attempts:1,requestId:"r2"}).status===403;`),
    js("Le quota produit 429", `return ${name}({body:{title:"x"},userId:"a",resourceOwnerId:"a",attempts:6,requestId:"r3"}).status===429;`)
  ];
  if (moduleId === "sec-files-secrets") return [
    js("Un MIME mensonger est refusé", `return ${name}({size:20,type:"image/png",signature:"ffd8ff"},{userId:"a",bundle:""}).accepted===false;`),
    js("Une clé dans le bundle bloque le traitement", `return ${name}({size:20,type:"image/png",signature:"89504e47"},{userId:"a",bundle:"SUPABASE_SERVICE_ROLE_KEY"}).status===500;`),
    js("Un fichier permis reçoit un nom serveur", `const r=${name}({size:20,type:"image/png",signature:"89504e47"},{userId:"a",bundle:""}); return r.accepted && r.storageKey==="a/generated-object";`)
  ];
  return [
    js("Les credentials sont expurgés", `const r=${name}({eventType:"AUTH_DENIED",requestId:"r1",owner:"security",authorization:"Bearer secret",cookie:"sid=secret",token:"secret"}); return r.event.authorization==="[Redacted]" && r.event.cookie==="[Redacted]" && r.event.token==="[Redacted]";`),
    js("Un compromis exige une révocation", `return ${name}({eventType:"KEY_LEAK",requestId:"r2",owner:"security",compromised:true}).contained===false;`)
  ];
}

function robustnessChecks(moduleId, name) {
  if (moduleId === "sec-risk-modeling") return [
    js("Un objet vide ne devient pas un modèle", `return ${name}({}).reason==="INCOMPLETE_MODEL";`),
    js("Une frontière manquante reste visible", `return !${name}({asset:"a",actor:"b",abuse:"c",impact:2,evidence:"d",likelihood:2}).accepted;`),
    js("Une preuve manquante empêche la décision", `return !${name}({asset:"a",actor:"b",boundary:"API",abuse:"c",impact:2,likelihood:2}).accepted;`),
    js("Le score dépend de l'impact", `const a=${name}({asset:"a",actor:"b",boundary:"API",abuse:"c",impact:1,evidence:"d",likelihood:2}); const b=${name}({asset:"a",actor:"b",boundary:"API",abuse:"c",impact:4,evidence:"d",likelihood:2}); return a.risk<b.risk;`),
    js("Le score dépend de la vraisemblance", `const a=${name}({asset:"a",actor:"b",boundary:"API",abuse:"c",impact:2,evidence:"d",likelihood:1}); const b=${name}({asset:"a",actor:"b",boundary:"API",abuse:"c",impact:2,evidence:"d",likelihood:4}); return a.risk<b.risk;`),
    js("Le contrôle ne modifie pas le scénario", `const s={asset:"a"}; ${name}(s); return Object.keys(s).length===1;`),
    js("Une valeur nulle est refusée proprement", `return ${name}(null).accepted===false;`),
    js("Le refus ne fabrique aucun score", `return ${name}({asset:"a"}).risk===null;`),
    js("Un modèle complet annonce sa décision", `return ${name}({asset:"a",actor:"b",boundary:"API",abuse:"c",impact:2,evidence:"d",likelihood:2}).reason==="MODELED";`)
  ];
  if (moduleId === "sec-browser-defenses") return [
    js("Un jeton absent est refusé", `return ${name}({origin:"https://app.pulsateach.test",body:"ok"}).status===403;`),
    js("Un jeton rejoué dans une autre session est refusé", `return ${name}({origin:"https://app.pulsateach.test",csrfToken:"a",sessionToken:"b",body:"ok"}).status===403;`),
    js("Une origine ressemblante est refusée", `return ${name}({origin:"https://app.pulsateach.test.evil.test",csrfToken:"a",sessionToken:"a",body:"ok"}).status===403;`),
    js("Une balise image reste inerte", `return !${name}({origin:"https://app.pulsateach.test",csrfToken:"a",sessionToken:"a",body:"<img src=x onerror=alert(1)>"}).rendered.includes("<img");`),
    js("La CSP bloque les objets", `return ${name}({}).headers["content-security-policy"].includes("object-src 'none'");`),
    js("La CSP limite la source par défaut", `return ${name}({}).headers["content-security-policy"].includes("default-src 'self'");`),
    js("Une requête légitime reste possible", `return ${name}({origin:"https://app.pulsateach.test",csrfToken:"z",sessionToken:"z",body:"hello"}).status===200;`),
    js("Le corps source n'est pas modifié", `const r={origin:"https://evil.test",body:"<b>x</b>"}; ${name}(r); return r.body==="<b>x</b>";`),
    js("Le refus n'efface pas les en-têtes défensifs", `return ${name}({origin:"https://evil.test"}).headers["content-security-policy"].includes("frame-ancestors");`)
  ];
  if (moduleId === "sec-api-abuse") return [
    js("Un titre surdimensionné est refusé", `return ${name}({body:{title:"x".repeat(121)},userId:"a",resourceOwnerId:"a",attempts:1}).status===400;`),
    js("Un body absent est refusé", `return ${name}({userId:"a",resourceOwnerId:"a",attempts:1}).status===400;`),
    js("Un propriétaire fourni dans le body ne donne aucun droit", `return ${name}({body:{title:"x",ownerId:"a"},userId:"a",resourceOwnerId:"b",attempts:1}).status===400;`),
    js("Le cinquième essai reste dans le quota", `return ${name}({body:{title:"x"},userId:"a",resourceOwnerId:"a",attempts:5}).status===200;`),
    js("Le sixième essai est limité", `return ${name}({body:{title:"x"},userId:"a",resourceOwnerId:"a",attempts:6}).status===429;`),
    js("Le refus expose un code stable", `return ${name}({body:{title:"x"},userId:"a",resourceOwnerId:"b",attempts:1}).code==="REQUEST_DENIED";`),
    js("Le requestId est conservé sans stack", `const r=${name}({body:{title:"x"},userId:"a",resourceOwnerId:"b",attempts:1,requestId:"trace-7"}); return r.requestId==="trace-7" && !("stack" in r);`),
    js("Le cas propriétaire nominal est autorisé", `return ${name}({body:{title:"x",visibility:"private"},userId:"a",resourceOwnerId:"a",attempts:1}).allowed;`),
    js("Une enum inattendue ne devient pas un champ privilégié", `return ${name}({body:{title:"x",visibility:"team",admin:true},userId:"a",resourceOwnerId:"a",attempts:1}).status===400;`)
  ];
  if (moduleId === "sec-files-secrets") return [
    js("Un fichier surdimensionné est refusé", `return !${name}({size:1_000_001,type:"image/png",signature:"89504e47"},{userId:"a",bundle:""}).accepted;`),
    js("Un format non autorisé est refusé", `return !${name}({size:20,type:"image/svg+xml",signature:"3c737667"},{userId:"a",bundle:""}).accepted;`),
    js("Un JPEG signé correctement est accepté", `return ${name}({size:20,type:"image/jpeg",signature:"ffd8ff"},{userId:"a",bundle:""}).accepted;`),
    js("Le nom client ne devient pas la clé", `return ${name}({size:20,type:"image/png",signature:"89504e47",name:"../../secret"},{userId:"a",bundle:""}).storageKey!=="../../secret";`),
    js("Le stockage reste lié au compte", `return ${name}({size:20,type:"image/png",signature:"89504e47"},{userId:"user-b",bundle:""}).storageKey.startsWith("user-b/");`),
    js("Un refus ne produit aucune clé objet", `return ${name}({size:20,type:"text/html",signature:"3c68746d"},{userId:"a",bundle:""}).storageKey===null;`),
    js("La limite exacte reste acceptée", `return ${name}({size:1_000_000,type:"image/png",signature:"89504e47"},{userId:"a",bundle:""}).accepted;`),
    js("Une clé privilégiée bloque même un fichier valide", `return !${name}({size:20,type:"image/png",signature:"89504e47"},{userId:"a",bundle:"x SUPABASE_SERVICE_ROLE_KEY y"}).accepted;`),
    js("Le type et la signature doivent correspondre ensemble", `return !${name}({size:20,type:"image/jpeg",signature:"89504e47"},{userId:"a",bundle:""}).accepted;`)
  ];
  return [
    js("Un événement sans propriétaire n'est pas actionnable", `return !${name}({eventType:"AUTH_DENIED",requestId:"r"}).actionable;`),
    js("Un événement sans requestId n'est pas actionnable", `return !${name}({eventType:"AUTH_DENIED",owner:"security"}).actionable;`),
    js("Un événement complet est actionnable", `return ${name}({eventType:"AUTH_DENIED",requestId:"r",owner:"security"}).actionable;`),
    js("Une révocation horodatée contient le compromis", `return ${name}({eventType:"KEY_LEAK",requestId:"r",owner:"security",compromised:true,revokedAt:"2026-07-12T00:00:00Z"}).contained;`),
    js("La conservation des preuves reste explicite", `return ${name}({}).preserveEvidence===true;`),
    js("Le token brut n'est jamais retourné", `return ${name}({token:"raw"}).event.token!=="raw";`),
    js("Le cookie brut n'est jamais retourné", `return ${name}({cookie:"sid=raw"}).event.cookie!=="sid=raw";`),
    js("L'autorisation brute n'est jamais retournée", `return ${name}({authorization:"Bearer raw"}).event.authorization!=="Bearer raw";`),
    js("L'événement source n'est pas altéré pendant l'expurgation", `const e={authorization:"Bearer raw"}; ${name}(e); return e.authorization==="Bearer raw";`)
  ];
}

function projectSolution(moduleId, name) {
  return `export function ${name}(attacks) {\n  const results = attacks.map((attack) => ({ id: attack.id, denied: attack.expectedStatus >= 400 && attack.actualStatus === attack.expectedStatus, evidence: attack.evidence, owner: attack.owner }));\n  return { module: "${moduleId}", passed: results.length >= 3 && results.every((result) => result.denied && result.evidence && result.owner), results };\n}`;
}

function projectChecks(moduleId, name) {
  const attacks = `[{id:"cross-user",expectedStatus:403,actualStatus:403,evidence:"response",owner:"api"},{id:"hostile-input",expectedStatus:400,actualStatus:400,evidence:"test",owner:"web"},{id:"secret-leak",expectedStatus:500,actualStatus:500,evidence:"scan",owner:"platform"}]`;
  return [
    js("Trois attaques documentées sont réellement refusées", `const r=${name}(${attacks}); return r.module==="${moduleId}" && r.passed && r.results.every(x=>x.denied);`),
    js("Une preuve manquante invalide l'audit", `const attacks=${attacks}; attacks[1].evidence=""; return ${name}(attacks).passed===false;`),
    js("Un statut autorisé à tort invalide l'audit", `const attacks=${attacks}; attacks[0].actualStatus=200; return ${name}(attacks).passed===false;`)
  ];
}

function projectRobustnessChecks(name) {
  const valid = `{id:"attack",expectedStatus:403,actualStatus:403,evidence:"response",owner:"security"}`;
  return [
    js("Moins de trois scénarios invalident la livraison", `return !${name}([${valid},${valid}]).passed;`),
    js("Un scénario sans responsable invalide la livraison", `const a=${valid}; a.owner=""; return !${name}([a,${valid},${valid}]).passed;`),
    js("Un scénario sans preuve invalide la livraison", `const a=${valid}; a.evidence=""; return !${name}([a,${valid},${valid}]).passed;`),
    js("Une attaque autorisée à tort est signalée", `const a=${valid}; a.actualStatus=200; return ${name}([a,${valid},${valid}]).results[0].denied===false;`),
    js("Un succès attendu n'est pas présenté comme attaque refusée", `const a=${valid}; a.expectedStatus=200; a.actualStatus=200; return ${name}([a,${valid},${valid}]).results[0].denied===false;`),
    js("Les identifiants de preuve restent traçables", `return ${name}([${valid},${valid},${valid}]).results.every(x=>x.id==="attack");`),
    js("Le projet ne modifie pas les scénarios sources", `const a=${valid}; ${name}([a,a,a]); return a.evidence==="response";`)
  ];
}

const quizScenarios = {
  "sec-risk-modeling": [
    ["Une équipe veut ajouter CSP avant d'avoir cartographié les données. Que faire d'abord ?", "A team wants to add CSP before mapping data. What should happen first?", "Identifier actifs, acteurs, frontières et abus", "Identify assets, actors, boundaries, and abuse cases", ["Scanner les dépendances et traiter chaque alerte", "Scan dependencies and address every alert", "Activer tous les headers disponibles", "Enable every available header", "Masquer les routes sensibles dans l'interface", "Hide sensitive routes in the UI"]],
    ["Quelle preuve teste vraiment un accès croisé ?", "Which evidence genuinely tests cross-user access?", "User A reçoit 403 sur une ressource existante de user B", "User A receives 403 for an existing user B resource", ["Un identifiant inexistant retourne 404", "A missing identifier returns 404", "Le bouton de user B est caché", "User B's button is hidden", "La documentation interdit cet accès", "The documentation forbids that access"]],
    ["Deux risques ont le même impact. Lequel traiter d'abord ?", "Two risks have equal impact. Which should be handled first?", "Celui dont l'abus est le plus vraisemblable et exposé", "The one with the most likely and exposed abuse path", ["Celui dont le correctif contient le plus de code", "The one whose fix contains the most code", "Celui découvert par l'outil le plus récent", "The one found by the newest tool", "Celui qui concerne le composant le plus visible", "The one involving the most visible component"]],
    ["Quand un contrôle est-il traçable ?", "When is a control traceable?", "Quand il est relié à un abus, un responsable et une preuve", "When it links to an abuse case, owner, and evidence", ["Quand il figure dans une longue checklist", "When it appears in a long checklist", "Quand son nom correspond à OWASP", "When its name matches OWASP", "Quand il ne produit aucun log", "When it produces no logs"]],
    ["Que documenter si la vraisemblance est inconnue ?", "What should be documented when likelihood is unknown?", "L'hypothèse, l'incertitude et le moyen de la réduire", "The assumption, uncertainty, and how to reduce it", ["Une valeur maximale présentée comme certaine", "A maximum value presented as certain", "A moyenne arbitraire sans contexte", "An arbitrary average without context", "Rien tant qu'un incident n'arrive", "Nothing until an incident happens"]]
  ],
  "sec-browser-defenses": [
    ["Un produit n'a pas besoin de HTML dans les commentaires. Quelle défense primaire ?", "A product does not need HTML in comments. What is the primary defense?", "Rendre le contenu comme texte", "Render the content as text", ["Sanitiser puis utiliser innerHTML", "Sanitize then use innerHTML", "Autoriser les scripts avec nonce partagé", "Allow scripts with a shared nonce", "Compter sur CSP seule", "Rely on CSP alone"]],
    ["Pourquoi garder CSP après l'encodage ?", "Why keep CSP after output encoding?", "Elle limite l'impact si une autre injection atteint un sink exécutable", "It limits impact if another injection reaches an executable sink", ["Elle authentifie les auteurs de commentaires", "It authenticates comment authors", "Elle remplace la validation serveur", "It replaces server validation", "Elle chiffre le DOM", "It encrypts the DOM"]],
    ["Une mutation utilise un cookie SameSite=Lax. Que faut-il encore vérifier ?", "A mutation uses a SameSite=Lax cookie. What else must be checked?", "Origine et jeton CSRF", "Origin and CSRF token", ["Le header CORS de la réponse seulement", "Only the response CORS header", "Le texte du bouton de confirmation", "The confirmation button text", "La longueur du mot de passe", "Password length"]],
    ["Quel test valide l'anti-clickjacking ?", "Which test validates anti-clickjacking?", "La réponse servie interdit les frame ancestors", "The served response forbids frame ancestors", ["Le CSS contient z-index: 9999", "CSS contains z-index: 9999", "La page refuse les iframes qu'elle crée", "The page rejects iframes it creates", "CORS refuse une origine", "CORS rejects an origin"]],
    ["Un HTML riche est obligatoire. Quelle politique est défendable ?", "Rich HTML is required. Which policy is defensible?", "Une allowlist minimale d'éléments et attributs testée avec des payloads", "A minimal element and attribute allowlist tested with payloads", ["Une blocklist des balises connues aujourd'hui", "A blocklist of tags known today", "La suppression du mot script", "Removing the word script", "L'approbation manuelle de chaque navigateur", "Manual approval of each browser"]]
  ],
  "sec-api-abuse": [
    ["Un body contient role=admin non prévu. Quelle réponse ?", "A body contains an unexpected role=admin. What response is appropriate?", "Refuser le body avec le schéma strict", "Reject the body with the strict schema", ["Ignorer role puis retourner 200", "Ignore role then return 200", "Persister puis corriger en lecture", "Persist then correct on read", "Faire confiance car l'utilisateur est connecté", "Trust it because the user is signed in"]],
    ["Quel test distingue IDOR et ressource absente ?", "Which test distinguishes IDOR from a missing resource?", "Utiliser l'ID valide d'une ressource appartenant à un autre compte", "Use a valid ID for a resource owned by another account", ["Utiliser un UUID aléatoire absent", "Use a missing random UUID", "Supprimer le bouton de navigation", "Remove the navigation button", "Tester sans authentification seulement", "Test only without authentication"]],
    ["Pourquoi charger la ressource avant la décision ?", "Why load the resource before deciding?", "Pour vérifier sa propriété et son état réels côté serveur", "To verify its actual ownership and state server-side", ["Pour laisser le client choisir son ownerId", "To let the client choose its ownerId", "Pour éviter tout contrôle de rôle", "To avoid all role checks", "Pour rendre CORS inutile", "To make CORS unnecessary"]],
    ["Une limite globale bloque une école entière. Quelle amélioration ?", "A global limit blocks an entire school. What is an improvement?", "Choisir une clé et un quota liés à l'abus et au contexte", "Choose a key and quota tied to the abuse case and context", ["Supprimer toute limite", "Remove all limits", "Retourner 200 sans exécuter", "Return 200 without executing", "Limiter uniquement par User-Agent", "Limit only by User-Agent"]],
    ["Que peut contenir une erreur publique utile ?", "What can a useful public error contain?", "Un code stable et un requestId", "A stable code and requestId", ["La stack et la requête SQL", "The stack and SQL query", "Les variables d'environnement", "Environment variables", "Le token pour reproduire", "The token for reproduction"]]
  ],
  "sec-files-secrets": [
    ["Le client annonce image/png. Quelle vérification manque ?", "The client declares image/png. What check is missing?", "Comparer les octets de signature au format autorisé", "Compare signature bytes with the allowed format", ["Conserver l'extension .png", "Keep the .png extension", "Faire confiance au navigateur", "Trust the browser", "Renommer avant toute limite de taille", "Rename before any size limit"]],
    ["Pourquoi générer la clé de stockage côté serveur ?", "Why generate the storage key server-side?", "Pour éviter traversée de chemin, collisions et noms contrôlés", "To prevent path traversal, collisions, and attacker-controlled names", ["Pour rendre le fichier public", "To make the file public", "Pour remplacer le contrôle MIME", "To replace MIME checking", "Pour conserver le chemin local du client", "To retain the client's local path"]],
    ["Une clé service apparaît dans un bundle. Quelle preuve de correction ?", "A service key appears in a bundle. What proves remediation?", "Rotation de la clé et scan du nouveau bundle sans secret", "Key rotation and a scan showing no secret in the new bundle", ["Renommer la variable VITE_", "Rename the VITE_ variable", "Supprimer seulement le source map", "Delete only the source map", "Masquer la chaîne avec Base64", "Hide the string with Base64"]],
    ["Comment éviter une panne pendant rotation de signature ?", "How can an outage be avoided during signing-key rotation?", "Signer avec la nouvelle clé et vérifier brièvement avec les deux", "Sign with the new key and briefly verify with both", ["Supprimer l'ancienne avant de créer la nouvelle", "Delete the old key before creating the new one", "Publier les deux clés dans le frontend", "Publish both keys in the frontend", "Ne jamais expirer l'ancienne", "Never expire the old key"]],
    ["Une alerte de dépendance est-elle toujours exploitable ?", "Is a dependency alert always exploitable?", "Non, il faut examiner atteignabilité, contexte et correctif", "No, reachability, context, and remediation must be assessed", ["Oui, son score suffit", "Yes, its score is sufficient", "Non, les lockfiles suppriment tout risque", "No, lockfiles remove all risk", "Oui seulement en dépendance de développement", "Yes, only in a development dependency"]]
  ],
  "sec-monitoring-incident": [
    ["Quel log aide l'enquête sans créer une nouvelle fuite ?", "Which log supports investigation without creating another leak?", "Décision, route, acteur corrélé et requestId avec credentials expurgés", "Decision, route, correlated actor, and requestId with credentials redacted", ["Body complet et cookie de session", "Full body and session cookie", "Token d'accès et stack", "Access token and stack", "Mot de passe chiffré et email", "Encrypted password and email"]],
    ["Une alerte compte les 403. Que lui manque-t-il pour être actionnable ?", "An alert counts 403 responses. What makes it actionable?", "Fenêtre, seuil, contexte, propriétaire et procédure", "Window, threshold, context, owner, and runbook", ["Une couleur plus visible", "A more visible color", "Le body de chaque requête", "Every request body", "Un seuil égal à zéro partout", "A zero threshold everywhere"]],
    ["Une clé est confirmée volée. Quelle première séquence ?", "A key is confirmed stolen. What is the first sequence?", "Révoquer ou rotater, limiter l'accès et préserver la chronologie", "Revoke or rotate, limit access, and preserve the timeline", ["Effacer les logs puis redémarrer", "Erase logs then restart", "Attendre de connaître tout l'impact", "Wait until the full impact is known", "Publier immédiatement tous les détails", "Immediately publish every detail"]],
    ["Pourquoi un post-mortem sans blâme ?", "Why use a blameless postmortem?", "Pour corriger les conditions systémiques et améliorer la détection", "To fix systemic conditions and improve detection", ["Pour éviter d'attribuer des actions", "To avoid assigning actions", "Pour supprimer la chronologie", "To remove the timeline", "Pour déclarer que l'incident était inévitable", "To declare the incident unavoidable"]],
    ["Quand peut-on clore un risque prioritaire ?", "When can a priority risk be closed?", "Quand correction, test négatif, preuve et propriétaire sont vérifiés", "When the fix, negative test, evidence, and owner are verified", ["Quand le ticket est déplacé en Done", "When the ticket moves to Done", "Quand aucun client ne se plaint", "When no customer complains", "Quand le contrôle porte un nom standard", "When the control has a standard name"]]
  ]
};

export const webSecurityModules = modules.map((module) => ({
  id: module.id,
  title: module.title,
  description: module.description,
  vocabulary: module.vocabulary,
  lessons: [...module.lessons.map((item, index) => lesson(module, item, index)), project(module.project, module), quiz(module)]
}));

function quiz(module) {
  const [id, frTitle, enTitle, skill] = module.quiz;
  return {
    id,
    type: "quiz",
    title: [frTitle, enTitle],
    brief: ["Décide à partir du scénario, du risque et de la preuve.", "Decide from the scenario, risk, and evidence."],
    purpose: "module-review",
    passingScore: 75,
    questions: quizScenarios[module.id].map((scenario, index) => question(`${id}-${index + 1}`, scenario, skill))
  };
}

function question(id, [frPrompt, enPrompt, frAnswer, enAnswer, alternatives], skill) {
  const choices = [[frAnswer, enAnswer], ...chunkPairs(alternatives)];
  return {
    id,
    type: "single",
    prompt: [frPrompt, enPrompt],
    choices: choices.map(([fr, en], index) => ({ id: `${id}-${index + 1}`, label: [fr, en] })),
    answer: `${id}-1`,
    explanation: ["Cette décision traite le risque observé et laisse une preuve vérifiable.", "This decision addresses the observed risk and leaves verifiable evidence."],
    points: 1,
    skills: [skill],
    glossaryTerms: []
  };
}

function chunkPairs(values) {
  return Array.from({ length: values.length / 2 }, (_, index) => values.slice(index * 2, index * 2 + 2));
}

function js(label, value) {
  return {
    type: "jsExpression",
    label: {
      fr: label,
      en: "The defensive control handles this security scenario as expected."
    },
    value
  };
}

function camel(value) {
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()).replace(/^[^a-zA-Z]+/, "");
}
