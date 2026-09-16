import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { reelCopy } from './reelCopy.js';

export const REEL_HOOK = 36;
export const REEL_CTA = 54;

export function reelDemoFrames(story) {
  return Math.max(240, Math.min(450, Math.round(story.frames / 1.8)));
}

const enter = (frame, from = 0, duration = 10) => interpolate(frame, [from, from + duration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

export function ReelV3({ story }) {
  const frame = useCurrentFrame();
  const copy = reelCopy[story.key.replace('-vertical', '')];
  const demoFrames = reelDemoFrames(story);
  const demoFrame = Math.max(0, frame - REEL_HOOK);
  const sourceFrame = demoFrame * story.frames / demoFrames;
  const marker = [...story.markers].reverse().find((item) => item.at <= sourceFrame) || story.markers[0];
  const markerIndex = story.markers.indexOf(marker);
  const ctaStart = REEL_HOOK + demoFrames;
  const inHook = frame < REEL_HOOK;
  const inDemo = frame >= REEL_HOOK && frame < ctaStart;
  const accent = story.accent;

  return <AbsoluteFill style={{ background: '#070a12', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif', overflow: 'hidden' }}>
    <Audio src={staticFile('reel.wav')} volume={0.72} />
    <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 15% 10%, ${accent}30, transparent 42%), linear-gradient(180deg, #070a12, #0d1322)` }} />

    {inHook && <>
      <OffthreadVideo src={staticFile(`clips/${story.key}.mp4`)} muted trimBefore={Math.max(0, story.frames - 110)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, filter: 'blur(1px) saturate(1.15)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#070a1266 0%,#070a12dd 68%,#070a12 100%)' }} />
      <div style={{ position: 'absolute', left: 58, right: 58, top: 310, transform: `translateY(${(1 - enter(frame)) * 70}px)`, opacity: enter(frame) }}>
        <div style={{ color: accent, fontSize: 24, fontWeight: 900, letterSpacing: 4 }}>ARRÊTE DE SCROLLER</div>
        <div style={{ marginTop: 28, fontSize: 92, lineHeight: 0.98, letterSpacing: -5, fontWeight: 950 }}>{copy.hook}</div>
        <div style={{ display: 'inline-block', marginTop: 45, padding: '18px 24px', borderRadius: 16, background: accent, color: '#070a12', fontSize: 30, fontWeight: 900 }}>Regarde le résultat ↓</div>
      </div>
    </>}

    {inDemo && <>
      <div style={{ position: 'absolute', left: 46, right: 46, top: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Img src={staticFile('logo.webp')} style={{ width: 205, filter: 'brightness(0) invert(1)' }} />
        <span style={{ color: accent, fontSize: 18, fontWeight: 900, letterSpacing: 3 }}>DÉMO RÉELLE · x{(story.frames / demoFrames).toFixed(1)}</span>
      </div>
      <div style={{ position: 'absolute', left: 0, top: 150, width: 1080, height: 1440, overflow: 'hidden', background: '#eef2f6', boxShadow: '0 30px 100px #000c' }}>
        <OffthreadVideo src={staticFile(`clips/${story.key}.mp4`)} muted playbackRate={story.frames / demoFrames} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, minHeight: 310, padding: '125px 55px 48px', background: 'linear-gradient(transparent, #070a12ee 42%, #070a12)' }}>
          <div key={marker.at} style={{ opacity: enter(sourceFrame - marker.at, 0, 7), fontSize: 43, lineHeight: 1.14, letterSpacing: -1.2, fontWeight: 900 }}>{marker.text}</div>
          <div style={{ display: 'flex', gap: 9, marginTop: 28 }}>{story.markers.map((item, index) => <span key={item.at} style={{ height: 7, flex: 1, borderRadius: 9, background: index <= markerIndex ? accent : '#ffffff35' }} />)}</div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 44, right: 44, bottom: 65, display: 'flex', justifyContent: 'space-between', color: '#aeb9cd', fontSize: 18, fontWeight: 800 }}><span>ACTIONS RÉELLES</span><span>{markerIndex + 1}/{story.markers.length}</span></div>
    </>}

    {frame >= ctaStart && <div style={{ position: 'absolute', left: 58, right: 58, top: 360, opacity: enter(frame - ctaStart), transform: `scale(${interpolate(enter(frame - ctaStart), [0, 1], [0.92, 1])})` }}>
      <div style={{ color: accent, fontSize: 25, fontWeight: 900, letterSpacing: 4 }}>PREUVE OBTENUE</div>
      <div style={{ marginTop: 34, fontSize: 94, lineHeight: 1.01, letterSpacing: -5, fontWeight: 950 }}>{copy.payoff}</div>
      <div style={{ marginTop: 74, borderRadius: 22, background: accent, color: '#070a12', padding: '28px 32px', fontSize: 34, fontWeight: 950, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>{copy.cta}</span><span>↗</span></div>
      <div style={{ marginTop: 28, fontSize: 26, color: '#c5cede', fontWeight: 700 }}>pulsateach.vercel.app · gratuit</div>
    </div>}
  </AbsoluteFill>;
}
