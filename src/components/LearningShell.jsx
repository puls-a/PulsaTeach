import { Activity, BookOpen, Code2, Gamepad2, Map, Route, Trophy } from "lucide-react";

const workspaceLinks = [
  { href: "/catalog", icon: BookOpen, label: { en: "Courses", fr: "Formations" } },
  { href: "/learn", icon: Code2, label: { en: "Lessons", fr: "Leçons" } },
  { href: "/path", icon: Route, label: { en: "My path", fr: "Mon parcours" } },
  { href: "/playground", icon: Gamepad2, label: { en: "Playground", fr: "Playground" } },
  { href: "/world", icon: Map, label: { en: "Challenges", fr: "Défis" } },
  { href: "/dashboard", icon: Activity, label: { en: "Progress", fr: "Progression" } }
];

export default function LearningShell({ locale = "en", kicker, title, description, stat, children }) {
  return (
    <section className="px-3 pb-16 pt-24 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-[1500px]">
        <header className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="min-w-0">
              <p className="text-sm font-bold text-indigoPop">{kicker}</p>
              <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
              {description && <p className="mt-2 max-w-3xl text-sm font-semibold text-slate-500 sm:text-base">{description}</p>}
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {stat && <div className="rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-bold text-indigoPop">{stat}</div>}
              <a href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-bold text-white hover:bg-indigoPop"><Trophy className="size-4" />{locale === "fr" ? "Ma progression" : "My progress"}</a>
            </div>
          </div>

          <nav className="mt-4 flex gap-1 overflow-x-auto border-t border-slate-100 pt-3" aria-label="Espace d'apprentissage">
            {workspaceLinks.map(({ href, icon: Icon, label }) => (
              <a key={href} href={href} className="inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-500 hover:bg-slate-100 hover:text-indigoPop">
                <Icon className="size-4" />{label[locale]}
              </a>
            ))}
          </nav>
        </header>

        <div className="min-w-0 mission-enter">{children}</div>
      </div>
    </section>
  );
}
