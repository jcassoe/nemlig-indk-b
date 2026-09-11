import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const AUTH_DIR = '.auth';
const AUTH_FILE = `${AUTH_DIR}/nemlig.json`;
const NEMLIG_URL = 'https://www.nemlig.com/';

async function main() {
  await mkdir(AUTH_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(NEMLIG_URL, { waitUntil: 'domcontentloaded' });

  console.log('\nLog ind på nemlig.com i browser-vinduet.');
  console.log('Når du er helt logget ind, så gå tilbage til terminalen og tryk Enter.\n');

  const rl = createInterface({ input, output });
  await rl.question('Tryk Enter for at gemme sessionen...');
  rl.close();

  await context.storageState({ path: AUTH_FILE });
  console.log(`\nSession gemt lokalt i ${AUTH_FILE}`);
  console.log('Filen ligger i .gitignore og må ikke commits til GitHub.');

  await browser.close();
}

main().catch((error) => {
  console.error('Kunne ikke gemme Nemlig-sessionen:', error);
  process.exitCode = 1;
});
