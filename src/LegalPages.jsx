const updatedAt = "2 juillet 2026";
const updatedAtEn = "July 2, 2026";
const repositoryUrl = "https://github.com/pulsaflow/PulsaTeach";

export function PrivacyPage({ locale = "fr" }) {
  const fr = locale === "fr";
  return (
    <LegalLayout eyebrow="RGPD" title={fr ? "Politique de confidentialité" : "Privacy policy"} intro={fr ? `Dernière mise à jour : ${updatedAt}` : `Last updated: ${updatedAtEn}`}>
      <Notice>{fr ? "PulsaTeach est un projet pédagogique personnel, gratuit et sans activité commerciale. Le RGPD reste applicable car la plateforme permet de créer un compte et d’enregistrer une progression." : "PulsaTeach is a personal, free, non-commercial learning project. GDPR still applies because the platform supports accounts and saved learning progress."}</Notice>
      <LegalSection title={fr ? "Responsable du traitement" : "Data controller"}>
        <p>{fr ? "Le responsable du traitement est l’éditeur non professionnel de PulsaTeach. Il a choisi de préserver son identité publique conformément au régime applicable aux éditeurs non professionnels et a communiqué ses éléments d’identification à l’hébergeur." : "The controller is PulsaTeach’s non-professional publisher. The publisher preserves their public identity under the rules applicable to non-professional publishers and has supplied identification details to the hosting provider."}</p>
        <p>{fr ? "L’export et la suppression sont disponibles directement dans les paramètres du compte. Pour une autre demande, ouvre un ticket sans y publier de donnée personnelle ; un canal confidentiel te sera indiqué :" : "Export and deletion are available directly in account settings. For another request, open a ticket without posting personal data; a confidential channel will then be provided:"} <ExternalLink href={repositoryUrl}>{repositoryUrl}</ExternalLink>.</p>
      </LegalSection>
      <LegalSection title={fr ? "Données, finalités et bases légales" : "Data, purposes, and legal bases"}>
        <DataTable fr={fr} />
      </LegalSection>
      <LegalSection title={fr ? "Destinataires et prestataires" : "Recipients and providers"}>
        <ul>
          <li>{fr ? "Supabase Inc. : authentification, base PostgreSQL et stockage des données du compte." : "Supabase Inc.: authentication, PostgreSQL database, and account data storage."}</li>
          <li>{fr ? "Vercel Inc. : hébergement de l’application, fonctions serveur et journaux techniques." : "Vercel Inc.: application hosting, server functions, and technical logs."}</li>
          <li>{fr ? "Resend, uniquement si l’envoi d’emails transactionnels est activé." : "Resend, only if transactional email is enabled."}</li>
        </ul>
        <p>{fr ? "Ces prestataires peuvent impliquer des transferts hors de l’Espace économique européen. Leurs mécanismes contractuels et garanties sont décrits dans leurs documents de protection des données." : "These providers may involve transfers outside the EEA. Their contractual mechanisms and safeguards are described in their data-protection documents."}</p>
      </LegalSection>
      <LegalSection title={fr ? "Durées de conservation" : "Retention"}>
        <ul>
          <li>{fr ? "Compte, profil, progression et projets : jusqu’à la suppression du compte." : "Account, profile, progress, and projects: until account deletion."}</li>
          <li>{fr ? "Événements pédagogiques pseudonymisés : 180 jours maximum." : "Pseudonymized learning events: up to 180 days."}</li>
          <li>{fr ? "Certificats publics : jusqu’à leur révocation ou à la suppression du compte." : "Public certificates: until revocation or account deletion."}</li>
          <li>{fr ? "Données locales du navigateur : jusqu’à leur effacement par l’utilisateur." : "Browser-local data: until cleared by the user."}</li>
          <li>{fr ? "Journaux d’hébergement et sauvegardes : selon les durées techniques limitées des prestataires." : "Hosting logs and backups: according to providers’ limited technical retention periods."}</li>
        </ul>
      </LegalSection>
      <LegalSection title={fr ? "Tes droits" : "Your rights"}>
        <p>{fr ? "Tu peux demander l’accès, la rectification, l’effacement, la limitation, l’opposition et, lorsque les conditions sont réunies, la portabilité. Les paramètres du compte permettent aussi l’export et la suppression. Une réclamation peut être adressée à la CNIL." : "You may request access, correction, deletion, restriction, objection, and portability where applicable. Account settings also provide export and deletion. You may lodge a complaint with your supervisory authority."}</p>
        <p><ExternalLink href="https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles">CNIL — {fr ? "comprendre et exercer ses droits" : "understand and exercise your rights"}</ExternalLink></p>
      </LegalSection>
      <LegalSection title={fr ? "Sécurité et caractère facultatif" : "Security and optional nature"}>
        <p>{fr ? "Les données de compte sont nécessaires pour synchroniser la progression entre appareils. Sans compte, certaines fonctions peuvent rester locales au navigateur. PulsaTeach utilise HTTPS, des contrôles d’accès serveur, des validations et une séparation stricte des données par utilisateur." : "Account data is needed to synchronize progress across devices. Without an account, some functions may remain local to the browser. PulsaTeach uses HTTPS, server-side access controls, validation, and strict per-user data separation."}</p>
      </LegalSection>
    </LegalLayout>
  );
}

export function CookiesPage({ locale = "fr" }) {
  const fr = locale === "fr";
  return (
    <LegalLayout eyebrow={fr ? "Cookies et stockages" : "Cookies and storage"} title={fr ? "Politique relative aux stockages locaux" : "Local storage policy"} intro={fr ? `Dernière mise à jour : ${updatedAt}` : `Last updated: ${updatedAtEn}`}>
      <Notice>{fr ? "PulsaTeach n’utilise actuellement ni publicité, ni profilage, ni outil tiers de mesure d’audience. Aucun bouton « tout accepter » n’est donc nécessaire." : "PulsaTeach currently uses no advertising, profiling, or third-party audience measurement. An “accept all” button is therefore unnecessary."}</Notice>
      <LegalSection title={fr ? "Stockages strictement nécessaires" : "Strictly necessary storage"}>
        <ul>
          <li><code>pulsateach-locale</code> — {fr ? "langue d’interface" : "interface language"}</li>
          <li><code>pulsateach-user-id</code> — {fr ? "identifiant local de progression" : "local progress identifier"}</li>
          <li>{fr ? "Clés Supabase Auth — connexion et renouvellement sécurisé de session." : "Supabase Auth keys — sign-in and secure session refresh."}</li>
          <li>{fr ? "Progression, brouillons de code, réponses de quiz, favoris et notes — reprise de l’apprentissage." : "Progress, code drafts, quiz responses, bookmarks, and notes — learning continuity."}</li>
        </ul>
        <p>{fr ? "Ces stockages répondent à une demande explicite de fonctionnement du service et ne sont pas utilisés pour suivre ta navigation sur d’autres sites." : "These storage items provide explicitly requested service functions and are not used to track browsing across other sites."}</p>
      </LegalSection>
      <LegalSection title={fr ? "Comment les supprimer" : "How to remove them"}>
        <p>{fr ? "Tu peux te déconnecter, supprimer ton compte depuis les paramètres et effacer les données du site dans les réglages de ton navigateur. Effacer les stockages locaux réinitialise les brouillons et la progression non synchronisée." : "You can sign out, delete your account in settings, and clear site data in browser settings. Clearing local storage resets drafts and unsynchronized progress."}</p>
      </LegalSection>
      <LegalSection title={fr ? "Évolution future" : "Future changes"}>
        <p>{fr ? "Si un traceur optionnel soumis au consentement est ajouté, il sera bloqué par défaut et un choix aussi simple pour accepter que pour refuser sera affiché avant son dépôt." : "If an optional tracker requiring consent is added, it will be blocked by default and an equally simple accept/refuse choice will be shown before storage."}</p>
      </LegalSection>
    </LegalLayout>
  );
}

export function TermsPage({ locale = "fr" }) {
  const fr = locale === "fr";
  return (
    <LegalLayout eyebrow={fr ? "Utilisation gratuite" : "Free use"} title={fr ? "Conditions d’utilisation" : "Terms of use"} intro={fr ? `Dernière mise à jour : ${updatedAt}` : `Last updated: ${updatedAtEn}`}>
      <Notice>{fr ? "Il ne s’agit pas de conditions générales de vente : PulsaTeach ne vend aucun produit ou service, ne facture rien et n’exerce pas d’activité commerciale." : "These are not terms of sale: PulsaTeach sells no product or service, charges no fee, and carries out no commercial activity."}</Notice>
      <LegalSection title={fr ? "Objet et absence de garantie professionnelle" : "Purpose and no professional guarantee"}><p>{fr ? "PulsaTeach propose gratuitement des cours et exercices de développement web. Les certificats sont des attestations internes au projet : ils ne constituent ni un diplôme reconnu par l’État, ni une certification professionnelle, ni une garantie d’emploi." : "PulsaTeach provides free web-development courses and exercises. Certificates are internal project records, not state-recognized qualifications, professional certifications, or employment guarantees."}</p></LegalSection>
      <LegalSection title={fr ? "Compte et âge" : "Account and age"}><p>{fr ? "Tu dois protéger tes accès et utiliser une adresse valide. Le service n’est pas spécifiquement destiné aux enfants. Un mineur doit obtenir l’accord de son représentant légal lorsque cet accord est requis." : "You must protect your credentials and use a valid address. The service is not specifically directed at children. Minors must obtain guardian permission where required."}</p></LegalSection>
      <LegalSection title={fr ? "Utilisation acceptable" : "Acceptable use"}><p>{fr ? "Il est interdit de perturber le service, tester sa sécurité sans autorisation, contourner les contrôles d’accès, accéder aux données d’un tiers ou publier un contenu illicite. Les exercices doivent utiliser des données fictives, jamais de secret ou de donnée sensible réelle." : "You must not disrupt the service, test security without permission, bypass access controls, access another person’s data, or publish unlawful content. Exercises must use fictional data, never real secrets or sensitive data."}</p></LegalSection>
      <LegalSection title={fr ? "Contenus et propriété intellectuelle" : "Content and intellectual property"}><p>{fr ? "Les contenus originaux et l’identité visuelle de PulsaTeach sont protégés par le droit d’auteur. Tu conserves les droits sur le code et les projets que tu crées, sous réserve des droits de tiers. Les extraits pédagogiques ne doivent pas être revendus ou republiés en masse sans autorisation." : "Original PulsaTeach content and visual identity are copyright-protected. You retain rights in code and projects you create, subject to third-party rights. Learning materials may not be resold or republished in bulk without permission."}</p></LegalSection>
      <LegalSection title={fr ? "Disponibilité" : "Availability"}><p>{fr ? "Projet personnel fourni gratuitement, PulsaTeach peut évoluer, être suspendu ou fermer sans garantie de disponibilité permanente. Les erreurs signalées seront corrigées dans la mesure raisonnablement possible." : "As a free personal project, PulsaTeach may change, be suspended, or close without a guarantee of permanent availability. Reported errors will be addressed where reasonably possible."}</p></LegalSection>
    </LegalLayout>
  );
}

export function LegalNoticePage({ locale = "fr" }) {
  const fr = locale === "fr";
  return (
    <LegalLayout eyebrow={fr ? "Informations légales" : "Legal information"} title={fr ? "Mentions légales" : "Legal notice"} intro={fr ? `Dernière mise à jour : ${updatedAt}` : `Last updated: ${updatedAtEn}`}>
      <LegalSection title={fr ? "Nature du site" : "Website status"}>
        <p>{fr ? "PulsaTeach est édité à titre personnel et non professionnel. Le service est gratuit, sans publicité, sans vente, sans abonnement payant et sans rémunération de l’éditeur. Il n’existe donc ni société, ni SIREN/SIRET, ni capital social, ni numéro de TVA à afficher." : "PulsaTeach is published personally and on a non-professional basis. It is free, with no advertising, sales, paid subscription, or publisher remuneration. There is therefore no company, SIREN/SIRET registration, share capital, or VAT number to display."}</p>
      </LegalSection>
      <LegalSection title={fr ? "Éditeur non professionnel" : "Non-professional publisher"}>
        <p>{fr ? "Éditeur et directeur de la publication : personne physique non professionnelle éditant PulsaTeach. Afin de préserver son anonymat public, son identité et ses coordonnées ont été communiquées à l’hébergeur, conformément à l’article 1-1 II de la loi n° 2004-575 du 21 juin 2004." : "Publisher and publication director: the non-professional individual publishing PulsaTeach. To preserve public anonymity, identity and contact details have been supplied to the hosting provider under the applicable French rules."}</p>
        <p>{fr ? "Contact public du projet :" : "Public project contact:"} <ExternalLink href={repositoryUrl}>{repositoryUrl}</ExternalLink>.</p>
      </LegalSection>
      <LegalSection title={fr ? "Hébergeur" : "Hosting provider"}>
        <p>Vercel Inc.<br />440 N Barranca Ave #4133<br />Covina, CA 91723, United States<br /><ExternalLink href="https://vercel.com/contact">https://vercel.com/contact</ExternalLink></p>
      </LegalSection>
      <LegalSection title={fr ? "Services techniques de données" : "Technical data services"}>
        <p>Supabase Inc.<br />c/o Incorporating Services, Ltd.<br />3500 S. DuPont Highway, Dover, Delaware 19901, United States<br /><ExternalLink href="https://supabase.com/contact-us">https://supabase.com/contact-us</ExternalLink></p>
      </LegalSection>
      <LegalSection title={fr ? "Signalement" : "Reporting"}>
        <p>{fr ? "Pour signaler une vulnérabilité, un contenu illicite ou une atteinte à un droit, utilise le dépôt public sans publier de donnée personnelle ni de secret. Pour un abus lié à l’hébergement, le formulaire Vercel est également disponible." : "To report a vulnerability, unlawful content, or rights issue, use the public repository without posting personal data or secrets. Vercel’s abuse form is also available for hosting-related abuse."}</p>
        <p><ExternalLink href="https://vercel.com/abuse">https://vercel.com/abuse</ExternalLink></p>
      </LegalSection>
      <LegalSection title={fr ? "Textes et ressources de référence" : "Reference texts and resources"}>
        <ul>
          <li><ExternalLink href="https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000049568614">Loi n° 2004-575, article 1-1</ExternalLink></li>
          <li><ExternalLink href="https://www.cnil.fr/fr/conformite-rgpd-information-des-personnes-et-transparence">CNIL — {fr ? "information et transparence" : "information and transparency"}</ExternalLink></li>
          <li><ExternalLink href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi">CNIL — cookies et traceurs</ExternalLink></li>
        </ul>
      </LegalSection>
    </LegalLayout>
  );
}

function DataTable({ fr }) {
  const rows = fr ? [
    ["Compte", "Email, identifiant, nom affiché", "Créer et sécuriser le compte", "Exécution du service demandé"],
    ["Apprentissage", "Progression, réponses, notes, favoris, projets", "Sauvegarder et reprendre le parcours", "Exécution du service demandé"],
    ["Sécurité", "Adresse IP et journaux techniques gérés par les hébergeurs", "Prévenir les abus et diagnostiquer les erreurs", "Intérêt légitime"],
    ["Mesure produit interne", "Événements pseudonymisés, sans code personnel", "Comprendre les blocages pédagogiques", "Intérêt légitime, données minimisées"]
  ] : [
    ["Account", "Email, identifier, display name", "Create and secure the account", "Performance of the requested service"],
    ["Learning", "Progress, answers, notes, bookmarks, projects", "Save and resume learning", "Performance of the requested service"],
    ["Security", "IP address and technical logs managed by providers", "Prevent abuse and diagnose errors", "Legitimate interests"],
    ["Internal product measurement", "Pseudonymized events, excluding personal code", "Understand learning blockers", "Legitimate interests, minimized data"]
  ];
  return <div className="overflow-x-auto" tabIndex="0" role="region" aria-label={fr ? "Tableau des traitements de données, défilement horizontal possible" : "Data processing table, horizontal scrolling available"}><table className="min-w-[680px] border-collapse text-left text-xs"><thead><tr>{(fr ? ["Catégorie", "Données", "Finalité", "Base légale"] : ["Category", "Data", "Purpose", "Legal basis"]).map((item) => <th className="border-b border-slate-300 p-2" key={item}>{item}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td className="border-b border-slate-200 p-2 align-top" key={cell}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function LegalLayout({ eyebrow, title, intro, children }) {
  return <section className="app-page"><article className="mx-auto max-w-4xl"><p className="eyebrow">{eyebrow}</p><h1 className="page-heading">{title}</h1><p className="mt-3 text-sm text-slate-500">{intro}</p><div className="surface mt-8 space-y-8 text-slate-700">{children}</div></article></section>;
}

function LegalSection({ title, children }) {
  return <section><h2 className="font-display text-xl font-bold text-ink">{title}</h2><div className="mt-2 space-y-3 text-sm leading-7 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">{children}</div></section>;
}

function Notice({ children }) {
  return <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm font-semibold leading-6 text-indigo-950">{children}</div>;
}

function ExternalLink({ href, children }) {
  return <a href={href} target="_blank" rel="noreferrer" className="font-semibold text-indigoPop underline underline-offset-2">{children}</a>;
}
