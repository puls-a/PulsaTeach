function isCssConceptCheck(id, check) {
  return check.includes(":")
    || check === ":hover"
    || check === "@media"
    || check === "@container"
    || check === "repeat"
    || check === "minmax"
    || check === "clamp("
    || check === "padding: var(--space)"
    || (id === "css-05-motion" && check === "transform");
}

function cssSolution(id, target, checks) {
  if (id === "css-07-fluid-type") {
    return `.demo-surface {
  font-size: clamp(1rem, 0.75rem + 1vw, 1.25rem);
  line-height: 1.65;
}`;
  }

  if (id === "css-07-fluid-spacing") {
    return `:root {
  --space: clamp(1rem, 2vw, 2rem);
}

.card {
  padding: var(--space);
}`;
  }

  if (id === "css-07-responsive-images") {
    return `.card img {
  max-width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}`;
  }

  if (id === "css-07-container-queries") {
    return `.card {
  container-type: inline-size;
}

@container (min-width: 28rem) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}`;
  }

  if (id === "css-07-responsive-navigation") {
    return `.toolbar {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
}

@media (min-width: 760px) {
  .toolbar {
    justify-content: space-between;
    overflow-x: visible;
  }
}`;
  }

  if (id === "css-04-grid") {
    return `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
}`;
  }

  if (id === "css-05-mobile-first") {
    return `.panel {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 700px) {
  .panel {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}`;
  }

  if (id === "css-05-motion") {
    return `.toolbar button {
  transition: transform .2s ease;
}

.toolbar button:hover {
  transform: translateY(-3px);
}`;
  }

  if (id === "css-02-custom-properties") {
    return `:root {
  --accent: #facc15;
}

.card {
  background: var(--accent);
}`;
  }

  if (id === "css-05-reduced-motion") {
    return `@media (prefers-reduced-motion: reduce) {
  * {
    transition: none;
  }
}`;
  }

  if (target === "@media") {
    return `@media (min-width: 700px) {
  .panel {
    display: grid;
    gap: 16px;
  }
}`;
  }

  return `${target} {
  ${checks.map((item) => cssPropertyLine(item)).join("\n  ")}
}`;
}

function cssPropertyLine(check) {
  if (check.includes(":")) return `${check};`;
  if (check === "background") return "background: #facc15;";
  if (check === "border") return "border: 3px solid #1e1b4b;";
  if (check === "padding") return "padding: 24px;";
  if (check === "border-radius") return "border-radius: 20px;";
  if (check === "box-shadow") return "box-shadow: 6px 8px 0 rgba(30, 27, 75, .18);";
  if (check === "gap") return "gap: 16px;";
  if (check === "align-items") return "align-items: center;";
  if (check === "place-items") return "place-items: center;";
  if (check === "min-height") return "min-height: 220px;";
  if (check === "flex-wrap") return "flex-wrap: wrap;";
  if (check === "font-size") return "font-size: 18px;";
  if (check === "line-height") return "line-height: 1.7;";
  if (check === "max-width") return "max-width: 760px;";
  if (check === "width") return "width: min(100% - 32px, 960px);";
  if (check === "margin") return "margin: 0 auto;";
  if (check === "overflow") return "overflow: auto;";
  if (check === "overflow-wrap") return "overflow-wrap: anywhere;";
  if (check === "overflow-x") return "overflow-x: auto;";
  if (check === "aspect-ratio") return "aspect-ratio: 16 / 9;";
  if (check === "object-fit") return "object-fit: cover;";
  if (check === "container-type") return "container-type: inline-size;";
  if (check === "outline") return "outline: 3px solid #4f46e5;";
  if (check === "outline-offset") return "outline-offset: 3px;";
  if (check === "grid-template-columns") return "grid-template-columns: repeat(3, minmax(0, 1fr));";
  if (check === "transition") return "transition: transform .2s ease;";
  if (check === "transform") return "transform: translateY(-3px);";
  if (check === "repeat") return "grid-template-columns: repeat(2, minmax(0, 1fr));";
  if (check === "minmax") return "grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));";
  if (check === "min-width") return "min-width: 700px;";
  return `${check}: demo;`;
}
export { cssPropertyLine, cssSolution, isCssConceptCheck };
