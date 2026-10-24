import { securityHeaders } from './headers.mjs';
import { createServer } from 'node:http';
import { access, readFile, realpath } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = fileURLToPath(new URL('../', import.meta.url));
const localBuild = resolve(project, 'build');
let build = resolve(project, '../../../../build');
try { await access(resolve(localBuild, 'index.html')); build = localBuild; } catch {}
const root = await realpath(build);
const port = Number(process.env.PORT || 4175);
const host = process.env.HOST || '127.0.0.1';
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
};

const server = createServer(async (request, response) => {
  for (const [name, value] of Object.entries(securityHeaders)) response.setHeader(name, value);
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const file = await realpath(resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname)));
    const extension = extname(file);
    if (!file.startsWith(root + sep) || !mime[extension] || file.includes(sep + 'node_modules' + sep)) {
      response.writeHead(403).end('Access denied');
      return;
    }
    if (request.method === 'HEAD') {
      response.writeHead(200, { 'Content-Type': mime[extension] }).end();
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, {
      'Content-Type': mime[extension],
      'Content-Length': body.length,
      'Cache-Control': /[.][a-f0-9]{8,}[.]/i.test(file) ? 'public, max-age=31536000, immutable' : 'no-cache',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 404).end('Not found');
  }
});

server.on('error', error => {
  console.error(error.code === 'EADDRINUSE'
    ? `${port} port band. Boshqa PORT tanlang yoki avvalgi serverni yoping.`
    : error.message);
  process.exitCode = 1;
});
server.listen(port, host, () => console.log(`Tripwise: http://${host}:${port}/#home`));
