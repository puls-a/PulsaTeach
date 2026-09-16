import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const features = {
  editor: {
    kicker: "VIDEO 02 · L'EDITEUR",
    hook: ["Tu peux regarder", "100 tutos.", "Ou écrire une ligne."],
    sub: "PulsaTeach te donne un éditeur, des indices et des tests visibles.",
    proof: "Ton code n'est pas seulement lu. Il est vérifié.",
    action: "LANCE LES TESTS",
    result: "3/3 tests réussis",
    lines: [["const", " price = 49.90;"], ["if", " (price > 0) {"], ["  return", " 'Produit disponible';"], ["}", ""]],
    caption: "Arrête de copier des bouts de code sans savoir s'ils fonctionnent.",
    cta: "Écris. Vérifie. Comprends."
  },
  sandbox: {
    kicker: "VIDEO 03 · LE BAC A SABLE",
    hook: ["Un changement.", "Un résultat", "immédiat."],
    sub: "Écris du HTML et du CSS. Observe le rendu. Corrige sans attendre.",
    proof: "La meilleure boucle d'apprentissage tient en trois mots : essaie, vois, ajuste.",
    action: "APERÇU LIVE",
    result: "Aperçu mis à jour",
    lines: [[".card", " {"], ["  border-radius", ": 24px;"], ["  background", ": #ffffff;"], ["}", ""]],
    caption: "Ton navigateur devient ton terrain d'entraînement.",
    cta: "Teste ton idée maintenant."
  },
  projects: {
    kicker: "VIDEO 04 · LES PROJETS",
    hook: ["Un portfolio", "ne commence pas", "par un template."],
    sub: "Il commence par un problème réel, des contraintes et une preuve.",
    proof: "Chaque projet PulsaTeach te demande d'expliquer ce que tu as fait et pourquoi.",
    action: "VALIDER LE LIVRABLE",
    result: "Livrable prêt pour revue",
    lines: [["<main", ">"], ["  <h1", ">Lampe Atlas</h1>"], ["  <details", ">Livraison</details>"], ["</main", ">"]],
    caption: "Construis des réalisations que tu peux défendre en entretien.",
    cta: "Passe de l'exercice au projet."
  }
};

const palette = { ink: "#020617", panel: "#11152e", violet: "#6d4aff", mint: "#6ee7b7", cyan: "#67e8f9", paper: "#f8fafc", slate: "#94a3b8" };
const inView = (frame, fps, delay = 0) => spring({ frame: frame - delay, fps, config: { damping: 18, mass: 0.8 } });
const clip = (value) => Math.max(0, Math.min(1, value));

export const ProductFeaturePromo = ({ feature }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const data = features[feature];
  const scene = Math.floor(frame / 150);
  const progress = frame % 150;
  return <AbsoluteFill style={{ background: palette.ink, color: "white", overflow: "hidden", fontFamily: "Arial, Helvetica, sans-serif" }}>
    <Backdrop frame={frame} />
    <Header kicker={data.kicker} />
    {scene === 0 && <Opening data={data} frame={progress} fps={fps} />}
    {scene === 1 && <Workspace data={data} feature={feature} frame={progress} fps={fps} />}
    {scene === 2 && <Proof data={data} frame={progress} fps={fps} />}
    {scene === 3 && <Close data={data} frame={progress} fps={fps} />}
    <div style={{ position: "absolute", bottom: 62, left: 66, right: 66, display: "flex", justifyContent: "space-between", color: "#cbd5e1", fontSize: 20, letterSpacing: 1.5 }}><span>pulsateach.vercel.app</span><span style={{ color: palette.mint }}>● GRATUIT</span></div>
  </AbsoluteFill>;
};

const Backdrop = ({ frame }) => <><div style={{ position: "absolute", width: 900, height: 900, right: -450 + Math.sin(frame / 38) * 40, top: -320, borderRadius: 999, background: "radial-gradient(circle, #6246ea99, transparent 68%)" }} /><div style={{ position: "absolute", width: 700, height: 700, left: -360, bottom: -310, borderRadius: 999, background: "radial-gradient(circle, #0891b288, transparent 70%)" }} /><div style={{ position: "absolute", inset: 0, opacity: 0.12, backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "54px 54px" }} /></>;
const Header = ({ kicker }) => <div style={{ position: "absolute", top: 58, left: 65, right: 65, display: "flex", alignItems: "center", justifyContent: "space-between" }}><Img src={staticFile("assets/logo-wordmark.webp")} style={{ width: 190, filter: "brightness(0) invert(1)" }} /><span style={{ color: palette.mint, fontSize: 17, letterSpacing: 2, fontWeight: 800 }}>{kicker}</span></div>;

const Opening = ({ data, frame, fps }) => <div style={{ position: "absolute", top: 390, left: 68, right: 68 }}><div style={{ fontSize: 76, lineHeight: 0.98, fontWeight: 900, letterSpacing: -3 }}>{data.hook.map((line, index) => <div key={line} style={{ opacity: inView(frame, fps, index * 16), transform: `translateY(${interpolate(inView(frame, fps, index * 16), [0, 1], [55, 0])}px)`, color: index === 1 ? palette.mint : "white" }}>{line}</div>)}</div><div style={{ marginTop: 55, maxWidth: 820, fontSize: 31, lineHeight: 1.3, color: "#dbeafe", opacity: inView(frame, fps, 62) }}>{data.sub}</div><div style={{ marginTop: 130, borderLeft: `7px solid ${palette.mint}`, paddingLeft: 24, color: "#cbd5e1", fontSize: 26, lineHeight: 1.35, opacity: inView(frame, fps, 84) }}>{data.caption}</div></div>;

const Workspace = ({ data, feature, frame, fps }) => <><div style={{ position: "absolute", top: 250, left: 68, right: 68, fontSize: 52, fontWeight: 900, lineHeight: 1.04 }}>Pas de théorie qui dort.<br /><span style={{ color: palette.mint }}>Une boucle qui répond.</span></div><div style={{ position: "absolute", top: 590, left: 52, right: 52, height: 820, borderRadius: 30, overflow: "hidden", background: palette.panel, border: "1px solid #ffffff2e", boxShadow: "0 40px 80px #0009", opacity: inView(frame, fps, 12), transform: `scale(${interpolate(inView(frame, fps, 12), [0, 1], [0.9, 1])})` }}><Bar label={feature === "projects" ? "projet-final.html" : feature === "sandbox" ? "styles.css" : "index.js"} /><div style={{ display: "grid", gridTemplateColumns: feature === "sandbox" ? "1fr 1fr" : "1fr", height: 600 }}><Code data={data} frame={frame} fps={fps} />{feature === "sandbox" && <PreviewCard frame={frame} fps={fps} />}</div><div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "27px 32px", background: "#073b37", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ color: palette.mint, fontSize: 24, fontWeight: 800 }}>✓ {data.result}</span><span style={{ borderRadius: 12, padding: "13px 18px", color: palette.ink, background: palette.mint, fontSize: 19, fontWeight: 900 }}>{data.action}</span></div></div></>;
const Bar = ({ label }) => <div style={{ height: 65, padding: "0 24px", display: "flex", alignItems: "center", gap: 10, background: "#242540" }}><i style={{ width: 13, height: 13, borderRadius: 99, background: "#fb7185" }} /><i style={{ width: 13, height: 13, borderRadius: 99, background: "#fbbf24" }} /><i style={{ width: 13, height: 13, borderRadius: 99, background: "#34d399" }} /><span style={{ marginLeft: 16, fontSize: 19, color: "#cbd5e1" }}>{label}</span></div>;
const Code = ({ data, frame, fps }) => <div style={{ padding: 32, fontFamily: "monospace", fontSize: 26, lineHeight: 1.85 }}>{data.lines.map(([accent, rest], index) => <div key={`${accent}${rest}`} style={{ opacity: inView(frame, fps, 24 + index * 16), transform: `translateX(${interpolate(inView(frame, fps, 24 + index * 16), [0, 1], [-35, 0])}px)` }}><span style={{ color: palette.cyan }}>{accent}</span><span style={{ color: "#f8fafc" }}>{rest}</span></div>)}<div style={{ marginTop: 35, width: `${clip((frame - 90) / 30) * 100}%`, height: 3, background: palette.mint }} /></div>;
const PreviewCard = ({ frame, fps }) => <div style={{ padding: 26, background: "#f8fafc", color: palette.ink }}><div style={{ color: "#64748b", fontSize: 16, fontWeight: 800 }}>APERÇU LIVE</div><div style={{ marginTop: 38, borderRadius: 25, padding: 25, background: "white", boxShadow: "0 12px 26px #0f172a14", opacity: inView(frame, fps, 62), transform: `translateY(${interpolate(inView(frame, fps, 62), [0, 1], [30, 0])}px)` }}><div style={{ width: 68, height: 68, borderRadius: 18, background: "linear-gradient(135deg, #38bdf8, #6246ea)" }} /><div style={{ marginTop: 18, fontSize: 27, fontWeight: 900 }}>Carte visible</div><div style={{ marginTop: 10, fontSize: 18, color: "#64748b" }}>Le style répond au code.</div><div style={{ marginTop: 20, background: palette.ink, color: "white", padding: "12px 15px", borderRadius: 10, fontSize: 16 }}>Voir le résultat</div></div></div>;

const Proof = ({ data, frame, fps }) => <div style={{ position: "absolute", top: 350, left: 68, right: 68 }}><div style={{ color: palette.mint, fontSize: 23, letterSpacing: 3, fontWeight: 900 }}>LA DIFFERENCE PULSATEACH</div><div style={{ marginTop: 30, fontSize: 64, lineHeight: 1, letterSpacing: -2, fontWeight: 900, opacity: inView(frame, fps, 10) }}>{data.proof}</div><div style={{ marginTop: 90, display: "grid", gap: 20 }}>{[["01", "Lis le besoin"], ["02", "Écris ta solution"], ["03", "Observe une preuve"]].map(([number, label], index) => <div key={number} style={{ display: "flex", alignItems: "center", gap: 26, padding: 24, borderRadius: 22, background: index === 2 ? palette.mint : "#ffffff13", color: index === 2 ? palette.ink : "white", opacity: inView(frame, fps, 38 + index * 16), transform: `translateX(${interpolate(inView(frame, fps, 38 + index * 16), [0, 1], [-80, 0])}px)` }}><span style={{ fontSize: 25, fontWeight: 900 }}>{number}</span><span style={{ fontSize: 29, fontWeight: 800 }}>{label}</span></div>)}</div></div>;
const Close = ({ data, frame, fps }) => <div style={{ position: "absolute", top: 390, left: 68, right: 68, textAlign: "center", opacity: inView(frame, fps, 8), transform: `scale(${interpolate(inView(frame, fps, 8), [0, 1], [0.9, 1])})` }}><Img src={staticFile("assets/logo_horizontale_optimized.webp")} style={{ width: 450, filter: "brightness(0) invert(1)" }} /><div style={{ marginTop: 80, fontSize: 67, lineHeight: 1, fontWeight: 900 }}>{data.cta}</div><div style={{ margin: "60px auto", width: 650, padding: "25px 30px", borderRadius: 20, background: palette.mint, color: palette.ink, fontSize: 29, fontWeight: 900 }}>pulsateach.vercel.app</div><div style={{ color: "#cbd5e1", fontSize: 25 }}>HTML · CSS · projets interactifs</div></div>;
