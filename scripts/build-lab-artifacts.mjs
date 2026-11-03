import { mkdir, readFile, writeFile } from "node:fs/promises";
import { lab, fuelRows, prompts, trials } from "../src/lab/content.js";
import { rowsToCsv } from "../src/lab/analysis.js";
import { verifyTrial } from "../src/lab/verify.js";

const directory = "public/laboratorio";
await mkdir(directory, { recursive: true });
await writeFile(`${directory}/dados-sinteticos.csv`, rowsToCsv(fuelRows));
await writeFile(
  `${directory}/dados-sinteticos.json`,
  JSON.stringify(fuelRows, null, 2) + "\n",
);
await writeFile(
  `${directory}/analisar-combustivel.mjs`,
  await readFile("src/lab/analysis.js", "utf8"),
);
await writeFile(
  `${directory}/prompts.md`,
  `# Prompts do laboratório\n\nExemplos públicos com dados sintéticos; não são prompts corporativos.\n\n${prompts.map((prompt) => `## ${prompt.title}\n\n${prompt.goal}\n\n\x60\x60\x60text\n${prompt.text}\n\x60\x60\x60`).join("\n\n")}\n`,
);
const record = {
  provenance: lab.provenance,
  method:
    "Registro manual de respostas do assistente de IA e validação determinística. Sem API de LLM ou benchmark.",
  trials: trials.map((trial) => ({ ...trial, validation: verifyTrial(trial) })),
};
if (
  record.trials.some((trial) => trial.validation.some((check) => !check.passed))
)
  throw new Error("Experimento com validação pendente.");
await writeFile(
  `${directory}/experimento.json`,
  JSON.stringify(record, null, 2) + "\n",
);
await writeFile(
  `${directory}/reproduzir.mjs`,
  `import { readFile } from 'node:fs/promises';\nimport { analyzeFuel } from './analisar-combustivel.mjs';\nconst data = JSON.parse(await readFile(new URL('./dados-sinteticos.json', import.meta.url), 'utf8'));\nconsole.log('DADOS SINTÉTICOS. Diferença hipotética; não é economia realizada.');\nconsole.log(JSON.stringify(analyzeFuel(data), null, 2));\n`,
);
console.log("Materiais reproduzíveis do laboratório gerados.");
