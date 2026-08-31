import { runJavaScriptConsoleSandbox, runJavaScriptExpressionSandbox } from "./jsSandboxClient.js";
import { createComputedStyleBridge, createPreviewCspMeta } from "./security/sandboxPolicy.js";
import { resolveLocaleValue } from "./localeValue.js";

export function createPreview(lesson, code, locale = "fr") {
  const kind = getPreviewKind(lesson);

  if (kind === "css") {
    return `<!doctype html><html><head>${createPreviewCspMeta()}<style>
      body { margin: 0; font-family: system-ui, sans-serif; background: #f8fafc; color: #172033; }
      .demo-surface { padding: 24px; }
      .panel { margin-bottom: 20px; }
      .card { background: white; border: 1px solid #cbd5e1; border-radius: 10px; margin: 8px; padding: 16px; font-weight: 700; }
      .toolbar button { border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; background: white; font-weight: 700; }
      .gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 20px; }
      .gallery span { display: block; min-height: 70px; border-radius: 10px; border: 1px solid #cbd5e1; background: #e0e7ff; }
      ${escapeStyleContent(code)}
    </style></head><body>${resolveLocaleValue(lesson.previewHtml, locale) || defaultCssPreview(locale)}${createComputedStyleBridge()}</body></html>`;
  }

  if (kind === "dom") {
    return `<!doctype html><html><head>${createPreviewCspMeta()}<style>
      body { font-family: system-ui, sans-serif; padding: 24px; background: #f8fafc; color: #172033; }
      button { border: 0; border-radius: 8px; background: #4f46e5; color: white; padding: 12px 18px; font-weight: 700; }
      span { display: inline-grid; place-items: center; min-width: 56px; margin-left: 12px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; padding: 12px; font-weight: 700; }
    </style></head><body>${code}</body></html>`;
  }

  if (kind === "html") return createHtmlPreview(code, locale);

  return createJavaScriptPreview();
}

export function getPreviewKind(lesson) {
  const lessonId = String(lesson.id || "");
  if (lesson.type === "terminal" || lesson.runtime === "terminal") return "terminal";
  if (lesson.type === "text" || lesson.runtime === "text") return "text";
  if (lesson.type === "typescript" || lesson.runtime === "typescript") return "typescript";
  if (lesson.type === "react" || lesson.runtime === "react") return "react";
  if (lesson.type === "node" || lesson.runtime === "node") return "node";
  if (lesson.type === "sql" || lesson.runtime === "sql") return "sql";
  if (lesson.type === "css" || lessonId.startsWith("css-")) return "css";
  if (lesson.type === "dom") return "dom";
  if (lesson.type === "js" || lessonId.startsWith("js-")) return "javascript";
  return "html";
}

function createHtmlPreview(code, locale) {
  const hasBody = /<body[\s>]/i.test(code);
  const bodyMatch = code.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyIsEmpty = hasBody && !bodyMatch?.[1]?.trim();
  const helper = `${createPreviewCspMeta()}<style>
    html { font-family: system-ui, sans-serif; color: #172033; }
    body { margin: 0; min-height: 100vh; }
    .pulsateach-empty-preview { min-height: 100vh; display: grid; place-items: center; padding: 24px; box-sizing: border-box; background: #f8fafc; color: #64748b; text-align: center; }
    .pulsateach-empty-preview strong { display: block; margin-bottom: 8px; color: #172033; }
  </style>`;
  const emptyState = locale === "fr"
    ? `<div class="pulsateach-empty-preview"><p><strong>Body vide</strong>Ajoute un élément visible dans &lt;body&gt; pour le voir ici.</p></div>`
    : `<div class="pulsateach-empty-preview"><p><strong>Empty body</strong>Add a visible element inside &lt;body&gt; to see it here.</p></div>`;

  let preview = code.trim() || "<!doctype html><html><head></head><body></body></html>";
  if (bodyIsEmpty) preview = preview.replace(/<body([^>]*)>\s*<\/body>/i, `<body$1>${emptyState}</body>`);
  if (!/<html[\s>]/i.test(preview)) return `<!doctype html><html><head>${helper}</head><body>${preview}</body></html>`;
  if (/<\/head>/i.test(preview)) return preview.replace(/<\/head>/i, `${helper}</head>`);
  if (/<head[\s>]/i.test(preview)) return preview.replace(/<head([^>]*)>/i, `<head$1>${helper}`);
  return preview.replace(/<html([^>]*)>/i, `<html$1><head>${helper}</head>`);
}

function defaultCssPreview(locale) {
  const actions = locale === "fr" ? ["Exécuter", "Indice", "Publier"] : ["Run", "Hint", "Ship"];
  return `<main class="demo-surface">
    <section class="panel">
      <article class="card course-card">HTML Quest</article>
      <article class="card course-card">CSS Lab</article>
      <article class="card course-card">JS Arena</article>
    </section>
    <div class="toolbar"><button>${actions[0]}</button><button>${actions[1]}</button><button>${actions[2]}</button></div>
    <div class="gallery"><span></span><span></span><span></span><span></span></div>
  </main>`;
}

function createJavaScriptPreview() {
  return `<!doctype html><html><head>${createPreviewCspMeta()}</head><body></body></html>`;
}

export async function validateLesson(lesson, code, locale = "fr", renderedStyles = []) {
  const activeCode = stripCodeComments(code);
  const results = [];
  for (const sourceItem of lesson.tests) {
    const item = resolveLocaleValue(sourceItem, locale);
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
    if (item.type === "exactSelector") {
      pass = checkSelectorCount(code, item.value, item.amount || 1);
    }
    if (item.type === "attributeEquals") {
      pass = checkAttributeEquals(code, item.value.selector, item.value.attribute, item.value.expected);
    }
    if (item.type === "containsAny") {
      pass = asValues(item.value).some((value) => normalize(activeCode).includes(normalize(value)));
    }
    if (item.type === "notContainsAny") {
      pass = asValues(item.value).every((value) => !normalize(activeCode).includes(normalize(value)));
    }
    if (["referenceExists", "nonEmptyAttribute", "attributeIncludes", "domOrder", "labelForControl", "allMatch", "noneMatch", "uniqueIds", "validFragmentTargets", "labelsAssociated", "formControlsNamed", "documentSanity"].includes(item.type)) {
      pass = checkHtmlSemanticAssertion(code, item);
    }
    if (item.type === "jsExpression") {
      pass = await runJavaScriptExpression(code, item.value);
    }
    if (item.type === "cssDeclaration") {
      pass = hasCssDeclaration(code, item.value.selector, item.value.property);
    }
    if (item.type === "computedStyle") {
      const result = renderedStyles.find((entry) => entry.selector === item.value.selector && entry.property === item.value.property);
      pass = result?.value === item.value.equals;
    }
    results.push({ ...item, pass });
  }
  return results;
}

function escapeStyleContent(value) {
  return String(value).replace(/<\/style/gi, "<\\/style");
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
    if (check.type === "computedStyle") return "Check that the browser applies the requested style in the preview.";
    return "Check the requested syntax and make sure it is active code, not a comment.";
  }
  if (check.type === "jsExpression") return "Le code s'exécute, mais le résultat produit ne correspond pas encore à ce scénario.";
  if (check.type === "cssDeclaration") return "Vérifie le sélecteur ciblé et la propriété CSS exacte.";
  if (check.type === "computedStyle") return "Vérifie que le navigateur applique réellement le style demandé dans l'aperçu.";
  if (check.type === "selector" || check.type === "minSelector") return "Vérifie la structure HTML et le nombre d'éléments demandés.";
  return "Vérifie la syntaxe demandée et assure-toi qu'elle se trouve dans du code actif, pas dans un commentaire.";
}

export function displayTestLabel(check, locale) {
  const localized = resolveLocaleValue(check, locale);
  if (locale !== "fr") return localized.label;
  check = localized;
  if (check.type === "cssDeclaration") return `La propriété « ${check.value.property} » est déclarée sur « ${check.value.selector} »`;
  if (check.type === "computedStyle") return `Le navigateur applique « ${check.value.property}: ${check.value.equals} » sur « ${check.value.selector} »`;
  if (check.type === "attributeEquals") return `L’attribut « ${check.value.attribute} » de « ${check.value.selector} » vaut « ${check.value.expected} »`;
  if (check.type === "exactSelector") return `Exactement ${check.amount || 1} élément(s) correspondent à « ${check.value} »`;
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

function checkSelectorCount(code, selector, expected) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, "text/html");
    return doc.querySelectorAll(selector).length === expected;
  } catch {
    return false;
  }
}

function checkAttributeEquals(code, selector, attribute, expected) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, "text/html");
    return doc.querySelector(selector)?.getAttribute(attribute) === expected;
  } catch {
    return false;
  }
}

export const HTML_TEST_TYPES = new Set([
  "contains", "containsAny", "doctype", "notContains", "notContainsAny", "selector", "minSelector", "exactSelector",
  "attributeEquals", "referenceExists", "nonEmptyAttribute", "attributeIncludes",
  "domOrder", "labelForControl", "allMatch", "noneMatch", "uniqueIds", "validFragmentTargets",
  "labelsAssociated", "formControlsNamed", "documentSanity"
]);

function checkHtmlSemanticAssertion(code, test) {
  try {
    const doc = new DOMParser().parseFromString(code, "text/html");
    const value = test.value || {};

    if (test.type === "documentSanity") return hasSaneDocument(code, doc);
    if (test.type === "uniqueIds") return [...doc.querySelectorAll("[id]")].every((element) => element.id.trim() && hasUniqueId(doc, element.id));
    if (test.type === "validFragmentTargets") return [...doc.querySelectorAll("a[href^='#']")].every((link) => {
      const ids = referencedIds(link, "href");
      return ids.length === 1 && hasUniqueId(doc, ids[0]);
    });
    if (test.type === "labelsAssociated") return [...doc.querySelectorAll("label")].every(hasAssociatedControl.bind(null, doc));
    if (test.type === "formControlsNamed") return [...doc.querySelectorAll("form input, form select, form textarea")]
      .filter((control) => !control.matches(":disabled") && isSubmittableControl(control))
      .every((control) => control.getAttribute("name")?.trim());

    if (test.type === "domOrder") {
      const selectors = Array.isArray(value) ? value : value.selectors;
      if (!Array.isArray(selectors) || selectors.length < 2) return false;
      const elements = selectors.map((selector) => doc.querySelector(selector));
      return elements.every(Boolean) && elements.every((element, index) => index === 0 || Boolean(elements[index - 1].compareDocumentPosition(element) & 4));
    }

    const elements = [...doc.querySelectorAll(value.selector)];
    if (!elements.length) return false;

    if (test.type === "nonEmptyAttribute") {
      return elements.every((element) => element.hasAttribute(value.attribute) && element.getAttribute(value.attribute).trim() !== "");
    }
    if (test.type === "attributeIncludes") {
      const expected = Array.isArray(value.expected) ? value.expected.map(String) : [String(value.expected)];
      return expected.length > 0 && elements.every((element) => {
        const tokens = (element.getAttribute(value.attribute) || "").split(/\s+/).filter(Boolean);
        return expected.every((token) => tokens.includes(token));
      });
    }
    if (test.type === "allMatch" || test.type === "noneMatch") {
      if (typeof value.matches !== "string" || !value.matches) return false;
      return test.type === "allMatch"
        ? elements.every((element) => element.matches(value.matches))
        : elements.every((element) => !element.matches(value.matches));
    }
    if (test.type === "referenceExists") {
      return elements.every((element) => referencedIds(element, value.attribute).every((id) => hasUniqueId(doc, id)) && referencedIds(element, value.attribute).length > 0);
    }
    if (test.type === "labelForControl") {
      return elements.every((label) => {
        const id = label.getAttribute("for")?.trim();
        const control = id && getUniqueElementById(doc, id);
        return Boolean(control?.matches("button, input:not([type=hidden]), meter, output, progress, select, textarea"));
      });
    }
    return false;
  } catch {
    return false;
  }
}

function hasSaneDocument(code, doc) {
  const root = doc.documentElement;
  return Boolean(/^\s*<!doctype\s+html\s*>/i.test(code)
    && root?.tagName === "HTML"
    && root.getAttribute("lang")?.trim()
    && doc.head?.parentElement === root
    && doc.body?.parentElement === root
    && doc.querySelectorAll("html > head").length === 1
    && doc.querySelectorAll("html > body").length === 1
    && doc.querySelectorAll("head > title").length === 1
    && doc.title.trim());
}

function hasAssociatedControl(doc, label) {
  const id = label.getAttribute("for")?.trim();
  if (id) return Boolean(getUniqueElementById(doc, id)?.matches("button, input:not([type=hidden]), meter, output, progress, select, textarea"));
  if (label.hasAttribute("for")) return false;
  return label.querySelectorAll("button, input:not([type=hidden]), meter, output, progress, select, textarea").length === 1;
}

function isSubmittableControl(control) {
  if (control.matches("select, textarea")) return true;
  return !["button", "hidden", "image", "reset", "submit"].includes((control.getAttribute("type") || "text").toLowerCase());
}

function referencedIds(element, attribute) {
  const raw = element.getAttribute(attribute)?.trim();
  if (!raw) return [];
  if (attribute === "href") {
    if (!raw.startsWith("#") || raw === "#") return [];
    try {
      return [decodeURIComponent(raw.slice(1))];
    } catch {
      return [];
    }
  }
  return raw.split(/\s+/).filter(Boolean);
}

function getUniqueElementById(doc, id) {
  const matches = [...doc.querySelectorAll("[id]")].filter((element) => element.id === id);
  return matches.length === 1 ? matches[0] : null;
}

function hasUniqueId(doc, id) {
  return Boolean(getUniqueElementById(doc, id));
}

function normalize(value) {
  return String(value).toLowerCase().replace(/\s+/g, " ").trim();
}

function asValues(value) {
  return Array.isArray(value) ? value : [value];
}
