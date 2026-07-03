import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  Code2,
  Compass,
  FileBadge,
  FolderKanban,
  Gamepad2,
  Languages,
  LayoutDashboard,
  LogIn,
  LogOut,
  Map,
  Menu,
  PenTool,
  Route,
  RotateCcw,
  Settings,
  Shield,
  Sparkles,
  UserRound,
  X
} from "lucide-react";
import { signOutSupabase, useSupabaseSession } from "./authState.js";
import { canManageContent } from "./authRoles.js";
import { languages } from "./content.js";
import AuthPage from "./AuthPage.jsx";
import { OnboardingPage, PasswordRecoveryPage, PublicCertificatePage } from "./AccountPages.jsx";
import LandingPage from "./LandingPage.jsx";
import AboutPage from "./AboutPage.jsx";
import CookieConsent from "./components/CookieConsent.jsx";
import { CookiesPage, LegalNoticePage, PrivacyPage, TermsPage } from "./LegalPages.jsx";
import { openPrivacySettings } from "./privacyConsent.js";
import { currentPathSegments, migrateLegacyHashRoute } from "./navigation.js";
import { updatePageMetadata } from "./appMetadata.js";
import { deploymentInfo } from "./deploymentInfo.js";

const GlossaryPage = lazy(() => import("./features/glossary/GlossaryPage.jsx"));
const ReviewPage = lazy(() => import("./features/review/ReviewPage.jsx"));
const CourseStudio = lazy(() => import("./CourseStudio.jsx"));
const CurriculumHub = lazy(() => import("./CurriculumHub.jsx"));
const FlexboxArenaPage = lazyNamed(() => import("./GamePages.jsx"), "FlexboxArenaPage");
const JavaScriptArenaPage = lazyNamed(() => import("./GamePages.jsx"), "JavaScriptArenaPage");
const LivePlaygroundPage = lazyNamed(() => import("./GamePages.jsx"), "LivePlaygroundPage");
const WorldPage = lazyNamed(() => import("./GamePages.jsx"), "WorldPage");
const AdminPage = lazyNamed(() => import("./pages.jsx"), "AdminPage");
const AnalyticsPage = lazy(() => import("./features/analytics/AnalyticsPage.jsx"));
const AuthorPage = lazyNamed(() => import("./pages.jsx"), "AuthorPage");
const CertificationPage = lazy(() => import("./features/certificates/CertificationPage.jsx"));
const DashboardPage = lazy(() => import("./features/dashboard/DashboardPage.jsx"));
const LearnPage = lazy(() => import("./features/learn/LearnPage.jsx"));
const PathPage = lazyNamed(() => import("./pages.jsx"), "PathPage");
const ProfilePage = lazyNamed(() => import("./pages.jsx"), "ProfilePage");
const ProjectsPage = lazy(() => import("./features/projects/ProjectsPage.jsx"));
const RoadmapPage = lazy(() => import("./features/roadmap/RoadmapPage.jsx"));
const SettingsPage = lazy(() => import("./AccountSettings.jsx"));

const navGroups = [
  {
    id: "learn",
    align: "left-0",
    label: { fr: "Apprendre", en: "Learn" },
    icon: BookOpen,
    items: [
      { href: "/catalog", routes: ["home", "catalog"], icon: Compass, title: { fr: "Toutes les formations", en: "All courses" }, text: { fr: "Explorer le curriculum complet", en: "Explore the full curriculum" } },
      { href: "/about", routes: ["about"], icon: Sparkles, title: { fr: "À propos", en: "About" }, text: { fr: "Comprendre la méthode PulsaTeach", en: "Understand the PulsaTeach method" } },
      { href: "/glossary", routes: ["glossary"], icon: Languages, title: { fr: "Vocabulaire", en: "Glossary" }, text: { fr: "Retrouver les notions de tous les parcours", en: "Find concepts from every track" } },
      { href: "/learn", routes: ["learn"], icon: Code2, title: { fr: "Continuer une leçon", en: "Continue a lesson" }, text: { fr: "Ouvrir le lab interactif", en: "Open the interactive lab" } },
      { href: "/path", routes: ["path"], icon: Route, title: { fr: "Mon parcours", en: "My path" }, text: { fr: "Voir la prochaine étape conseillée", en: "See the recommended next step" } },
      { href: "/dashboard", routes: ["dashboard"], icon: LayoutDashboard, title: { fr: "Ma progression", en: "My progress" }, text: { fr: "Leçons, XP et activité", en: "Lessons, XP, and activity" } }
    ]
  },
  {
    id: "practice",
    align: "left-1/2 -translate-x-1/2",
    label: { fr: "Pratiquer", en: "Practice" },
    icon: Gamepad2,
    items: [
      { href: "/review", routes: ["review"], icon: RotateCcw, title: { fr: "Révisions", en: "Reviews" }, text: { fr: "Réactiver les notions au bon moment", en: "Recall concepts at the right time" } },
      { href: "/playground", routes: ["playground"], icon: Code2, title: { fr: "Playground", en: "Playground" }, text: { fr: "Coder librement dans le navigateur", en: "Code freely in the browser" } },
      { href: "/world", routes: ["world"], icon: Map, title: { fr: "Monde des défis", en: "Challenge world" }, text: { fr: "Missions et exercices guidés", en: "Missions and guided exercises" } },
      { href: "/flexbox-arena", routes: ["flexbox-arena"], icon: Sparkles, title: { fr: "Flexbox Arena", en: "Flexbox Arena" }, text: { fr: "Maîtriser les layouts CSS", en: "Master CSS layouts" } },
      { href: "/js-arena", routes: ["js-arena"], icon: Gamepad2, title: { fr: "JavaScript Arena", en: "JavaScript Arena" }, text: { fr: "Résoudre des défis de logique", en: "Solve logic challenges" } },
      { href: "/projects", routes: ["projects"], icon: FolderKanban, title: { fr: "Mes projets", en: "My projects" }, text: { fr: "Soumettre des réalisations", en: "Submit your work" } },
      { href: "/certification", routes: ["certification"], icon: FileBadge, title: { fr: "Certifications", en: "Certifications" }, text: { fr: "Valider les parcours terminés", en: "Validate completed paths" } }
    ]
  },
  {
    id: "create",
    align: "right-0",
    label: { fr: "Créer", en: "Create" },
    icon: PenTool,
    items: [
      { href: "/studio", routes: ["studio"], icon: BookOpen, title: { fr: "Course Studio", en: "Course Studio" }, text: { fr: "Créer et organiser des formations", en: "Create and organize courses" } },
      { href: "/author", routes: ["author"], icon: PenTool, title: { fr: "Éditeur de leçons", en: "Lesson editor" }, text: { fr: "Rédiger les contenus et exercices", en: "Write content and exercises" } },
      { href: "/analytics", routes: ["analytics"], icon: BarChart3, title: { fr: "Statistiques", en: "Analytics" }, text: { fr: "Analyser l’usage du contenu", en: "Analyze content usage" } },
      { href: "/admin", routes: ["admin"], icon: Shield, title: { fr: "Administration", en: "Administration" }, text: { fr: "Relire les projets et publier", en: "Review projects and publish" } },
      { href: "/roadmap", routes: ["roadmap"], icon: Map, title: { fr: "Roadmap produit", en: "Product roadmap" }, text: { fr: "Suivre les prochaines évolutions", en: "Track upcoming improvements" } }
    ]
  }
];

const socialLinks = [
  { id: "discord", label: "Discord", href: "https://discord.gg/pnAdQQggUg" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@pulsateach" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/pulsateach_/" },
  { id: "x", label: "X", href: "https://x.com/pulsateach" }
];

function App() {
  const [locale, setLocale] = useState(() => localStorage.getItem("pulsateach-locale") || "fr");
  const [route, setRoute] = useState(() => {
    migrateLegacyHashRoute();
    return getPageRoute();
  });
  const copy = languages[locale];

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    updatePageMetadata(route, locale, copy.metaTitle);
    localStorage.setItem("pulsateach-locale", locale);
  }, [copy.metaTitle, locale, route]);

  useEffect(() => {
    const handleNavigation = () => {
      migrateLegacyHashRoute();
      setRoute(getPageRoute());
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    const handleInternalLink = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest("a[href]");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || !url.pathname.startsWith("/")) return;
      event.preventDefault();
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
    };
    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("hashchange", handleNavigation);
    document.addEventListener("click", handleInternalLink);
    return () => {
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("hashchange", handleNavigation);
      document.removeEventListener("click", handleInternalLink);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">{locale === "fr" ? "Aller au contenu principal" : "Skip to main content"}</a>
      <Header locale={locale} route={route} onLanguageToggle={() => setLocale(locale === "fr" ? "en" : "fr")} />
      <main id="main-content" tabIndex={-1}><Suspense fallback={<RouteFallback locale={locale} />}>{renderRoute(route, locale)}</Suspense></main>
      <Footer locale={locale} />
      <CookieConsent locale={locale} />
    </div>
  );
}

function Header({ locale, route, onLanguageToggle }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobilePanelRef = useRef(null);
  const { user } = useSupabaseSession();
  const visibleNavGroups = navGroups.filter((group) => group.id !== "create" || canManageContent(user));

  useEffect(() => {
    const close = () => {
      setActiveMenu(null);
      setMobileOpen(false);
    };
    const onKeyDown = (event) => event.key === "Escape" && close();
    const onPointerDown = (event) => {
      if (!event.target.closest("[data-navigation-root]")) setActiveMenu(null);
    };
    window.addEventListener("hashchange", close);
    window.addEventListener("popstate", close);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("popstate", close);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    const panel = mobilePanelRef.current;
    const focusable = panel ? Array.from(panel.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')) : [];
    document.body.style.overflow = "hidden";
    focusable[0]?.focus();
    const trapFocus = (event) => {
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    panel?.addEventListener("keydown", trapFocus);
    return () => {
      document.body.style.overflow = previousOverflow;
      panel?.removeEventListener("keydown", trapFocus);
      previouslyFocused?.focus?.();
    };
  }, [mobileOpen]);

  const toggleMenu = (id) => setActiveMenu(activeMenu === id ? null : id);
  const activeGroup = visibleNavGroups.find((group) => group.items.some((item) => item.routes.includes(route)))?.id;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3" data-navigation-root>
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white/95 px-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:px-4" aria-label="Navigation principale">
        <a href="/catalog" className="brand-logo-link brand-logo-link--nav flex min-w-0 items-center rounded-xl hover:bg-slate-100" aria-label="PulsaTeach">
          <img src="/assets/logo_horizontale.webp" alt="PulsaTeach" className="brand-logo-image" width="380" height="96" />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {visibleNavGroups.map((group) => (
            <NavDropdown key={group.id} group={group} locale={locale} route={route} open={activeMenu === group.id} active={activeGroup === group.id} onToggle={() => toggleMenu(group.id)} onClose={() => setActiveMenu(null)} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onLanguageToggle} className="nav-icon-button" aria-label={locale === "fr" ? "Passer en anglais" : "Switch to French"}><Languages className="size-4" /><span className="hidden sm:inline">{locale === "fr" ? "EN" : "FR"}</span></button>
          <AccountMenu user={user} locale={locale} route={route} open={activeMenu === "account"} onToggle={() => toggleMenu("account")} onClose={() => setActiveMenu(null)} />
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="nav-icon-button lg:hidden" aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label="Menu">
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <>
          <button type="button" className="fixed inset-0 -z-10 bg-slate-950/40 backdrop-blur-sm lg:hidden" aria-label={locale === "fr" ? "Fermer le menu" : "Close menu"} onClick={() => setMobileOpen(false)} />
          <MobileNavigation panelRef={mobilePanelRef} locale={locale} user={user} route={route} groups={visibleNavGroups} onClose={() => setMobileOpen(false)} />
        </>
      )}
    </header>
  );
}

function NavDropdown({ group, locale, route, open, active, onToggle, onClose }) {
  const Icon = group.icon;
  return (
    <div className="relative">
      <button type="button" onClick={onToggle} className={`nav-trigger ${active || open ? "bg-indigo-50 text-indigoPop" : ""}`} aria-expanded={open} aria-controls={`menu-${group.id}`}>
        <Icon className="size-4" />{group.label[locale]}<ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div id={`menu-${group.id}`} className={`nav-dropdown ${group.align} ${group.items.length > 4 ? "w-[620px] grid-cols-2" : "w-[340px] grid-cols-1"}`} role="menu">
          <div className="col-span-full mb-1 border-b border-slate-100 px-2 pb-3">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-indigoPop">{group.label[locale]}</p>
            <p className="mt-1 text-sm text-slate-500">{menuDescription(group.id, locale)}</p>
          </div>
          {group.items.map((item) => <DropdownItem key={item.href} item={item} locale={locale} active={item.routes.includes(route)} onClick={onClose} />)}
        </div>
      )}
    </div>
  );
}

function DropdownItem({ item, locale, active, onClick }) {
  const Icon = item.icon;
  return (
    <a href={item.href} onClick={onClick} className={`group flex items-start gap-3 rounded-xl p-3 ${active ? "bg-indigo-50" : "hover:bg-slate-50"}`} role="menuitem" aria-current={active ? "page" : undefined}>
      <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${active ? "bg-indigoPop text-white" : "bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigoPop"}`}><Icon className="size-5" /></span>
      <span><span className="block text-sm font-bold text-ink">{item.title[locale]}</span><span className="mt-1 block text-xs leading-5 text-slate-500">{item.text[locale]}</span></span>
    </a>
  );
}

function AccountMenu({ user, locale, route, open, onToggle, onClose }) {
  const items = user
    ? [
        { href: "/profile", routes: ["profile"], icon: UserRound, title: { fr: "Mon profil", en: "My profile" }, text: { fr: "Activité, projets et certificats", en: "Activity, projects, and certificates" } },
        { href: "/settings", routes: ["settings"], icon: Settings, title: { fr: "Paramètres", en: "Settings" }, text: { fr: "Objectif, langue et rythme", en: "Goal, language, and pace" } }
      ]
    : [
        { href: "/signup", routes: ["signup"], icon: UserRound, title: { fr: "Créer un compte gratuit", en: "Create a free account" }, text: { fr: "Sauvegarder toute ta progression", en: "Save all your progress" } },
        { href: "/auth", routes: ["auth"], icon: LogIn, title: { fr: "Se connecter", en: "Sign in" }, text: { fr: "Reprendre une progression existante", en: "Resume existing progress" } }
      ];

  return (
    <div className="relative hidden sm:block">
      <button type="button" onClick={onToggle} className={`nav-account-button ${open ? "border-indigo-300 bg-indigo-50" : ""}`} aria-expanded={open} aria-controls="account-menu">
        <span className="grid size-8 place-items-center rounded-full bg-ink text-white"><UserRound className="size-4" /></span>
        <span className="max-w-32 truncate">{user?.email || (locale === "fr" ? "Mon compte" : "Account")}</span>
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div id="account-menu" className="nav-dropdown right-0 w-[340px] grid-cols-1" role="menu">
          {user && <div className="mb-1 border-b border-slate-100 px-3 pb-3"><p className="truncate text-sm font-bold text-ink">{user.email}</p><p className="mt-1 text-xs text-green-700">{locale === "fr" ? "Progression synchronisée" : "Progress synced"}</p></div>}
          {items.map((item) => <DropdownItem key={item.href} item={item} locale={locale} active={item.routes.includes(route)} onClick={onClose} />)}
          {user && <button type="button" onClick={() => { signOutSupabase(); onClose(); }} className="mt-1 flex w-full items-center gap-3 rounded-xl border-t border-slate-100 p-3 text-left text-sm font-bold text-red-600 hover:bg-red-50"><LogOut className="size-4" />{locale === "fr" ? "Se déconnecter" : "Sign out"}</button>}
        </div>
      )}
    </div>
  );
}

function MobileNavigation({ panelRef, locale, user, route, groups, onClose }) {
  const currentGroup = groups.find((group) => group.items.some((item) => item.routes.includes(route)))?.id || "learn";
  const [openGroup, setOpenGroup] = useState(currentGroup);

  return (
    <aside ref={panelRef} id="mobile-navigation" className="fixed inset-y-0 right-0 z-20 flex w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl lg:hidden" role="dialog" aria-modal="true" aria-label={locale === "fr" ? "Menu mobile" : "Mobile menu"}>
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-ink">{user?.email || (locale === "fr" ? "Bienvenue sur PulsaTeach" : "Welcome to PulsaTeach")}</p>
          <p className="mt-0.5 text-xs text-slate-500">{user ? (locale === "fr" ? "Progression synchronisée" : "Progress synced") : (locale === "fr" ? "Apprends à ton rythme" : "Learn at your pace")}</p>
        </div>
        <button type="button" className="nav-icon-button" onClick={onClose} aria-label={locale === "fr" ? "Fermer le menu" : "Close menu"}><X className="size-5" /></button>
      </div>

      <div className="grid grid-cols-3 gap-2 border-b border-slate-200 p-4">
        {[
          { href: "/catalog", icon: Compass, label: locale === "fr" ? "Formations" : "Courses" },
          { href: "/learn", icon: Code2, label: locale === "fr" ? "Continuer" : "Continue" },
          { href: "/dashboard", icon: BarChart3, label: locale === "fr" ? "Progrès" : "Progress" }
        ].map((item) => {
          const Icon = item.icon;
          return <a href={item.href} onClick={onClose} className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl bg-slate-100 px-2 text-center text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigoPop" key={item.href}><Icon className="size-5" />{item.label}</a>;
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {groups.map((group) => {
          const Icon = group.icon;
          const open = openGroup === group.id;
          return (
            <section className="border-b border-slate-100 py-2" key={group.id}>
              <button type="button" className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left font-bold text-ink hover:bg-slate-50" onClick={() => setOpenGroup(open ? null : group.id)} aria-expanded={open}>
                <span className="grid size-9 place-items-center rounded-xl bg-indigo-50 text-indigoPop"><Icon className="size-4" /></span>
                <span className="flex-1">{group.label[locale]}</span>
                <ChevronDown className={`size-4 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && <div className="grid gap-1 pb-2 pl-3">{group.items.map((item) => <MobileMenuItem key={item.href} item={item} locale={locale} active={item.routes.includes(route)} onClick={onClose} />)}</div>}
            </section>
          );
        })}
      </div>

      <div className="border-t border-slate-200 bg-slate-50 p-4">
        <div className="grid gap-2">
          <a href={user ? "/profile" : "/signup"} onClick={onClose} className="primary-button">{user ? (locale === "fr" ? "Voir mon profil" : "View profile") : (locale === "fr" ? "Créer un compte gratuit" : "Create free account")}</a>
          <a href={user ? "/settings" : "/auth"} onClick={onClose} className="secondary-button">
            {user ? <Settings className="size-4" /> : <LogIn className="size-4" />}
            {user ? (locale === "fr" ? "Paramètres" : "Settings") : (locale === "fr" ? "Se connecter" : "Sign in")}
          </a>
          {user && <button type="button" onClick={() => { signOutSupabase(); onClose(); }} className="flex min-h-11 items-center justify-center gap-2 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50"><LogOut className="size-4" />{locale === "fr" ? "Se déconnecter" : "Sign out"}</button>}
        </div>
      </div>
    </aside>
  );
}

function MobileMenuItem({ item, locale, active, onClick }) {
  const Icon = item.icon;
  return (
    <a href={item.href} onClick={onClick} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${active ? "bg-indigo-50 text-indigoPop" : "text-slate-600 hover:bg-slate-50 hover:text-ink"}`} aria-current={active ? "page" : undefined}>
      <Icon className="size-4 shrink-0" />
      <span>{item.title[locale]}</span>
    </a>
  );
}

function Footer({ locale }) {
  const legalLinks = [
    { href: "/privacy", label: locale === "fr" ? "Confidentialit\u00e9" : "Privacy" },
    { href: "/about", label: locale === "fr" ? "\u00c0 propos" : "About" },
    { href: "/cookies", label: "Cookies" },
    { href: "/terms", label: locale === "fr" ? "Conditions" : "Terms" },
    { href: "/legal", label: locale === "fr" ? "Mentions l\u00e9gales" : "Legal notice" }
  ];

  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 text-sm text-slate-500">
        <div className="grid gap-7 lg:grid-cols-[minmax(260px,420px)_1fr] lg:items-start">
          <div className="flex flex-col items-start gap-4">
            <a href="/catalog" className="brand-logo-link brand-logo-link--footer inline-flex items-center rounded-2xl hover:bg-slate-50" aria-label="PulsaTeach">
              <img src="/assets/logo_horizontale.webp" alt="PulsaTeach" className="brand-logo-image" width="380" height="96" loading="lazy" />
            </a>
            <SocialLinks />
          </div>

          <div className="flex flex-col gap-4 lg:items-end lg:text-right">
            <a href="mailto:pulsateach@gmail.com" className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-4 py-2 font-bold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigoPop lg:self-end">
              pulsateach@gmail.com
            </a>
            <nav className="flex flex-wrap gap-x-5 gap-y-3 font-semibold text-slate-600 lg:justify-end" aria-label={locale === "fr" ? "Liens du pied de page" : "Footer links"}>
              {legalLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-ink">
                  {link.label}
                </a>
              ))}
              <button type="button" onClick={openPrivacySettings} className="font-semibold hover:text-ink">
                {locale === "fr" ? "Stockages utilis\u00e9s" : "Storage used"}
              </button>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="leading-relaxed">
            {"\u00a9"} 2026 PulsaTeach {"\u00b7"} {locale === "fr" ? "Derni\u00e8re mise en ligne" : "Last deployment"} :{" "}
            <time dateTime={deploymentInfo.isoDate}>{deploymentInfo.label[locale]}</time>
          </p>
          <a href="https://pulsaflow.fr" target="_blank" rel="noreferrer" className="pulsaflow-badge inline-flex w-fit items-center gap-1 self-start rounded-full border border-indigo-100 bg-indigo-50/70 px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.06em] text-indigoPop transition hover:-translate-y-0.5 hover:bg-indigo-100 sm:self-auto" aria-label="Powered by PulsaFlow">
            <span className="pulsaflow-badge-dot size-1.5 rounded-full bg-indigoPop" aria-hidden="true" />
            Powered by PulsaFlow
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialLinks() {
  return (
    <nav className="grid w-full max-w-sm grid-cols-2 gap-2 sm:flex sm:max-w-none sm:flex-wrap" aria-label="R\u00e9seaux sociaux PulsaTeach">
      {socialLinks.map((link) => (
        <a key={link.id} href={link.href} target="_blank" rel="me noreferrer" className="group inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-black uppercase tracking-[.08em] text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigoPop" aria-label={`${link.label} PulsaTeach`}>
          <SocialIcon id={link.id} />
          <span>{link.label}</span>
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

function menuDescription(id, locale) {
  const copy = {
    learn: { fr: "Choisis une formation, reprends une leçon ou consulte ta progression.", en: "Choose a course, resume a lesson, or check progress." },
    practice: { fr: "Passe de la théorie à la pratique avec des défis et projets.", en: "Move from theory to practice with challenges and projects." },
    create: { fr: "Conçois les formations, les leçons et pilote leur publication.", en: "Design courses and lessons, then manage publishing." }
  };
  return copy[id][locale];
}

function renderRoute(route, locale) {
  if (route === "home") return <LandingPage locale={locale} />;
  if (route === "about") return <AboutPage locale={locale} />;
  if (route === "auth") return <AuthPage locale={locale} />;
  if (route === "signup") return <AuthPage locale={locale} defaultMode="signup" />;
  if (route === "onboarding") return <OnboardingPage locale={locale} />;
  if (route === "recovery") return <PasswordRecoveryPage locale={locale} />;
  if (route === "verify") return <PublicCertificatePage locale={locale} verificationCode={currentPathSegments()[1] || ""} />;
  if (route === "studio") return <AuthorGate locale={locale}><CourseStudio locale={locale} /></AuthorGate>;
  if (route === "world") return <WorldPage locale={locale} />;
  if (route === "playground") return <LivePlaygroundPage locale={locale} />;
  if (route === "flexbox-arena") return <FlexboxArenaPage locale={locale} />;
  if (route === "js-arena") return <JavaScriptArenaPage locale={locale} />;
  if (route === "learn") return <LearnPage locale={locale} />;
  if (route === "catalog") return <CurriculumHub locale={locale} />;
  if (route === "glossary") return <GlossaryPage locale={locale} />;
  if (route === "review") return <ReviewPage locale={locale} />;
  if (route === "path") return <PathPage locale={locale} />;
  if (route === "profile") return <ProfilePage locale={locale} />;
  if (route === "settings") return <SettingsPage locale={locale} />;
  if (route === "projects") return <ProjectsPage locale={locale} />;
  if (route === "certification") return <CertificationPage locale={locale} />;
  if (route === "dashboard") return <DashboardPage locale={locale} />;
  if (route === "analytics") return <AuthorGate locale={locale}><AnalyticsPage locale={locale} /></AuthorGate>;
  if (route === "author") return <AuthorGate locale={locale}><AuthorPage locale={locale} /></AuthorGate>;
  if (route === "admin") return <AuthorGate locale={locale}><AdminPage locale={locale} /></AuthorGate>;
  if (route === "roadmap") return <AuthorGate locale={locale}><RoadmapPage locale={locale} /></AuthorGate>;
  if (route === "privacy") return <PrivacyPage locale={locale} />;
  if (route === "cookies") return <CookiesPage locale={locale} />;
  if (route === "terms") return <TermsPage locale={locale} />;
  if (route === "legal") return <LegalNoticePage locale={locale} />;
  return <NotFoundPage locale={locale} />;
}

function getPageRoute() {
  if (window.location.pathname.startsWith("/auth/callback")) {
    return new URLSearchParams(window.location.search).has("recovery") ? "recovery" : "onboarding";
  }
  const route = currentPathSegments()[0] || "home";
  const known = ["home", "about", "auth", "signup", "onboarding", "recovery", "verify", "studio", "world", "playground", "flexbox-arena", "js-arena", "learn", "catalog", "glossary", "review", "path", "profile", "settings", "projects", "certification", "dashboard", "analytics", "author", "admin", "roadmap", "privacy", "cookies", "terms", "legal"];
  return known.includes(route) ? route : "not-found";
}

function RouteFallback({ locale }) {
  return <div className="app-page min-h-screen"><p className="surface mx-auto max-w-xl text-center font-semibold text-slate-600">{locale === "fr" ? "Chargement de la page…" : "Loading page…"}</p></div>;
}

function lazyNamed(loader, name) {
  return lazy(() => loader().then((module) => ({ default: module[name] })));
}

function AuthorGate({ locale, children }) {
  const { user } = useSupabaseSession();
  if (canManageContent(user)) return children;
  return <NotFoundPage locale={locale} restricted />;
}

function NotFoundPage({ locale, restricted = false }) {
  return (
    <section className="app-page grid min-h-screen place-items-center bg-slate-50">
      <div className="surface max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 font-display text-3xl font-black text-ink">
          {restricted
            ? (locale === "fr" ? "Espace réservé aux auteurs" : "Author area")
            : (locale === "fr" ? "Page introuvable" : "Page not found")}
        </h1>
        <p className="mt-3 leading-7 text-slate-600">
          {restricted
            ? (locale === "fr" ? "Cette zone est masquée aux comptes apprenants pour garder l’expérience claire." : "This area is hidden from learner accounts to keep the experience focused.")
            : (locale === "fr" ? "La page demandée n’existe pas ou a été déplacée." : "The requested page does not exist or has moved.")}
        </p>
        <a href="/catalog" className="primary-button mt-6">{locale === "fr" ? "Retour aux formations" : "Back to courses"}</a>
      </div>
    </section>
  );
}

export default App;
