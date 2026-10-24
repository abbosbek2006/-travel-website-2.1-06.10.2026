import { cp, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

// Native browser modules need no framework compiler or installed dependencies.
const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'src', 'assets']) {
  await cp(new URL(name, root), new URL(name, output), { recursive: true });
}
console.log(`Static website prepared: ${fileURLToPath(output)}`);
