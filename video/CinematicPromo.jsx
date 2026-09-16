import { AbsoluteFill, Audio, Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';

const move = (f, from, to, a = 0, b = 1) => interpolate(f, [from, to], [a, b], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.22, 1, 0.36, 1) });
const label = { fontSize: 21, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase' };

export const CinematicPromo = ({ story }) => {
  const f = useCurrentFrame();
  const scene = f < 90 ? 0 : f < 240 ? 1 : f < 390 ? 2 : 3;
  const local = f - [0, 90, 240, 390][scene];
  const entrance = move(local, 0, 28);
  const shot = scene === 2 ? `${story.capture}-detail` : story.capture;
  const zoom = scene === 2 ? move(local, 0, 150, 1.12, 1.26) : move(local, 0, 150, 1, 1.06);
  return <AbsoluteFill style={{ background: '#08090f', color: '#f7f7fb', fontFamily: 'Arial, Helvetica, sans-serif', overflow: 'hidden' }}>
    <Audio src={staticFile('video-captures/pulse.wav')} volume={0.5} />
    <div style={{ position: 'absolute', inset: -500, background: `radial-gradient(ellipse at ${40 + Math.sin(f / 90) * 20}% 40%, ${story.accent}35, transparent 55%)`, transform: `rotate(${f / 12}deg)` }} />
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#ffffff06 1px, transparent 1px),linear-gradient(90deg,#ffffff06 1px,transparent 1px)', backgroundSize: '90px 90px', maskImage: 'linear-gradient(transparent,black)' }} />
    <div style={{ position: 'absolute', top: 92, left: 74, right: 74, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Img src={staticFile('assets/logo-wordmark.webp')} style={{ width: 240, filter: 'brightness(0) invert(1)' }} />
      <span style={{ ...label, color: story.accent }}>EN PRATIQUE</span>
    </div>
    {scene === 0 && <>
      <div style={{ position: 'absolute', width: 1250, top: 870, left: -85, opacity: 0.32, transform: `perspective(1800px) rotateX(22deg) rotateY(-12deg) translateY(${move(local, 0, 90, 100, -40)}px)` }}><Img src={staticFile(`video-captures/${story.capture}.png`)} style={{ width: '100%', borderRadius: 24 }} /></div>
      <div style={{ position: 'absolute', left: 74, right: 74, top: 380 }}>
        <div style={{ ...label, color: story.accent, opacity: entrance }}>{story.title}</div>
        {story.hook.map((line, i) => <div key={line} style={{ fontSize: 100, fontWeight: 900, letterSpacing: -6, lineHeight: 1.04, marginTop: 20, opacity: move(local, i * 10, 25 + i * 10), transform: `translateY(${move(local, i * 10, 25 + i * 10, 90, 0)}px)`, color: i ? story.accent : 'white' }}>{line}</div>)}
      </div>
    </>}
    {(scene === 1 || scene === 2) && <>
      <div style={{ position: 'absolute', left: 74, right: 74, top: 275, opacity: entrance, transform: `translateY(${(1 - entrance) * 40}px)` }}>
        <div style={{ ...label, color: story.accent }}>0{scene} / {scene === 1 ? 'DÉCOUVRIR' : 'PASSER À L’ACTION'}</div>
        <div style={{ fontSize: 76, lineHeight: 1.07, fontWeight: 900, letterSpacing: -3, marginTop: 30 }}>{story.beats[scene - 1]}</div>
      </div>
      <div style={{ position: 'absolute', left: 48, right: 48, top: 640, height: 850, borderRadius: 30, overflow: 'hidden', border: `1px solid ${story.accent}66`, boxShadow: `0 50px 120px #000b, 0 0 100px ${story.accent}18`, transform: `perspective(2000px) rotateY(${scene === 1 ? move(local, 0, 100, -10, 0) : 0}deg) translateY(${(1 - entrance) * 120}px)`, background: '#f1f5f9' }}>
        <div style={{ height: 50, background: '#191b26', display: 'flex', alignItems: 'center', padding: '0 25px', gap: 10 }}><span style={{ color: story.accent }}>● ● ●</span><span style={{ marginLeft: 25, color: '#b9bdce', fontSize: 18 }}>pulsateach / {story.capture}</span></div>
        <div style={{ height: 800, overflow: 'hidden' }}><Img src={staticFile(`video-captures/${shot}.png`)} style={{ width: '100%', transform: `scale(${zoom}) translateY(${scene === 2 ? -55 : 0}px)`, transformOrigin: '50% 30%' }} /></div>
      </div>
      <div style={{ position: 'absolute', top: 1560, left: 74, display: 'flex', gap: 18, alignItems: 'center', opacity: entrance }}><span style={{ width: 10, height: 10, background: story.accent, borderRadius: '50%' }} /><span style={{ fontSize: 23, color: '#b9bdce' }}>Capturé dans PulsaTeach</span></div>
    </>}
    {scene === 3 && <div style={{ position: 'absolute', top: 400, left: 74, right: 74, transform: `scale(${move(local, 0, 45, 0.9, 1)})`, opacity: entrance }}>
      <div style={{ ...label, color: story.accent }}>{story.title}</div>
      <div style={{ fontSize: 116, fontWeight: 900, lineHeight: 0.98, letterSpacing: -7, marginTop: 55 }}>À toi<br />de <span style={{ color: story.accent }}>jouer.</span></div>
      <div style={{ marginTop: 90, padding: '32px 35px', borderRadius: 22, background: story.accent, color: '#08090f', fontSize: 36, fontWeight: 800, display: 'flex', justifyContent: 'space-between' }}><span>pulsateach.vercel.app</span><span>↗</span></div>
      <div style={{ marginTop: 35, fontSize: 26, color: '#b9bdce' }}>Apprends. Pratique. Construis.</div>
    </div>}
    <div style={{ position: 'absolute', inset: 0, background: story.accent, opacity: local < 8 && scene > 0 ? move(local, 0, 8, 0.25, 0) : 0, pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: 180, left: 74, right: 74, height: 2, background: '#ffffff20' }}><div style={{ width: `${f / 539 * 100}%`, height: '100%', background: story.accent }} /></div>
    <div style={{ position: 'absolute', bottom: 125, left: 74, right: 74, display: 'flex', justifyContent: 'space-between', ...label, fontSize: 16, color: '#b9bdce' }}><span>PULSATEACH — {story.id}</span><span>APPRENDS EN FAISANT</span></div>
  </AbsoluteFill>;
};
