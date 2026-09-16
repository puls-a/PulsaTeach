import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

export const INTRO = 48;
export const OUTRO = 84;
const ease = (f, a, b) => interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.2, 0.8, 0.2, 1) });

export function RealDemo({ story }) {
  const f = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const end = INTRO + story.frames;
  const inDemo = f >= INTRO && f < end;
  const local = Math.max(0, f - INTRO);
  const current = [...story.markers].reverse().find(m => m.at <= local) || story.markers[0];
  const index = story.markers.indexOf(current);
  const accent = story.accent;
  const screen = portrait ? { left: 48, top: 270, width: 984, height: 984 * story.sourceHeight / story.sourceWidth } : { left: 486, top: 48, width: 1386, height: 990 };
  return <AbsoluteFill style={{ background: '#080c15', color: '#f5f7fc', fontFamily: 'Arial, Helvetica, sans-serif' }}>
    <Audio src={staticFile(`audio/${story.key}.wav`)} volume={0.35} />
    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 0% 0%, ${accent}20, transparent 65%)` }} />
    <div style={{ position: 'absolute', left: portrait ? 56 : 52, top: portrait ? 50 : 55 }}><Img src={staticFile('logo.webp')} style={{ width: 230, filter: 'brightness(0) invert(1)' }} /></div>
    {inDemo && <>
      <div style={{ position: 'absolute', left: portrait ? 56 : 52, top: portrait ? 135 : 178, width: portrait ? 968 : 386 }}>
        <div style={{ fontSize: portrait ? 18 : 16, letterSpacing: 3, color: accent, fontWeight: 800 }}>{story.key.replace('-vertical', '').toUpperCase()} / DÉMO RÉELLE</div>
        <div style={{ fontWeight: 800, fontSize: portrait ? 52 : 53, lineHeight: 1.08, letterSpacing: -2, marginTop: 22 }}>{story.title}</div>
        {!portrait && <div style={{ color: '#aeb9cd', fontSize: 22, lineHeight: 1.5, marginTop: 25 }}>{story.subtitle}</div>}
      </div>
      <Sequence from={INTRO} durationInFrames={story.frames} layout="none">
        <div style={{ position: 'absolute', ...screen, background: '#eef2f6', boxShadow: '0 24px 90px #0009', outline: '1px solid #ffffff25' }}>
          <OffthreadVideo src={staticFile(`clips/${story.key}.mp4`)} muted style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
        </div>
      </Sequence>
      <div style={{ position: 'absolute', left: portrait ? 56 : 52, top: portrait ? 1625 : 575, width: portrait ? 968 : 376 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 17 }}>
          <span style={{ width: 45, height: 45, display: 'grid', placeItems: 'center', background: accent, color: '#080c15', fontSize: 23, fontWeight: 900, borderRadius: 12 }}>{current.number}</span>
          <span style={{ fontSize: portrait ? 18 : 16, letterSpacing: 2, color: '#aeb9cd' }}>ÉTAPE {index + 1} SUR {story.markers.length}</span>
        </div>
        <div key={current.at} style={{ marginTop: portrait ? 18 : 25, fontSize: portrait ? 30 : 28, lineHeight: 1.4, fontWeight: 600, opacity: ease(local - current.at, 0, 7) }}>{current.text}</div>
        <div style={{ display: 'flex', gap: 10, marginTop: portrait ? 20 : 38 }}>{story.markers.map((m, i) => <div key={m.at} style={{ height: 4, flex: 1, background: i <= index ? accent : '#253047' }} />)}</div>
      </div>
      <div style={{ position: 'absolute', left: portrait ? 56 : 52, bottom: portrait ? 40 : 47, width: portrait ? 960 : 380, color: '#aeb9cd', fontSize: 16, lineHeight: 1.6 }}>{story.demo ? 'Exercice de démonstration • actions réelles' : 'Interface réelle • actions enregistrées'}<br />pulsateach.vercel.app</div>
    </>}
    {!inDemo && <div style={{ position: 'absolute', left: portrait ? 64 : 100, right: portrait ? 64 : 100, top: portrait ? 480 : 300, opacity: ease(f < INTRO ? f : f - end, 0, 12) }}>
      <div style={{ fontSize: portrait ? 24 : 20, letterSpacing: 4, color: accent, fontWeight: 800 }}>{f < INTRO ? 'PULSATEACH / EN ACTION' : 'À TON TOUR'}</div>
      <div style={{ fontSize: portrait ? 91 : 102, lineHeight: 1.06, letterSpacing: -4, fontWeight: 900, marginTop: 30, maxWidth: portrait ? 950 : 1650 }}>{f < INTRO ? story.title : 'Passe à la pratique.'}</div>
      <div style={{ marginTop: 40, maxWidth: 1100, fontSize: portrait ? 33 : 32, lineHeight: 1.45, color: '#bdc9dc' }}>{f < INTRO ? story.subtitle : 'pulsateach.vercel.app'}</div>
      {f >= end && <div style={{ display: 'inline-block', marginTop: 65, background: accent, color: '#080c15', padding: '23px 35px', fontWeight: 800, fontSize: 27, borderRadius: 14 }}>Essaie par toi-même ↗</div>}
    </div>}
  </AbsoluteFill>;
}
