import { useEffect, useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, BookOpen, Languages, Search, Volume2 } from "lucide-react";
import { getGlossary } from "../../apiClient.js";
import { getGlossaryTerm, searchGlossary } from "./glossaryIndex.js";
import { currentPathSegments } from "../../navigation.js";
import { getLearnerItem, setLearnerItem } from "../../learnerStorage.js";

const favoritesKey = "pulsateach-glossary-favorites";
const historyKey = "pulsateach-glossary-history";
const initialVisibleTerms = 60;

export default function GlossaryPage({ locale = "fr" }) {
  const fr = locale === "fr";
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedSlug, setSelectedSlug] = useState(readSelectedSlug);
  const selectedTerm = selectedSlug ? getGlossaryTerm(terms, selectedSlug) : null;
  const [query, setQuery] = useState("");
  const [track, setTrack] = useState("all");
  const [category, setCategory] = useState("all");
  const [bilingual, setBilingual] = useState(false);
  const [favorites, setFavorites] = useState(readList(favoritesKey));
  const [visibleCount, setVisibleCount] = useState(initialVisibleTerms);
  const results = useMemo(() => searchGlossary(terms, query, { track, category }), [category, query, terms, track]);
  const visibleResults = results.slice(0, visibleCount);
  const categories = [...new Set(terms.map((term) => term.category))];
  const trackOptions = [...new Set(terms.flatMap((term) => term.trackIds))];

  useEffect(() => {
    let active = true;
    getGlossary()
      .then(({ terms: nextTerms }) => {
        if (!active) return;
        setTerms(Array.isArray(nextTerms) ? nextTerms : []);
        setLoadError("");
      })
      .catch(() => active && setLoadError(fr ? "Le vocabulaire est temporairement indisponible." : "The glossary is temporarily unavailable."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [fr]);

  useEffect(() => {
    const update = () => setSelectedSlug(readSelectedSlug());
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
    };
  }, []);

  useEffect(() => {
    if (selectedTerm) remember(selectedTerm.slug);
  }, [selectedTerm]);

  useEffect(() => {
    setVisibleCount(query || track !== "all" || category !== "all" ? 120 : initialVisibleTerms);
  }, [category, query, track]);

  if (selectedTerm) {
    return <GlossaryDetail term={selectedTerm} terms={terms} locale={locale} bilingual={bilingual} onBilingual={() => setBilingual((value) => !value)} favorites={favorites} onFavorite={() => setFavorites(toggleStored(favoritesKey, favorites, selectedTerm.slug))} />;
  }

  return (
    <section className="app-page min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow">{fr ? "Vocabulaire du développement web" : "Web development vocabulary"}</p>
        <h1 className="page-heading">{fr ? "Retrouve chaque notion au même endroit." : "Find every concept in one place."}</h1>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600">
          {fr ? `${terms.length} termes reliés à tous les parcours publiés.` : `${terms.length} terms connected to every published track.`}
        </p>
        {loading && <p className="empty-state mt-6" role="status">{fr ? "Chargement du vocabulaire…" : "Loading glossary…"}</p>}
        {loadError && <p className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 font-semibold text-rose-800" role="alert">{loadError}</p>}

        <div className="surface mt-8 grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
          <label className="relative">
            <span className="sr-only">{fr ? "Rechercher un terme" : "Search a term"}</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-500" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} className="form-control pl-12" placeholder={fr ? "Ex. DOM, cascade, attribut…" : "e.g. DOM, cascade, attribute…"} />
          </label>
          <Filter label={fr ? "Parcours" : "Track"} value={track} onChange={setTrack} options={[["all", fr ? "Tous les parcours" : "All tracks"], ...trackOptions.map((item) => [item, item.toUpperCase()])]} />
          <Filter label={fr ? "Catégorie" : "Category"} value={category} onChange={setCategory} options={[["all", fr ? "Toutes les catégories" : "All categories"], ...categories.map((item) => [item, item])]} />
          <button type="button" onClick={() => setBilingual((value) => !value)} className="secondary-button min-h-12">
            <Languages className="size-4" />{bilingual ? (fr ? "Une langue" : "One language") : (fr ? "Bilingue" : "Bilingual")}
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleResults.map((term) => (
            <article className="surface flex flex-col" key={term.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.12em] text-indigoPop">{term.languages.join(" · ")}</p>
                  <h2 className="mt-2 font-display text-2xl font-bold">{term.term[locale]}</h2>
                  {bilingual && <p className="mt-1 text-sm font-semibold text-slate-600">{term.term[locale === "fr" ? "en" : "fr"]}</p>}
                </div>
                {favorites.includes(term.slug) ? <BookmarkCheck className="size-5 text-indigoPop" aria-label={fr ? "Favori" : "Favorite"} /> : <Bookmark className="size-5 text-slate-500" aria-hidden="true" />}
              </div>
              <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{term.shortDefinition[locale]}</p>
              <a href={`/glossary/${term.slug}`} className="secondary-button mt-5 min-h-10 py-2 text-sm"><BookOpen className="size-4" />{fr ? "Voir le terme" : "View term"}</a>
            </article>
          ))}
        </div>
        {results.length === 0 && <p className="empty-state mt-6">{fr ? "Aucun terme ne correspond à ces filtres." : "No term matches these filters."}</p>}
        {visibleResults.length < results.length && (
          <div className="mt-6 text-center">
            <button type="button" className="secondary-button" onClick={() => setVisibleCount((count) => count + 60)}>
              {fr ? `Afficher 60 termes de plus (${visibleResults.length}/${results.length})` : `Show 60 more terms (${visibleResults.length}/${results.length})`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function GlossaryDetail({ term, terms, locale, bilingual, onBilingual, favorites, onFavorite }) {
  const fr = locale === "fr";
  const related = term.relatedTerms.map((id) => terms.find((item) => item.id === id)).filter(Boolean);
  const speak = () => globalThis.speechSynthesis?.speak(new SpeechSynthesisUtterance(term.term[locale]));
  return (
    <section className="app-page min-h-screen bg-slate-50">
      <article className="surface mx-auto max-w-4xl">
        <a href="/glossary" className="text-sm font-bold text-indigoPop">← {fr ? "Tout le vocabulaire" : "All vocabulary"}</a>
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{term.languages.join(" · ")}</p>
            <h1 className="page-heading">{term.term[locale]}</h1>
            {bilingual && <p className="mt-2 text-xl font-semibold text-slate-600">{term.term[locale === "fr" ? "en" : "fr"]}</p>}
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={speak} className="secondary-button min-h-10 px-3 py-2 text-sm"><Volume2 className="size-4" />{fr ? "Écouter" : "Listen"}</button>
            <button type="button" onClick={onBilingual} className="secondary-button min-h-10 px-3 py-2 text-sm"><Languages className="size-4" />{fr ? "Bilingue" : "Bilingual"}</button>
            <button type="button" onClick={onFavorite} className="secondary-button min-h-10 px-3 py-2 text-sm">{favorites.includes(term.slug) ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}{fr ? "Favori" : "Favorite"}</button>
          </div>
        </div>
        <p className="mt-8 text-lg leading-8 text-slate-700">{term.definition[locale]}</p>
        {bilingual && <p className="mt-4 border-l-4 border-indigo-200 pl-4 leading-7 text-slate-600">{term.definition[locale === "fr" ? "en" : "fr"]}</p>}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section>
            <h2 className="font-display text-xl font-bold">{fr ? "Leçons associées" : "Related lessons"}</h2>
            <ul className="mt-3 grid gap-2">{term.lessonRefs.map((reference) => <li key={reference.lessonId}><a className="font-semibold text-indigoPop hover:underline" href={`/learn/${reference.trackId}/${reference.moduleId}/${reference.lessonId}`}>→ {reference.lessonId}</a></li>)}</ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">{fr ? "Termes associés" : "Related terms"}</h2>
            <div className="mt-3 flex flex-wrap gap-2">{related.map((item) => <a className="rounded-full bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-800" href={`/glossary/${item.slug}`} key={item.id}>{item.term[locale]}</a>)}</div>
          </section>
        </div>
      </article>
    </section>
  );
}

function Filter({ label, value, onChange, options }) {
  return <label><span className="sr-only">{label}</span><select className="form-control" value={value} onChange={(event) => onChange(event.target.value)}>{options.map(([id, text]) => <option value={id} key={id}>{text}</option>)}</select></label>;
}

function readList(key) {
  try {
    return JSON.parse(getLearnerItem(key)) || [];
  } catch {
    return [];
  }
}

function toggleStored(key, values, value) {
  const next = values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
  setLearnerItem(key, JSON.stringify(next));
  return next;
}

function remember(slug) {
  const history = readList(historyKey).filter((item) => item !== slug);
  setLearnerItem(historyKey, JSON.stringify([slug, ...history].slice(0, 20)));
}

function readSelectedSlug() {
  const [route, slug] = currentPathSegments();
  return route === "glossary" ? slug || "" : "";
}
