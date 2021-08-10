/** Convert pascal case to title, (pascalCase => Pascal Case) */
export function pascalToTitle(id: string): string {
  const matchs = id.matchAll(/[A-Z]/g);
  const set = new Set<string>();
  let name = id;

  for (const c in matchs)
    if (c[0])
      set.add(c[0])

  for (const s of set) {
    name = name.replaceAll(s, ' ' + s);
  }

  if (name.length) {
    const up = name[0].toUpperCase();
    name = up + name.substring(1)
  }

  return name;
}
