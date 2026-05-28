import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);
const require = createRequire(import.meta.url);

// Import the built server
const { default: serverEntry } = await import('../dist/server/server.js');

export default async function handler(request: Request): Promise<Response> {
  try {
    return await serverEntry.fetch(request, {}, {});
  } catch (error) {
    console.error('Server error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
