import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { render, routes } from "../dist-ssr/entry-server.js";

const template = await readFile("dist/index.html", "utf8");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const route of routes) {
  const { html, meta, structured } = render(route);
  const head = `<title>${escape(meta.title)}</title>
    <meta name="description" content="${escape(meta.description)}" />
    <link rel="canonical" href="${meta.canonical}" />
    <meta property="og:title" content="${escape(meta.title)}" />
    <meta property="og:description" content="${escape(meta.description)}" />
    <meta property="og:url" content="${meta.canonical}" />
    <meta name="twitter:title" content="${escape(meta.title)}" />
    <meta name="twitter:description" content="${escape(meta.description)}" />
    ${meta.notFound ? '<meta name="robots" content="noindex" />' : ""}
    <script type="application/ld+json">${JSON.stringify(structured).replaceAll("<", "\\u003c")}</script>`;
  const output = template
    .replace(/<!-- page-head:start -->[\s\S]*?<!-- page-head:end -->/, head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const file =
    route === "/404/"
      ? "dist/404.html"
      : path.join("dist", route.slice(1), "index.html");
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, output);
}
const origin = render("/").meta.canonical.replace(/\/$/, "");
const urls = routes
  .filter((route) => route !== "/404/")
  .map((route) => `<url><loc>${origin}${route}</loc></url>`)
  .join("");
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
console.log(
  `HTML estático gerado: ${routes.length} páginas, sitemap e robots.txt.`,
);
