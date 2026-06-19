import { runJavaScriptConsoleSandbox, runJavaScriptExpressionSandbox } from "./jsSandboxClient.js";

export function createPreview(lesson, code) {
  const kind = getPreviewKind(lesson);

  if (kind === "css") {
    return `<!doctype html><html><head><style>
      body { margin: 0; font-family: system-ui, sans-serif; background: #f8fafc; color: #172033; }
      .demo-surface { padding: 24px; }
      .panel { margin-bottom: 20px; }
      .card { background: white; border: 1px solid #cbd5e1; border-radius: 10px; margin: 8px; padding: 16px; font-weight: 700; }
      .toolbar button { border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; background: white; font-weight: 700; }
      .gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 20px; }
      .gallery span { display: block; min-height: 70px; border-radius: 10px; border: 1px solid #cbd5e1; background: #e0e7ff; }
      ${code}
    </style></head><body>${lesson.previewHtml || defaultCssPreview()}</body></html>`;
  }

  if (kind === "dom") {
    return `<!doctype html><html><head><style>
      body { font-family: system-ui, sans-serif; padding: 24px; background: #f8fafc; color: #172033; }
      button { border: 0; border-radius: 8px; background: #4f46e5; color: white; padding: 12px 18px; font-weight: 700; }
      span { display: inline-grid; place-items: center; min-width: 56px; margin-left: 12px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; padding: 12px; font-weight: 700; }
    </style></head><body>${code}</body></html>`;
  }

  if (kind === "html") return createHtmlPreview(code);

  return createJavaScriptPreview();
}

export function getPreviewKind(lesson) {
  if (lesson.type === "terminal" || lesson.runtime === "terminal") return "terminal";
  if (lesson.type === "text" || lesson.runtime === "text") return "text";
  if (lesson.type === "typescript" || lesson.runtime === "typescript") return "typescript";
  if (lesson.type === "react" || lesson.runtime === "react") return "react";
  if (lesson.type === "node" || lesson.runtime === "node") return "node";
  if (lesson.type === "sql" || lesson.runtime === "sql") return "sql";
  if (lesson.type === "css" || lesson.id.startsWith("css-")) return "css";
  if (lesson.type === "dom") return "dom";
  if (lesson.type === "js" || lesson.id.startsWith("js-")) return "javascript";
  return "html";
}

function createHtmlPreview(code) {
  const hasBody = /<body[\s>]/i.test(code);
  const bodyMatch = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyIsEmpty = hasBody && !bodyMatch?.[1]?.trim();
  const helper = `<style>
    html { font-family: system-ui, sans-serif; color: #172033; }
    body { margin: 0; min-height: 100vh; }
    .pulsateach-empty-preview { min-height: 100vh; display: grid; place-items: center; padding: 24px; box-sizing: border-box; background: #f8fafc; color: #64748b; text-align: center; }
    .pulsateach-empty-preview strong { display: block; margin-bottom: 8px; color: #172033; }
  </style>`;
  const emptyState = `<div class="pulsateach-empty-preview"><p><strong>Body vide</strong>Ajoute un élément visible dans &lt;body&gt; pour le voir ici.</p></div>`;

  let preview = code.trim() || "<!doctype html><html><head></head><body></body></html>";
  preview = /<\/head>/i.test(preview) ? preview.replace(/<\/head>/i, `${helper}</head>`) : `${helper}${preview}`;
  if (bodyIsEmpty) preview = preview.replace(/<body([^>]*)>\s*<\/body>/i, `<body$1>${emptyState}</body>`);
  if (!hasBody) preview = `${helper}<body>${preview}</body>`;
  return preview;
}

function defaultCssPreview() {
  return `<main class="demo-surface">
    <section class="panel">
      <article class="card course-card">HTML Quest</article>
      <article class="card course-card">CSS Lab</article>
      <article class="card course-card">JS Arena</article>
    </section>
    <div class="toolbar"><button>Run</button><button>Hint</button><button>Ship</button></div>
    <div class="gallery"><span></span><span></span><span></span><span></span></div>
  </main>`;
}

function createJavaScriptPreview() {
  return "<!doctype html><html><body></body></html>";
}

export async function validateLesson(lesson, code) {
  const activeCode = stripCodeComments(code);
  const results = [];
  for (const item of lesson.tests) {
    let pass = false;
    if (item.type === "contains" || item.type === "doctype") {
      pass = normalize(activeCode).includes(normalize(item.value));
    }
    if (item.type === "notContains") {
      pass = !normalize(activeCode).includes(normalize(item.value));
    }
    if (item.type === "selector" || item.type === "minSelector") {
      pass = checkSelector(code, item.value, item.amount || 1);
    }
    if (item.type === "jsExpression") {
      pass = await runJavaScriptExpression(code, item.value);
    }
    if (item.type === "cssDeclaration") {
      pass = hasCssDeclaration(code, item.value.selector, item.value.property);
    }
    results.push({ ...item, pass });
  }
  return results;
}

function hasCssDeclaration(code, selector, property) {
  const activeCode = stripCodeComments(code);
  if (selector === "@media") return normalize(activeCode).includes(normalize(property));
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`${escaped}\\s*\\{[^}]*${property}\\s*:`, "i");
  return pattern.test(activeCode);
}

function stripCodeComments(value) {
  return String(value)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "");
}

async function runJavaScriptExpression(code, expression) {
  const result = await runJavaScriptExpressionSandbox(code, expression);
  return Boolean(result.ok && result.value);
}

export function testFailureHelp(check, locale) {
  if (locale !== "fr") {
    if (check.type === "jsExpression") return "The code runs, but the produced result does not match this scenario.";
    if (check.type === "cssDeclaration") return "Check the selector and the exact CSS property.";
    return "Check the requested syntax and make sure it is active code, not a comment.";
  }
  if (check.type === "jsExpression") return "Le code s'exécute, mais le résultat produit ne correspond pas encore à ce scénario.";
  if (check.type === "cssDeclaration") return "Vérifie le sélecteur ciblé et la propriété CSS exacte.";
  if (check.type === "selector" || check.type === "minSelector") return "Vérifie la structure HTML et le nombre d'éléments demandés.";
  return "Vérifie la syntaxe demandée et assure-toi qu'elle se trouve dans du code actif, pas dans un commentaire.";
}

export function displayTestLabel(check, locale) {
  if (locale !== "fr") return check.label;
  if (check.type === "cssDeclaration") return `La propriété « ${check.value.property} » est déclarée sur « ${check.value.selector} »`;
  if (check.type === "minSelector") return `Au moins ${check.amount || 1} éléments correspondent à « ${check.value} »`;
  if (check.type === "selector") return `La structure attendue « ${check.label} » est présente`;
  if (check.label === "target selector") return `Le sélecteur demandé « ${check.value} » est présent`;
  return check.label;
}

export async function runJavaScriptWithConsole(code, locale) {
  const result = await runJavaScriptConsoleSandbox(code);
  if (result.timedOut) return locale === "fr" ? "Erreur: Temps d'exécution dépassé." : "Error: Execution timed out.";
  if (!result.ok) return `${locale === "fr" ? "Erreur" : "Error"}: ${result.error}`;
  return result.logs?.length ? result.logs.join("\n") : (locale === "fr" ? "Code exécuté sans erreur. Aucun message console." : "Code ran without errors. No console output.");
}

function checkSelector(code, selector, minimum) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, "text/html");
    return doc.querySelectorAll(selector).length >= minimum;
  } catch {
    return false;
  }
}

function normalize(value) {
  return String(value).toLowerCase().replace(/\s+/g, " ").trim();
}
