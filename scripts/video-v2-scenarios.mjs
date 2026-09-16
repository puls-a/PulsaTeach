import { expect } from '@playwright/test';

const lesson = '/learn/html/html-modern-document/html-01-doctype-standard-mode';
export const stories = [
  { id: 'Flexbox', key: 'flexbox', route: '/flexbox-arena', title: 'Deux axes. Une cible.', subtitle: 'Un niveau joué du début à la fin', accent: '#bcf36a', lab: true },
  { id: 'Sandbox', key: 'sandbox', route: '/playground', title: 'Du code. Un résultat.', subtitle: 'Une carte qui change et un bouton qui répond', accent: '#63dcff', lab: true },
  { id: 'JavaScript', key: 'javascript', route: '/js-arena', title: 'La logique prend vie.', subtitle: 'Corriger une fonction, puis tester deux cibles', accent: '#ffdc78', lab: true },
  { id: 'Editor', key: 'editor', route: lesson, title: 'Écrire. Tester. Comprendre.', subtitle: 'Corriger un vrai document HTML', accent: '#b7a6ff' },
  { id: 'Tools', key: 'tools', route: '/learn/tools/tools-setup/tools-01-vscode', title: 'Le tout premier fichier.', subtitle: 'Préparer son espace de travail, étape par étape', accent: '#aebfff' },
  { id: 'Catalog', key: 'catalog', route: '/catalog', title: 'Trouve ton point de départ.', subtitle: 'De la recherche à une formation HTML', accent: '#75e5bb' },
  { id: 'Projects', key: 'projects', route: '/projects', title: 'Un projet qui se défend.', subtitle: 'Préparer une soumission et ses livrables', accent: '#ffba8b' },
  { id: 'Glossary', key: 'glossary', route: '/glossary', title: 'Un mot. Le déclic.', subtitle: 'Chercher, comprendre et garder une notion', accent: '#f7aedb' },
  { id: 'Review', key: 'review', route: '/review', title: 'Ce que tu sais reste.', subtitle: 'Une vraie session de rappel actif', accent: '#80e6c5', demo: true },
  { id: 'Path', key: 'path', route: '/path', title: 'La suite est déjà là.', subtitle: 'Choisir sa prochaine leçon dans son parcours', accent: '#b7a6ff' },
  { id: 'Dashboard', key: 'dashboard', route: '/dashboard', title: 'Reprends le fil.', subtitle: 'Du tableau de bord à la prochaine action', accent: '#80e6c5' },
  { id: 'World', key: 'world', route: '/world', title: 'Choisis ton terrain.', subtitle: 'Explorer les zones et entrer dans une arène', accent: '#7edaff' },
  { id: 'Certification', key: 'certification', route: '/certification', title: 'La preuve a ses règles.', subtitle: 'Découvrir les conditions de délivrance', accent: '#ffd489' },
  { id: 'Home', key: 'home', route: '/', title: 'Apprendre devient concret.', subtitle: 'De la découverte à la première formation', accent: '#b7a6ff' },
];

export async function prepareScene(s, page) {
  if (s.key === 'review') {
    // Explicit demo exercise; no fabricated exam score or protected question.
    await page.evaluate(async () => {
      const { setLearnerItem } = await import('/src/learnerStorage.js');
      const item = { id: 'demo-flex:axis', quizId: 'demo-flex', questionId: 'axis', questionType: 'single', gradingMode: 'client', trackId: 'css', moduleId: 'css-flexbox', lessonId: 'demo-flex', prompt: { fr: 'Quelle propriété centre les éléments sur l’axe principal ?', en: 'Which property centers items on the main axis?' }, choices: [{ id: 'justify', label: 'justify-content: center' }, { id: 'align', label: 'align-items: center' }], answer: 'justify', explanation: { fr: 'justify-content agit sur l’axe principal du conteneur flex.' }, dueAt: '2020-01-01T00:00:00.000Z', intervalDays: 0, confidence: 0, repetitions: 0, ease: 2.5 };
      setLearnerItem('pulsateach-learning-progress', JSON.stringify({ completed: {}, review: { items: { [item.id]: item } } }));
    });
    await page.reload();
    await page.getByRole('button', { name: 'Commencer la révision' }).waitFor();
  }
  if (s.lab) {
    await page.locator('.lab-shell textarea').waitFor();
    await page.locator('.lab-shell').evaluate(el => window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 110));
  }
  if (s.key === 'editor') await page.getByLabel('Éditeur de code PulsaTeach').waitFor();
  if (s.key === 'catalog') await page.getByRole('heading', { name: 'Formations disponibles' }).waitFor();
  if (s.key === 'glossary') await page.getByRole('link', { name: 'Voir le terme', exact: true }).first().waitFor();
}

export async function performScene(s, h) {
  const { page: p, step, click, type, hold, frame, vertical, focus } = h;
  const button = name => p.getByRole('button', { name, exact: true });
  if (s.key === 'flexbox') {
    await step('01', 'Le bot commence dans le coin. La cible est au centre.'); await hold(2600);
    await step('02', 'justify-content centre le bot horizontalement.');
    const code = p.getByLabel('Code CSS de mission');
    await click(code); await code.press('Control+Home'); await code.press('ArrowDown'); await code.press('ArrowDown'); await code.press('Home'); await code.press('Shift+End');
    await p.keyboard.type('  justify-content: center;', { delay: 90 }); await hold(1800);
    if (vertical) { await focus(p.getByAltText('Position cible')); await hold(1800); await click(code); }
    await step('03', 'align-items termine le centrage vertical.');
    await code.press('Control+Home'); await code.press('ArrowDown'); await code.press('ArrowDown'); await code.press('ArrowDown'); await code.press('Home'); await code.press('Shift+End');
    await p.keyboard.type('  align-items: center;', { delay: 95 }); await hold(1800);
    if (vertical) { await focus(p.getByAltText('Position cible')); await hold(1800); }
    await step('04', 'On valide : la cible est réellement atteinte.'); await click(button('Valider'));
    await expect(p.getByRole('status').filter({ hasText: 'Cible atteinte' })).toBeVisible();
    const bot = await p.getByAltText('Bot PulsaTeach').boundingBox(); const target = await p.getByAltText('Position cible').boundingBox();
    expect(Math.abs(bot.x - target.x) + Math.abs(bot.y - target.y)).toBeLessThan(2);
    if (vertical) await focus(p.getByRole('status').filter({ hasText: 'Cible atteinte' }));
    await hold(2800); await frame('success');
    await step('05', 'Niveau suivant : une nouvelle cible à droite.'); await click(button('Niveau suivant'));
    await expect(p.getByText('Niveau 2/4 · Centre droit')).toBeVisible(); await hold(2600);
    return 'Niveau 1 validé ; bot et cible superposés ; niveau 2 ouvert.';
  }
  if (s.key === 'sandbox') {
    await step('01', 'La carte est jaune. Changeons son style.'); await hold(1800); await click(button('CSS'));
    await step('02', 'Un dégradé remplace le fond jaune.');
    const code = p.locator('.lab-shell textarea'); const css = await code.inputValue();
    await click(code); await code.press('Control+End');
    await p.keyboard.type('\n.hero-card {\n  background: linear-gradient(135deg, #a5b4fc, #6ee7b7);\n}', { delay: 48 });
    expect(css).toContain('#facc15');
    const preview = p.frameLocator('iframe[title="PulsaTeach live preview"]');
    await expect(preview.locator('.hero-card')).toHaveCSS('background-image', /linear-gradient/);
    if (vertical) await focus(p.locator('iframe'));
    await hold(2600);
    await step('03', 'Le JavaScript du bouton fait monter les XP.'); await click(button('JS')); await hold(2000);
    await click(preview.getByRole('button', { name: 'Boost XP' })); await hold(650); await click(preview.getByRole('button', { name: 'Boost XP' }));
    await expect(preview.locator('#xp')).toHaveText('XP: 20'); await hold(2300);
    await step('04', 'Le rendu fonctionne. La mission est validée.'); await click(button('Valider'));
    await expect(p.getByText('Mission réussie. XP attribué.', { exact: true })).toBeVisible();
    if (vertical) await focus(p.getByText('Mission réussie. XP attribué.', { exact: true }));
    await hold(2600); await frame('success');
    return 'Fond modifié, deux clics réels, XP: 20, mission validée.';
  }
  if (s.key === 'javascript') {
    await step('01', 'La fonction renvoie toujours « right ».'); await hold(2000); await click(button('Tester'));
    await expect(p.getByText(/Certaines cibles sont ratées/)).toBeVisible();
    if (vertical) await focus(p.getByText(/Certaines cibles sont ratées/));
    await hold(2300);
    await step('02', 'On distingue la gauche et la droite.');
    await type(p.getByLabel('Code JavaScript de mission'), 'function aim(target) {\n  if (target.x > 50) {\n    return "right";\n  }\n  return "left";\n}', 65);
    await step('03', 'Deux coordonnées. Deux résultats corrects.'); await click(button('Tester'));
    await expect(p.getByText('Niveau réussi. XP attribué.', { exact: true })).toBeVisible();
    if (vertical) await focus(p.getByText('Niveau réussi. XP attribué.', { exact: true }));
    await hold(3000); await frame('success');
    await click(button('Niveau suivant')); await hold(2000);
    return 'Échec initial visible puis fonction corrigée, niveau réussi et niveau suivant ouvert.';
  }
  if (s.key === 'editor') {
    await step('01', 'Le document a besoin de son doctype.');
    const code = p.getByLabel('Éditeur de code PulsaTeach'); await click(code); await code.press('Control+Home'); await hold(1500);
    await step('02', 'On ajoute la déclaration au début du fichier.');
    await p.keyboard.type('<!doctype html>\n', { delay: 160 }); await hold(2000);
    await step('03', 'On exécute les vrais tests de la leçon.'); await code.press('Control+Enter');
    await expect(p.getByRole('status').filter({ hasText: 'Tous les checks passent' })).toBeVisible({ timeout: 15000 });
    await hold(3500); await frame('success');
    return 'Doctype écrit au clavier et validation réelle de la leçon.';
  }
  if (s.key === 'tools') {
    await step('01', 'Tout commence par un dossier de projet.'); await hold(1600);
    await click(p.getByRole('button', { name: /Créer le dossier/ })); await hold(1700);
    await step('02', 'Puis un premier fichier index.html.'); await click(p.getByRole('button', { name: /Créer index.html/ }));
    await expect(p.getByRole('button', { name: 'Créer index.html', exact: true })).toHaveAttribute('aria-pressed', 'true'); await hold(1600);
    await step('03', 'Choisir l’éditeur intégré et écrire sa première page.');
    await p.getByLabel('Environnement choisi').selectOption({ label: 'Éditeur et aperçu intégrés' });
    await type(p.getByRole('textbox', { name: 'index.html', exact: true }), '<main>\n  <h1>Mon espace de travail</h1>\n  <ul>\n    <li>Éditeur intégré</li>\n    <li>Fichier index.html</li>\n    <li>Aperçu navigateur</li>\n  </ul>\n</main>', 35);
    await step('04', 'Enregistrer, recharger et observer le fichier.'); await click(button('Enregistrer')); await click(button("Recharger l'aperçu")); await hold(2800); await frame('success');
    return 'Dossier et fichier créés, environnement choisi, page enregistrée et aperçu rechargé.';
  }
  if (s.key === 'catalog') {
    await step('01', 'Choisir une formation parmi les parcours publiés.'); await hold(1800);
    await step('02', 'Chercher HTML filtre immédiatement le catalogue.'); await type(p.getByLabel('Rechercher une formation'), 'HTML', 220); await hold(2100);
    await step('03', 'Ouvrir le programme de la formation.'); await click(p.locator('a[href="/formations/html"]'));
    await expect(p).toHaveURL(/\/formations\/html/); await expect(p.getByRole('heading', { name: 'HTML interactif', exact: true })).toBeVisible(); await hold(3000); await frame('success');
    return 'Recherche HTML effectuée et page de formation ouverte.';
  }
  if (s.key === 'glossary') {
    await step('01', 'Chercher une notion au moment où elle bloque.'); await type(p.getByLabel('Rechercher un terme'), 'cascade', 180); await hold(1800);
    await step('02', 'Ouvrir sa définition et les ressources associées.'); await click(p.getByRole('link', { name: 'Voir le terme', exact: true }).first());
    await button('Favori').waitFor(); await hold(2300);
    await step('03', 'Garder le terme en favori, puis passer en bilingue.'); await click(button('Favori')); await click(button('Bilingue')); await hold(3000); await frame('success');
    const saved = await p.evaluate(() => Object.entries(localStorage).some(([k,v]) => k.includes('glossary-favorites') && JSON.parse(v).length > 0)); expect(saved).toBe(true);
    return 'Recherche cascade, détail ouvert, favori persisté et mode bilingue activé.';
  }
  if (s.key === 'review') {
    await step('01', 'Une question de démonstration est à revoir.'); await hold(2000); await click(button('Commencer la révision'));
    await step('02', 'Retrouver la propriété de l’axe principal.'); await click(button('justify-content: center')); await hold(2000); await click(button('Vérifier ma réponse'));
    await expect(p.getByRole('status').filter({ hasText: 'Bonne réponse.' })).toBeVisible(); await hold(2500);
    await step('03', 'Évaluer son rappel programme la prochaine révision.'); await click(button('Bien'));
    await expect(p.getByRole('heading', { name: 'Session terminée' })).toBeVisible(); await hold(3000); await frame('success');
    return 'Session de démonstration terminée, bonne réponse et rappel reprogrammé.';
  }
  if (s.key === 'projects') {
    await step('01', 'Préparer un projet et expliquer ce qui a été construit.'); await click(p.getByRole('link', { name: 'Soumettre un projet' }));
    await type(p.getByLabel('Titre', { exact: true }), 'PulsaConf — ma première version', 85);
    await step('02', 'Décrire le travail et les preuves à fournir.'); await type(p.getByLabel('Description', { exact: true }), 'Une page événement en HTML sémantique, avec navigation et formulaire accessibles.', 45);
    await type(p.getByLabel('Livrables, un par ligne'), 'Page HTML\nNavigation clavier\nFormulaire avec labels', 60);
    await step('03', 'Garder la maîtrise de la visibilité du portfolio.'); await click(p.getByLabel('Visibilité portfolio')); await p.getByLabel('Visibilité portfolio').selectOption('private'); await p.keyboard.press('Escape');
    await expect(p.getByLabel('Titre', { exact: true })).toHaveValue('PulsaConf — ma première version'); await hold(3000); await frame('success');
    return 'Formulaire préparé avec titre, description, livrables et visibilité privée ; aucune soumission publiée.';
  }
  if (s.key === 'path') {
    await step('01', 'Un parcours et des jalons pour avancer.'); await hold(2300);
    const next = p.getByRole('link', { name: 'Continuer', exact: true }); await next.waitFor();
    await step('02', 'Ouvrir la prochaine leçon recommandée.'); await click(next);
    await expect(p).toHaveURL(/\/learn\//); await p.getByRole('button', { name: 'Créer le dossier', exact: true }).waitFor(); await hold(4000); await frame('success'); return 'Prochaine leçon ouverte depuis le plan personnalisé.';
  }
  if (s.key === 'dashboard') {
    await step('01', 'Retrouver son objectif et ses prochaines actions.'); await hold(2500);
    await step('02', 'Continuer à apprendre en un clic.');
    const next = p.locator('main a[href*="/learn/"]').first(); await next.waitFor(); await click(next);
    await expect(p).toHaveURL(/\/learn\//); await p.getByRole('button', { name: 'Créer le dossier', exact: true }).waitFor(); await hold(4000); await frame('success'); return 'Navigation réelle du tableau de bord vers une leçon.';
  }
  if (s.key === 'world') {
    await step('01', 'Explorer les zones de Pulsa Academy.'); await hold(2000);
    await step('02', 'Découvrir les badges proposés.'); await click(button('Voir les badges')); await hold(2300); await click(button('Fermer'));
    await step('03', 'Entrer dans la zone Flexbox.'); await click(p.locator('main a[href="/flexbox-arena"]'));
    await p.getByLabel('Code CSS de mission').waitFor(); await hold(2800); await frame('success'); return 'Badges consultés et arène Flexbox ouverte depuis la carte.';
  }
  if (s.key === 'certification') {
    await step('01', 'Comprendre ce qui rend une compétence vérifiable.'); await hold(2600);
    await step('02', 'Examens réussis et projets approuvés : les conditions.'); await click(p.getByRole('link', { name: 'Voir mes certificats' }));
    await expect(p.getByRole('heading', { name: 'Règles de délivrance' })).toBeVisible(); await hold(4500); await frame('success');
    return 'Règles de délivrance consultées ; aucun certificat fictif créé.';
  }
  await step('01', 'Découvrir comment apprendre en construisant.'); await hold(2300);
  await step('02', 'Passer de la découverte aux formations.'); await click(p.locator('main a[href="/catalog"]').first());
  await expect(p).toHaveURL(/\/catalog/); await p.locator('a[href="/formations/html"]').waitFor(); await hold(3500); await frame('success'); return 'Navigation de l’accueil vers le catalogue.';
}
