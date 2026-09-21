export async function updateLessonDraftRow(client, id, changes, expectedRevision) {
  if (!client) throw new Error("Supabase lesson draft storage is unavailable.");
  const updates = {
    ...(changes.status ? { status: changes.status } : {}),
    ...(changes.title ? { title: changes.title } : {}),
    ...(changes.objective ? { objective: changes.objective } : {}),
    ...(changes.prompt ? { prompt: changes.prompt } : {}),
    revision: expectedRevision + 1,
    updated_at: new Date().toISOString()
  };
  const { data, error } = await client.from("lesson_drafts")
    .update(updates)
    .eq("id", id)
    .eq("revision", expectedRevision)
    .select("*")
    .maybeSingle();
  if (error) throw error;
  if (data) return data;
  await throwDraftLookupError(client, id, expectedRevision, "Lesson draft changed. Reload it before retrying.");
}

export async function deleteLessonDraftRow(client, id, expectedRevision) {
  if (!client) throw new Error("Supabase lesson draft storage is unavailable.");
  const { data, error } = await client.from("lesson_drafts").delete().eq("id", id).eq("revision", expectedRevision).select("id").maybeSingle();
  if (error) throw error;
  if (data) return data.id;
  await throwDraftLookupError(client, id, expectedRevision, "Lesson draft changed. Reload it before deleting.");
}

export function fromLessonDraftRow(row) {
  return {
    id: row.id,
    trackId: row.track_id,
    moduleId: row.module_id,
    title: row.title,
    objective: row.objective,
    prompt: row.prompt,
    type: row.type,
    difficulty: row.difficulty,
    skills: row.skills || [],
    xp: row.xp,
    status: row.status,
    revision: Number(row.revision || 1),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export function toLessonDraftRow(item) {
  return {
    id: item.id,
    track_id: item.trackId,
    module_id: item.moduleId,
    title: item.title,
    objective: item.objective,
    prompt: item.prompt,
    type: item.type,
    difficulty: item.difficulty,
    skills: item.skills || [],
    xp: item.xp,
    status: item.status,
    revision: Number(item.revision || 1),
    created_at: item.createdAt,
    updated_at: item.updatedAt
  };
}

async function throwDraftLookupError(client, id, expectedRevision, message) {
  const { data, error } = await client.from("lesson_drafts").select("revision").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) throw draftError(404, "LESSON_DRAFT_NOT_FOUND", "Lesson draft not found.");
  throw draftError(409, "LESSON_DRAFT_CONFLICT", message, {
    expectedRevision,
    currentRevision: Number(data.revision || 1)
  });
}

function draftError(status, code, message, details) {
  return Object.assign(new Error(message), { status, code, details });
}
