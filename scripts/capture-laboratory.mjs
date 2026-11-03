import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("reports/previews", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const width of [360, 768, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    reducedMotion: "reduce",
  });
  await page.goto("http://127.0.0.1:4173/laboratorio-ia/", {
    waitUntil: "networkidle",
  });
  await page.screenshot({
    path: `reports/previews/laboratorio-${width}.png`,
    fullPage: true,
  });
  await page
    .locator("#demonstracao")
    .screenshot({
      path: `reports/previews/demonstracao-${width}.png`,
      style: ".site-header, .skip-link { visibility: hidden !important; }",
    });
  await page.close();
}
await browser.close();
