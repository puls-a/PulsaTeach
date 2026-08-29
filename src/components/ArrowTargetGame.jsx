import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Crosshair, Info, RotateCcw, TestTube2, TriangleAlert } from "lucide-react";
import { assetPaths, awardGameMission } from "../gameContent.js";
import { runAimFunctionSandbox } from "../jsSandboxClient.js";
import MissionModal from "./MissionModal.jsx";

export const jsArenaLevels = [
  {
    id: "horizontal",
    xp: 20,
    title: { fr: "Axe horizontal", en: "Horizontal axis" },
    mission: { fr: "Retourne left ou right selon x.", en: "Return left or right depending on x." },
    focusIndex: 1,
    cases: [
      { x: 20, y: 50, expected: "left" },
      { x: 82, y: 50, expected: "right" }
    ]
  },
  {
    id: "vertical",
    xp: 30,
    title: { fr: "Axes simples", en: "Simple axes" },
    mission: { fr: "Gère aussi up et down quand la cible reste centrée sur x.", en: "Also handle up and down when the target stays centered on x." },
    focusIndex: 2,
    cases: [
      { x: 50, y: 18, expected: "up" },
      { x: 50, y: 82, expected: "down" },
      { x: 82, y: 50, expected: "right" },
      { x: 18, y: 50, expected: "left" }
    ]
  },
  {
    id: "diagonal",
    xp: 40,
    title: { fr: "Diagonales", en: "Diagonals" },
    mission: { fr: "Combine x et y pour viser les coins.", en: "Combine x and y to aim at corners." },
    focusIndex: 1,
    cases: [
      { x: 78, y: 22, expected: "right-up" },
      { x: 78, y: 78, expected: "right-down" },
      { x: 22, y: 22, expected: "left-up" },
      { x: 22, y: 78, expected: "left-down" }
    ]
  },
  {
    id: "dead-zone",
    xp: 50,
    title: { fr: "Zone centrale", en: "Center dead zone" },
    mission: { fr: "Retourne center si la cible est proche du centre, sinon la direction précise.", en: "Return center if the target is near the middle, otherwise return the precise direction." },
    focusIndex: 0,
    cases: [
      { x: 51, y: 48, expected: "center" },
      { x: 85, y: 20, expected: "right-up" },
      { x: 15, y: 75, expected: "left-down" },
      { x: 50, y: 86, expected: "down" }
    ]
  }
];

const starterCode = `function aim(target) {
  const centerX = 50;

  // TODO: gère aussi les cibles à gauche.
  if (target.x > centerX) {
    return "right";
  }

  return "right";
}`;

const text = {
  en: {
    title: "JavaScript Arena",
    intro: "Write aim(target). It receives coordinates from 0 to 100 and must return one direction string. Each level tests several targets, not only the visible one.",
    reset: "Reset",
    validate: "Run tests",
    next: "Next level",
    code: "JavaScript mission code",
    expected: "Expected",
    returned: "Returned",
    pass: "Level cleared. XP awarded.",
    complete: "Arena cleared. Logic badge unlocked.",
    fail: "Some targets missed. Read the failed cases and adjust your conditions.",
    tests: "Target cases",
    level: "Level",
    visible: "Visible target",
    allowed: "Allowed returns",
    mission: "Mission",
    target: "Target"
  },
  fr: {
    title: "JavaScript Arena",
    intro: "Écris aim(target). La fonction reçoit des coordonnées de 0 à 100 et doit retourner un texte de direction. Chaque niveau teste plusieurs cibles, pas seulement celle affichée.",
    reset: "Reset",
    validate: "Tester",
    next: "Niveau suivant",
    code: "Code JavaScript de mission",
    expected: "Attendu",
    returned: "Retourné",
    pass: "Niveau réussi. XP attribué.",
    complete: "Arène terminée. Badge logique débloqué.",
    fail: "Certaines cibles sont ratées. Lis les cas en erreur et ajuste tes conditions.",
    tests: "Cas testés",
    level: "Niveau",
    visible: "Cible visible",
    allowed: "Retours autorisés",
    mission: "Mission",
    target: "Cible"
  }
};

export default function ArrowTargetGame({ locale = "en" }) {
  const copy = text[locale] || text.en;
  const [levelIndex, setLevelIndex] = useState(0);
  const level = jsArenaLevels[levelIndex];
  const [code, setCode] = useState(starterCode);
  const [results, setResults] = useState(null);
  const [message, setMessage] = useState(null);
  const [missionOpen, setMissionOpen] = useState(false);

  const focusCase = level.cases[level.focusIndex] || level.cases[0];
  const visibleResult = results?.find((item) => item.x === focusCase.x && item.y === focusCase.y);
  const beam = useMemo(() => beamStyle(focusCase), [focusCase]);

  const resetLevel = (nextIndex = levelIndex) => {
    setLevelIndex(nextIndex);
    setResults(null);
    setMessage(null);
  };

  const fire = async () => {
    const nextResults = [];
    for (const testCase of level.cases) {
      try {
        const result = await runAimFunctionSandbox(code, { x: testCase.x, y: testCase.y });
        const returned = result.ok ? normalizeDirection(result.value) : result.error || "error";
        nextResults.push({ ...testCase, returned, pass: returned === testCase.expected });
      } catch (error) {
        nextResults.push({ ...testCase, returned: error.message || "error", pass: false });
      }
    }
    setResults(nextResults);
    const ok = nextResults.every((item) => item.pass);
    setMessage(ok ? "pass" : "fail");
    if (ok) awardGameMission(`arrow-target-${level.id}`, level.xp, levelIndex === jsArenaLevels.length - 1 ? "arrow-clear" : null);
  };

  const nextLevel = () => {
    if (message === "pass") resetLevel((levelIndex + 1) % jsArenaLevels.length);
  };

  return (
    <section className="lab-shell">
      <div className="grid lg:grid-cols-[minmax(0,.94fr)_minmax(430px,1.06fr)]">
        <div className="flex min-w-0 flex-col bg-ink p-3">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-display text-xl font-bold text-white">{copy.code}</div>
              <p className="mt-1 text-xs font-bold uppercase tracking-[.14em] text-indigo-200">{copy.level} {levelIndex + 1}/{jsArenaLevels.length} · {level.title[locale]}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setMissionOpen(true)} className="lab-toolbar-button"><Info className="size-4" />{copy.mission}</button>
              <button type="button" onClick={() => { setCode(starterCode); setResults(null); setMessage(null); }} className="lab-toolbar-button"><RotateCcw className="size-4" />{copy.reset}</button>
              <button type="button" onClick={fire} className="lab-primary-button"><TestTube2 className="size-4" />{copy.validate}</button>
              <button type="button" onClick={nextLevel} disabled={message !== "pass"} className="lab-toolbar-button disabled:cursor-not-allowed disabled:opacity-45">{copy.next}<ArrowRight className="size-4" /></button>
            </div>
          </div>
          <label className="flex min-h-0 flex-1 flex-col">
            <span className="sr-only">{copy.code}</span>
            <textarea value={code} onChange={(event) => { setCode(event.target.value); setResults(null); setMessage(null); }} spellCheck="false" className="code-editor min-h-[300px] sm:min-h-[420px] lg:min-h-[540px]" />
          </label>
          {message && (
            <p role="status" aria-live="polite" className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold ${message === "pass" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-900"}`}>
              {message === "pass" ? <CheckCircle2 className="size-5" /> : <TriangleAlert className="size-5" />}
              {message === "pass" ? (levelIndex === jsArenaLevels.length - 1 ? copy.complete : copy.pass) : copy.fail}
            </p>
          )}
        </div>

        <div className="grid gap-3 bg-white p-3">
          <div className="relative min-h-[390px] overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-indigo-50 via-rose-50 to-amber-50 p-5">
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold">
                <Crosshair className="size-5 text-orangePop" />
                {level.mission[locale]}
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[.12em] text-indigoPop">+{level.xp} XP</span>
            </div>

            <div className="absolute left-1/2 top-1/2 z-10 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-indigo-200 bg-indigoPop shadow-xl" />
            <div className={`absolute left-1/2 top-1/2 z-0 h-2 origin-left rounded-full transition-all duration-500 ${visibleResult?.pass ? "bg-green-500" : results ? "bg-amber-500" : "bg-indigo-400"}`} style={{ width: beam.width, transform: `rotate(${beam.rotate}deg)` }} />
            <img src={assetPaths.arrow} alt="" className="absolute left-1/2 top-1/2 z-10 h-10 w-28 origin-left -translate-y-1/2 transition-transform duration-500" style={{ transform: `rotate(${beam.rotate}deg) translateY(-50%)` }} />
            <img src={assetPaths.target} alt={copy.target} className="absolute z-20 size-24 -translate-x-1/2 -translate-y-1/2" style={{ left: `${focusCase.x}%`, top: `${focusCase.y}%` }} />
            {visibleResult?.pass && <img src={assetPaths.spark} alt="" className="absolute z-30 size-20 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ left: `${focusCase.x}%`, top: `${focusCase.y}%` }} />}
            <div className="absolute bottom-4 left-4 z-20 rounded-xl border border-white/70 bg-white/85 p-3 text-xs font-bold text-slate-600 shadow-sm">
              <p>{copy.visible}: x={focusCase.x}, y={focusCase.y}</p>
              <p>{copy.expected}: <span className="font-mono text-indigoPop">{focusCase.expected}</span></p>
              {visibleResult && <p>{copy.returned}: <span className={visibleResult.pass ? "text-green-700" : "text-amber-700"}>{visibleResult.returned}</span></p>}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl font-bold">{copy.tests}</h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">{copy.allowed}: center, left, right, up, down, left-up, right-up, left-down, right-down</p>
              </div>
            </div>
            <div className="mt-4 grid gap-2">
              {(results || level.cases.map((item) => ({ ...item, returned: "…", pass: false, waiting: true }))).map((item) => (
                <div key={`${item.x}-${item.y}-${item.expected}`} className={`grid gap-2 rounded-xl border p-3 text-sm font-semibold md:grid-cols-[1fr_auto] ${item.waiting ? "border-slate-200 bg-slate-50 text-slate-600" : item.pass ? "border-green-200 bg-green-50 text-green-900" : "border-amber-200 bg-amber-50 text-amber-900"}`}>
                  <span>x={item.x}, y={item.y} → <span className="font-mono">{item.expected}</span></span>
                  <span className="inline-flex items-center gap-2">{item.waiting ? <Crosshair className="size-4 text-indigoPop" /> : item.pass ? <CheckCircle2 className="size-4 text-green-700" /> : <TriangleAlert className="size-4 text-amber-700" />}{copy.returned}: <span className="font-mono">{item.returned}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MissionModal open={missionOpen} title={copy.title} closeLabel={locale === "fr" ? "Fermer" : "Close"} onClose={() => setMissionOpen(false)}>
        <p className="font-bold leading-7 text-ink/70">{copy.intro}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {jsArenaLevels.map((item, index) => (
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

export function normalizeDirection(value) {
  return String(value || "").trim().toLowerCase();
}

export function expectedDirection(target, deadZone = 8) {
  const dx = target.x - 50;
  const dy = target.y - 50;
  if (Math.abs(dx) <= deadZone && Math.abs(dy) <= deadZone) return "center";
  const horizontal = dx > deadZone ? "right" : dx < -deadZone ? "left" : "";
  const vertical = dy > deadZone ? "down" : dy < -deadZone ? "up" : "";
  return [horizontal, vertical].filter(Boolean).join("-") || "center";
}

function beamStyle(target) {
  const dx = target.x - 50;
  const dy = target.y - 50;
  const length = Math.sqrt(dx * dx + dy * dy);
  const rotate = Math.atan2(dy, dx) * (180 / Math.PI);
  return {
    width: `${Math.max(4, length)}%`,
    rotate
  };
}
