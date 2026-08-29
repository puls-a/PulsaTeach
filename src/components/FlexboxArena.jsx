import { useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, Info, RotateCcw, Target, TestTube2, TriangleAlert } from "lucide-react";
import { assetPaths, awardGameMission } from "../gameContent.js";
import MissionModal from "./MissionModal.jsx";

export const flexboxLevels = [
  {
    id: "center",
    xp: 20,
    targetClass: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    expected: { display: "flex", justifyContent: "center", alignItems: "center" },
    title: { fr: "Centrer le bot", en: "Center the bot" },
    mission: { fr: "Place le bot exactement au centre de l’arène.", en: "Place the bot exactly at the center of the arena." },
    starter: `.arena {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}`
  },
  {
    id: "right-center",
    xp: 30,
    targetClass: "right-4 top-1/2 -translate-y-1/2",
    expected: { display: "flex", justifyContent: "flex-end", alignItems: "center" },
    title: { fr: "Centre droit", en: "Right center" },
    mission: { fr: "Envoie le bot au centre droit, pas en dehors du terrain.", en: "Move the bot to the right center, not outside the field." },
    starter: `.arena {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}`
  },
  {
    id: "bottom-center",
    xp: 30,
    targetClass: "left-1/2 bottom-4 -translate-x-1/2",
    expected: { display: "flex", justifyContent: "center", alignItems: "flex-end" },
    title: { fr: "Bas centre", en: "Bottom center" },
    mission: { fr: "Garde l’axe horizontal au centre et descends le bot.", en: "Keep the horizontal axis centered and move the bot down." },
    starter: `.arena {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}`
  },
  {
    id: "right-bottom",
    xp: 40,
    targetClass: "right-4 bottom-4",
    expected: { display: "flex", justifyContent: "flex-end", alignItems: "flex-end" },
    title: { fr: "Coin inférieur droit", en: "Bottom-right corner" },
    mission: { fr: "Combine les deux axes pour atteindre le coin inférieur droit.", en: "Combine both axes to reach the bottom-right corner." },
    starter: `.arena {
  display: flex;
  justify-content: center;
  align-items: center;
}`
  }
];

const copyMap = {
  en: {
    title: "Flexbox Arena",
    intro: "Each target is inside the same flex container as the bot. Change only the .arena declarations and validate the actual alignment.",
    reset: "Reset",
    validate: "Validate",
    next: "Next level",
    passed: "Target reached. XP awarded.",
    complete: "Arena cleared. Alignment badge unlocked.",
    failed: "Not yet. The visual target and the tests now ask for the same position.",
    code: "CSS mission code",
    tests: "Alignment contract",
    level: "Level",
    terrain: "Arena preview",
    hint: "Flexbox moves items on two axes: justify-content horizontally, align-items vertically.",
    mission: "Mission",
    target: "Target position",
    bot: "PulsaTeach bot"
  },
  fr: {
    title: "Flexbox Arena",
    intro: "Chaque cible est dans le même conteneur flex que le bot. Modifie seulement les déclarations de .arena et valide l’alignement réel.",
    reset: "Reset",
    validate: "Valider",
    next: "Niveau suivant",
    passed: "Cible atteinte. XP attribué.",
    complete: "Arène terminée. Badge d’alignement débloqué.",
    failed: "Pas encore. La cible visuelle et les tests demandent maintenant la même position.",
    code: "Code CSS de mission",
    tests: "Contrat d’alignement",
    level: "Niveau",
    terrain: "Aperçu de l’arène",
    hint: "Flexbox déplace les éléments sur deux axes : justify-content à l’horizontale, align-items à la verticale.",
    mission: "Mission",
    target: "Position cible",
    bot: "Bot PulsaTeach"
  }
};

export default function FlexboxArena({ locale = "en" }) {
  const copy = copyMap[locale] || copyMap.en;
  const [levelIndex, setLevelIndex] = useState(0);
  const level = flexboxLevels[levelIndex];
  const [code, setCode] = useState(level.starter);
  const [status, setStatus] = useState(null);
  const [missionOpen, setMissionOpen] = useState(false);

  const parsed = useMemo(() => parseArenaFlex(code), [code]);
  const tests = buildFlexboxTests(parsed, level.expected);
  const passed = tests.every((test) => test.pass);

  const resetLevel = (nextIndex = levelIndex) => {
    setLevelIndex(nextIndex);
    setCode(flexboxLevels[nextIndex].starter);
    setStatus(null);
  };

  const validate = () => {
    setStatus(passed ? "passed" : "failed");
    if (passed) {
      awardGameMission(`flexbox-arena-${level.id}`, level.xp, levelIndex === flexboxLevels.length - 1 ? "flexbox-clear" : null);
    }
  };

  const nextLevel = () => {
    if (status === "passed") resetLevel((levelIndex + 1) % flexboxLevels.length);
  };

  return (
    <section className="lab-shell">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,.92fr)_minmax(420px,1.08fr)]">
        <div className="flex min-w-0 flex-col bg-[#10102b] p-3 sm:p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-display text-xl font-bold text-white">{copy.code}</div>
              <p className="mt-1 text-xs font-bold uppercase tracking-[.14em] text-indigo-200">{copy.level} {levelIndex + 1}/{flexboxLevels.length} · {level.title[locale]}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setMissionOpen(true)} className="lab-toolbar-button"><Info className="size-4" />{copy.mission}</button>
              <button type="button" onClick={() => resetLevel()} className="lab-toolbar-button"><RotateCcw className="size-4" />{copy.reset}</button>
              <button type="button" onClick={validate} className="lab-primary-button"><TestTube2 className="size-4" />{copy.validate}</button>
              <button type="button" onClick={nextLevel} disabled={status !== "passed"} className="lab-toolbar-button disabled:cursor-not-allowed disabled:opacity-45">{copy.next}<ChevronRight className="size-4" /></button>
            </div>
          </div>
          <label className="flex min-h-0 flex-1 flex-col">
            <span className="sr-only">{copy.code}</span>
            <textarea value={code} onChange={(event) => { setCode(event.target.value); setStatus(null); }} spellCheck="false" className="code-editor min-h-[300px] sm:min-h-[420px] lg:min-h-[540px]" />
          </label>
          {status && (
            <p role="status" aria-live="polite" className={`mt-3 rounded-lg px-3 py-2 text-sm font-bold ${status === "passed" ? "bg-green-600 text-white" : "bg-amber-100 text-amber-900"}`}>
              {status === "passed" ? (levelIndex === flexboxLevels.length - 1 ? copy.complete : copy.passed) : copy.failed}
            </p>
          )}
        </div>

        <div className="grid gap-3 bg-slate-50 p-3 sm:p-4">
          <div className="rounded-2xl border-2 border-[#25265d] bg-[#17183d] p-3 shadow-[0_18px_36px_rgba(16,16,43,.18)] sm:p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-white">
              <div className="inline-flex items-center gap-2 rounded-lg border border-indigo-300/30 bg-white/10 px-4 py-2 text-sm font-bold">
                <Target className="size-5 text-orange-300" />
                {level.mission[locale]}
              </div>
              <span className="rounded-full bg-aquaPop px-3 py-1 text-xs font-black uppercase tracking-[.12em] text-[#071b28]">+{level.xp} XP</span>
            </div>
            <div className="relative isolate min-h-[280px] overflow-hidden rounded-xl border border-indigo-300/30 bg-[#0c0d27] p-3 sm:min-h-[360px] sm:p-4">
              <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(129,140,248,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,.22)_1px,transparent_1px)] [background-size:32px_32px]" />
              <div className="pointer-events-none absolute inset-3 rounded-lg border border-dashed border-indigo-300/35 sm:inset-4" />
              <div className="absolute inset-3 flex sm:inset-4" style={{ justifyContent: level.expected.justifyContent, alignItems: level.expected.alignItems }}>
                <img src={assetPaths.target} alt={copy.target} className="size-20 opacity-90 drop-shadow-[0_0_16px_rgba(249,115,22,.65)] sm:size-24" />
              </div>
              <div className="absolute inset-3 flex sm:inset-4" style={{ display: parsed.display, justifyContent: parsed.justifyContent, alignItems: parsed.alignItems }}>
                <img src={assetPaths.bot} alt={copy.bot} className="size-20 drop-shadow-[0_12px_18px_rgba(0,0,0,.48)] transition-all duration-300 sm:size-24" />
              </div>
              <p className="absolute bottom-3 left-3 rounded-md border border-indigo-300/25 bg-[#17183d]/90 px-2 py-1 text-[10px] font-black uppercase tracking-[.14em] text-indigo-100 sm:bottom-4 sm:left-4">{copy.terrain}</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="font-display text-2xl font-bold">{copy.tests}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-500">{copy.hint}</p>
            <div className="mt-4 grid gap-2">
              {tests.map((test) => (
                <p key={test.label} className={`test-row ${test.pass ? "border-green-200 bg-green-50 text-green-800" : "border-amber-200 bg-amber-50 text-amber-900"}`}>
                  {test.pass ? <CheckCircle2 className="size-5" /> : <TriangleAlert className="size-5" />}
                  <span className="font-mono">{test.label}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <MissionModal open={missionOpen} title={copy.title} closeLabel={locale === "fr" ? "Fermer" : "Close"} onClose={() => setMissionOpen(false)}>
        <p className="font-bold leading-7 text-ink/70">{copy.intro}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {flexboxLevels.map((item, index) => (
            <button type="button" key={item.id} onClick={() => { resetLevel(index); setMissionOpen(false); }} className={`rounded-2xl border p-4 text-left ${index === levelIndex ? "border-indigo-300 bg-indigo-50" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
              <p className="text-xs font-black uppercase tracking-[.14em] text-indigoPop">{copy.level} {index + 1}</p>
              <h3 className="mt-1 font-display text-xl font-bold">{item.title[locale]}</h3>
              <p className="mt-2 text-sm font-semibold text-slate-600">{item.mission[locale]}</p>
            </button>
          ))}
        </div>
      </MissionModal>
    </section>
  );
}

export function parseArenaFlex(code) {
  const arenaBody = extractArenaBody(code);
  return {
    display: readDeclaration(arenaBody, "display", "block"),
    justifyContent: readDeclaration(arenaBody, "justify-content", "flex-start"),
    alignItems: readDeclaration(arenaBody, "align-items", "stretch")
  };
}

export function buildFlexboxTests(parsed, expected) {
  return [
    { label: "display: flex", pass: parsed.display === expected.display },
    { label: `justify-content: ${expected.justifyContent}`, pass: parsed.justifyContent === expected.justifyContent },
    { label: `align-items: ${expected.alignItems}`, pass: parsed.alignItems === expected.alignItems }
  ];
}

function readDeclaration(code, property, fallback) {
  const match = new RegExp(`${property}\\s*:\\s*([^;\\n}]+)`, "i").exec(code);
  return match ? match[1].trim().toLowerCase() : fallback;
}

function extractArenaBody(code) {
  const withoutComments = code.replace(/\/\*[\s\S]*?\*\//g, "");
  const match = /\.arena\s*\{([^}]*)\}/i.exec(withoutComments);
  return match ? match[1] : "";
}
