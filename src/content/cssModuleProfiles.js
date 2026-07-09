export const cssModuleProfiles = {
  "css-selectors-colors": {
    scene: ["Tu habilles les cartes d'ateliers PulsaConf sans toucher aux autres composants.", "You style PulsaConf workshop cards without touching unrelated components."],
    risk: ["un sélecteur trop large ou une couleur non justifiée se propage partout", "an overly broad selector or unjustified color spreads everywhere"],
    proof: ["l'inspecteur montre le bon sélecteur, la couleur active et un focus encore visible", "the inspector shows the right selector, active color, and still-visible focus"],
    project: ["un systeme visuel de cartes coherent", "a coherent card visual system"]
  },
  "css-box-type": {
    scene: ["Tu rends les cartes PulsaConf confortables à lire avec de vrais textes longs.", "You make PulsaConf cards comfortable to read with real long text."],
    risk: ["un mauvais box model cree des débordements, des lignes fatigantes ou des espacements incoherents", "a weak box model creates overflow, tiring lines, or inconsistent spacing"],
    proof: ["la carte respire, le texte revient à la ligne et la largeur reste controlee", "the card breathes, text wraps, and width stays controlled"],
    project: ["une carte lisible et robuste", "a readable robust card"]
  },
  "css-flex-layout": {
    scene: ["Tu organises la barre d'actions PulsaConf comme une vraie interface de navigation.", "You organize the PulsaConf action bar like à real navigation interface."],
    risk: ["des actions alignees à la main cassent des que le texte change ou que l'écran retrecit", "hand-aligned actions break as soon as text changes or the screen narrows"],
    proof: ["les boutons gardent leur espace, leur alignement et leur retour à la ligne", "buttons keep spacing, alignment, and wrapping"],
    project: ["une toolbar flex utilisable sur mobile et desktop", "a flex toolbar usable on mobile and desktop"]
  },
  "css-grid-layout": {
    scene: ["Tu composes la galerie PulsaConf sans calculer des largeurs fragiles.", "You compose the PulsaConf gallery without fragile width calculations."],
    risk: ["une grille rigide impose des colonnes qui debordent ou laissent des trous visuels", "a rigid grid forces columns that overflow or leave visual gaps"],
    proof: ["les cartes se redistribuent avec repeat, minmax, gap et alignement previsibles", "cards redistribute with predictable repeat, minmax, gap, and alignment"],
    project: ["une galerie grid responsive", "a responsive grid gallery"]
  },
  "css-responsive": {
    scene: ["Tu fais survivre PulsaConf aux telephones, tablettes et grands écrans.", "You make PulsaConf survive phones, tablets, and large screens."],
    risk: ["un design pense desktop force le zoom, le scroll horizontal ou des lignes illisibles", "a desktop-first design forces zoom, horizontal scroll, or unreadable lines"],
    proof: ["le rendu tient a 375 px, respire sur desktop et reste fluide", "the output holds at 375 px, breathes on desktop, and stays fluid"],
    project: ["une base responsive mobile-first", "a mobile-first responsive base"]
  },
  "css-a11y-states": {
    scene: ["Tu rends les actions PulsaConf perceptibles à la souris, au clavier et en modes contraints.", "You make PulsaConf actions perceivable by mouse, keyboard, and constrained modes."],
    risk: ["un état joli mais invisible au clavier exclut une partie des utilisateurs", "a nice-looking state that is invisible to keyboard users excludes part of the audience"],
    proof: ["focus, hover, disabled et couleurs forcees restent lisibles", "focus, hover, disabled, and forced colors remain readable"],
    project: ["des états interactifs accessibles", "accessible interactive states"]
  },
  "css-motion": {
    scene: ["Tu ajoutes du mouvement a PulsaConf sans voler l'attention ni ignorer les préférences utilisateur.", "You add motion to PulsaConf without stealing attention or ignoring user préférences."],
    risk: ["une animation gratuite peut ralentir, distraire ou rendre l'interface inconfortable", "gratuitous animation can slow, distract, or make the interface uncomfortable"],
    proof: ["la transition est courte, ciblée et desactivee avec prefers-reduced-motion", "the transition is short, targeted, and disabled with prefers-reduced-motion"],
    project: ["un mouvement responsable et reversible", "responsible reversible motion"]
  },
  "css-capstone": {
    scene: ["Tu assembles la landing PulsaConf comme un systeme responsive complet.", "You assemble the PulsaConf landing as à complète responsive system."],
    risk: ["des règles isolees peuvent passer seules mais echouer ensemble sur contenu reel", "isolated rules may pass alone but fail together with real content"],
    proof: ["variables, grille, medias, container queries et overflow racontent la même strategie", "variables, grid, media, container queries, and overflow tell the same strategy"],
    project: ["une landing CSS auditable", "an auditable CSS landing"]
  }
};

export function cssModuleProfile(id, title) {
  return cssModuleProfiles[id] || {
    scene: [`Tu renforces ${title[0]} dans une interface PulsaTeach réelle.`, `You strengthen ${title[1]} in à real PulsaTeach interface.`],
    risk: ["une règle CSS non justifiée rend le rendu fragile", "an unjustified CSS rule makes the output fragile"],
    proof: ["le rendu, les tests et DevTools confirment la decision", "preview, tests, and DevTools confirm the decision"],
    project: [`un livrable ${title[0]} vérifie`, `a verified ${title[1]} deliverable`]
  };
}
