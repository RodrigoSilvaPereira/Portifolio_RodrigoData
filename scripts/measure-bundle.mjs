import { readdir, readFile } from "node:fs/promises";
import { gzipSync, brotliCompressSync } from "node:zlib";
import path from "node:path";

const directory = process.argv[2] || "dist";
const assets = path.join(directory, "assets");
const files = (await readdir(assets)).filter((file) =>
  /\.(js|css)$/.test(file),
);
const results = await Promise.all(
  files.map(async (file) => {
    const content = await readFile(path.join(assets, file));
    return {
      file,
      raw: content.length,
      gzip: gzipSync(content).length,
      brotli: brotliCompressSync(content).length,
    };
  }),
);
console.log(
  JSON.stringify(
    { directory, node: process.version, unit: "bytes", files: results },
    null,
    2,
  ),
);
