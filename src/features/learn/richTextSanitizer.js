const allowedTags = new Set(["A", "BR", "CODE", "EM", "IMG", "STRONG"]);
const allowedImageSources = ["/assets/"];

export function sanitizeRichText(value) {
  const html = String(value || "");
  if (!html.includes("<")) return html;
  if (typeof document === "undefined") return stripUnsafeHtml(html);

  const template = document.createElement("template");
  template.innerHTML = html;
  sanitizeNode(template.content);
  return template.innerHTML;
}

function sanitizeNode(node) {
  for (const child of [...node.childNodes]) {
    if (child.nodeType === Node.TEXT_NODE) continue;
    if (child.nodeType !== Node.ELEMENT_NODE || !allowedTags.has(child.tagName)) {
      child.replaceWith(document.createTextNode(child.textContent || ""));
      continue;
    }
    sanitizeElement(child);
    sanitizeNode(child);
  }
}

function sanitizeElement(element) {
  const originalHref = element.getAttribute("href");
  const originalSrc = element.getAttribute("src");
  const originalAlt = element.getAttribute("alt") || "";
  for (const attribute of [...element.attributes]) element.removeAttribute(attribute.name);
  if (element.tagName === "A") {
    const href = safeHref(originalHref);
    if (!href) {
      element.replaceWith(document.createTextNode(element.textContent || ""));
      return;
    }
    element.setAttribute("href", href);
    element.setAttribute("target", "_blank");
    element.setAttribute("rel", "noopener noreferrer");
  }
  if (element.tagName === "IMG") {
    const src = safeImageSrc(originalSrc);
    if (!src) {
      element.remove();
      return;
    }
    element.setAttribute("src", src);
    element.setAttribute("alt", originalAlt);
    element.setAttribute("loading", "lazy");
    element.setAttribute("decoding", "async");
    element.setAttribute("width", "72");
    element.setAttribute("height", "72");
    element.setAttribute("style", "float:right;margin-left:12px;max-width:96px;max-height:64px;object-fit:contain");
  }
}

function safeHref(value) {
  const href = String(value || "").trim();
  if (/^https:\/\//i.test(href) || href.startsWith("/")) return href;
  return "";
}

function safeImageSrc(value) {
  const src = String(value || "").trim();
  return allowedImageSources.some((prefix) => src.startsWith(prefix)) ? src : "";
}

function stripUnsafeHtml(html) {
  return html.replace(/<[^>]*>/g, "");
}
