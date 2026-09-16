import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const COLORS = { ink: "#020617", navy: "#10132c", violet: "#6246ea", purple: "#8b5cf6", cyan: "#38bdf8", mint: "#6ee7b7", paper: "#f8fafc", slate: "#94a3b8" };
const enter = (frame, fps, delay = 0, config = {}) => spring({ frame: frame - delay, fps, config: { damping: 18, mass: 0.8, ...config } });
const reveal = (frame, start, end) => interpolate(frame, [start, end], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

export const PulsaTeachPromo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = Math.floor(frame / 140);
  const sceneProgress = frame % 140;
  const pulse = 1 + Math.sin(frame / 14) * 0.025;

  return <AbsoluteFill style={{ background: COLORS.ink, color: "white", fontFamily: "Arial, Helvetica, sans-serif", overflow: "hidden" }}>
    <Aurora frame={frame} />
    <Brand />
    {scene === 0 && <Hook frame={sceneProgress} fps={fps} />}
    {scene === 1 && <Catalog frame={sceneProgress} fps={fps} />}
    {scene === 2 && <Studio frame={sceneProgress} fps={fps} />}
    {scene === 3 && <Proof frame={sceneProgress} fps={fps} />}
    {scene === 4 && <Learning frame={sceneProgress} fps={fps} />}
    {scene === 5 && <Closing frame={sceneProgress} fps={fps} />}
    <div style={{ position: "absolute", bottom: 74, left: 70, right: 70, display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 2, color: "#cbd5e1" }}>
      <span>pulsateach.vercel.app</span><span style={{ color: COLORS.mint, transform: `scale(${pulse})` }}>● GRATUIT</span>
    </div>
  </AbsoluteFill>;
};

const Aurora = ({ frame }) => <>
  <div style={{ position: "absolute", width: 900, height: 900, borderRadius: 9999, background: "radial-gradient(circle, #6246ea88, transparent 68%)", top: -260 + Math.sin(frame / 45) * 40, right: -330, filter: "blur(16px)" }} />
  <div style={{ position: "absolute", width: 700, height: 700, borderRadius: 9999, background: "radial-gradient(circle, #0284c788, transparent 68%)", bottom: -250 + Math.cos(frame / 55) * 40, left: -280, filter: "blur(16px)" }} />
  <div style={{ position: "absolute", inset: 0, opacity: 0.18, backgroundImage: "linear-gradient(#ffffff14 1px, transparent 1px), linear-gradient(90deg, #ffffff14 1px, transparent 1px)", backgroundSize: "64px 64px", transform: `translateY(${(frame % 64) - 64}px)` }} />
</>;

const Brand = () => <div style={{ position: "absolute", left: 62, top: 62, display: "flex", alignItems: "center", gap: 18 }}><Img src={staticFile("assets/logo-wordmark.webp")} style={{ width: 230, height: "auto", filter: "brightness(0) invert(1)" }} /><span style={{ border: "1px solid #ffffff44", borderRadius: 999, padding: "9px 16px", fontSize: 17, letterSpacing: 2 }}>APPRENDS. PRATIQUE. PROUVE.</span></div>;

const Headline = ({ kicker, title, emphasis, frame, fps }) => {
  const y = interpolate(enter(frame, fps, 2), [0, 1], [50, 0]);
  const opacity = enter(frame, fps, 2);
  return <div style={{ position: "absolute", top: 250, left: 70, right: 70, opacity, transform: `translateY(${y}px)` }}>
    <div style={{ color: COLORS.mint, fontSize: 26, letterSpacing: 4, fontWeight: 800, marginBottom: 28 }}>{kicker}</div>
    <div style={{ fontSize: 82, lineHeight: 0.98, fontWeight: 900, letterSpacing: -3 }}>{title}<br /><span style={{ color: COLORS.mint }}>{emphasis}</span></div>
  </div>;
};

const Hook = ({ frame, fps }) => <>
  <Headline kicker="LE DEV WEB, AUTREMENT" title="Tu n'apprends pas" emphasis="en regardant." frame={frame} fps={fps} />
  <div style={{ position: "absolute", top: 630, left: 70, right: 70, fontSize: 38, lineHeight: 1.22, color: "#dbeafe", opacity: reveal(frame, 35, 58) }}>Tu écris. Tu testes. Tu vois ce qui casse. Puis tu construis quelque chose de réel.</div>
  <CodeWindow frame={frame} fps={fps} />
</>;

const CodeWindow = ({ frame, fps }) => {
  const scale = interpolate(enter(frame, fps, 48), [0, 1], [0.88, 1]);
  return <div style={{ position: "absolute", left: 70, right: 70, top: 920, borderRadius: 34, overflow: "hidden", transform: `scale(${scale})`, boxShadow: "0 34px 100px #0009", border: "1px solid #ffffff2a" }}>
    <div style={{ height: 58, background: "#262642", display: "flex", alignItems: "center", gap: 12, paddingLeft: 24 }}><i style={{ width: 13, height: 13, borderRadius: 99, background: "#fb7185" }} /><i style={{ width: 13, height: 13, borderRadius: 99, background: "#fbbf24" }} /><i style={{ width: 13, height: 13, borderRadius: 99, background: "#34d399" }} /><span style={{ marginLeft: 15, color: "#cbd5e1", fontSize: 20 }}>atelier.html</span></div>
    <div style={{ background: "#11152e", padding: "46px 38px", fontFamily: "monospace", fontSize: 29, lineHeight: 1.65 }}><div><span style={{ color: "#c084fc" }}>&lt;main&gt;</span></div><div style={{ paddingLeft: 30 }}><span style={{ color: "#67e8f9" }}>&lt;h1&gt;</span>Mon premier projet<span style={{ color: "#67e8f9" }}>&lt;/h1&gt;</span></div><div style={{ paddingLeft: 30 }}><span style={{ color: "#c084fc" }}>&lt;button&gt;</span><span style={{ color: "#fde68a" }}>Tester mon code</span><span style={{ color: "#c084fc" }}>&lt;/button&gt;</span></div><div><span style={{ color: "#c084fc" }}>&lt;/main&gt;</span></div></div>
    <div style={{ background: "#063a35", padding: "24px 38px", color: COLORS.mint, fontWeight: 800, fontSize: 25 }}>✓ 3/3 tests réussis · Ton interface fonctionne.</div>
  </div>;
};

const Catalog = ({ frame, fps }) => <>
  <Headline kicker="UN PARCOURS, PAS UN TUNNEL" title="Commence par" emphasis="faire." frame={frame} fps={fps} />
  <Phone frame={frame} fps={fps}><div style={{ padding: 28 }}><div style={{ fontSize: 22, color: COLORS.slate }}>CATALOGUE</div><div style={{ fontSize: 42, fontWeight: 900, margin: "14px 0 24px", color: COLORS.ink }}>Choisis une formation.</div>{[["Poste de travail", "6 leçons", "#dbeafe"], ["HTML interactif", "83 leçons", "#ffedd5"], ["CSS interactif", "123 leçons", "#e0f2fe"]].map(([name, count, bg], index) => <div key={name} style={{ opacity: enter(frame, fps, 18 + index * 13), transform: `translateY(${interpolate(enter(frame, fps, 18 + index * 13), [0, 1], [42, 0])}px)`, background: "white", borderRadius: 22, padding: 21, marginBottom: 16, border: "1px solid #e2e8f0", boxShadow: "0 7px 18px #0f172a0d" }}><div style={{ display: "flex", gap: 16, alignItems: "center" }}><div style={{ width: 48, height: 48, borderRadius: 14, background: bg }} /><div><b style={{ fontSize: 25 }}>{name}</b><div style={{ color: "#64748b", fontSize: 18, marginTop: 4 }}>{count} · projets · quiz</div></div></div></div>)}</div></Phone>
  <Badge frame={frame} delay={78} text="3 FORMATIONS PUBLIQUES" />
</>;

const Studio = ({ frame, fps }) => <>
  <Headline kicker="LA BOUCLE QUI FAIT PROGRESSER" title="Écris." emphasis="Vérifie. Corrige." frame={frame} fps={fps} />
  <div style={{ position: "absolute", top: 700, left: 70, right: 70, display: "grid", gap: 18 }}>
    {["1. Comprendre le besoin", "2. Écrire une solution", "3. Tester un comportement réel"].map((text, index) => <div key={text} style={{ opacity: enter(frame, fps, 20 + index * 18), transform: `translateX(${interpolate(enter(frame, fps, 20 + index * 18), [0, 1], [-70, 0])}px)`, display: "flex", alignItems: "center", gap: 22, borderRadius: 24, padding: 27, background: index === 2 ? COLORS.mint : "#ffffff16", color: index === 2 ? COLORS.ink : "white", fontSize: 32, fontWeight: 800 }}><span style={{ width: 42, height: 42, borderRadius: 99, background: index === 2 ? COLORS.ink : COLORS.violet, color: "white", display: "grid", placeItems: "center", fontSize: 20 }}>✓</span>{text}</div>)}</div>
  <div style={{ position: "absolute", top: 1190, left: 70, right: 70, padding: 34, background: "#11152e", borderRadius: 28, border: "1px solid #ffffff2a", opacity: reveal(frame, 80, 105) }}><div style={{ color: "#94a3b8", fontSize: 22, marginBottom: 16 }}>RÉSULTAT</div><div style={{ fontSize: 42, fontWeight: 900 }}>Tu n'as pas juste la réponse.<br /><span style={{ color: COLORS.mint }}>Tu sais pourquoi elle fonctionne.</span></div></div>
</>;

const Proof = ({ frame, fps }) => <>
  <Headline kicker="DES PREUVES, PAS DES BADGES VIDES" title="Chaque étape" emphasis="laisse une trace." frame={frame} fps={fps} />
  <div style={{ position: "absolute", top: 760, left: 90, right: 90, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>{[["83", "leçons HTML"], ["14", "projets à livrer"], ["3/3", "tests visibles"], ["100%", "à ton rythme"]].map(([metric, label], index) => <div key={metric} style={{ opacity: enter(frame, fps, 16 + index * 11), transform: `scale(${interpolate(enter(frame, fps, 16 + index * 11), [0, 1], [0.72, 1])})`, padding: 30, borderRadius: 28, background: index === 2 ? COLORS.violet : "#ffffff12", border: "1px solid #ffffff20" }}><div style={{ fontSize: 59, fontWeight: 900, color: index === 2 ? "white" : COLORS.mint }}>{metric}</div><div style={{ fontSize: 24, color: "#dbeafe", marginTop: 6 }}>{label}</div></div>)}</div>
  <Badge frame={frame} delay={85} text="PROJETS · QUIZ · CERTIFICATS" />
</>;

const Learning = ({ frame, fps }) => <>
  <Headline kicker="CONSTRUIS POUR DE VRAI" title="Ton code." emphasis="Ton projet. Ton rythme." frame={frame} fps={fps} />
  <div style={{ position: "absolute", top: 750, left: 70, right: 70, padding: 34, borderRadius: 36, background: "linear-gradient(145deg, #ffffff, #dbeafe)", color: COLORS.ink, opacity: enter(frame, fps, 26), transform: `rotate(${interpolate(enter(frame, fps, 26), [0, 1], [-4, 0])}deg)` }}><div style={{ fontSize: 23, color: "#475569", fontWeight: 800 }}>PROJET FINAL</div><div style={{ fontSize: 43, fontWeight: 900, margin: "16px 0" }}>Fiche produit honnête</div><div style={{ height: 205, borderRadius: 22, background: "linear-gradient(135deg, #38bdf8, #6246ea)", position: "relative", overflow: "hidden" }}><div style={{ position: "absolute", width: 200, height: 200, borderRadius: 999, border: "24px solid #fff", right: 70, top: 35, opacity: 0.8 }} /><div style={{ position: "absolute", bottom: 28, left: 28, fontSize: 25, color: "white", fontWeight: 900 }}>HTML sémantique · a11y · tests</div></div><div style={{ marginTop: 22, color: "#475569", fontSize: 24, lineHeight: 1.35 }}>Tu repars avec une réalisation que tu peux expliquer, pas une page copiée.</div></div>
</>;

const Closing = ({ frame, fps }) => <>
  <div style={{ position: "absolute", top: 350, left: 70, right: 70, textAlign: "center", opacity: enter(frame, fps, 10), transform: `scale(${interpolate(enter(frame, fps, 10), [0, 1], [0.92, 1])})` }}><Img src={staticFile("assets/logo_horizontale_optimized.webp")} style={{ width: 470, filter: "brightness(0) invert(1)" }} /><div style={{ marginTop: 70, fontSize: 76, lineHeight: 0.98, fontWeight: 900 }}>Arrête de<br /><span style={{ color: COLORS.mint }}>regarder.</span><br />Commence à faire.</div><div style={{ marginTop: 55, fontSize: 32, color: "#dbeafe" }}>HTML, CSS et projets interactifs.<br />Gratuitement.</div><div style={{ margin: "65px auto 0", width: 590, borderRadius: 22, padding: "28px 36px", background: COLORS.mint, color: COLORS.ink, fontSize: 30, fontWeight: 900 }}>pulsateach.vercel.app</div></div>
</>;

const Phone = ({ children, frame, fps }) => <div style={{ position: "absolute", top: 650, left: 142, width: 796, height: 950, overflow: "hidden", borderRadius: 54, background: "#f8fafc", color: COLORS.ink, border: "14px solid #111827", boxShadow: "0 42px 100px #000b", transform: `perspective(1400px) rotateY(${interpolate(enter(frame, fps, 25), [0, 1], [-14, 0])}deg) rotateX(${interpolate(enter(frame, fps, 25), [0, 1], [7, 0])}deg)` }}>{children}</div>;
const Badge = ({ frame, delay, text }) => <div style={{ position: "absolute", top: 1640, left: 70, right: 70, textAlign: "center", opacity: reveal(frame, delay, delay + 18), transform: `translateY(${interpolate(reveal(frame, delay, delay + 18), [0, 1], [24, 0])}px)`, color: COLORS.mint, fontSize: 24, letterSpacing: 3, fontWeight: 800 }}>{text}</div>;
