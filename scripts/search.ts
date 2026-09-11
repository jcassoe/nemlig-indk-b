import { chromium } from 'playwright';
import { access } from 'node:fs/promises';

const AUTH_FILE = '.auth/nemlig.json';
const NEMLIG_URL = 'https://www.nemlig.com/';

async function main() {
  const query = process.argv.slice(2).join(' ').trim();

  if (!query) {
    console.error('Brug: npm run nemlig:search -- "minimælk"');
    process.exit(1);
  }

  try {
    await access(AUTH_FILE);
  } catch {
    console.error(`Ingen gemt session fundet i ${AUTH_FILE}.`);
    console.error('Kør først: npm run nemlig:login');
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: AUTH_FILE });
  const page = await context.newPage();

  await page.goto(NEMLIG_URL, { waitUntil: 'domcontentloaded' });

  // Keep v0.1 deliberately robust: use Nemlig's own search URL pattern
  // rather than relying on fragile page selectors before we inspect the live DOM.
  const searchUrl = `https://www.nemlig.com/soeg?q=${encodeURIComponent(query)}`;
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

  console.log(`Søgning åbnet for: ${query}`);
  console.log(`URL: ${page.url()}`);
  console.log('Luk browser-vinduet når du er færdig med testen.');

  await page.waitForEvent('close').catch(() => undefined);
  await browser.close();
}

main().catch((error) => {
  console.error('Nemlig-søgningen fejlede:', error);
  process.exitCode = 1;
});
