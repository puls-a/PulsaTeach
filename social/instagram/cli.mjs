import 'dotenv/config';
import { stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { makeCampaign, profile } from './campaign.mjs';
import { InstagramApi, atomicJson, readJson, withLock, tick, mediaUrl } from './publisher.mjs';

const directory = path.resolve('data/instagram');
const campaignFile = path.join(directory, 'campaign.json');
const stateFile = path.join(directory, 'state.json');
const command = process.argv[2] || 'doctor';
const env = process.env;
const required = ['IG_ACCESS_TOKEN', 'IG_ACCOUNT_ID', 'IG_API_VERSION', 'IG_MEDIA_BASE_URL'];
const makeApi = () => new InstagramApi({ token: env.IG_ACCESS_TOKEN, accountId: env.IG_ACCOUNT_ID, version: env.IG_API_VERSION });
try {
  if (command === 'doctor') {
    console.log(JSON.stringify({ expectedAccount: `@${env.IG_EXPECTED_USERNAME || profile.username}`, configuration: Object.fromEntries(required.map(key => [key, Boolean(env[key])])), publishingEnabled: env.IG_PUBLISH_ENABLED === 'true', campaign: Boolean(await readJson(campaignFile, null)) }, null, 2));
    if (process.argv.includes('--online')) console.log(await makeApi().profile());
  } else await withLock(directory, async () => {
    if (command === 'init') {
      if (await readJson(campaignFile, null)) throw new Error('Calendrier existant : le modifier explicitement plutôt que l’écraser.');
      const startArg = process.argv.find(a => a.startsWith('--start='))?.slice(8);
      const start = startArg ? new Date(startArg) : new Date();
      if (!Number.isFinite(start.getTime())) throw new Error('Date de départ invalide.');
      const posts = makeCampaign(start);
      for (const post of posts) if (!(await stat(post.file)).isFile()) throw new Error(`Vidéo absente : ${post.file}`);
      await atomicJson(campaignFile, { profile, timezone: 'UTC', slots: 'mardi, jeudi, dimanche à 17:30 UTC ; horaires de test', posts });
      console.log(`${posts.length} Reels planifiés. Calendrier : ${campaignFile}`);
      return;
    }
    const campaign = await readJson(campaignFile, null);
    if (!campaign) throw new Error('Lancer init pour créer le calendrier.');
    const state = await readJson(stateFile, { posts: {} });
    if (command === 'plan') { console.table(campaign.posts.map(p => ({ id: p.id, date: p.scheduledAt, phase: state.posts[p.id]?.phase || 'scheduled' }))); return; }
    if (command === 'run') {
      if (env.IG_PUBLISH_ENABLED !== 'true') { console.log('Simulation : aucune publication. IG_PUBLISH_ENABLED doit valoir true pour activer la file.'); return; }
      const api = makeApi();
      const account = await api.profile();
      if (account.username?.toLowerCase() !== (env.IG_EXPECTED_USERNAME || profile.username).toLowerCase()) throw new Error('Le compte connecté ne correspond pas au compte attendu.');
      console.log(await tick({ posts: campaign.posts, state, api, save: next => atomicJson(stateFile, next), baseUrl: env.IG_MEDIA_BASE_URL })); return;
    }
    if (command === 'assets') { console.log(campaign.posts.map(p => `${p.file} -> ${mediaUrl(env.IG_MEDIA_BASE_URL || 'https://MEDIA-HOST.example/reels', p)}`).join('\n')); return; }
    if (command === 'report') {
      const api = makeApi(); const report = [];
      for (const [id, post] of Object.entries(state.posts).filter(([,p]) => p.mediaId)) {
        const media = await api.request(post.mediaId, { fields: 'id,permalink,timestamp,like_count,comments_count' });
        const comments = await api.request(`${post.mediaId}/comments`, { fields: 'id,text,username,timestamp', limit: 50 });
        report.push({ id, media, comments: comments.data, moreComments: Boolean(comments.paging?.next) });
      }
      await writeFile(path.join(directory, 'community-report.json'), JSON.stringify({ generatedAt: new Date().toISOString(), posts: report }, null, 2), { mode: 0o600 });
      console.log('Rapport local écrit : data/instagram/community-report.json'); return;
    }
    throw new Error('Commandes : doctor, init, plan, assets, run, report.');
  });
} catch (error) {
  console.error(required.some(k => env[k] && String(error.message).includes(env[k])) ? 'Erreur de configuration ou de connexion ; aucun secret affiché.' : error.message);
  process.exitCode = 1;
}
