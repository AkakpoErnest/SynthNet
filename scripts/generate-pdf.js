#!/usr/bin/env node
/**
 * Generates SynthNet presentation PDF from the HTML file.
 * Run: node scripts/generate-pdf.js
 * Requires: npm install puppeteer
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const htmlPath = path.join(projectRoot, 'synthnet-presentation.html');
const pdfPath = path.join(projectRoot, 'synthnet-presentation.pdf');

async function main() {
  let puppeteer;
  try {
    const require = createRequire(import.meta.url);
    puppeteer = require('puppeteer');
  } catch {
    console.error('Puppeteer not found. Install it with: npm install puppeteer');
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await browser.close();
  console.log(`PDF saved to: ${pdfPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
