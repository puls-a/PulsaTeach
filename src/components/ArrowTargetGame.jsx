import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Info, RotateCcw, TestTube2, TriangleAlert } from "lucide-react";
import { assetPaths, awardGameMission } from "../gameContent.js";
import MissionModal from "./MissionModal.jsx";

const levels = [
  { id: "level-1", target: { x: 78, y: 48 }, expected: "right", xp: 20 },
  { id: "level-2", target: { x: 74, y: 25 }, expected: "right-up", xp: 30 },
  { id: "level-3", target: { x: 24, y: 72 }, expected: "left-down", xp: 40 }
];

const starterCode = `function aim(target) {
  const centerX = 50;
  const centerY = 50;

  if (target.x > centerX && target.y < centerY) {
    return "right-up";
  }

  if (target.x > centerX) {
    return "right";
  }

  return "left-down";
}`;

const text = {
  en: {
    title: "JavaScript Target Lab",
    intro: "Write a function that reads target coordinates and returns the correct direction.",
    mission: "Return the direction string needed to hit the target.",
    reset: "Reset",
    validate: "Fire",
    next: "Next target",
    code: "JavaScript mission code",
    expected: "Expected",
    returned: "Returned",
    pass: "Target hit. XP awarded.",
    fail: "Shot missed. Recheck your conditions.",
    tests: "Shot analysis"
  },
  fr: {
    title: "JavaScript Target Lab",
    intro: "Ecris une fonction qui lit les coordonnees de la cible et retourne la bonne direction.",
    mission: "Retourne le texte de direction necessaire pour toucher la cible.",
    reset: "Reset",
    validate: "Tirer",
    next: "Cible suivante",
    code: "Code JavaScript de mission",
    expected: "Attendu",
    returned: "Retourne",
    pass: "Cible touchee. XP attribue.",
    fail: "Tir rate. Verifie tes conditions.",
    tests: "Analyse du tir"
  }
};

export default function ArrowTargetGame({ locale = "en" }) {
  const copy = text[locale] || text.en;
  const [levelIndex, setLevelIndex] = useState(0);
  const [code, setCode] = useState(starterCode);
  const [shot, setShot] = useState(null);
  const [message, setMessage] = useState(null);
  const [missionOpen, setMissionOpen] = useState(false);

  const level = levels[levelIndex];
  const angle = useMemo(() => directionToAngle(shot?.direction || level.expected), [level.expected, shot]);
  const travel = shot?.passed ? 130 : 66;

  const fire = () => {
    try {
      const aim = new Function(`${code}; return aim;`)();
      if (typeof aim !== "function") throw new Error("aim must be a function");
      const returned = String(aim(level.target)).trim().toLowerCase();
      const passed = returned === level.expected;
      setShot({ passed, returned, direction: returned });
      setMessage(passed ? "pass" : "fail");
      if (passed) awardGameMission(`arrow-target-${level.id}`, level.xp, "arrow-clear");
    } catch (error) {
      setShot({ passed: false, returned: error.message, direction: "right" });
      setMessage("fail");
    }
  };

  const nextLevel = () => {
    setLevelIndex((value) => (value + 1) % levels.length);
    setShot(null);
    setMessage(null);
  };

  return (
    <section className="overflow-hidden rounded-[26px] bg-white clay">
      <div className="grid min-h-[660px] lg:grid-cols-[minmax(0,.94fr)_minmax(430px,1.06fr)]">
        <div className="flex min-w-0 flex-col bg-ink p-3">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="font-display text-xl font-bold text-white">{copy.code}</div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setMissionOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white/10 px-4 font-extrabold text-white">
                <Info className="size-4" />
                Mission
              </button>
              <button type="button" onClick={() => { setCode(starterCode); setShot(null); setMessage(null); }} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white/10 px-4 font-extrabold text-white">
                <RotateCcw className="size-4" />
                {copy.reset}
              </button>
              <button type="button" onClick={fire} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-rosePop px-5 font-extrabold text-white shadow-clayPressed">
                <TestTube2 className="size-4" />
                {copy.validate}
              </button>
              <button type="button" onClick={nextLevel} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-indigoPop px-4 font-extrabold text-white shadow-clayPressed">
                {copy.next}
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
          <label className="flex min-h-0 flex-1 flex-col">
          <textarea
            value={code}
            onChange={(event) => { setCode(event.target.value); setShot(null); setMessage(null); }}
            spellCheck="false"
            className="min-h-[520px] flex-1 resize-none rounded-2xl border-[3px] border-white/20 bg-[#111032] p-4 font-mono text-sm leading-7 text-indigo-100 outline-none focus:border-lemonPop"
          />
        </label>
          {message && (
            <p className={`mt-3 flex items-center gap-2 rounded-2xl px-3 py-2 font-extrabold ${message === "pass" ? "bg-green-100 text-mintPop" : "bg-lemonPop text-ink"}`}>
              {message === "pass" ? <CheckCircle2 className="size-5" /> : <TriangleAlert className="size-5" />}
              {message === "pass" ? copy.pass : copy.fail}
            </p>
          )}
        </div>

        <div className="grid bg-white p-3">
          <div className="relative min-h-[540px] overflow-hidden rounded-[24px] bg-gradient-to-br from-indigo-100 via-rose-100 to-yellow-100 p-5 clay-soft">
            <div className="inline-flex rounded-2xl bg-white px-4 py-2 font-extrabold clay-soft">
              {copy.mission}
            </div>
            <div className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigoPop clay-soft" />
            <img
              src={assetPaths.arrow}
              alt=""
              className="absolute left-1/2 top-1/2 h-12 w-32 origin-left -translate-y-1/2 transition-transform duration-700"
              style={{
                transform: `rotate(${angle}deg) translateX(${shot ? travel : 0}px) translateY(-50%)`
              }}
            />
            <img
              src={assetPaths.target}
              alt="Target"
              className="absolute size-24 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${level.target.x}%`, top: `${level.target.y}%` }}
            />
            {shot?.passed && (
              <img
                src={assetPaths.spark}
                alt=""
                className="absolute size-20 -translate-x-1/2 -translate-y-1/2 animate-pulse"
                style={{ left: `${level.target.x}%`, top: `${level.target.y}%` }}
              />
            )}
          </div>
        </div>
      </div>
      <MissionModal open={missionOpen} title={copy.title} onClose={() => setMissionOpen(false)}>
        <p className="font-bold leading-7 text-ink/70">{copy.intro}</p>
        <div className="mt-5 rounded-[24px] bg-white p-4 clay-soft">
          <h3 className="font-display text-2xl font-bold">{copy.tests}</h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            <Stat label="x" value={level.target.x} />
            <Stat label="y" value={level.target.y} />
            <Stat label={copy.expected} value={level.expected} />
            <Stat label={copy.returned} value={shot?.returned || "..."} />
          </div>
        </div>
      </MissionModal>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-cloud p-3 font-extrabold clay-soft">
      <p className="text-xs uppercase tracking-[.14em] text-indigoPop">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}

function directionToAngle(direction) {
  const angles = {
    right: 0,
    "right-up": -35,
    "right-down": 35,
    left: 180,
    "left-up": -145,
    "left-down": 145,
    up: -90,
    down: 90
  };
  return angles[direction] ?? 0;
}
