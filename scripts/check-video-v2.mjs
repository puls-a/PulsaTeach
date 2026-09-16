import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium, expect } from '@playwright/test';

const output = path.resolve('docs/media/v2');
const manifest = JSON.parse(await readFile('video/v2/public/manifest.json', 'utf8'));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1100 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(pathToFileURL(path.join(output, 'index.html')).href);
  const report = [];
  for (const story of Object.values(manifest)) {
    const video = page.locator('article').filter({ has: page.getByRole('heading', { name: story.title, exact: true }) }).locator('video');
    for (const vertical of [false, true]) {
      const name = `${story.key}${vertical ? '-vertical' : ''}`;
      const take = vertical ? story.vertical : story;
      await video.evaluate((el, source) => { el.src = source; el.load(); }, `${name}.mp4`);
      await expect.poll(() => video.evaluate(el => el.readyState), { timeout: 15000 }).toBeGreaterThanOrEqual(2);
      const result = await video.evaluate(el => ({ width: el.videoWidth, height: el.videoHeight, duration: el.duration, error: el.error?.message }));
      expect(result.error).toBeUndefined();
      expect(result.width).toBe(vertical ? 1080 : 1920);
      expect(result.height).toBe(vertical ? 1920 : 1080);
      expect(Math.abs(result.duration - (take.frames + 132) / 30)).toBeLessThan(0.15);
      // Decode the middle and the final demonstration image from the actual export.
      for (const t of [(take.frames / 2 + 48) / 30, (take.frames + 36) / 30]) {
        await video.evaluate((el, time) => new Promise((resolve, reject) => {
          const timer = setTimeout(() => reject(new Error('Seek timed out')), 15000);
          el.addEventListener('seeked', () => { clearTimeout(timer); resolve(); }, { once: true }); el.currentTime = time;
        }), t);
        expect(await video.evaluate(el => el.readyState)).toBeGreaterThanOrEqual(2);
      }
      report.push({ file: `${name}.mp4`, ...result, decoded: true });
      await video.screenshot({ path: path.join(output, 'checks', `${name}-decoded.png`) });
      console.log(`PLAYBACK OK ${name}`);
    }
    await video.evaluate((el, source) => { el.src = source; el.load(); }, `${story.key}.mp4`);
  }
  expect(errors).toEqual([]);
  await writeFile(path.join(output, 'checks', 'playback-report.json'), JSON.stringify(report, null, 2));
  // Contact frames across the actual Flexbox export, not reconstructed UI.
  const flexbox = page.locator('video[src="flexbox.mp4"]');
  for (const [i, time] of [2, 6, 11, 16, 20, 24, 26].entries()) {
    await flexbox.evaluate((el, t) => new Promise(resolve => { el.addEventListener('seeked', resolve, { once: true }); el.currentTime = t; }), time);
    await flexbox.screenshot({ path: path.join(output, 'checks', `flexbox-sequence-${i}.png`) });
  }
} finally { await browser.close(); }
