// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { createPreview, validateLesson } from "../../src/lessonRuntime.js";

const check = async (type, value, html) => (await validateLesson({ tests: [{ type, value, label: type }] }, html))[0].pass;

describe("HTML semantic lesson validation", () => {
  test("resolves fragment and whitespace-separated ARIA references uniquely", async () => {
    const html = '<a href="#main%2Dcontent">Skip</a><main id="main-content"></main><input aria-describedby="hint error"><p id="hint"></p><p id="error"></p>';
    expect(await check("referenceExists", { selector: "a", attribute: "href" }, html)).toBe(true);
    expect(await check("referenceExists", { selector: "input", attribute: "aria-describedby" }, html)).toBe(true);
    expect(await check("referenceExists", { selector: "a", attribute: "href" }, '<a href="#missing"></a><!-- <div id="missing"></div> -->')).toBe(false);
    expect(await check("referenceExists", { selector: "a", attribute: "href" }, '<a href="#same"></a><i id="same"></i><b id="same"></b>')).toBe(false);
    expect(await check("referenceExists", { selector: "a", attribute: "href" }, '<a href="#%E0%A4%A"></a>')).toBe(false);
  });

  test("requires non-empty attributes on every matched element", async () => {
    expect(await check("nonEmptyAttribute", { selector: "img", attribute: "src" }, '<img src=" photo.jpg "><img src="x.jpg">')).toBe(true);
    expect(await check("nonEmptyAttribute", { selector: "img", attribute: "src" }, '<img src=" \n\t ">')).toBe(false);
    expect(await check("nonEmptyAttribute", { selector: "img", attribute: "src" }, '<!-- <img src="x"> -->')).toBe(false);
  });

  test("matches complete attribute tokens rather than substrings", async () => {
    const value = { selector: "[aria-describedby]", attribute: "aria-describedby", expected: ["hint", "error"] };
    expect(await check("attributeIncludes", value, '<input aria-describedby="  hint\n error  ">')).toBe(true);
    expect(await check("attributeIncludes", value, '<input aria-describedby="hint-error">')).toBe(false);
    expect(await check("attributeIncludes", value, '<input aria-describedby="hint error"><input aria-describedby="hint">')).toBe(false);
  });

  test("checks strict DOM order and rejects missing or repeated positions", async () => {
    expect(await check("domOrder", ["header", "main", "footer"], "<header></header><!-- main --><main></main><footer></footer>")).toBe(true);
    expect(await check("domOrder", { selectors: ["header", "main", "footer"] }, "<main></main><header></header><footer></footer>")).toBe(false);
    expect(await check("domOrder", ["main", "main"], "<main></main>")).toBe(false);
  });

  test("connects labels only to unique labelable controls", async () => {
    const value = { selector: "label[for]" };
    expect(await check("labelForControl", value, '<label for="email">Email</label><input id="email" type="email">')).toBe(true);
    expect(await check("labelForControl", value, '<label for="x">X</label><div id="x"></div>')).toBe(false);
    expect(await check("labelForControl", value, '<label for="x">X</label><input id="x"><textarea id="x"></textarea>')).toBe(false);
    expect(await check("labelForControl", value, '<label for=" ">X</label><input id="x">')).toBe(false);
  });

  test("checks document-wide ids and local fragment targets", async () => {
    expect(await check("uniqueIds", null, '<main id="content"></main><aside id="help"></aside>')).toBe(true);
    expect(await check("uniqueIds", null, '<main id="content"></main><aside id="content"></aside>')).toBe(false);
    expect(await check("uniqueIds", null, '<main id=" "></main>')).toBe(false);
    expect(await check("validFragmentTargets", null, '<a href="#content">Skip</a><main id="content"></main>')).toBe(true);
    expect(await check("validFragmentTargets", null, '<a href="#missing">Skip</a><main id="content"></main>')).toBe(false);
    expect(await check("validFragmentTargets", null, '<a href="#">Skip</a><main id="content"></main>')).toBe(false);
  });

  test("checks implicit and explicit labels plus submitted form controls", async () => {
    const valid = '<form><label for="email">Email</label><input id="email" name="email" type="email"><label><input name="updates" type="checkbox"> Updates</label><button type="submit">Send</button></form>';
    expect(await check("labelsAssociated", null, valid)).toBe(true);
    expect(await check("formControlsNamed", null, valid)).toBe(true);
    expect(await check("labelsAssociated", null, '<label>Email<input name="email"><input name="other"></label>')).toBe(false);
    expect(await check("formControlsNamed", null, '<form><input type="email"><input type="hidden"><button type="submit">Send</button></form>')).toBe(false);
    expect(await check("formControlsNamed", null, '<form><input disabled type="email"><button type="submit">Send</button></form>')).toBe(true);
    expect(await check("formControlsNamed", null, '<form><fieldset disabled><input type="email"></fieldset></form>')).toBe(true);
  });

  test("checks the small publishable-document baseline without validating all HTML", async () => {
    const valid = '<!doctype html><html lang="en"><head><title>Page</title></head><body><main>Ready</main></body></html>';
    expect(await check("documentSanity", null, valid)).toBe(true);
    expect(await check("documentSanity", null, '<html lang="en"><head><title>Page</title></head><body></body></html>')).toBe(false);
    expect(await check("documentSanity", null, '<!doctype html><html lang="en"><head></head><body></body></html>')).toBe(false);
  });

  test("validates meaningful alternatives, JSON-LD, and safe new-tab links", async () => {
    expect(await check("meaningfulAlt", { selector: "img" }, '<img alt="Photo">')).toBe(false);
    expect(await check("meaningfulAlt", { selector: "img" }, '<img alt="Lectrice utilisant une lampe Atlas">')).toBe(true);
    const jsonLd = '<script type="application/ld+json">{"@context":"https://schema.org","@type":"Event","name":"PulsaConf","startDate":"2026-09-18"}</script>';
    expect(await check("validJsonLd", { type: "Event", required: ["name", "startDate"] }, jsonLd)).toBe(true);
    expect(await check("validJsonLd", { type: "Event", required: ["name"] }, '<script type="application/ld+json">{bad}</script>')).toBe(false);
    expect(await check("safeBlankLinks", null, '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Read</a>')).toBe(true);
    expect(await check("safeBlankLinks", null, '<a href="https://example.com" target="_blank">Read</a>')).toBe(false);
  });

  test("supports non-vacuous all and none selector predicates", async () => {
    expect(await check("allMatch", { selector: "nav a", matches: "[href]" }, '<nav><a href="/a">A</a><a href="/b">B</a></nav>')).toBe(true);
    expect(await check("allMatch", { selector: "nav a", matches: "[href]" }, "<nav><!-- <a href='/a'> --></nav>")).toBe(false);
    expect(await check("noneMatch", { selector: "img", matches: "[alt='photo']" }, '<img alt="speaker"><img alt="">')).toBe(true);
    expect(await check("noneMatch", { selector: "img", matches: "[alt='photo']" }, '<img alt="photo">')).toBe(false);
    expect(await check("allMatch", { selector: "p", matches: ":::invalid" }, "<p>x</p>")).toBe(false);
  });

  test("resolves localized natural-language and nested semantic values", async () => {
    const lesson = { tests: [
      { type: "containsAny", label: { fr: "Salutation", en: "Greeting" }, value: { fr: ["Bonjour", "Salut"], en: ["Hello", "Hi"] } },
      { type: "notContainsAny", label: { fr: "Sans texte vague", en: "No vague text" }, value: { fr: ["clique ici"], en: ["click here"] } },
      { type: "attributeEquals", label: "language", value: { selector: "html", attribute: "lang", expected: { fr: "fr", en: "en" } } }
    ] };
    expect((await validateLesson(lesson, '<html lang="fr"><body>Bonjour</body></html>', "fr")).every((item) => item.pass)).toBe(true);
    expect((await validateLesson(lesson, '<html lang="en"><body>Hello</body></html>', "en")).every((item) => item.pass)).toBe(true);
  });

  test("keeps scalar validation behavior unchanged", async () => {
    const lesson = { tests: [{ type: "contains", label: "heading", value: "<h1>" }, { type: "notContains", label: "script", value: "<script" }] };
    expect((await validateLesson(lesson, "<h1>Scalar lesson</h1>", "en")).map((item) => item.pass)).toEqual([true, true]);
  });

  test("localizes preview artifacts and the empty HTML state", () => {
    const css = { id: "css-localized", type: "css", previewHtml: { fr: "<p>Bonjour</p>", en: "<p>Hello</p>" } };
    expect(createPreview(css, "p {}", "en")).toContain("<p>Hello</p>");
    expect(createPreview({ id: "html-empty", type: "html" }, "<html><body></body></html>", "en")).toContain("Empty body");
    expect(createPreview({ id: "html-empty", type: "html" }, "<html><body></body></html>", "fr")).toContain("Body vide");
  });

  test("keeps the preview CSP inside the document head", () => {
    const fragment = createPreview({ id: "html-fragment", type: "html" }, "<main>Hello</main>", "en");
    const document = createPreview({ id: "html-document", type: "html" }, "<!doctype html><html><head><title>Demo</title></head><body>Hello</body></html>", "en");
    expect(fragment).toMatch(/<head>[\s\S]*Content-Security-Policy[\s\S]*<\/head><body>/i);
    expect(document).toMatch(/<head>[\s\S]*Content-Security-Policy[\s\S]*<\/head>/i);
    expect(document.indexOf("Content-Security-Policy")).toBeLessThan(document.indexOf("</head>"));
  });
});
