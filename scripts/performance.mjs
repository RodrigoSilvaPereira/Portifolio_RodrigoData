import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";

// Same browser, mobile simulated throttling and local origin for before/after.
// Baseline is served separately from .qa/baseline with its original static assets.
const url = process.argv[2] || "http://127.0.0.1:4173/";
const label = process.argv[3] || "after";
const chrome = await launch({
  chromeFlags: ["--headless=new", "--disable-gpu", "--no-first-run"],
  logLevel: "error",
});
try {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: ["html", "json"],
    logLevel: "error",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  await mkdir("reports/lighthouse", { recursive: true });
  await writeFile(`reports/lighthouse/${label}.html`, result.report[0]);
  await writeFile(`reports/lighthouse/${label}.json`, result.report[1]);
  const { lhr } = result;
  const summary = {
    url,
    lighthouse: lhr.lighthouseVersion,
    browser: lhr.environment.hostUserAgent,
    fetchTime: lhr.fetchTime,
    formFactor: lhr.configSettings.formFactor,
    throttlingMethod: lhr.configSettings.throttlingMethod,
    throttling: lhr.configSettings.throttling,
    scores: Object.fromEntries(
      Object.entries(lhr.categories).map(([key, value]) => [
        key,
        value.score * 100,
      ]),
    ),
    metrics: Object.fromEntries(
      [
        "first-contentful-paint",
        "largest-contentful-paint",
        "cumulative-layout-shift",
        "total-blocking-time",
        "speed-index",
      ].map((key) => [key, lhr.audits[key].numericValue]),
    ),
    warnings: lhr.runWarnings,
  };
  await writeFile(
    `reports/lighthouse/${label}-summary.json`,
    JSON.stringify(summary, null, 2),
  );
  console.log(JSON.stringify(summary, null, 2));
} finally {
  await chrome.kill();
}
