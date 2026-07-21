import { ArrowRight, LoaderCircle } from "lucide-react";

export function LearnerPageHero({ icon: Icon, eyebrow, title, description, status, action, children }) {
  return (
    <header className="rounded-3xl bg-slate-950 p-5 text-white shadow-xl sm:p-8">
      <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            {Icon && <span className="grid size-10 place-items-center rounded-2xl bg-white/10"><Icon className="size-5 text-emerald-300" /></span>}
            <p className="text-xs font-black uppercase tracking-[.18em] text-indigo-200">{eyebrow}</p>
            {status && <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-emerald-300" role="status">{status}</span>}
          </div>
          <h1 className="mt-5 font-display text-3xl font-black tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">{description}</p>
        </div>
        {action && <a href={action.href} onClick={(event) => scrollToAction(event, action.href)} className="primary-button w-fit shrink-0">{action.label}<ArrowRight className="size-4" /></a>}
      </div>
      {children && <div className="mt-7">{children}</div>}
    </header>
  );
}

export function MetricCard({ icon: Icon, label, value, detail, tone = "default" }) {
  const reward = tone === "reward";
  return (
    <div className={`rounded-2xl border p-4 ${reward ? "border-slate-700 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-950"}`}>
      <div className="flex items-center justify-between gap-3">
        <p className={`text-sm font-semibold ${reward ? "text-slate-300" : "text-slate-500"}`}>{label}</p>
        {Icon && <Icon className={`size-5 ${reward ? "text-emerald-300" : "text-indigoPop"}`} />}
      </div>
      <p className={`mt-3 font-display text-3xl font-black ${reward ? "text-emerald-300" : ""}`}>{value}</p>
      {detail && <p className={`mt-1 text-xs font-semibold ${reward ? "text-slate-400" : "text-slate-500"}`}>{detail}</p>}
    </div>
  );
}

export function ProgressMeter({ label, value = 0, detail, tone = "indigo" }) {
  const percent = Math.max(0, Math.min(100, Number(value) || 0));
  const fill = tone === "emerald" ? "bg-emerald-400" : "bg-indigoPop";
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm font-bold">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-label={label} aria-valuemin="0" aria-valuemax="100" aria-valuenow={percent}>
        <div className={`h-full rounded-full ${fill}`} style={{ width: `${percent}%` }} />
      </div>
      {detail && <p className={`mt-2 text-xs font-semibold ${tone === "emerald" ? "text-slate-300" : "text-slate-500"}`}>{detail}</p>}
    </div>
  );
}

const statusTones = {
  approved: "bg-emerald-50 text-emerald-800",
  issued: "bg-emerald-50 text-emerald-800",
  submitted: "bg-indigo-50 text-indigo-800",
  in_review: "bg-indigo-50 text-indigo-800",
  changes_requested: "bg-amber-50 text-amber-900"
};

const statusLabels = {
  approved: { fr: "Approuvé", en: "Approved" },
  issued: { fr: "Délivré", en: "Issued" },
  submitted: { fr: "Soumis", en: "Submitted" },
  in_review: { fr: "En revue", en: "In review" },
  changes_requested: { fr: "Corrections demandées", en: "Changes requested" }
};

export function StatusBadge({ status, locale = "fr" }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusTones[status] || "bg-slate-100 text-slate-700"}`}>{statusLabels[status]?.[locale] || status}</span>;
}

export function LoadingState({ label }) {
  return <p className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 font-semibold text-slate-600" role="status"><LoaderCircle className="size-5 animate-spin text-indigoPop" />{label}</p>;
}

function scrollToAction(event, href) {
  if (!href.startsWith("#")) return;
  const target = document.querySelector(href);
  if (!target) return;
  event.preventDefault();
  window.history.pushState(null, "", href);
  window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - 96), behavior: "instant" });
}
