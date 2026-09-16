import { open, readFile, rename, unlink, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

export class InstagramApi {
  constructor({ token, accountId, version, fetchImpl = fetch }) {
    if (!token || !/^\d+$/.test(accountId || '') || !/^v\d+\.\d+$/.test(version || '')) throw new Error('Configurer IG_ACCESS_TOKEN, IG_ACCOUNT_ID et IG_API_VERSION.');
    this.token = token; this.accountId = accountId; this.base = `https://graph.instagram.com/${version}`; this.fetch = fetchImpl;
  }
  async request(endpoint, params = {}, method = 'GET') {
    const url = new URL(`${this.base}/${endpoint}`);
    if (method === 'GET') for (const [key, value] of Object.entries(params)) url.searchParams.set(key, String(value));
    const response = await this.fetch(url, { method, headers: { Authorization: `Bearer ${this.token}`, ...(method === 'POST' ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}) }, ...(method === 'POST' ? { body: new URLSearchParams(params) } : {}), signal: AbortSignal.timeout(30000) });
    const data = await response.json();
    // Error messages may echo request parameters. Only expose codes, never tokens.
    if (!response.ok || data.error) throw new Error(`Meta HTTP ${response.status}, code ${data.error?.code || 'unknown'}, sous-code ${data.error?.error_subcode || 'none'}`);
    return data;
  }
  profile() { return this.request(this.accountId, { fields: 'id,username' }); }
  create(post, videoUrl) { return this.request(`${this.accountId}/media`, { media_type: 'REELS', video_url: videoUrl, caption: post.caption, share_to_feed: 'true' }, 'POST'); }
  status(id) { return this.request(id, { fields: 'status_code' }); }
  publish(id) { return this.request(`${this.accountId}/media_publish`, { creation_id: id }, 'POST'); }
}

export function mediaUrl(base, post) {
  const url = new URL(`${base.replace(/\/$/, '')}/${post.key}-vertical.mp4`);
  if (url.protocol !== 'https:' || url.username || url.password || url.hostname === 'localhost') throw new Error('IG_MEDIA_BASE_URL doit être une adresse HTTPS publique.');
  return url.href;
}

export async function tick({ posts, state, api, save, baseUrl, now = new Date(), fetchImpl = fetch }) {
  // Never retry an ambiguous write automatically: Instagram publishing is not idempotent.
  const ambiguous = Object.values(state.posts).find(p => ['creating', 'publishing', 'needs_review'].includes(p.phase));
  if (ambiguous) return { status: 'needs_review', detail: 'Résoudre la publication incertaine avant de continuer.' };
  const post = posts.find(p => ['processing'].includes(state.posts[p.id]?.phase)) || posts.find(p => !state.posts[p.id] && new Date(p.scheduledAt) <= now);
  if (!post) return { status: 'idle' };
  let item = state.posts[post.id];
  if (!item) {
    if (now - new Date(post.scheduledAt) > 6 * 3600000) return { status: 'stale', id: post.id, detail: 'Créneau dépassé de plus de six heures : replanifier.' };
    if (Object.values(state.posts).some(p => p.publishedAt && now - new Date(p.publishedAt) < 20 * 3600000)) return { status: 'daily_limit' };
    const url = mediaUrl(baseUrl, post);
    const check = await fetchImpl(url, { method: 'HEAD', redirect: 'error', signal: AbortSignal.timeout(15000) });
    if (!check.ok || !check.headers.get('content-type')?.startsWith('video/')) throw new Error('Vidéo HTTPS inaccessible ou type MIME invalide.');
    item = state.posts[post.id] = { phase: 'creating', startedAt: now.toISOString(), accountId: api.accountId, caption: post.caption, videoUrl: url };
    await save(state);
    try {
      const created = await api.create(post, url);
      if (!/^\d+$/.test(created.id || '')) throw new Error('Identifiant de conteneur absent.');
      Object.assign(item, { phase: 'processing', containerId: created.id }); await save(state);
    } catch (error) { item.phase = 'needs_review'; await save(state); throw error; }
    return { status: 'processing', id: post.id };
  }
  if (item.accountId !== api.accountId) throw new Error('Le compte configuré diffère du compte de la file.');
  const { status_code: status } = await api.status(item.containerId);
  if (status === 'PUBLISHED') { item.phase = 'published'; item.publishedAt = now.toISOString(); await save(state); return { status: 'published', id: post.id }; }
  if (['ERROR', 'EXPIRED'].includes(status)) { item.phase = 'needs_review'; await save(state); return { status: 'needs_review', id: post.id }; }
  if (status !== 'FINISHED') return { status: 'processing', id: post.id };
  item.phase = 'publishing'; await save(state);
  try {
    const published = await api.publish(item.containerId);
    if (!/^\d+$/.test(published.id || '')) throw new Error('Identifiant de publication absent.');
    Object.assign(item, { phase: 'published', mediaId: published.id, publishedAt: now.toISOString() }); await save(state);
    return { status: 'published', id: post.id, mediaId: published.id };
  } catch (error) { item.phase = 'needs_review'; await save(state); throw error; }
}

export async function atomicJson(file, data) {
  const tmp = `${file}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(data, null, 2), { mode: 0o600 }); await rename(tmp, file);
}
export async function readJson(file, fallback) {
  try { return JSON.parse(await readFile(file, 'utf8')); } catch (error) { if (error.code === 'ENOENT') return fallback; throw error; }
}
export async function withLock(directory, callback) {
  await mkdir(directory, { recursive: true });
  const file = path.join(directory, 'publisher.lock');
  const lock = await open(file, 'wx', 0o600);
  try { await lock.writeFile(String(process.pid)); return await callback(); }
  finally { await lock.close(); await unlink(file); }
}
