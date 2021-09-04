type PubType = 'major' | 'minor' | 'patch';
type Version = [number, number, number];

const TYPES = ['major', 'minor', 'patch']

function isPubType(t: unknown): t is PubType {
  return typeof t === 'string'
    && TYPES.indexOf(t) !== -1;
}

const path = Deno.args[0];
const pubType = Deno.args[1] as unknown;

if (typeof path !== 'string' || !path) {
  console.error('A path must be defined')
  Deno.exit(1)
}

if (!isPubType(pubType)) {
  console.error('Invalid pub type only major, minor or patch are a valid value')
  Deno.exit(2)
}

function isNum(n: unknown): number {
  if (typeof n !== 'number' || isNaN(n))
    throw new Error(`${n} is not a valid version`);
  return n;
}

const packagePath = [path, '/package.json'].join('/').replaceAll('//', '/');
const versionPath = [path, '/version.ts'].join('/').replaceAll('//', '/');
const pk = JSON.parse(await Deno.readTextFile(packagePath)) as { version: string };
const version: Version = [0, 0, 0];
const rawVersion = pk.version.split('.').map(e => parseInt(e, 10));

version[0] = isNum(rawVersion[0]);
version[1] = isNum(rawVersion[1]);
version[2] = isNum(rawVersion[2]);

const next: Version = [...version];
switch (pubType) {
  case 'major':
    next[0] = next[0] + 1;
    next[1] = 0;
    next[2] = 0;
    break;
  case 'minor':
    next[1] = next[1] + 1;
    next[2] = 0;
    break;
  case 'patch':
    next[2] = next[2] + 1;
    break;
}

function V(v: Version): string {
  return v.join('.');
}

const isValid = prompt(`Bump from ${V(version)} to ${V(next)}? [y/N]`) === 'y';
if (!isValid) Deno.exit(0);

pk.version = V(next);
await Deno.writeTextFile(versionPath, `export const VERSION = '${V(next)}';\n`);
await Deno.writeTextFile(packagePath, JSON.stringify(pk, undefined, 2));

console.log('publishing for ' + path)
const result = await Deno.run({
  cmd: ['pwsh', '-c', `npm publish "${path}"`]
}).status()

if (!result.success) {
  console.error('Error publishing package')
  Deno.exit(3)
}

Deno.exit(0)
