import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Code2, Eye, FileCode2, Info, Paintbrush, RotateCcw, TestTube2, TriangleAlert } from "lucide-react";
import { awardGameMission } from "../gameContent.js";
import MissionModal from "./MissionModal.jsx";

const starter = {
  html: `<main class="hero-card">
  <h1>PulsaTeach Quest</h1>
  <p>Build a tiny mission card with HTML, CSS, and JS.</p>
  <button id="boost">Boost XP</button>
  <strong id="xp">XP: 0</strong>
</main>`,
  css: `.hero-card {
  min-height: 260px;
  display: grid;
  place-items: center;
  gap: 14px;
  padding: 32px;
  border: 4px solid #1e1b4b;
  border-radius: 28px;
  background: #facc15;
  color: #1e1b4b;
  font-family: system-ui, sans-serif;
}`,
  js: `let xp = 0;
const output = document.querySelector("#xp");
document.querySelector("#boost").addEventListener("click", () => {
  xp += 10;
  output.textContent = "XP: " + xp;
});`
};

const labels = {
  en: {
    title: "Live Code Playground",
    intro: "Write HTML, CSS, and JavaScript, then validate the mission tests.",
    html: "HTML",
    css: "CSS",
    js: "JS",
    preview: "Result",
    reset: "Reset",
    validate: "Validate",
    objectives: "Mission objectives",
    tests: "Automatic tests",
    errors: "Runtime errors",
    noErrors: "No runtime error detected.",
    ready: "Preview rendered",
    pass: "Mission passed. XP awarded.",
    fail: "Some tests are still failing.",
    goals: ["Create a main card", "Style it with a visible background", "Add a button interaction in JavaScript"]
  },
  fr: {
    title: "Playground code live",
    intro: "Ecris du HTML, du CSS et du JavaScript, puis valide les tests de mission.",
    html: "HTML",
    css: "CSS",
    js: "JS",
    preview: "Resultat",
    reset: "Reset",
    validate: "Valider",
    objectives: "Objectifs de mission",
    tests: "Tests automatiques",
    errors: "Erreurs d'execution",
    noErrors: "Aucune erreur d'execution detectee.",
    ready: "Apercu rendu",
    pass: "Mission reussie. XP attribue.",
    fail: "Certains tests echouent encore.",
    goals: ["Creer une carte main", "La styliser avec un background visible", "Ajouter une interaction JavaScript sur un bouton"]
  }
};

export default function LivePlayground({ locale = "en" }) {
  const copy = labels[locale] || labels.en;
  const [html, setHtml] = useState(starter.html);
  const [css, setCss] = useState(starter.css);
  const [js, setJs] = useState(starter.js);
  const [runtimeError, setRuntimeError] = useState("");
  const [previewReady, setPreviewReady] = useState(false);
  const [result, setResult] = useState(null);
  const [activeFile, setActiveFile] = useState("html");
  const [missionOpen, setMissionOpen] = useState(false);

  const srcDoc = useMemo(() => {
    const escapedJs = js.replace(/<\/script/gi, "<\\/script");
    return `<!doctype html>
<html>
  <head>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #eef2ff; }
      ${css}
    </style>
  </head>
  <body>
    ${html}
    <script>
      window.onerror = function(message) {
        parent.postMessage({ type: "pulsateach-preview-error", message: String(message) }, "*");
      };
      parent.postMessage({ type: "pulsateach-preview-ready" }, "*");
      try {
        ${escapedJs}
      } catch (error) {
        parent.postMessage({ type: "pulsateach-preview-error", message: error.message }, "*");
      }
    </script>
  </body>
</html>`;
  }, [css, html, js]);

  useEffect(() => {
    const onMessage = (event) => {
      if (event.data?.type === "pulsateach-preview-error") {
        setRuntimeError(event.data.message);
      }
      if (event.data?.type === "pulsateach-preview-ready") {
        setPreviewReady(true);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  useEffect(() => {
    setRuntimeError("");
    setPreviewReady(false);
    setResult(null);
  }, [html, css, js]);

  const tests = useMemo(() => [
    {
      label: locale === "fr" ? "La page contient un main.hero-card" : "The page contains main.hero-card",
      pass: /<main[^>]*class=["'][^"']*hero-card/i.test(html)
    },
    {
      label: locale === "fr" ? "Le CSS definit un background" : "CSS defines a background",
      pass: /background\s*:/i.test(css)
    },
    {
      label: locale === "fr" ? "Le JS ecoute un clic ou selectionne le DOM" : "JS listens for a click or selects the DOM",
      pass: /addEventListener|querySelector|getElementById/i.test(js)
    },
    {
      label: locale === "fr" ? "Aucune erreur runtime detectee" : "No runtime error detected",
      pass: !runtimeError
    }
  ], [css, html, js, locale, runtimeError]);

  const validate = () => {
    const passed = tests.every((test) => test.pass);
    setResult(passed ? "pass" : "fail");
    if (passed) awardGameMission("live-playground-hero-card", 25, "first-preview");
  };

  const reset = () => {
    setHtml(starter.html);
    setCss(starter.css);
    setJs(starter.js);
    setRuntimeError("");
    setResult(null);
  };

  const files = {
    html: { label: copy.html, icon: FileCode2, value: html, onChange: setHtml },
    css: { label: copy.css, icon: Paintbrush, value: css, onChange: setCss },
    js: { label: copy.js, icon: Code2, value: js, onChange: setJs }
  };
  const ActiveIcon = files[activeFile].icon;

  return (
    <section className="overflow-hidden rounded-[26px] bg-white clay">
      <div className="grid min-h-[680px] xl:grid-cols-[minmax(0,1fr)_minmax(360px,.82fr)]">
      <div className="flex min-w-0 flex-col bg-ink">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-[3px] border-white/15 p-3">
          <div className="flex gap-2">
            {Object.entries(files).map(([id, file]) => {
              const Icon = file.icon;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveFile(id)}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-2xl px-4 font-extrabold shadow-clayPressed ${activeFile === id ? "bg-lemonPop text-ink" : "bg-white/10 text-white"}`}
                >
                  <Icon className="size-4" />
                  {file.label}
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setMissionOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white/10 px-4 font-extrabold text-white">
              <Info className="size-4" />
              Mission
            </button>
            <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white/10 px-4 font-extrabold text-white">
              <RotateCcw className="size-4" />
              {copy.reset}
            </button>
            <button type="button" onClick={validate} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-orangePop px-4 font-extrabold text-white">
              <TestTube2 className="size-4" />
              {copy.validate}
            </button>
          </div>
        </div>
        <label className="flex min-h-0 flex-1 flex-col p-3">
          <span className="mb-2 flex items-center gap-2 px-1 font-display text-lg font-bold text-white">
            <ActiveIcon className="size-5 text-lemonPop" />
            {files[activeFile].label}
          </span>
          <textarea
            value={files[activeFile].value}
            onChange={(event) => files[activeFile].onChange(event.target.value)}
            spellCheck="false"
            className="min-h-[460px] flex-1 resize-none rounded-2xl border-[3px] border-white/20 bg-[#111032] p-4 font-mono text-sm leading-7 text-indigo-100 outline-none focus:border-lemonPop"
          />
        </label>
        {result && (
          <div className={`border-t-[3px] border-white/15 px-4 py-3 font-extrabold ${result === "pass" ? "bg-mintPop text-white" : "bg-lemonPop text-ink"}`}>
            {result === "pass" ? copy.pass : copy.fail}
          </div>
        )}
      </div>

      <div className="grid min-h-[520px] grid-rows-[auto_1fr_auto] bg-white">
        <div className="flex items-center justify-between border-b-[3px] border-ink bg-lemonPop px-4 py-3 font-extrabold">
          <span className="inline-flex items-center gap-2">
            <Eye className="size-5" />
            {copy.preview}
          </span>
          <span className={`rounded-xl px-3 py-1 text-xs ${previewReady && !runtimeError ? "bg-mintPop text-white" : "bg-white text-ink"}`}>
            {previewReady && !runtimeError ? copy.ready : "iframe"}
          </span>
        </div>
        <iframe title="PulsaTeach live preview" srcDoc={srcDoc} sandbox="allow-scripts allow-forms allow-modals" className="h-full min-h-[430px] w-full bg-white" />
        <div className={`border-t-[3px] border-ink p-4 font-extrabold ${runtimeError ? "bg-orange-100 text-orangePop" : "bg-green-100 text-mintPop"}`}>
          <p className="font-display text-xl font-bold text-ink">{copy.errors}</p>
          <p className="mt-1">{runtimeError || copy.noErrors}</p>
        </div>
      </div>
      </div>

      <MissionModal open={missionOpen} title={copy.title} onClose={() => setMissionOpen(false)}>
        <p className="font-bold leading-7 text-ink/70">{copy.intro}</p>
        <div className="mt-5">
          <InfoPanel title={copy.objectives} items={copy.goals} />
        </div>
        <div className="mt-5 rounded-[22px] bg-white p-3 clay-soft">
          <h3 className="font-display text-xl font-bold">{copy.tests}</h3>
          <div className="mt-3 grid gap-2">
            {tests.map((test) => (
              <p key={test.label} className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-extrabold ${test.pass ? "bg-green-100 text-mintPop" : "bg-orange-100 text-orangePop"}`}>
                {test.pass ? <CheckCircle2 className="size-4" /> : <TriangleAlert className="size-4" />}
                {test.label}
              </p>
            ))}
          </div>
        </div>
      </MissionModal>
    </section>
  );
}

function InfoPanel({ title, items }) {
  return (
    <div className="rounded-[24px] bg-lemonPop p-4 clay-soft">
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <p key={item} className="rounded-2xl bg-white px-3 py-2 font-extrabold text-ink">{item}</p>
        ))}
      </div>
    </div>
  );
}
