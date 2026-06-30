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
    id: "sec-v9-risk-modeling",
    title: ["Penser comme un défenseur", "Think like a defender"],
    description: ["Partir des actifs et des abus réels avant d'ajouter des contrôles.", "Start from real assets and abuse cases before adding controls."],
    vocabulary: [t.threat, t.proof, t.incident],
    lessons: [
      ["assets", "Lister les actifs critiques", "Identifie comptes, progression, certificats, clés et données privées.", "SecurityAssets", ["comptes", "progression", "clés"]],
      ["boundaries", "Tracer les frontières", "Sépare navigateur, API, stockage, email et services tiers.", "TrustBoundaries", ["navigateur", "API", "stockage"]],
      ["abuse-case", "Écrire un cas d'abus", "Transforme une fonctionnalité en scénario d'attaque testable.", "AbuseCase", ["attaquant", "impact", "preuve"]],
      ["risk-score", "Prioriser par risque", "Note probabilité, impact, détectabilité et effort de correction.", "RiskScore", ["impact", "probabilité", "effort"]],
      ["negative-test", "Créer une preuve négative", "Ajoute un test qui doit échouer pour l'attaquant.", "NegativeTest", ["expect(403)", "user-a", "user-b"]],
      ["control-map", "Relier risque et contrôle", "Associe validation, authz, logs ou RLS à chaque abus prioritaire.", "ControlMap", ["validation", "authz", "logs"]]
    ],
    project: ["sec-v9-threat-model-project", "Mini-projet : threat model PulsaTeach", "Produis une matrice actifs/frontières/abus/contrôles/preuves pour une plateforme de cours.", "ThreatModel", ["actifs", "frontières", "abus", "preuves"]],
    quiz: ["sec-v9-threat-quiz", "Quiz : risques et preuves", "security-threat-modeling"]
  },
  {
    id: "sec-v9-browser-defenses",
    title: ["Défenses navigateur : XSS, CSP, cookies", "Browser defenses: XSS, CSP, cookies"],
    description: ["Réduire l'exécution active et durcir les cookies/session côté navigateur.", "Reduce active execution and harden browser-side cookies/session."],
    vocabulary: [t.xss, t.header, t.csrf],
    lessons: [
      ["escape", "Rendre du texte sans HTML actif", "Préserve le contenu utilisateur comme donnée.", "EscapedComment", ["textContent", "{body}", "pas innerHTML"]],
      ["sanitize", "Sanitiser seulement si nécessaire", "Décris une politique fermée pour le HTML réellement autorisé.", "SanitizePolicy", ["allowlist", "a[href]", "strong"]],
      ["csp", "Poser une CSP restrictive", "Bloque inline script, object et framing non voulu.", "CspPolicy", ["default-src 'self'", "object-src 'none'", "frame-ancestors 'none'"]],
      ["cookies", "Configurer des cookies sûrs", "Combine httpOnly, secure, sameSite et durée limitée.", "SecureCookie", ["httpOnly", "secure", "sameSite"]],
      ["csrf-token", "Valider un token CSRF", "Vérifie origin et token pour les mutations cookie-based.", "CsrfGuard", ["Origin", "x-csrf-token", "403"]],
      ["clickjacking", "Empêcher l'encapsulation", "Bloque l'affichage du site dans une frame hostile.", "FrameGuard", ["frame-ancestors", "X-Frame-Options"]]
    ],
    project: ["sec-v9-browser-project", "Mini-projet : page commentaires durcie", "Protège commentaires, cookies, CSRF, CSP et framing avec tests de refus.", "HardenedComments", ["CSP", "httpOnly", "x-csrf-token", "expect(403)"]],
    quiz: ["sec-v9-browser-quiz", "Quiz : navigateur sécurisé", "browser-security"]
  },
  {
    id: "sec-v9-api-abuse",
    title: ["API : validation, authz et abus", "APIs: validation, authz, and abuse"],
    description: ["Refuser les entrées non fiables et prouver l'isolation utilisateur.", "Reject untrusted input and prove user isolation."],
    vocabulary: [t.authz, t.proof, ["rate limit", "rate limit", "Quota qui réduit les abus répétitifs.", "Quota reducing repetitive abuse."]],
    lessons: [
      ["schema", "Valider un body strict", "Refuse champs inconnus, tailles extrêmes et enums invalides.", "StrictSchema", ["strict()", "max(", "enum"]],
      ["mass-assignment", "Bloquer mass assignment", "Ne copie jamais tout request.body dans le modèle.", "MassAssignmentGuard", ["pick", "allowed", "role"]],
      ["idor", "Tester un IDOR", "Vérifie qu'un utilisateur ne lit pas une ressource d'un autre.", "IdorTest", ["user-a", "user-b", "expect(403)"]],
      ["rbac", "Combiner rôle et propriété", "Autorise une action seulement si rôle et ressource concordent.", "RoleOwnerPolicy", ["roles", "ownerId", "403"]],
      ["rate", "Limiter une mutation sensible", "Ajoute quota à login, contact et publication.", "MutationRateLimit", ["windowMs", "limit", "429"]],
      ["safe-error", "Répondre sans fuite interne", "Retourne code stable et requestId, pas stack ni SQL.", "SafeError", ["requestId", "code", "pas stack"]]
    ],
    project: ["sec-v9-api-project", "Mini-projet : API anti-abus", "Ajoute validation, rate limit, tests IDOR, erreurs sûres et matrice d'accès.", "AbuseResistantApi", ["expect(400)", "expect(403)", "rateLimit", "requestId"]],
    quiz: ["sec-v9-api-quiz", "Quiz : API anti-abus", "api-security"]
  },
  {
    id: "sec-v9-files-secrets",
    title: ["Uploads, secrets et supply-chain", "Uploads, secrets, and supply chain"],
    description: ["Contrôler les fichiers, garder les clés côté serveur et réduire le risque tiers.", "Control files, keep keys server-side, and reduce third-party risk."],
    vocabulary: [t.upload, t.secret, t.dependency],
    lessons: [
      ["upload-size", "Limiter taille et nombre", "Refuse fichiers surdimensionnés et rafales d'upload.", "UploadLimit", ["1_000_000", "413", "limit"]],
      ["mime-signature", "Vérifier MIME et signature", "Ne crois pas le nom ou type déclaré par le client.", "FileSignature", ["mimetype", "magic bytes", "415"]],
      ["storage-name", "Générer un nom serveur", "Évite path traversal et collisions avec UUID.", "SafeObjectName", ["crypto.randomUUID", "userId", "pas filename"]],
      ["server-secret", "Garder les clés hors frontend", "Interdis les clés service dans VITE_ et le bundle.", "ServerSecrets", ["SUPABASE_SERVICE_ROLE_KEY", "pas VITE_", "server only"]],
      ["rotation", "Préparer la rotation", "Garde clé active et ancienne en verify-only temporaire.", "KeyRotation", ["active", "verify-only", "expiresAt"]],
      ["dependency-audit", "Auditer la supply-chain", "Verrouille lockfile, npm ci, audit et provenance.", "DependencyAudit", ["npm ci", "lockfile", "audit"]]
    ],
    project: ["sec-v9-supply-project", "Mini-projet : pipeline fichiers et secrets", "Implémente upload sûr, scanner de secrets, audit dépendances et runbook rotation.", "FileSecretPipeline", ["UPLOAD_TOO_LARGE", "UNSUPPORTED_MEDIA_TYPE", "npm audit", "rotation"]],
    quiz: ["sec-v9-files-quiz", "Quiz : fichiers et secrets", "files-secrets-security"]
  },
  {
    id: "sec-v9-monitoring-incident",
    title: ["Monitoring sécurité et incident", "Security monitoring and incident"],
    description: ["Détecter sans fuite, contenir vite et documenter les corrections.", "Detect without leakage, contain quickly, and document fixes."],
    vocabulary: [t.incident, t.proof, ["redaction", "redaction", "Suppression automatique des champs sensibles dans les logs.", "Automatic removal of sensitive fields from logs."]],
    lessons: [
      ["log-redact", "Journaliser avec redaction", "Garde route, statut, userId, requestId, sans token/cookie.", "RedactedLogs", ["authorization", "cookie", "requestId"]],
      ["security-event", "Émettre un événement sécurité", "Trace login refusé, 403, upload rejeté et rotation.", "SecurityEvent", ["event_type", "actorId", "severity"]],
      ["alert", "Créer une alerte utile", "Alerte sur 403 anormaux, 5xx auth ou upload rejeté.", "SecurityAlert", ["threshold", "window", "owner"]],
      ["contain", "Contenir sans détruire", "Révoque clés et sessions tout en conservant les preuves.", "ContainmentPlan", ["revoke", "preserve logs", "timeline"]],
      ["postmortem", "Écrire un post-mortem", "Documente cause, impact, actions et prévention sans blâme.", "Postmortem", ["cause", "impact", "prevention"]],
      ["final-check", "Créer une checklist audit", "Relie chaque risque à correction, test et propriétaire.", "AuditChecklist", ["risk", "evidence", "owner"]]
    ],
    project: ["sec-v9-final-capstone", "Projet final : audit sécurité complet", "Livre threat model, correctifs, tests d'abus, logs sûrs, alertes et runbook incident.", "SecurityAuditCapstone", ["threat model", "expect(403)", "redaction", "runbook"], true],
    quiz: ["sec-v9-incident-quiz", "Quiz : incident et monitoring", "security-incident"]
  }
];

export const webSecurityV9Modules = modules.map((module) => ({
  id: module.id,
  title: module.title,
  description: module.description,
  vocabulary: module.vocabulary,
  lessons: [...module.lessons.map((item, index) => lesson(module, item, index)), project(module.project, module), quiz(module.quiz)]
}));

function lesson(module, [slug, title, brief, symbol, requirements], index) {
  return {
    id: `${module.id}-${slug}`,
    type: "node",
    title: [title, title],
    brief: [brief, `Practice: ${brief}`],
    solution: `export function ${symbol}(context = {}) {\n  return {\n    ok: true,\n    control: "${slug}",\n    evidence: context.requestId || "security-review"\n  };\n}`,
    requirements,
    skills: [module.quiz[2], `sec-v9-${index + 1}`],
    vocabulary: module.vocabulary,
    durationMin: 32,
    xp: 38
  };
}

function project([id, title, brief, symbol, requirements, finalProject = false], module) {
  return {
    id,
    project: true,
    exerciseType: "node",
    title: [title, title],
    brief: [brief, `Build and prove: ${brief}`],
    solution: `export function ${symbol}Audit() {\n  return {\n    risks: ["cross-user access", "active input", "secret exposure"],\n    controls: ${JSON.stringify(requirements.slice(0, 4))},\n    evidence: ["expect(400)", "expect(403)", "redacted logs"]\n  };\n}`,
    requirements,
    skills: [module.quiz[2], "security-project", finalProject ? "capstone" : "module-project"],
    vocabulary: module.vocabulary,
    durationMin: finalProject ? 240 : 130,
    xp: finalProject ? 180 : 100
  };
}

function quiz([id, title, skill]) {
  return {
    id,
    type: "quiz",
    title: [title, title],
    brief: ["Choisis la défense qui répond au risque avec une preuve vérifiable.", "Choose the defense that addresses the risk with verifiable evidence."],
    purpose: "module-review",
    passingScore: 75,
    questions: [
      q(`${id}-1`, "Quel élément transforme une checklist sécurité en preuve ?", "Un test d'abus reproductible", ["Un bouton caché", "Un commentaire TODO", "Un style rouge"], skill),
      q(`${id}-2`, "Quel signal ne doit jamais apparaître dans les logs ?", "Token, cookie ou clé service", ["requestId", "status HTTP", "durée"], skill),
      q(`${id}-3`, "Quelle défense réduit le risque XSS navigateur ?", "Encodage texte et CSP restrictive", ["CORS seul", "Un mot de passe long", "Un index SQL"], skill),
      q(`${id}-4`, "Comment prouver l'isolation utilisateur ?", "Avec un test user A refusé sur ressource user B", ["Avec une capture", "Avec une page 404 décorative", "Avec un texte marketing"], skill),
      q(`${id}-5`, "Que faire après une fuite de secret confirmée ?", "Révoquer, rotater, contenir, préserver les preuves", ["Supprimer tous les logs", "Attendre le prochain sprint", "Mettre la clé dans VITE_"], skill)
    ]
  };
}

function q(id, prompt, answer, distractors, skill) {
  return {
    id,
    type: "single",
    prompt: [prompt, prompt],
    choices: [answer, ...distractors].map((label) => ({ id: label, label: [label, label] })),
    answer,
    explanation: ["La bonne réponse réduit un risque concret et produit une preuve réutilisable.", "The correct answer reduces a concrete risk and produces reusable evidence."],
    points: 1,
    skills: [skill],
    glossaryTerms: []
  };
}
