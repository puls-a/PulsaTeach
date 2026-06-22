function jsRuntimeTests(id) {
  const runtime = {
    "js-01-variables": [
      { type: "jsExpression", label: "Le total calculé vaut réellement 48", value: "return total === 48;" }
    ],
    "js-01-conditionals": [
      { type: "jsExpression", label: "canStart accepte exactement l'âge limite de 13 ans", value: "return canStart(13) === true;" },
      { type: "jsExpression", label: "canStart refuse un âge inférieur au seuil", value: "return canStart(12) === false;" }
    ],
    "js-01-strings-template": [
      { type: "jsExpression", label: "Le message contient le nom et la valeur d'XP", value: "return typeof message === 'string' && message.includes(name) && message.includes(String(xp));" }
    ],
    "js-02-functions": [
      { type: "jsExpression", label: "Un score de 50 retourne Starter", value: "return getLevel(50) === 'Starter';" },
      { type: "jsExpression", label: "Un score de 300 retourne Builder", value: "return getLevel(300) === 'Builder';" },
      { type: "jsExpression", label: "Un score de 800 retourne Pre-junior", value: "return getLevel(800) === 'Pre-junior';" }
    ],
    "js-02-parameters": [
      { type: "jsExpression", label: "makeBadge utilise réellement ses deux arguments", value: "return makeBadge('Maya', 120).includes('Maya') && makeBadge('Maya', 120).includes('120');" }
    ],
    "js-02-default-parameters": [
      { type: "jsExpression", label: "greet reste valide lorsqu'aucun nom n'est fourni", value: "return greet().includes('apprenant') && greet('Maya').includes('Maya');" }
    ],
    "js-02-object-method": [
      { type: "jsExpression", label: "La méthode complete modifie réellement done", value: "lesson.complete(); return lesson.done === true;" }
    ],
    "js-03-arrays": [
      { type: "jsExpression", label: "htmlCourses contient uniquement le cours HTML", value: "return Array.isArray(htmlCourses) && htmlCourses.length === 1 && htmlCourses[0].track === 'html';" }
    ],
    "js-03-map": [
      { type: "jsExpression", label: "titles contient les deux titres sous forme de chaînes", value: "return Array.isArray(titles) && titles.length === 2 && titles.includes('HTML') && titles.includes('CSS');" }
    ],
    "js-03-reduce-xp": [
      { type: "jsExpression", label: "La réduction calcule un total de 100 XP", value: "return totalXp === 100;" }
    ],
    "js-03-find": [
      { type: "jsExpression", label: "cssCourse est bien l'objet dont l'id vaut css", value: "return cssCourse?.id === 'css';" }
    ],
    "js-03-some": [
      { type: "jsExpression", label: "hasCompleted vaut true lorsqu'une leçon est terminée", value: "return hasCompleted === true;" }
    ],
    "js-05-storage": [
      { type: "jsExpression", label: "Le thème est réellement enregistré sous la bonne clé", value: "return localStorage.getItem('pulsa-theme') === theme;" }
    ],
    "js-05-json-settings": [
      { type: "jsExpression", label: "Le JSON relu conserve toutes les préférences", value: "return parsedSettings.theme === 'happy' && parsedSettings.minutes === 30;" }
    ]
  };

  return runtime[id] || [];
}

function jsCheckLabel(check) {
  const labels = {
    "const quantity": "Une constante quantity est déclarée",
    "const total": "Une constante total est déclarée",
    "price * quantity": "Le total est calculé depuis price et quantity",
    "function canStart": "La fonction canStart est déclarée",
    "return": "La fonction retourne explicitement un résultat",
    "age >= 13": "La comparaison inclut le seuil de 13 ans",
    "const message": "Une constante message est déclarée",
    "`": "Un template literal est utilisé",
    "${name}": "Le nom est interpolé dans le message",
    "${xp}": "L'XP est interpolée dans le message",
    "console.log": "Une information est envoyée dans la console",
    "console.warn": "Un avertissement est envoyé dans la console",
    "lesson": "Le message utilise la valeur lesson",
    ".filter": "filter est utilisé pour sélectionner des éléments",
    ".map": "map est utilisé pour transformer la collection",
    ".reduce": "reduce est utilisé pour combiner la collection",
    ".find": "find est utilisé pour rechercher un élément",
    ".some": "some est utilisé pour vérifier l'existence",
    "localStorage.setItem": "Une valeur est enregistrée dans localStorage",
    "JSON.stringify": "Les réglages sont sérialisés en JSON",
    "JSON.parse": "Le JSON est reconstruit en objet",
    "await fetch": "La réponse réseau est attendue",
    "response.json": "Le corps JSON est lu",
    "response.ok": "Le statut HTTP est vérifié",
    "preventDefault": "Le rechargement natif du formulaire est empêché",
    "classList.toggle": "La classe active est basculée",
    "addEventListener": "Un événement utilisateur est écouté",
    "querySelector": "Les éléments utiles sont sélectionnés"
  };
  return labels[check] || `Le code utilise ${check}`;
}

function jsSolution(id, fallback) {
  const solutions = {
    "js-01-variables": `const price = 12;
const quantity = 4;
const total = price * quantity;
console.log(total);`,
    "js-01-conditionals": `function canStart(age) {
  return age >= 13;
}`,
    "js-01-strings-template": "const name = 'Maya';\nconst xp = 120;\nconst message = `${name} possède ${xp} XP`;\nconsole.log(message);",
    "js-01-errors-console": "const lesson = 'JavaScript';\nconsole.log(`Leçon chargée : ${lesson}`);\nconsole.warn('Pense à lancer les tests.');",
    "js-02-functions": `function getLevel(score) {
  if (score < 100) return "Starter";
  if (score < 500) return "Builder";
  return "Pre-junior";
}`,
    "js-03-arrays": `const courses = [{ track: 'html' }, { track: 'css' }];
const htmlCourses = courses.filter((course) => course.track === 'html');
console.log(htmlCourses);`,
    "js-04-dom-events": `<button id="plus">+1</button>
<span id="count">0</span>
<script>
  const button = document.querySelector("#plus");
  const count = document.querySelector("#count");

  button.addEventListener("click", () => {
    count.textContent = Number(count.textContent) + 1;
  });
</script>`,
    "js-05-storage": `const theme = 'happy';
localStorage.setItem('pulsa-theme', theme);`,
    "js-02-parameters": `function makeBadge(name, xp) {
  return name + " earned " + xp + " XP";
}`,
    "js-02-default-parameters": `function greet(name = "apprenant") {
  return "Bienvenue " + name;
}`,
    "js-02-object-method": `const lesson = {
  title: "Fonctions",
  done: false,
  complete() {
    this.done = true;
  }
};`,
    "js-03-map": `const courses = [{ title: 'HTML' }, { title: 'CSS' }];
const titles = courses.map((course) => course.title);
console.log(titles);`,
    "js-03-reduce-xp": `const lessons = [{ xp: 20 }, { xp: 35 }, { xp: 45 }];
const totalXp = lessons.reduce((sum, lesson) => sum + lesson.xp, 0);
console.log(totalXp);`,
    "js-03-find": `const courses = [{ id: "html" }, { id: "css" }, { id: "js" }];
const cssCourse = courses.find((course) => course.id === "css");`,
    "js-03-some": `const lessons = [{ done: false }, { done: true }];
const hasCompleted = lessons.some((lesson) => lesson.done);`,
    "js-04-class-toggle": `<button id="toggle">Toggle</button>
<article class="card">Carte</article>
<script>
  const button = document.querySelector("#toggle");
  const card = document.querySelector(".card");

  button.addEventListener("click", () => {
    card.classList.toggle("active");
  });
</script>`,
    "js-05-json-settings": `const settings = { theme: 'happy', minutes: 30 };
const savedSettings = JSON.stringify(settings);
const parsedSettings = JSON.parse(savedSettings);
console.log(parsedSettings);`,
    "js-06-fetch": `async function loadCourses() {
  const response = await fetch('/api/courses');
  const courses = await response.json();
  return courses;
}`,
    "js-04-form-submit": `<form id="task-form"><input id="task" /><button>Ajouter</button></form>
<script>
  const form = document.querySelector("#task-form");
  const field = document.querySelector("#task");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(field.value);
  });
</script>`,
    "js-06-fetch-errors": `async function loadProfile() {
  try {
    const response = await fetch("/api/profile");
    if (!response.ok) throw new Error("Request failed");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}`,
    "js-07-final-project": `const state = { tasks: [] };

function render() {
  console.log(state.tasks);
}

function addTask(title) {
  state.tasks.push({ title, done: false });
  localStorage.setItem('pulsa-dashboard', JSON.stringify(state));
  render();
}`
  };

  return solutions[id] || fallback;
}
export { jsCheckLabel, jsRuntimeTests, jsSolution };
