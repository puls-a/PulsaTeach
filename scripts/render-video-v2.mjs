import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { spawnSync } from 'node:child_process';

const root = path.resolve('video/v2/public');
const output = path.resolve('docs/media/v2');
const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
const args = process.argv.slice(2);
const selected = args.filter(a => !a.startsWith('--'));
const stories = Object.values(manifest).filter(s => !selected.length || selected.includes(s.key));
for (const dir of [output, path.join(output, 'checks'), path.join(root, 'audio')]) await mkdir(dir, { recursive: true });
for (const story of stories) { await soundtrack(story); if (story.vertical) await soundtrack(story.vertical); }
const serveUrl = await bundle({ entryPoint: path.resolve('video/v2/index.jsx'), publicDir: root });
for (const story of stories) {
  for (const vertical of args.includes('--both') ? [false, true] : [args.includes('--vertical')]) {
    const take = vertical ? story.vertical : story;
    if (!take) throw new Error(`Missing vertical capture for ${story.key}`);
    const id = `V2${story.id}${vertical ? 'Vertical' : ''}`;
    const composition = await selectComposition({ serveUrl, id });
    const name = `${story.key}${vertical ? '-vertical' : ''}`;
    if (args.includes('--stills')) {
      await renderStill({ serveUrl, composition, frame: 48 + take.frames - 12, output: path.join(output, 'checks', `${name}.png`), imageFormat: 'png' });
      console.log(`STILL ${name}`); continue;
    }
    const target = path.join(output, `${name}.mp4`);
    await renderMedia({ serveUrl, composition, codec: 'h264', audioCodec: 'aac', crf: 17, pixelFormat: 'yuv420p', outputLocation: target, concurrency: 2 });
    const probe = spawnSync(path.resolve('node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe'), ['-v', 'error', '-show_entries', 'format=duration,size:stream=codec_name,width,height,r_frame_rate', '-of', 'json', target], { encoding: 'utf8' });
    if (probe.status !== 0) throw new Error(probe.stderr);
    const meta = JSON.parse(probe.stdout);
    if (!meta.streams.some(s => s.codec_name === 'h264' && s.width === composition.width && s.height === composition.height) || !meta.streams.some(s => s.codec_name === 'aac') || Math.abs(Number(meta.format.duration) - composition.durationInFrames / 30) > 0.15) throw new Error(`Invalid export: ${name}`);
    await writeFile(path.join(output, 'checks', `${name}.json`), JSON.stringify(meta, null, 2));
    await writeFile(path.join(output, `${name}.srt`), subtitles(take));
    console.log(`VERIFIED ${name}: ${Number(meta.format.duration).toFixed(1)}s, ${composition.width}x${composition.height}, H.264 + AAC`);
  }
}
if (!args.includes('--stills')) {
  const cards = Object.values(manifest).map(s => `<article><h2>${s.title}</h2><p>${s.subtitle}</p><video controls preload="metadata" src="${s.key}.mp4"></video><p><a href="${s.key}.mp4">Ouvrir le master</a> · <a href="${s.key}-vertical.mp4">Version verticale</a></p><small>${s.proof}</small></article>`).join('\n');
  await writeFile(path.join(output, 'index.html'), `<!doctype html><html lang="fr"><meta charset="utf-8"><title>PulsaTeach — V2 en action</title><style>body{background:#080c15;color:#f4f6fc;font:16px system-ui;margin:40px}h1{font-size:44px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(440px,1fr));gap:25px}article{background:#141c2a;border:1px solid #2d3b53;border-radius:18px;padding:24px}video{width:100%;background:#000}a{color:#b7a6ff}p,small{color:#bec9da}small{line-height:1.6}</style><h1>PulsaTeach — V2 en action</h1><p>Vraies interactions. Cadrage stable. Active le son. Les masters horizontaux privilégient la lecture du code.</p><main>${cards}</main></html>`);
}

function subtitles(story) {
  const cues = [{ at: 0, text: `${story.title}\n${story.subtitle}` }, ...story.markers.map(m => ({ at: m.at + 48, text: m.text })), { at: story.frames + 48, text: 'Passe à la pratique.\npulsateach.vercel.app' }];
  const time = frame => { const ms = Math.round(frame / 30 * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2, '0')}:${String(Math.floor(ms / 60000) % 60).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };
  return cues.map((c, i) => `${i + 1}\n${time(c.at)} --> ${time(cues[i + 1]?.at ?? story.frames + 132)}\n${c.text}\n`).join('\n');
}

async function soundtrack(story) {
  // Original restrained electronic bed. Fade out; no external music or voice clone.
  const seconds = (story.frames + 132) / 30;
  const rate = 44100, samples = Math.ceil(seconds * rate);
  const wav = Buffer.alloc(44 + samples * 2);
  wav.write('RIFF'); wav.writeUInt32LE(wav.length - 8, 4); wav.write('WAVEfmt ', 8); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(1, 22); wav.writeUInt32LE(rate, 24); wav.writeUInt32LE(rate * 2, 28); wav.writeUInt16LE(2, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(samples * 2, 40);
  for (let i = 0; i < samples; i++) {
    const t = i / rate, beat = t % 0.625;
    const kick = Math.sin(2 * Math.PI * (48 * beat + 3 * (1 - Math.exp(-beat * 28)))) * Math.exp(-beat * 19) * 0.26;
    const chord = [[130.81, 164.81, 196], [110, 130.81, 164.81], [87.31, 110, 130.81], [98, 123.47, 146.83]][Math.floor(t / 5) % 4];
    const pad = chord.reduce((v, hz) => v + Math.sin(2 * Math.PI * hz * t) * 0.038, 0) * (0.8 + Math.sin(t * 0.7) * 0.2);
    const note = chord[Math.floor(t / 0.625) % 3] * 4;
    const bell = (Math.sin(t * note * 2 * Math.PI) + Math.sin(t * note * 4 * Math.PI) * 0.25) * Math.exp(-beat * 8) * 0.035;
    const fade = Math.min(1, t / 0.6, (seconds - t) / 1.4);
    wav.writeInt16LE(Math.round((kick + pad + bell) * fade * 28000), 44 + i * 2);
  }
  await writeFile(path.join(root, 'audio', `${story.key}.wav`), wav);
}
