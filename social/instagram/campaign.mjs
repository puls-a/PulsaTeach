const series = [
  ['flexbox', 'Tu centres encore tes éléments au hasard ?', 'Deux propriétés, deux axes. Dans cette démo, on déplace vraiment le bot avant de valider le niveau.', 'Quel axe te pose le plus problème : horizontal ou vertical ?', 'défi'],
  ['sandbox', 'Une ligne de CSS. Un résultat visible.', 'On change le fond, puis on clique sur le bouton pour vérifier le JavaScript. Essaie ensuite avec tes propres couleurs.', 'Quelle modification ferais-tu sur cette carte ?', 'pratique'],
  ['editor', 'Le navigateur a besoin d’un contrat.', 'On ajoute le doctype au document HTML, puis on lance les cinq tests de la leçon. Un petit changement, une raison à comprendre.', 'Tu connaissais le rôle du doctype ?', 'notion'],
  ['javascript', 'Le code passe sur un exemple… mais échoue sur l’autre.', 'La fonction renvoyait toujours right. On corrige sa condition, puis on teste les deux coordonnées dans JavaScript Arena.', 'Comment gérerais-tu une cible exactement au centre ?', 'défi'],
  ['tools', 'Ton premier projet commence avec un fichier.', 'Créer un dossier, ajouter index.html, enregistrer et observer : voici la boucle de départ dans notre atelier interactif.', 'Quelle étape t’a bloqué quand tu as commencé ?', 'débuter'],
  ['glossary', 'Un mot inconnu ne devrait pas arrêter ta session.', 'On cherche cascade, on ouvre la définition et on garde la notion en favori. Le mode bilingue aide aussi à lire la documentation.', 'Quel mot du développement web veux-tu qu’on explique ensuite ?', 'notion'],
  ['projects', 'Un portfolio, ce n’est pas seulement une capture d’écran.', 'Voici comment préparer le titre, la description et les livrables d’un projet. Cette démo prépare le formulaire ; elle ne publie pas de soumission.', 'Quel petit projet aimerais-tu terminer cette semaine ?', 'projet'],
  ['review', 'Comprendre aujourd’hui. Se souvenir demain.', 'Avec une question de démonstration, on répond, on lit le retour et on évalue son rappel pour programmer la prochaine révision.', 'Tu révises plutôt avec des questions, des notes ou du code ?', 'méthode'],
  ['catalog', 'Tu veux apprendre le web, mais par où commencer ?', 'On cherche HTML dans les formations et on ouvre le programme. L’objectif : choisir une prochaine étape accessible.', 'Tu pars de zéro ou tu as déjà écrit ta première page ?', 'débuter'],
  ['world', 'Et si ta prochaine session commençait par un défi ?', 'On explore Pulsa Academy, on consulte les badges et on rejoint Flexbox Arena.', 'Tu préfères les défis CSS ou JavaScript ?', 'défi'],
  ['path', 'Pas besoin de tout apprendre en une soirée.', 'Le parcours rassemble les prochaines leçons et les jalons. On choisit une action et on commence.', 'Quel créneau réaliste peux-tu garder pour apprendre cette semaine ?', 'méthode'],
  ['dashboard', 'Reprendre est parfois plus difficile que commencer.', 'Le tableau de bord retrouve les prochaines actions. Dans cette démo, on rejoint directement une leçon.', 'Qu’est-ce qui t’aide à reprendre après une pause ?', 'méthode'],
  ['certification', 'Une compétence doit pouvoir s’expliquer et se vérifier.', 'On consulte les règles de délivrance : examens requis et projets approuvés. Cette vidéo présente les critères, pas l’obtention d’un certificat.', 'Quelle réalisation te rendrait fier de montrer tes compétences ?', 'projet'],
  ['home', 'On apprend le web ensemble, une réalisation à la fois.', 'PulsaTeach rassemble cours, pratique et projets. Cette série continue avec vos questions et vos essais.', 'Quel sujet doit devenir notre prochain défi collectif ?', 'communauté'],
];

export function makeCampaign(start = new Date()) {
  const cursor = new Date(start); cursor.setUTCHours(17, 30, 0, 0);
  if (cursor <= start) cursor.setUTCDate(cursor.getUTCDate() + 1);
  return series.map(([key, hook, body, question, pillar], index) => {
    while (![0, 2, 4].includes(cursor.getUTCDay())) cursor.setUTCDate(cursor.getUTCDate() + 1);
    const scheduledAt = cursor.toISOString(); cursor.setUTCDate(cursor.getUTCDate() + 1);
    return { id: `v3-${key}`, key, pillar, scheduledAt, file: `docs/media/reels-v3/${key}-vertical.mp4`, caption: `${hook}\n\n${body}\n\n${question}\n\nEssaie sur PulsaTeach — lien dans la bio.\n\n#PulsaTeach #ApprendreACoder #DeveloppementWeb`, order: index + 1, format: 'retention-v3' };
  });
}
export const profile = {
  username: 'pulsateach_',
  bio: 'Apprends le web en pratiquant.\nHTML • CSS • défis • projets\nMontre tes essais, pose tes questions ↓',
  link: 'https://pulsateach.vercel.app/?utm_source=instagram&utm_medium=organic_social&utm_campaign=communaute_v2',
};
