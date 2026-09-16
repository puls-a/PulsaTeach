import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';

const output = 'public/video-captures';
await mkdir(output, { recursive: true });
Object.assign(process.env, { NODE_ENV: 'test', PULSATEACH_STORAGE: 'json', PULSATEACH_ALLOW_LOCAL_IDENTITY: 'true' });
const { default: app } = await import('../server/index.js');
const api = await new Promise(resolve => { const instance = app.listen(4174, '127.0.0.1', () => resolve(instance)); });
const server = await createServer({ server: { host: '127.0.0.1', port: 5198, strictPort: true } });
await server.listen();
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1.5 });
  for (const [name, route] of Object.entries({ home: '/', catalog: '/catalog', editor: '/learn/html/html-modern-document/html-01-doctype-standard-mode', sandbox: '/playground', projects: '/projects', glossary: '/glossary', path: '/path', review: '/review', certification: '/certification', flexbox: '/flexbox-arena', world: '/world', dashboard: '/dashboard' })) {
    await page.goto(`http://127.0.0.1:5198${route}`, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.locator('main').first().waitFor({ timeout: 60000 });
    const consent = page.getByRole('button', { name: /Tout accepter|Accept all/ });
    if (await consent.isVisible()) await consent.click();
    await page.waitForTimeout(4000);
    await page.screenshot({ path: `${output}/${name}.png` });
    await page.evaluate(() => window.scrollBy(0, 240));
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${output}/${name}-detail.png` });
    console.log(`${name}: ${page.url()} — ${(await page.locator('h1').allTextContents()).join(' / ')}`);
  }
} finally {
  await browser.close();
  await server.close();
  await new Promise(resolve => api.close(resolve));
}
