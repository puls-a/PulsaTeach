import { deploymentInfo } from "../deploymentInfo.js";
import { openPrivacySettings } from "../privacyConsent.js";

const socialLinks = [
  { id: "discord", label: "Discord", href: "https://discord.gg/K4sXatdzzt" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@pulsateach" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/pulsateach_/" },
  { id: "x", label: "X", href: "https://x.com/pulsateach" }
];

export default function AppFooter({ locale }) {
  const fr = locale === "fr";
  const legalLinks = [
    { href: "/privacy", label: fr ? "Confidentialit\u00e9" : "Privacy" },
    { href: "/about", label: fr ? "\u00c0 propos" : "About" },
    { href: "/cookies", label: "Cookies" },
    { href: "/terms", label: fr ? "Conditions" : "Terms" },
    { href: "/legal", label: fr ? "Mentions l\u00e9gales" : "Legal notice" }
  ];

  return (
    <footer className="border-t border-white/10 bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 text-sm text-slate-400">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-2 lg:items-end">
          <div className="flex max-w-lg flex-col items-start gap-4">
            <a href="/" className="inline-flex rounded-xl focus-visible:outline-white" aria-label={fr ? "Accueil PulsaTeach" : "PulsaTeach home"}>
              <img src="/assets/logo-wordmark.webp" alt="PulsaTeach" className="h-10 w-auto brightness-0 invert" width="198" height="48" loading="lazy" />
            </a>
            <p className="max-w-md text-base font-semibold leading-7 text-slate-300">
              {fr
                ? "Apprends le d\u00e9veloppement web en construisant des projets que tu peux expliquer, publier et montrer."
                : "Learn web development by building projects you can explain, publish, and show."}
            </p>
            <SocialLinks locale={locale} />
          </div>

          <div className="flex flex-col gap-5 lg:items-end lg:text-right">
            <div>
              <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-300">{fr ? "Une question ?" : "Have a question?"}</p>
              <a href="mailto:pulsateach@gmail.com" className="mt-2 inline-flex w-fit break-all text-base font-black text-white hover:text-indigo-300">
                pulsateach@gmail.com
              </a>
            </div>
            <nav className="flex max-w-xl flex-wrap gap-x-5 gap-y-3 font-semibold text-slate-300 lg:justify-end" aria-label={fr ? "Liens du pied de page" : "Footer links"}>
              {legalLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-white">{link.label}</a>
              ))}
              <button type="button" onClick={openPrivacySettings} className="font-semibold text-slate-300 hover:text-white">
                {fr ? "Stockages utilis\u00e9s" : "Storage used"}
              </button>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-5 text-slate-400 sm:text-sm">
            {"\u00a9"} 2026 PulsaTeach {"\u00b7"} {fr ? "Derni\u00e8re mise en ligne" : "Last deployment"} :{" "}
            <time dateTime={deploymentInfo.isoDate}>{deploymentInfo.label[locale]}</time>
          </p>
          <a href="https://pulsaflow.fr" target="_blank" rel="noopener noreferrer" className="pulsaflow-badge inline-flex w-fit items-center gap-1 self-start rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.06em] text-slate-300 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white sm:self-auto" aria-label="Powered by PulsaFlow">
            <span className="pulsaflow-badge-dot size-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
            Powered by PulsaFlow
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialLinks({ locale }) {
  return (
    <nav className="flex flex-wrap gap-2" aria-label={locale === "fr" ? "R\u00e9seaux sociaux PulsaTeach" : "PulsaTeach social media"}>
      {socialLinks.map((link) => (
        <a key={link.id} href={link.href} target="_blank" rel="me noopener noreferrer" className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-black uppercase tracking-[.08em] text-slate-300 transition hover:-translate-y-0.5 hover:bg-white/10 hover:text-white" aria-label={`${link.label} PulsaTeach`}>
          <SocialIcon id={link.id} />
          {link.id === "x" ? <span className="sr-only">X</span> : <span>{link.label}</span>}
        </a>
      ))}
    </nav>
  );
}

function SocialIcon({ id }) {
  const common = "size-4 shrink-0 transition group-hover:scale-110";
  if (id === "discord") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={common} fill="currentColor">
        <path d="M19.54 5.34a16.7 16.7 0 0 0-4.13-1.28.08.08 0 0 0-.09.04c-.18.32-.39.73-.53 1.06a15.6 15.6 0 0 0-4.68 0 10.6 10.6 0 0 0-.54-1.06.08.08 0 0 0-.09-.04 16.5 16.5 0 0 0-4.13 1.28.08.08 0 0 0-.04.03C2.69 9.28 1.98 13.1 2.34 16.86c0 .02.02.05.04.06a16.8 16.8 0 0 0 5.07 2.56.09.09 0 0 0 .1-.03c.39-.53.73-1.09 1.03-1.68a.08.08 0 0 0-.05-.12 11 11 0 0 1-1.58-.75.08.08 0 0 1 0-.14l.31-.24a.08.08 0 0 1 .08 0c3.03 1.38 6.31 1.38 9.3 0a.08.08 0 0 1 .09 0l.31.24a.08.08 0 0 1 0 .14c-.5.3-1.03.55-1.58.75a.08.08 0 0 0-.04.12c.3.59.64 1.15 1.02 1.68.03.03.07.04.1.03a16.7 16.7 0 0 0 5.08-2.56.08.08 0 0 0 .03-.06c.43-4.35-.72-8.14-3.08-11.49a.07.07 0 0 0-.04-.03ZM8.68 14.57c-.91 0-1.66-.84-1.66-1.87 0-1.04.73-1.88 1.66-1.88.93 0 1.67.85 1.66 1.88 0 1.03-.73 1.87-1.66 1.87Zm6.65 0c-.92 0-1.66-.84-1.66-1.87 0-1.04.73-1.88 1.66-1.88.93 0 1.67.85 1.66 1.88 0 1.03-.73 1.87-1.66 1.87Z" />
      </svg>
    );
  }
  if (id === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={common} fill="currentColor">
        <path d="M16.6 5.82a5.66 5.66 0 0 0 3.31 1.06v3.02a8.55 8.55 0 0 1-3.37-.7v5.74a5.65 5.65 0 1 1-5.65-5.65c.32 0 .63.03.93.08v3.12a2.64 2.64 0 1 0 1.7 2.46V2.75h3.08c.08.73.38 2.04 1.99 3.07Z" />
      </svg>
    );
  }
  if (id === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={common} fill="currentColor">
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.96 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.72 6.24 5.44-6.24Zm-1.16 17.52h1.83L7.08 4.13H5.11l11.97 15.64Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={common} fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="16" height="16" x="4" y="4" rx="4" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M17.5 6.8h.01" strokeLinecap="round" />
    </svg>
  );
}
