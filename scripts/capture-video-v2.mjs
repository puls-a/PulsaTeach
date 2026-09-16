import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';
import { stories, prepareScene, performScene } from './video-v2-scenarios.mjs';

const root = path.resolve('video/v2/public');
const bin = path.resolve('node_modules/@remotion/compositor-win32-x64-msvc');
for (const dir of ['raw', 'clips', 'checks']) await mkdir(path.join(root, dir), { recursive: true });
await copyFile('public/assets/logo-wordmark.webp', path.join(root, 'logo.webp'));
Object.assign(process.env, { NODE_ENV: 'test', PULSATEACH_STORAGE: 'json', PULSATEACH_ALLOW_LOCAL_IDENTITY: 'true', PULSATEACH_LOG_LEVEL: 'silent', PULSATEACH_ALLOWED_ORIGINS: 'http://127.0.0.1:5196', VITE_AUTH_MODE: 'local', VITE_API_URL: 'http://127.0.0.1:4196' });
const { default: app } = await import('../server/index.js');
const api = await new Promise((resolve, reject) => { const s = app.listen(4196, '127.0.0.1', () => resolve(s)); s.once('error', reject); });
const vite = await createServer({ define: { 'import.meta.env.VITE_AUTH_MODE': JSON.stringify('local'), 'import.meta.env.VITE_API_URL': JSON.stringify('') }, server: { host: '127.0.0.1', port: 5196, strictPort: true, proxy: { '/api': { target: 'http://127.0.0.1:4196', changeOrigin: true } } } });
await vite.listen();
const browser = await chromium.launch();
const vertical = process.argv.includes('--vertical');
const selected = process.argv.slice(2).filter(a => !a.startsWith('--'));
let manifest = {};
try { manifest = JSON.parse(await readFile(path.join(root, 'manifest.json'), 'utf8')); } catch { /* First capture. */ }
try {
  for (const story of stories.filter(s => !selected.length || selected.includes(s.key))) {
    const viewport = vertical ? { width: 864, height: 1152 } : { width: 1344, height: 960 };
    const captureKey = `${story.key}${vertical ? '-vertical' : ''}`;
    const context = await browser.newContext({ viewport, recordVideo: { dir: path.join(root, 'raw'), size: viewport } });
    const p = await context.newPage();
    p.setDefaultTimeout(20000);
    const errors = [];
    p.on('pageerror', error => errors.push(error.message));
    try {
      const warmRoute = { catalog: '/formations/html', path: '/learn/tools/tools-setup/tools-01-vscode', dashboard: '/learn/tools/tools-setup/tools-01-vscode', home: '/catalog' }[story.key];
      if (warmRoute) {
        await p.goto(`http://127.0.0.1:5196${warmRoute}`, { waitUntil: 'networkidle', timeout: 90000 });
        await p.getByRole('heading').first().waitFor();
        await p.waitForTimeout(1000);
      }
      await p.goto(`http://127.0.0.1:5196${story.route}`, { waitUntil: 'networkidle', timeout: 90000 });
      await prepareScene(story, p);
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(900);
      // A visible cursor is editorial guidance only; app controls and results are untouched.
      await p.addInitScript(installCursor);
      await p.evaluate(installCursor);
      const markers = [];
      const start = performance.now();
      const hold = ms => p.waitForTimeout(ms);
      const step = async (number, text) => { markers.push({ at: Math.round((performance.now() - start) / 1000 * 30), number, text }); };
      const click = async locator => {
        await locator.scrollIntoViewIfNeeded(); await hold(350);
        const box = await locator.boundingBox();
        if (!box) throw new Error('Invisible action target');
        await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 24 });
        await hold(400); await locator.click(); await hold(350);
      };
      const type = async (locator, text, delay = 75) => { await click(locator); await locator.press('Control+A'); await locator.pressSequentially(text, { delay }); await hold(500); };
      const frame = async name => p.screenshot({ path: path.join(root, 'checks', `${captureKey}-${name}.png`) });
      const focus = async locator => { await locator.evaluate(el => window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 120), behavior: 'smooth' })); await hold(700); };
      await frame('start');
      const proof = await performScene(story, { page: p, step, click, type, hold, frame, vertical, focus });
      await hold(800);
      const elapsed = (performance.now() - start) / 1000;
      const video = p.video();
      await context.close();
      const raw = await video.path();
      const probe = spawnSync(path.join(bin, 'ffprobe.exe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'json', raw], { encoding: 'utf8' });
      if (probe.status !== 0) throw new Error(probe.stderr);
      const duration = Number(JSON.parse(probe.stdout).format.duration);
      const trim = Math.max(0, duration - elapsed);
      const target = path.join(root, 'clips', `${captureKey}.mp4`);
      const encoded = spawnSync(path.join(bin, 'ffmpeg.exe'), ['-hide_banner', '-loglevel', 'error', '-y', '-ss', String(trim), '-i', raw, '-t', String(elapsed), '-an', '-r', '30', '-c:v', 'libx264', '-crf', '16', '-pix_fmt', 'yuv420p', target], { encoding: 'utf8' });
      if (encoded.status !== 0) throw new Error(encoded.stderr);
      if (errors.length) throw new Error(errors.join('\n'));
      const captured = { ...story, key: captureKey, frames: Math.floor(elapsed * 30), markers, proof, capturedAt: new Date().toISOString(), sourceWidth: viewport.width, sourceHeight: viewport.height };
      manifest[story.key] = vertical ? { ...manifest[story.key], vertical: captured } : { ...captured, ...(manifest[story.key]?.vertical ? { vertical: manifest[story.key].vertical } : {}) };
      await writeFile(path.join(root, 'manifest.json'), JSON.stringify(manifest, null, 2));
      console.log(`OK ${captureKey}: ${elapsed.toFixed(1)}s — ${proof}`);
    } catch (error) {
      if (!p.isClosed()) await p.screenshot({ path: path.join(root, 'checks', `${captureKey}-FAILED.png`) }).catch(() => {});
      await context.close();
      throw error;
    }
  }
} finally {
  await browser.close(); await vite.close(); api.closeAllConnections?.(); await new Promise(resolve => api.close(resolve));
}

function installCursor() {
  if (window.top !== window) return;
  if (!document.body) { document.addEventListener('DOMContentLoaded', installCursor, { once: true }); return; }
  if (document.getElementById('video-cursor')) return;
  const cursor = document.createElement('div'); cursor.id = 'video-cursor';
  cursor.style.cssText = 'position:fixed;left:-100px;top:-100px;width:22px;height:22px;border:3px solid white;border-radius:50%;background:#6d4affbb;box-shadow:0 0 0 5px #6d4aff40,0 2px 10px #0008;pointer-events:none;z-index:2147483647;transform:translate(-50%,-50%)';
  document.body.append(cursor);
  document.addEventListener('mousemove', e => { cursor.style.left = `${e.clientX}px`; cursor.style.top = `${e.clientY}px`; });
  document.addEventListener('mousedown', () => cursor.animate([{ boxShadow: '0 0 0 5px #a99bffbb' }, { boxShadow: '0 0 0 30px #a99bff00' }], { duration: 450 }));
}
