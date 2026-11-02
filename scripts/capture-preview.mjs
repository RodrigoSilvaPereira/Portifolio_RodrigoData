import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch({ channel: "chrome", headless: true });
await mkdir("reports/previews", { recursive: true });
for (const width of [360, 768, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    reducedMotion: "reduce",
  });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await page.screenshot({
    path: `reports/previews/home-${width}.png`,
    fullPage: true,
  });
  await page.close();
}
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
await page.goto("http://127.0.0.1:4173/casos/automacao-relatorios/", {
  waitUntil: "networkidle",
});
await page.screenshot({
  path: "reports/previews/case-1440.png",
  fullPage: true,
});
await browser.close();
