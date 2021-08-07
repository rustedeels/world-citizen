import { splitChapter } from '../@ngx-batatas/projects/engine/src/lib/chapter/chapter-parser.ts';

const filePath = Deno.args[0];
if (!filePath) {
    console.warn('A file is required!')
    Deno.exit()
}

const content = await Deno.readTextFile(filePath);
const raw = JSON.stringify(splitChapter(content), undefined, 2);
await Deno.writeTextFile('./res.json', raw);
