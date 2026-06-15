import { useEffect, useState } from "react";
import {
  BarChart3,
  BookOpen,
  Braces,
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
  Settings,
  Shield,
  Sparkles,
  UserRound,
  X
} from "lucide-react";
import { signOutSupabase, useSupabaseSession } from "./authState.js";
import { languages } from "./content.js";
import AuthPage from "./AuthPage.jsx";
import CourseStudio from "./CourseStudio.jsx";
import CurriculumHub from "./CurriculumHub.jsx";
import { FlexboxArenaPage, JavaScriptArenaPage, LivePlaygroundPage, WorldPage } from "./GamePages.jsx";
import {
  AdminPage,
  AnalyticsPage,
  AuthorPage,
  CertificationPage,
  DashboardPage,
  LearnPage,
  PathPage,
  ProfilePage,
  ProjectsPage,
  RoadmapPage,
  SettingsPage
} from "./pages.jsx";

const navGroups = [
  {
    id: "learn",
    align: "left-0",
    label: { fr: "Apprendre", en: "Learn" },
    icon: BookOpen,
    items: [
      { href: "#/catalog", routes: ["home", "catalog"], icon: Compass, title: { fr: "Toutes les formations", en: "All courses" }, text: { fr: "Explorer le curriculum complet", en: "Explore the full curriculum" } },
      { href: "#/learn", routes: ["learn"], icon: Code2, title: { fr: "Continuer une leçon", en: "Continue a lesson" }, text: { fr: "Ouvrir le lab interactif", en: "Open the interactive lab" } },
      { href: "#/path", routes: ["path"], icon: Route, title: { fr: "Mon parcours", en: "My path" }, text: { fr: "Voir la prochaine étape conseillée", en: "See the recommended next step" } },
      { href: "#/dashboard", routes: ["dashboard"], icon: LayoutDashboard, title: { fr: "Ma progression", en: "My progress" }, text: { fr: "Leçons, XP et activité", en: "Lessons, XP, and activity" } }
    ]
  },
  {
    id: "practice",
    align: "left-1/2 -translate-x-1/2",
    label: { fr: "Pratiquer", en: "Practice" },
    icon: Gamepad2,
    items: [
      { href: "#/playground", routes: ["playground"], icon: Code2, title: { fr: "Playground", en: "Playground" }, text: { fr: "Coder librement dans le navigateur", en: "Code freely in the browser" } },
      { href: "#/world", routes: ["world"], icon: Map, title: { fr: "Monde des défis", en: "Challenge world" }, text: { fr: "Missions et exercices guidés", en: "Missions and guided exercises" } },
      { href: "#/flexbox-arena", routes: ["flexbox-arena"], icon: Sparkles, title: { fr: "Flexbox Arena", en: "Flexbox Arena" }, text: { fr: "Maîtriser les layouts CSS", en: "Master CSS layouts" } },
      { href: "#/js-arena", routes: ["js-arena"], icon: Gamepad2, title: { fr: "JavaScript Arena", en: "JavaScript Arena" }, text: { fr: "Résoudre des défis de logique", en: "Solve logic challenges" } },
      { href: "#/projects", routes: ["projects"], icon: FolderKanban, title: { fr: "Mes projets", en: "My projects" }, text: { fr: "Soumettre des réalisations", en: "Submit your work" } },
      { href: "#/certification", routes: ["certification"], icon: FileBadge, title: { fr: "Certifications", en: "Certifications" }, text: { fr: "Valider les parcours terminés", en: "Validate completed paths" } }
    ]
  },
  {
    id: "create",
    align: "right-0",
    label: { fr: "Créer", en: "Create" },
    icon: PenTool,
    items: [
      { href: "#/studio", routes: ["studio"], icon: BookOpen, title: { fr: "Course Studio", en: "Course Studio" }, text: { fr: "Créer et organiser des formations", en: "Create and organize courses" } },
      { href: "#/author", routes: ["author"], icon: PenTool, title: { fr: "Éditeur de leçons", en: "Lesson editor" }, text: { fr: "Rédiger les contenus et exercices", en: "Write content and exercises" } },
      { href: "#/analytics", routes: ["analytics"], icon: BarChart3, title: { fr: "Statistiques", en: "Analytics" }, text: { fr: "Analyser l’usage du contenu", en: "Analyze content usage" } },
      { href: "#/admin", routes: ["admin"], icon: Shield, title: { fr: "Administration", en: "Administration" }, text: { fr: "Relire les projets et publier", en: "Review projects and publish" } },
      { href: "#/roadmap", routes: ["roadmap"], icon: Map, title: { fr: "Roadmap produit", en: "Product roadmap" }, text: { fr: "Suivre les prochaines évolutions", en: "Track upcoming improvements" } }
    ]
  }
];

function App() {
  const [locale, setLocale] = useState(() => localStorage.getItem("pulsateach-locale") || "fr");
  const [route, setRoute] = useState(getPageRoute);
  const copy = languages[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = copy.metaTitle;
    localStorage.setItem("pulsateach-locale", locale);
  }, [copy.metaTitle, locale]);

  useEffect(() => {
    const handleHash = () => setRoute(getPageRoute());
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="min-h-screen">
      <Header locale={locale} route={route} onLanguageToggle={() => setLocale(locale === "fr" ? "en" : "fr")} />
      <main>{renderRoute(route, locale)}</main>
      <Footer locale={locale} />
    </div>
  );
}

function Header({ locale, route, onLanguageToggle }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useSupabaseSession();

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
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("hashchange", close);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const toggleMenu = (id) => setActiveMenu(activeMenu === id ? null : id);
  const activeGroup = navGroups.find((group) => group.items.some((item) => item.routes.includes(route)))?.id;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3" data-navigation-root>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white/95 px-3 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:px-4" aria-label="Navigation principale">
        <a href="#/catalog" className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 font-display text-xl font-bold text-ink hover:bg-slate-100">
          <span className="grid size-9 place-items-center rounded-xl bg-indigoPop text-white" aria-hidden="true"><Braces className="size-5" /></span>
          <span>Pulsa<span className="text-indigoPop">Teach</span></span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navGroups.map((group) => (
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
          <MobileNavigation locale={locale} user={user} route={route} onClose={() => setMobileOpen(false)} />
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
        { href: "#/profile", routes: ["profile"], icon: UserRound, title: { fr: "Mon profil", en: "My profile" }, text: { fr: "Activité, projets et certificats", en: "Activity, projects, and certificates" } },
        { href: "#/settings", routes: ["settings"], icon: Settings, title: { fr: "Paramètres", en: "Settings" }, text: { fr: "Objectif, langue et rythme", en: "Goal, language, and pace" } }
      ]
    : [
        { href: "#/signup", routes: ["signup"], icon: UserRound, title: { fr: "Créer un compte gratuit", en: "Create a free account" }, text: { fr: "Sauvegarder toute ta progression", en: "Save all your progress" } },
        { href: "#/auth", routes: ["auth"], icon: LogIn, title: { fr: "Se connecter", en: "Sign in" }, text: { fr: "Reprendre une progression existante", en: "Resume existing progress" } }
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

function MobileNavigation({ locale, user, route, onClose }) {
  const currentGroup = navGroups.find((group) => group.items.some((item) => item.routes.includes(route)))?.id || "learn";
  const [openGroup, setOpenGroup] = useState(currentGroup);

  return (
    <aside id="mobile-navigation" className="fixed inset-y-0 right-0 z-20 flex w-full max-w-sm flex-col border-l border-slate-200 bg-white shadow-2xl lg:hidden" aria-label={locale === "fr" ? "Menu mobile" : "Mobile menu"}>
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-ink">{user?.email || (locale === "fr" ? "Bienvenue sur PulsaTeach" : "Welcome to PulsaTeach")}</p>
          <p className="mt-0.5 text-xs text-slate-500">{user ? (locale === "fr" ? "Progression synchronisée" : "Progress synced") : (locale === "fr" ? "Apprends à ton rythme" : "Learn at your pace")}</p>
        </div>
        <button type="button" className="nav-icon-button" onClick={onClose} aria-label={locale === "fr" ? "Fermer le menu" : "Close menu"}><X className="size-5" /></button>
      </div>

      <div className="grid grid-cols-3 gap-2 border-b border-slate-200 p-4">
        {[
          { href: "#/catalog", icon: Compass, label: locale === "fr" ? "Formations" : "Courses" },
          { href: "#/learn", icon: Code2, label: locale === "fr" ? "Continuer" : "Continue" },
          { href: "#/dashboard", icon: BarChart3, label: locale === "fr" ? "Progrès" : "Progress" }
        ].map((item) => {
          const Icon = item.icon;
          return <a href={item.href} onClick={onClose} className="flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl bg-slate-100 px-2 text-center text-xs font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigoPop" key={item.href}><Icon className="size-5" />{item.label}</a>;
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {navGroups.map((group) => {
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
          <a href={user ? "#/profile" : "#/signup"} onClick={onClose} className="primary-button">{user ? (locale === "fr" ? "Voir mon profil" : "View profile") : (locale === "fr" ? "Créer un compte gratuit" : "Create free account")}</a>
          <a href={user ? "#/settings" : "#/auth"} onClick={onClose} className="secondary-button">
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
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <p>© 2026 PulsaTeach</p>
        <div className="flex flex-wrap gap-5 font-semibold"><a href="#/catalog">{locale === "fr" ? "Formations" : "Courses"}</a><a href="#/studio">{locale === "fr" ? "Créer" : "Create"}</a><a href="#/roadmap">Roadmap</a></div>
      </div>
    </footer>
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
  if (route === "auth") return <AuthPage locale={locale} />;
  if (route === "signup") return <AuthPage locale={locale} defaultMode="signup" />;
  if (route === "studio") return <CourseStudio locale={locale} />;
  if (route === "world") return <WorldPage locale={locale} />;
  if (route === "playground") return <LivePlaygroundPage locale={locale} />;
  if (route === "flexbox-arena") return <FlexboxArenaPage locale={locale} />;
  if (route === "js-arena") return <JavaScriptArenaPage locale={locale} />;
  if (route === "learn") return <LearnPage locale={locale} />;
  if (route === "catalog") return <CurriculumHub locale={locale} />;
  if (route === "path") return <PathPage locale={locale} />;
  if (route === "profile") return <ProfilePage locale={locale} />;
  if (route === "settings") return <SettingsPage locale={locale} />;
  if (route === "projects") return <ProjectsPage locale={locale} />;
  if (route === "certification") return <CertificationPage locale={locale} />;
  if (route === "dashboard") return <DashboardPage locale={locale} />;
  if (route === "analytics") return <AnalyticsPage locale={locale} />;
  if (route === "author") return <AuthorPage locale={locale} />;
  if (route === "admin") return <AdminPage locale={locale} />;
  if (route === "roadmap") return <RoadmapPage locale={locale} />;
  return <CurriculumHub locale={locale} />;
}

function getPageRoute() {
  if (window.location.pathname.startsWith("/auth/callback")) return "auth";
  const route = window.location.hash.replace(/^#\/?/, "").split(/[/?#]/)[0];
  const known = ["auth", "signup", "studio", "world", "playground", "flexbox-arena", "js-arena", "learn", "catalog", "path", "profile", "settings", "projects", "certification", "dashboard", "analytics", "author", "admin", "roadmap"];
  return known.includes(route) ? route : "home";
}

export default App;
