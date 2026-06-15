import { useMemo, useState } from "react";
import { CheckCircle2, Info, RotateCcw, Target, TestTube2, TriangleAlert } from "lucide-react";
import { assetPaths, awardGameMission } from "../gameContent.js";
import MissionModal from "./MissionModal.jsx";

const starterCss = `.arena {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}`;

const copyMap = {
  en: {
    title: "Flexbox Arena",
    intro: "Write the flex declarations that move the bot onto the target.",
    mission: "Mission: reach the right-center target.",
    reset: "Reset",
    validate: "Validate",
    passed: "Arena cleared. Badge unlocked.",
    failed: "The bot is not aligned with the target yet.",
    code: "CSS mission code",
    tests: "Arena tests"
  },
  fr: {
    title: "Flexbox Arena",
    intro: "Ecris les declarations flex qui deplacent le bot sur la cible.",
    mission: "Mission : atteindre la cible au centre droit.",
    reset: "Reset",
    validate: "Valider",
    passed: "Arena reussie. Badge debloque.",
    failed: "Le bot n'est pas encore aligne avec la cible.",
    code: "Code CSS de mission",
    tests: "Tests de l'arene"
  }
};

export default function FlexboxArena({ locale = "en" }) {
  const copy = copyMap[locale] || copyMap.en;
  const [code, setCode] = useState(starterCss);
  const [status, setStatus] = useState(null);
  const [missionOpen, setMissionOpen] = useState(false);

  const parsed = useMemo(() => ({
    display: readDeclaration(code, "display", "block"),
    justifyContent: readDeclaration(code, "justify-content", "flex-start"),
    alignItems: readDeclaration(code, "align-items", "flex-start")
  }), [code]);

  const tests = [
    { label: "display: flex", pass: parsed.display === "flex" },
    { label: "justify-content: flex-end", pass: parsed.justifyContent === "flex-end" },
    { label: "align-items: center", pass: parsed.alignItems === "center" }
  ];

  const validate = () => {
    const passed = tests.every((test) => test.pass);
    setStatus(passed ? "passed" : "failed");
    if (passed) awardGameMission("flexbox-arena-01", 40, "flexbox-clear");
  };

  return (
    <section className="overflow-hidden rounded-[26px] bg-white clay">
      <div className="grid min-h-[640px] gap-0 lg:grid-cols-[minmax(0,.92fr)_minmax(420px,1.08fr)]">
        <div className="flex min-w-0 flex-col bg-ink p-3">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="font-display text-xl font-bold text-white">{copy.code}</div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setMissionOpen(true)} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white/10 px-4 font-extrabold text-white">
                <Info className="size-4" />
                Mission
              </button>
              <button type="button" onClick={() => { setCode(starterCss); setStatus(null); }} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-white/10 px-4 font-extrabold text-white">
                <RotateCcw className="size-4" />
                {copy.reset}
              </button>
              <button type="button" onClick={validate} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-aquaPop px-5 font-extrabold text-white shadow-clayPressed">
                <TestTube2 className="size-4" />
                {copy.validate}
              </button>
            </div>
          </div>
          <label className="flex min-h-0 flex-1 flex-col">
            <textarea
              value={code}
              onChange={(event) => { setCode(event.target.value); setStatus(null); }}
              spellCheck="false"
              className="min-h-[520px] flex-1 resize-none rounded-2xl border-[3px] border-white/20 bg-[#111032] p-4 font-mono text-sm leading-7 text-indigo-100 outline-none focus:border-lemonPop"
            />
          </label>
          {status && (
            <p className={`mt-3 rounded-2xl px-3 py-2 font-extrabold ${status === "passed" ? "bg-mintPop text-white" : "bg-lemonPop text-ink"}`}>
              {status === "passed" ? copy.passed : copy.failed}
            </p>
          )}
        </div>

        <div className="grid bg-white p-3">
          <div className="relative min-h-[520px] overflow-hidden rounded-[24px] bg-gradient-to-br from-cyan-100 via-orange-100 to-green-100 p-5 clay-soft">
            <div className="mb-3 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 font-extrabold clay-soft">
              <Target className="size-5 text-orangePop" />
              {copy.mission}
            </div>
            <img src={assetPaths.target} alt="" className="absolute right-8 top-1/2 size-24 -translate-y-1/2" />
            <div
              className="relative z-10 h-[250px] rounded-[26px] border-[3px] border-dashed border-ink/55 bg-white/58 p-4"
              style={{ display: parsed.display, justifyContent: parsed.justifyContent, alignItems: parsed.alignItems }}
            >
              <img src={assetPaths.bot} alt="PulsaTeach bot" className="size-24 drop-shadow-xl" />
            </div>
          </div>
        </div>
      </div>
      <MissionModal open={missionOpen} title={copy.title} onClose={() => setMissionOpen(false)}>
        <p className="font-bold leading-7 text-ink/70">{copy.intro}</p>
        <div className="mt-5 rounded-[24px] bg-white p-4 clay-soft">
          <h3 className="font-display text-2xl font-bold">{copy.tests}</h3>
          <div className="mt-3 grid gap-2">
            {tests.map((test) => (
              <p key={test.label} className={`flex items-center gap-2 rounded-2xl px-3 py-2 font-extrabold ${test.pass ? "bg-green-100 text-mintPop" : "bg-orange-100 text-orangePop"}`}>
                {test.pass ? <CheckCircle2 className="size-5" /> : <TriangleAlert className="size-5" />}
                {test.label}
              </p>
            ))}
          </div>
        </div>
      </MissionModal>
    </section>
  );
}

function readDeclaration(code, property, fallback) {
  const match = new RegExp(`${property}\\s*:\\s*([^;\\n}]+)`, "i").exec(code);
  return match ? match[1].trim().toLowerCase() : fallback;
}
