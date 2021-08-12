/** Merge paths parts */
export function buildPath(...parts: string[]): string {
  return parts
    .join('/')
    .replace(/\/\/\//g, '/')
    .replace(/\/\//g, '/');
}

/**
 * convert path to unix, by removing driver letter and convert \ to /
 */
export function toUnix(path: string): string {
  path = path.replace(/^\w\:/, '');
  path = path.replace(/\\/g, '/')
  return path;
}

/** Returns folder and fileName from path */
export function splitPath(path: string): [string, string] {
  let split = '/';
  if (path.indexOf('\\') !== -1) {
    split = '\\';
  }
  const parts = path.split(split).map(e => e.trim()).filter(e => !!e);
  if (parts.length === 0) return ['', ''];
  if (parts.length === 1) return ['', parts[0]]

  const fileName = parts.slice(-1)[0];
  const folder = parts.slice(0, -1).join(split);
  return [folder, path];
}
