import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';

const root = path.resolve('video/v2/public');
const output = path.resolve('docs/media/reels-v3');
const manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8'));
const selected = process.argv.slice(2).filter((argument) => !argument.startsWith('--'));
const stories = Object.values(manifest).filter((story) => story.vertical && (!selected.length || selected.includes(story.key)));
await mkdir(output, { recursive: true });
await mkdir(path.join(output, 'checks'), { recursive: true });
await copyFile('public/video-captures/pulse.wav', path.join(root, 'reel.wav'));
const serveUrl = await bundle({ entryPoint: path.resolve('video/v2/index.jsx'), publicDir: root });
const ffprobe = path.resolve('node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe');

for (const story of stories) {
  const composition = await selectComposition({ serveUrl, id: `ReelV3${story.id}` });
  const target = path.join(output, `${story.key}-vertical.mp4`);
  await renderMedia({ serveUrl, composition, codec: 'h264', audioCodec: 'aac', crf: 17, pixelFormat: 'yuv420p', outputLocation: target, concurrency: 2 });
  await renderStill({ serveUrl, composition, frame: 12, output: path.join(output, 'checks', `${story.key}-cover.png`), imageFormat: 'png' });
  await renderStill({ serveUrl, composition, frame: Math.floor(composition.durationInFrames / 2), output: path.join(output, 'checks', `${story.key}-demo.png`), imageFormat: 'png' });
  await renderStill({ serveUrl, composition, frame: composition.durationInFrames - 12, output: path.join(output, 'checks', `${story.key}-cta.png`), imageFormat: 'png' });
  const probe = spawnSync(ffprobe, ['-v', 'error', '-show_entries', 'format=duration,size:stream=codec_name,width,height', '-of', 'json', target], { encoding: 'utf8' });
  if (probe.status !== 0) throw new Error(probe.stderr);
  const metadata = JSON.parse(probe.stdout);
  const validVideo = metadata.streams.some((stream) => stream.codec_name === 'h264' && stream.width === 1080 && stream.height === 1920);
  const validAudio = metadata.streams.some((stream) => stream.codec_name === 'aac');
  const duration = Number(metadata.format.duration);
  if (!validVideo || !validAudio || duration < 10 || duration > 19) throw new Error(`Invalid Reel V3 export: ${story.key}`);
  await writeFile(path.join(output, 'checks', `${story.key}.json`), JSON.stringify(metadata, null, 2));
  console.log(`VERIFIED Reel V3 ${story.key}: ${duration.toFixed(1)}s, 1080x1920, H.264 + AAC`);
}
