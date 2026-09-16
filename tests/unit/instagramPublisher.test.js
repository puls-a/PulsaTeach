import { describe, expect, test, vi } from 'vitest';
import { InstagramApi, tick, mediaUrl } from '../../social/instagram/publisher.mjs';
import { makeCampaign } from '../../social/instagram/campaign.mjs';

const now = new Date('2026-09-17T17:35:00Z');
const post = { id: 'v2-flexbox', key: 'flexbox', scheduledAt: '2026-09-17T17:30:00Z', caption: 'Un vrai niveau.' };
function setup(state = { posts: {} }) {
  return { posts: [post], state, api: { accountId: '123', create: vi.fn().mockResolvedValue({ id: '456' }), status: vi.fn().mockResolvedValue({ status_code: 'FINISHED' }), publish: vi.fn().mockResolvedValue({ id: '789' }) }, save: vi.fn(), baseUrl: 'https://media.example/reels', now, fetchImpl: vi.fn().mockResolvedValue(new Response('', { headers: { 'Content-Type': 'video/mp4' } })) };
}

describe('Instagram publication ledger', () => {
  test('creates and persists a container, then publishes once on the next tick', async () => {
    const args = setup();
    expect((await tick(args)).status).toBe('processing');
    expect(args.api.publish).not.toHaveBeenCalled();
    expect(args.state.posts[post.id].containerId).toBe('456');
    expect((await tick(args)).status).toBe('published');
    expect((await tick(args)).status).toBe('idle');
    expect(args.api.publish).toHaveBeenCalledTimes(1);
  });
  test('does not retry an ambiguous publication', async () => {
    const args = setup({ posts: { [post.id]: { phase: 'processing', containerId: '456', accountId: '123' } } });
    args.api.publish.mockRejectedValue(new Error('timeout'));
    await expect(tick(args)).rejects.toThrow('timeout');
    expect((await tick(args)).status).toBe('needs_review');
    expect(args.api.publish).toHaveBeenCalledTimes(1);
  });
  test('persist-before-write protects a process crash at publication time', async () => {
    const args = setup({ posts: { [post.id]: { phase: 'publishing', containerId: '456', accountId: '123' } } });
    expect((await tick(args)).status).toBe('needs_review');
    expect(args.api.publish).not.toHaveBeenCalled();
  });
  test('does not burst missed posts or publish before the schedule', async () => {
    const early = setup(); early.now = new Date('2026-09-17T16:00:00Z');
    expect((await tick(early)).status).toBe('idle');
    const late = setup(); late.now = new Date('2026-09-18T17:00:00Z');
    expect((await tick(late)).status).toBe('stale');
    expect(late.api.create).not.toHaveBeenCalled();
  });
  test('blocks processing a container for a different account', async () => {
    const args = setup({ posts: { [post.id]: { phase: 'processing', containerId: '456', accountId: '999' } } });
    await expect(tick(args)).rejects.toThrow('diffère');
    expect(args.api.publish).not.toHaveBeenCalled();
  });
  test('failed media verification never creates a container', async () => {
    const args = setup(); args.fetchImpl.mockResolvedValue(new Response('', { status: 404 }));
    await expect(tick(args)).rejects.toThrow('inaccessible');
    expect(args.api.create).not.toHaveBeenCalled();
  });
  test('token is kept out of URLs and API error messages', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: { code: 190, message: 'secret-value' } }), { status: 401 }));
    const api = new InstagramApi({ token: 'secret-value', accountId: '123', version: 'v24.0', fetchImpl });
    await expect(api.profile()).rejects.toThrow('code 190');
    expect(String(fetchImpl.mock.calls[0][0])).not.toContain('secret-value');
  });
  test('calendar contains fourteen unique vertical videos and spaced slots', () => {
    const posts = makeCampaign(now);
    expect(posts).toHaveLength(14);
    expect(new Set(posts.map(p => p.id)).size).toBe(14);
    for (const [i, p] of posts.entries()) {
      expect(p.file).toMatch(/-vertical\.mp4$/);
      expect(p.caption.length).toBeLessThan(2200);
      expect(new Date(p.scheduledAt) > now).toBe(true);
      if (i) expect(new Date(p.scheduledAt) - new Date(posts[i - 1].scheduledAt)).toBeGreaterThanOrEqual(86400000 * 2);
    }
    expect(() => mediaUrl('http://localhost', post)).toThrow();
  });
});
