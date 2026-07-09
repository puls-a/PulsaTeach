export const jsModuleProfiles = {
  "js-variables-strings": {
    scene: ["Tu configures les premiers messages d'accueil de PulsaConf.", "You set up the first PulsaConf welcome messages."],
    risk: ["des valeurs en dur non nommées créent des bugs silencieux", "unnamed hardcoded values create silent bugs"],
    proof: ["les valeurs sont stockées dans des variables lisibles et assemblées sans erreur", "values are stored in readable variables and assembled without error"],
    project: ["un générateur de tickets texte", "a text ticket generator"]
  },
  "js-booleans-numbers": {
    scene: ["Tu calcules les places restantes et l'âge des participants à PulsaConf.", "You calculate remaining seats and attendee ages for PulsaConf."],
    risk: ["une mauvaise comparaison laisse passer un participant invalide", "a bad comparison lets an invalid attendee pass"],
    proof: ["la condition if/else bloque correctement la logique selon les seuils", "the if/else condition correctly blocks logic based on thresholds"],
    project: ["un validateur d'inscription", "a registration validator"]
  },
  "js-functions-scope": {
    scene: ["Tu regroupes la logique de PulsaConf dans des fonctions réutilisables.", "You group PulsaConf logic into reusable functions."],
    risk: ["du code répété casse à la première modification des règles", "repeated code breaks at the first rule change"],
    proof: ["la fonction retourne un résultat prévisible selon ses paramètres", "the function returns a predictable result based on its parameters"],
    project: ["une API de calcul des prix", "a price calculation API"]
  },
  "js-collections-loops": {
    scene: ["Tu listes les ateliers et parcours les inscrits de la conférence.", "You list the conference workshops and iterate over attendees."],
    risk: ["une boucle mal indexée oublie un participant ou plante l'application", "a poorly indexed loop misses an attendee or crashes the app"],
    proof: ["le tableau est parcouru et transformé sans dépasser sa longueur", "the array is traversed and transformed without exceeding its length"],
    project: ["un gestionnaire de liste d'attente", "a waitlist manager"]
  },
  "js-dom-forms": {
    scene: ["Tu rends le formulaire d'inscription interactif dans le navigateur.", "You make the registration form interactive in the browser."],
    risk: ["l'interface ne réagit pas aux actions ou recharge la page inutilement", "the interface does not react to actions or reloads unnecessarily"],
    proof: ["l'événement déclenche la bonne fonction et met à jour le DOM cible", "the event triggers the right function and updates the target DOM"],
    project: ["un formulaire interactif avec feedback", "an interactive form with feedback"]
  },
  "js-strings-regex-errors": {
    scene: ["Tu vérifies le format des emails et des billets fournis par les utilisateurs.", "You verify the format of emails and tickets provided by users."],
    risk: ["une chaîne mal formatée fait planter le traitement des données", "a badly formatted string crashes data processing"],
    proof: ["les erreurs sont anticipées avec try/catch et le texte est nettoyé", "errors are anticipated with try/catch and text is cleaned"],
    project: ["un nettoyeur de saisie utilisateur", "a user input cleaner"]
  },
  "js-async-fetch": {
    scene: ["Tu charges la liste des intervenants depuis le serveur.", "You load the list of speakers from the server."],
    risk: ["l'interface se fige en attendant une réponse ou plante si le réseau coupe", "the interface freezes while waiting for a response or crashes if network drops"],
    proof: ["l'appel asynchrone gère l'attente et l'erreur éventuelle", "the asynchronous call handles waiting and potential errors"],
    project: ["un chargeur de planning dynamique", "a dynamic schedule loader"]
  },
  "js-storage-state": {
    scene: ["Tu sauvegardes les préférences de l'utilisateur (thème, langue) dans son navigateur.", "You save user preferences (theme, language) in their browser."],
    risk: ["les données sont perdues au rechargement ou stockées dans un format cassé", "data is lost on reload or stored in a broken format"],
    proof: ["localStorage conserve et restitue un JSON valide au retour de l'utilisateur", "localStorage keeps and restores valid JSON when the user returns"],
    project: ["un gestionnaire de préférences persistantes", "a persistent preferences manager"]
  },
  "js-debugging": {
    scene: ["Tu traques un bug remonté par l'équipe d'organisation.", "You track down a bug reported by the organizing team."],
    risk: ["deviner la source de l'erreur fait perdre des heures", "guessing the source of the error wastes hours"],
    proof: ["console et breakpoints localisent l'état exact de la variable défectueuse", "console and breakpoints locate the exact state of the defective variable"],
    project: ["un audit de code buggé", "an audit of buggy code"]
  },
  "js-capstone": {
    scene: ["Tu assembles toutes les briques pour livrer le système d'inscription PulsaConf.", "You assemble all blocks to ship the PulsaConf registration system."],
    risk: ["les fonctions isolées fonctionnent mais l'application entière plante", "isolated functions work but the whole app crashes"],
    proof: ["DOM, état, API et événements communiquent de manière fluide et robuste", "DOM, state, API, and events communicate smoothly and robustly"],
    project: ["le système de billetterie final", "the final ticketing system"]
  },
  "js-validation-hardening": {
    scene: ["Tu renforces la sécurité des entrées avant l'envoi au serveur.", "You strengthen input security before sending to the server."],
    risk: ["des données inattendues créent une vulnérabilité", "unexpected data creates a vulnerability"],
    proof: ["les limites et types sont strictement vérifiés", "limits and types are strictly checked"],
    project: ["un validateur strict", "a strict validator"]
  },
  "js-async-resilience": {
    scene: ["Tu rends les requêtes réseau robustes face aux pannes.", "You make network requests robust against failures."],
    risk: ["une requête bloquée laisse l'utilisateur sans information", "a blocked request leaves the user without information"],
    proof: ["timeout et retry protègent l'expérience utilisateur", "timeout and retry protect the user experience"],
    project: ["un client API résilient", "a resilient API client"]
  },
  "js-dom-production": {
    scene: ["Tu finalises le DOM pour qu'il soit propre et accessible.", "You finalize the DOM so it is clean and accessible."],
    risk: ["des fuites mémoire ou des pertes de focus dégradent la navigation", "memory leaks or focus losses degrade navigation"],
    proof: ["le nettoyage des événements et la gestion du focus sont explicites", "event cleanup and focus management are explicit"],
    project: ["un composant UI de production", "a production UI component"]
  }
};

export function jsModuleProfile(id, title) {
  return jsModuleProfiles[id] || {
    scene: [`Tu renforces ${title[0]} dans une application réelle.`, `You strengthen ${title[1]} in a real application.`],
    risk: ["une logique confuse génère des bugs silencieux", "confusing logic generates silent bugs"],
    proof: ["les tests et la console confirment le comportement métier", "tests and console confirm domain behavior"],
    project: [`un module ${title[0]} sécurisé`, `a secure ${title[1]} module`]
  };
}