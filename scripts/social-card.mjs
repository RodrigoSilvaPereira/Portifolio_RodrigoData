import { chromium } from "@playwright/test";

// Code-native typography export. No corporate screenshots or generated imagery.
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.setContent(`<!doctype html><html lang="pt-BR"><style>
*{box-sizing:border-box}body{margin:0;background:#f3f5fa;color:#17283d;font-family:Arial,sans-serif;padding:62px 74px;border-top:12px solid #234fc7;height:630px}
header{font-size:21px;display:flex;align-items:center;gap:16px}header b{display:grid;place-items:center;width:46px;height:46px;background:#234fc7;color:white;font-size:37px;border-radius:10px;padding-bottom:4px}h1{font-size:77px;letter-spacing:-3px;line-height:1.08;margin:65px 0 24px;font-weight:700}h1 span{color:#234fc7}p{font-size:23px;color:#536279;margin:0}footer{position:absolute;bottom:48px;left:74px;right:74px;border-top:1px solid #cbd5e7;padding-top:22px;font-size:17px;color:#536279;display:flex;justify-content:space-between}
</style><header><b>r.</b> Rodrigo Pereira</header><h1>Dados e <span>IA Aplicada.</span></h1><p>Automação e agentes de IA para problemas de negócio.</p><footer><span>Python · SQL · n8n · Agentes de IA</span><span>datarodrigo.vercel.app</span></footer></html>`);
await page.screenshot({ path: "public/social-card.png" });
await browser.close();
