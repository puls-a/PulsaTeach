import {
  Badge,
  BookMarked,
  CheckCircle2,
  Code2,
  FolderKanban,
  Gamepad2,
  GraduationCap,
  Route,
  Sparkles,
  Trophy
} from "lucide-react";
import { curriculum } from "./curriculumData.js";

const trackStyles = {
  html: {
    shell: "bg-orange-100",
    badge: "bg-orangePop",
    text: "text-orangePop"
  },
  css: {
    shell: "bg-cyan-100",
    badge: "bg-aquaPop",
    text: "text-aquaPop"
  },
  javascript: {
    shell: "bg-green-100",
    badge: "bg-mintPop",
    text: "text-mintPop"
  }
};

export default function CurriculumSection({ locale }) {
  const t = (value) => value?.[locale] ?? value?.en ?? value;

  return (
    <section id="curriculum" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid gap-6 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <p className="font-display text-lg font-bold text-orangePop">
              {locale === "fr" ? "Curriculum complet" : "Complete curriculum"}
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-normal sm:text-5xl">
              {locale === "fr" ? "Un parcours HTML, CSS et JavaScript prêt à devenir interactif." : "A HTML, CSS, and JavaScript path ready to become interactive."}
            </h2>
          </div>
          <div className="clay rounded-[28px] bg-white p-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <Kpi icon={Route} value={`${curriculum.meta.totalHours}h`} label={locale === "fr" ? "parcours estimé" : "estimated path"} />
              <Kpi icon={GraduationCap} value={t(curriculum.meta.audience)} label={locale === "fr" ? "public" : "audience"} />
              <Kpi icon={Trophy} value={t(curriculum.meta.exitTarget)} label={locale === "fr" ? "objectif de sortie" : "exit target"} />
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {curriculum.meta.principles.map((principle) => (
            <article className="clay-soft rounded-[24px] bg-white p-5" key={t(principle.title)}>
              <Sparkles className="mb-4 size-6 text-orangePop" />
              <h3 className="font-display text-xl font-bold">{t(principle.title)}</h3>
              <p className="mt-3 font-semibold leading-7 text-ink/68">{t(principle.text)}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] bg-ink p-5 text-white clay">
          <p className="text-sm font-extrabold uppercase tracking-[.14em] text-lemonPop">
            {locale === "fr" ? "Boucle pédagogique" : "Learning loop"}
          </p>
          <p className="mt-3 text-lg font-bold leading-8">{t(curriculum.meta.loop)}</p>
        </div>

        <div className="mt-12 grid gap-6">
          {curriculum.tracks.map((track) => (
            <TrackCard track={track} locale={locale} key={track.id} />
          ))}
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
          <HtmlLessonMap locale={locale} />
          <ProgressionPanel locale={locale} />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <ExerciseTypePanel locale={locale} />
          <ProjectPanel locale={locale} />
        </div>
      </div>
    </section>
  );
}

function Kpi({ icon: Icon, value, label }) {
  return (
    <div className="rounded-[22px] bg-cloud p-4 clay-soft">
      <Icon className="mb-3 size-6 text-indigoPop" />
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="text-sm font-extrabold text-ink/62">{label}</p>
    </div>
  );
}

function TrackCard({ track, locale }) {
  const t = (value) => value?.[locale] ?? value?.en ?? value;
  const styles = trackStyles[track.id];

  return (
    <article className={`clay rounded-[30px] p-5 ${styles.shell}`}>
      <div className="grid gap-6 lg:grid-cols-[.78fr_1.22fr]">
        <div className="rounded-[24px] bg-white p-5 clay-soft">
          <span className={`inline-flex rounded-2xl px-4 py-2 text-sm font-extrabold text-white clay-soft ${styles.badge}`}>
            {track.label}
          </span>
          <h3 className="mt-5 font-display text-3xl font-bold">{t(track.title)}</h3>
          <p className="mt-3 font-extrabold text-ink/64">{track.hours}h · {t(track.level)}</p>
          <p className="mt-5 font-bold leading-7 text-ink/72">
            {locale === "fr" ? "Projet final : " : "Final project: "}
            <span className={styles.text}>{t(track.finalProject)}</span>
          </p>
          <div className="mt-5 space-y-2">
            {track.unlocks[locale].map((unlock) => (
              <p className="flex gap-2 font-bold text-ink/70" key={unlock}>
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mintPop" />
                {unlock}
              </p>
            ))}
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {track.modules.map((item) => (
            <div className="rounded-[22px] bg-white p-4 clay-soft" key={t(item.title)}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <h4 className="font-display text-xl font-bold">{t(item.title)}</h4>
                <span className="rounded-xl bg-cloud px-3 py-1 text-sm font-extrabold text-indigoPop">{item.duration}</span>
              </div>
              <p className="text-sm font-extrabold uppercase tracking-[.12em] text-ink/45">
                {locale === "fr" ? "Mini-projet" : "Mini-project"}
              </p>
              <p className="mt-1 font-bold text-ink/72">{t(item.miniProject)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.lessons.slice(0, 4).map((lesson) => (
                  <span className="rounded-xl bg-cloud px-3 py-1 text-xs font-extrabold text-ink/66" key={t(lesson)}>
                    {t(lesson)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function HtmlLessonMap({ locale }) {
  const t = (value) => value?.[locale] ?? value?.en ?? value;

  return (
    <section className="clay rounded-[30px] bg-white p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg font-bold text-orangePop">HTML</p>
          <h3 className="font-display text-3xl font-bold">
            {locale === "fr" ? "12 leçons détaillées du rapport" : "12 detailed lessons from the report"}
          </h3>
        </div>
        <BookMarked className="size-9 text-orangePop" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {curriculum.htmlLessons.map((lesson) => (
          <article className="rounded-[20px] bg-cloud p-4 clay-soft" key={lesson.id}>
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-display text-lg font-bold">{t(lesson.title)}</h4>
              <span className="rounded-xl bg-lemonPop px-2 py-1 text-xs font-extrabold">{lesson.xp} XP</span>
            </div>
            <p className="mt-2 text-sm font-bold leading-6 text-ink/68">{t(lesson.focus)}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-xl bg-white px-3 py-1 text-xs font-extrabold text-indigoPop">{lesson.type}</span>
              {lesson.badge && <span className="rounded-xl bg-white px-3 py-1 text-xs font-extrabold text-orangePop">{lesson.badge}</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProgressionPanel({ locale }) {
  return (
    <section className="clay rounded-[30px] bg-lemonPop p-5">
      <div className="rounded-[24px] bg-white p-5 clay-soft">
        <div className="flex items-center gap-3">
          <Trophy className="size-8 text-orangePop" />
          <h3 className="font-display text-3xl font-bold">{locale === "fr" ? "XP, niveaux et badges" : "XP, levels, and badges"}</h3>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {curriculum.progression.xpByType.map(([type, xp]) => (
            <div className="flex items-center justify-between rounded-2xl bg-cloud px-4 py-3 font-extrabold clay-soft" key={type}>
              <span>{type}</span>
              <span className="text-indigoPop">{xp} XP</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 rounded-[24px] bg-ink p-5 text-white clay-soft">
        <p className="font-display text-2xl font-bold">{locale === "fr" ? "Mur de badges" : "Badge wall"}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {curriculum.progression.badges.map((badge) => (
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/12 px-3 py-2 text-xs font-extrabold" key={badge}>
              <Badge className="size-4 text-lemonPop" />
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExerciseTypePanel({ locale }) {
  const t = (value) => value?.[locale] ?? value?.en ?? value;

  return (
    <section className="clay rounded-[30px] bg-indigoPop p-5 text-white">
      <div className="mb-5 flex items-center gap-3">
        <Gamepad2 className="size-8 text-lemonPop" />
        <h3 className="font-display text-3xl font-bold">{locale === "fr" ? "Formats interactifs" : "Interactive formats"}</h3>
      </div>
      <div className="space-y-3">
        {curriculum.exerciseTypes.map((type) => (
          <article className="rounded-[20px] bg-white p-4 text-ink clay-soft" key={type.id}>
            <h4 className="font-display text-xl font-bold">{t(type.title)}</h4>
            <p className="mt-1 font-semibold leading-6 text-ink/68">{t(type.text)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectPanel({ locale }) {
  const t = (value) => value?.[locale] ?? value?.en ?? value;

  return (
    <section className="clay rounded-[30px] bg-white p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-lg font-bold text-orangePop">{locale === "fr" ? "Projets transversaux" : "Cross-track projects"}</p>
          <h3 className="font-display text-3xl font-bold">{locale === "fr" ? "12 livrables progressifs" : "12 progressive deliverables"}</h3>
        </div>
        <FolderKanban className="size-9 text-indigoPop" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {curriculum.projects.map((project) => (
          <article className="rounded-[20px] bg-cloud p-4 clay-soft" key={t(project.title)}>
            <div className="flex items-center justify-between gap-3">
              <h4 className="font-display text-xl font-bold">{t(project.title)}</h4>
              <span className="rounded-xl bg-white px-3 py-1 text-xs font-extrabold text-indigoPop">{project.level}</span>
            </div>
            <p className="mt-2 font-semibold leading-6 text-ink/68">{t(project.success)}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span className="inline-flex items-center gap-1 rounded-xl bg-white px-2 py-1 text-xs font-extrabold text-ink/62" key={skill}>
                  <Code2 className="size-3" />
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
