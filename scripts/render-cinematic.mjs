import { mkdir, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { cinematicStories } from '../video/cinematicStories.js';

// Original synthesized soundtrack: 100 BPM pulse, harmonic bed and transition sweeps.
await mkdir('public/video-captures', { recursive: true });
await mkdir('docs/media', { recursive: true });
const rate = 44100;
const samples = rate * 18;
const wav = Buffer.alloc(44 + samples * 2);
wav.write('RIFF'); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8);
wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22);
wav.writeUInt32LE(rate, 24); wav.writeUInt32LE(rate * 2, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34);
wav.write('data', 36); wav.writeUInt32LE(samples * 2, 40);
for (let i = 0; i < samples; i++) {
  const t = i / rate;
  const beat = t % 0.6;
  const kick = Math.sin(2 * Math.PI * (48 * beat + 7 * (1 - Math.exp(-beat * 35)))) * Math.exp(-beat * 16) * 0.45;
  const pad = [130.81, 196, 261.63].reduce((v, hz) => v + Math.sin(t * hz * 2 * Math.PI) * 0.035, 0);
  const arp = Math.sin(t * [523.25, 659.25, 783.99, 987.77][Math.floor(t / 0.3) % 4] * 2 * Math.PI) * Math.exp(-(t % 0.3) * 18) * 0.07;
  const sweep = [3, 8, 13].reduce((v, cut) => { const d = t - cut; return v + (Math.abs(d) < 0.3 ? Math.sin(2 * Math.PI * (1800 * d + 2400 * d * d)) * (1 - Math.abs(d) / 0.3) * 0.09 : 0); }, 0);
  const fade = Math.min(1, t * 5, (18 - t) * 2);
  wav.writeInt16LE(Math.round((kick + pad + arp + sweep) * fade * 28000), 44 + i * 2);
}
await writeFile('public/video-captures/pulse.wav', wav);
if (!process.argv.includes('--audio-only')) {
  const selected = process.argv.slice(2);
  for (const story of cinematicStories.filter(s => !selected.length || selected.includes(s.id))) {
    const result = spawnSync(process.execPath, ['node_modules/@remotion/cli/remotion-cli.js', 'render', 'video/index.jsx', `Cinema${story.id}`, `docs/media/pulsateach-cinema-${story.capture}.mp4`, '--concurrency=2'], { stdio: 'inherit' });
    if (result.status !== 0) process.exit(result.status || 1);
  }
}
