export async function removeStorageFolderFiles(bucket, folder, keepNames = []) {
  const kept = new Set(keepNames);
  let removed = 0;

  while (true) {
    const { data, error } = await bucket.list(folder, { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } });
    if (error) throw error;
    const paths = (data || [])
      .filter((file) => !kept.has(file.name))
      .map((file) => `${folder}/${file.name}`);
    if (!paths.length) return removed;

    const { error: removeError } = await bucket.remove(paths);
    if (removeError) throw removeError;
    removed += paths.length;
  }
}
