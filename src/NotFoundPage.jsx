import { useEffect, useRef } from "react";
import { Code2, Compass, RotateCcw, Route, Shield, Sparkles } from "lucide-react";
import "./NotFoundPage.css";

const copy = {
  fr: [
    { icon: Route, label: "Route inconnue", title: "Cette route sort du parcours", description: "Le chemin demandé ne correspond à aucune étape publiée. Reviens au catalogue ou ouvre le lab pour reprendre depuis un point connu." },
    { icon: Code2, label: "Compilation interrompue", title: "Une page manque dans le build", description: "Le navigateur a bien suivi le lien, mais aucun écran PulsaTeach n’est associé à cette adresse." },
    { icon: RotateCcw, label: "Branche alternative", title: "Cette version de la page n’existe plus", description: "Le contenu a peut-être été déplacé pendant une mise à jour. Le catalogue contient toujours les parcours disponibles." },
    { icon: Compass, label: "Signal perdu", title: "Le parcours s’arrête ici", description: "Aucun module ne répond à cette URL. Utilise les formations ou le playground pour continuer à construire." },
    { icon: Sparkles, label: "Exercice bonus", title: "Tu as trouvé le vide entre deux leçons", description: "Même une erreur de navigation donne un indice : vérifie le chemin, puis repars depuis une destination valide." }
  ],
  en: [
    { icon: Route, label: "Unknown route", title: "This route leaves the learning path", description: "The requested path does not match a published step. Return to the catalog or open the lab from a known point." },
    { icon: Code2, label: "Build interrupted", title: "A page is missing from the build", description: "The browser followed the link, but no PulsaTeach screen is associated with this address." },
    { icon: RotateCcw, label: "Alternate branch", title: "This version of the page no longer exists", description: "The content may have moved during an update. The catalog still contains every available path." },
    { icon: Compass, label: "Signal lost", title: "The learning path stops here", description: "No module responds at this URL. Use the courses or playground to keep building." },
    { icon: Sparkles, label: "Bonus exercise", title: "You found the space between two lessons", description: "Even a navigation error provides a clue: check the path, then restart from a valid destination." }
  ]
};

export default function NotFoundPage({ locale, restricted = false }) {
  const headingRef = useRef(null);
  const requestedPath = window.location.pathname.slice(0, 120) || "/";
  const pathSeed = [...requestedPath].reduce((total, character) => total + character.codePointAt(0), 0);
  const variants = copy[locale] || copy.fr;
  const variant = restricted
    ? {
        icon: Shield,
        label: locale === "fr" ? "Accès réservé" : "Restricted access",
        title: locale === "fr" ? "Cette route reste côté auteurs" : "This route stays with authors",
        description: locale === "fr"
          ? "Les outils de création sont masqués aux comptes apprenants pour garder le parcours simple et sûr."
          : "Authoring tools are hidden from learner accounts to keep the experience focused and safe."
      }
    : variants[pathSeed % variants.length];
  const Icon = variant.icon;

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <div className="not-found-grid" aria-hidden="true" />
      <div className="not-found-glow not-found-glow-one" aria-hidden="true" />
      <div className="not-found-glow not-found-glow-two" aria-hidden="true" />
      <div className="not-found-code-cloud" aria-hidden="true">
        <span>{"</>"}</span><span>{"{}"}</span><span>404</span><span>?</span>
      </div>

      <div className="not-found-content">
        <p className="not-found-status"><span />{variant.label}</p>
        <div className="not-found-number" aria-hidden="true">404</div>
        <h1 ref={headingRef} tabIndex={-1} id="not-found-title" className="not-found-title">{variant.title}</h1>
        <p className="not-found-description">{variant.description}</p>
        <div className="not-found-icon" aria-hidden="true"><Icon /></div>
        <div className="not-found-path">
          <span>{locale === "fr" ? "Chemin demandé" : "Requested path"}</span>
          <code>{requestedPath}</code>
        </div>
        <div className="not-found-actions">
          <a href="/catalog" className="not-found-primary"><Compass />{locale === "fr" ? "Retour aux formations" : "Back to courses"}</a>
          <a href="/playground" className="not-found-secondary"><Code2 />{locale === "fr" ? "Ouvrir le playground" : "Open playground"}</a>
        </div>
        <p className="not-found-hint">{locale === "fr" ? "Une URL utile commence toujours par une route connue." : "A useful URL always starts from a known route."}</p>
      </div>
    </section>
  );
}
