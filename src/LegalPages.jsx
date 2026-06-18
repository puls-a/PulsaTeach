import { openPrivacySettings } from "./privacyConsent.js";

const updatedAt = "18 juin 2026";

export function PrivacyPage({ locale = "fr" }) {
  const fr = locale === "fr";
  return (
    <LegalLayout eyebrow="RGPD" title={fr ? "Politique de confidentialité" : "Privacy policy"} intro={fr ? `Dernière mise à jour : ${updatedAt}` : "Last updated: June 18, 2026"}>
      <LegalSection title={fr ? "Données traitées" : "Data processed"}>
        <p>{fr ? "PulsaTeach traite les données de compte (email, nom affiché), le profil d’apprentissage, la progression, les projets, les tentatives, les certificats et les données techniques nécessaires à la sécurité du service." : "PulsaTeach processes account data (email and display name), learning profile, progress, projects, attempts, certificates, and technical data required to secure the service."}</p>
      </LegalSection>
      <LegalSection title={fr ? "Finalités et bases légales" : "Purposes and legal bases"}>
        <ul><li>{fr ? "Fournir le compte, les cours et la synchronisation : exécution du service demandé." : "Provide accounts, courses, and synchronization: performance of the requested service."}</li><li>{fr ? "Sécuriser et maintenir la plateforme : intérêt légitime." : "Secure and maintain the platform: legitimate interests."}</li><li>{fr ? "Mesure d’audience optionnelle : consentement, révocable à tout moment." : "Optional audience measurement: consent, withdrawable at any time."}</li></ul>
      </LegalSection>
      <LegalSection title={fr ? "Sous-traitants et transferts" : "Processors and transfers"}>
        <p>{fr ? "L’authentification, la base de données et le stockage sont fournis par Supabase. L’hébergement applicatif est prévu sur Vercel. Selon leur configuration, ces prestataires peuvent traiter des données hors de l’Union européenne avec les garanties contractuelles applicables." : "Authentication, database, and storage are provided by Supabase. Application hosting is intended to use Vercel. Depending on configuration, these providers may process data outside the European Union under applicable contractual safeguards."}</p>
      </LegalSection>
      <LegalSection title={fr ? "Durées de conservation" : "Retention"}>
        <p>{fr ? "Les données du compte sont conservées pendant son utilisation, puis supprimées à la demande. Les journaux techniques sont conservés pour une durée limitée adaptée à la sécurité. Les préférences locales restent dans le navigateur jusqu’à leur suppression." : "Account data is retained while the account is used and deleted upon request. Technical logs are kept for a limited security-appropriate period. Local preferences remain in the browser until removed."}</p>
      </LegalSection>
      <LegalSection title={fr ? "Tes droits" : "Your rights"}>
        <p>{fr ? "Tu peux demander l’accès, la rectification, l’effacement, la limitation, l’opposition et la portabilité de tes données. L’espace Paramètres permet déjà l’export et la suppression du compte. Tu peux aussi saisir la CNIL." : "You may request access, correction, deletion, restriction, objection, and portability. Account settings already provide export and deletion controls. You may also contact your local supervisory authority."}</p>
      </LegalSection>
      <LegalSection title={fr ? "Contact" : "Contact"}>
        <p>{fr ? "Le responsable du traitement et son adresse de contact doivent être complétés dans les mentions légales avant la mise en production publique." : "The controller identity and contact address must be completed in the legal notice before public production launch."}</p>
      </LegalSection>
    </LegalLayout>
  );
}

export function CookiesPage({ locale = "fr" }) {
  const fr = locale === "fr";
  return (
    <LegalLayout eyebrow={fr ? "Cookies et stockages" : "Cookies and storage"} title={fr ? "Politique cookies" : "Cookie policy"} intro={fr ? `Dernière mise à jour : ${updatedAt}` : "Last updated: June 18, 2026"}>
      <LegalSection title={fr ? "Ce que nous utilisons" : "What we use"}>
        <p>{fr ? "PulsaTeach utilise principalement le stockage local du navigateur. Supabase peut aussi stocker les éléments nécessaires à ta session d’authentification. Ces mécanismes permettent de rester connecté, retenir la langue et sauvegarder la progression." : "PulsaTeach primarily uses browser local storage. Supabase may also store items required for your authentication session. These mechanisms keep you signed in, remember language, and save progress."}</p>
      </LegalSection>
      <LegalSection title={fr ? "Stockages nécessaires" : "Necessary storage"}>
        <ul><li><code>pulsateach-privacy-consent</code> — {fr ? "preuve de ton choix" : "record of your choice"}</li><li><code>pulsateach-locale</code> — {fr ? "langue choisie" : "selected language"}</li><li><code>pulsateach-user-id</code> — {fr ? "identifiant de progression" : "progress identifier"}</li><li>{fr ? "Clés Supabase Auth — session sécurisée et renouvellement du jeton" : "Supabase Auth keys — secure session and token refresh"}</li><li>{fr ? "Clés de cours, notes et progression — sauvegarde pédagogique locale" : "Course, note, and progress keys — local learning save"}</li></ul>
      </LegalSection>
      <LegalSection title={fr ? "Stockages optionnels" : "Optional storage"}>
        <p>{fr ? "Aucun traceur publicitaire et aucun outil d’audience tiers ne sont actuellement chargés. Si une mesure d’audience est ajoutée, elle devra respecter le choix enregistré dans le centre de préférences." : "No advertising tracker or third-party audience measurement tool is currently loaded. If audience measurement is added, it must honor the choice saved in the preference center."}</p>
      </LegalSection>
      <button type="button" onClick={openPrivacySettings} className="secondary-button mt-2">{fr ? "Modifier mes préférences" : "Change my preferences"}</button>
    </LegalLayout>
  );
}

export function TermsPage({ locale = "fr" }) {
  const fr = locale === "fr";
  return (
    <LegalLayout eyebrow={fr ? "Conditions" : "Terms"} title={fr ? "Conditions d’utilisation" : "Terms of use"} intro={fr ? `Dernière mise à jour : ${updatedAt}` : "Last updated: June 18, 2026"}>
      <LegalSection title={fr ? "Objet" : "Purpose"}><p>{fr ? "PulsaTeach fournit des contenus et outils pédagogiques pour apprendre le développement web. Les contenus ne constituent pas une garantie d’emploi, de certification officielle ou de résultat professionnel." : "PulsaTeach provides educational content and tools for learning web development. Content does not guarantee employment, official certification, or professional outcomes."}</p></LegalSection>
      <LegalSection title={fr ? "Compte" : "Account"}><p>{fr ? "Tu dois fournir des informations exactes, protéger tes accès et signaler toute utilisation non autorisée. Les personnes mineures doivent utiliser le service avec l’autorisation de leur représentant légal lorsque la loi l’exige." : "You must provide accurate information, protect access credentials, and report unauthorized use. Minors must use the service with guardian permission where required by law."}</p></LegalSection>
      <LegalSection title={fr ? "Utilisation acceptable" : "Acceptable use"}><p>{fr ? "Il est interdit de perturber le service, contourner ses protections, accéder aux données d’autrui ou publier un contenu illicite. Les projets soumis restent sous la responsabilité de leur auteur." : "You must not disrupt the service, bypass protections, access another person’s data, or publish unlawful content. Submitted projects remain the author’s responsibility."}</p></LegalSection>
      <LegalSection title={fr ? "Propriété intellectuelle" : "Intellectual property"}><p>{fr ? "La plateforme, sa marque et ses contenus originaux restent protégés. Le code et les projets créés par l’utilisateur lui appartiennent, sous réserve des éléments tiers qu’ils incorporent." : "The platform, brand, and original content remain protected. User-created code and projects belong to the user, subject to any third-party materials they include."}</p></LegalSection>
      <LegalSection title={fr ? "Disponibilité et responsabilité" : "Availability and liability"}><p>{fr ? "Le service peut évoluer ou être temporairement interrompu. PulsaTeach s’efforce de fournir des contenus fiables sans garantir une disponibilité permanente ni l’absence totale d’erreurs." : "The service may evolve or be temporarily unavailable. PulsaTeach aims to provide reliable content without guaranteeing uninterrupted availability or complete absence of errors."}</p></LegalSection>
    </LegalLayout>
  );
}

export function LegalNoticePage({ locale = "fr" }) {
  const fr = locale === "fr";
  return (
    <LegalLayout eyebrow={fr ? "Informations légales" : "Legal information"} title={fr ? "Mentions légales" : "Legal notice"} intro={fr ? "À finaliser avant ouverture publique." : "Must be completed before public launch."}>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 font-semibold text-amber-900">{fr ? "Les champs ci-dessous ne peuvent pas être déduits du code. Ils doivent être remplacés par les informations réelles de l’éditeur." : "The fields below cannot be inferred from the code. Replace them with the publisher’s actual information."}</div>
      <LegalSection title={fr ? "Éditeur" : "Publisher"}><p>[Nom ou raison sociale] · [forme juridique] · [capital social] · [adresse] · [SIREN/SIRET] · [RCS] · [email de contact] · [directeur de publication].</p></LegalSection>
      <LegalSection title={fr ? "Hébergement" : "Hosting"}><p>{fr ? "Application prévue sur Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis. Services de données et d’authentification fournis par Supabase. Vérifier et adapter ces informations à la configuration de production effective." : "Application intended to be hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, United States. Data and authentication services provided by Supabase. Verify and adapt this information to the actual production setup."}</p></LegalSection>
    </LegalLayout>
  );
}

function LegalLayout({ eyebrow, title, intro, children }) {
  return (
    <section className="app-page">
      <article className="mx-auto max-w-3xl">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-heading">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">{intro}</p>
        <div className="surface mt-8 space-y-8 text-slate-700">{children}</div>
      </article>
    </section>
  );
}

function LegalSection({ title, children }) {
  return <section><h2 className="font-display text-xl font-bold text-ink">{title}</h2><div className="mt-2 space-y-2 text-sm leading-7 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">{children}</div></section>;
}
