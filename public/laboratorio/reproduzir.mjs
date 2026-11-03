import { readFile } from 'node:fs/promises';
import { analyzeFuel } from './analisar-combustivel.mjs';
const data = JSON.parse(await readFile(new URL('./dados-sinteticos.json', import.meta.url), 'utf8'));
console.log('DADOS SINTÉTICOS. Diferença hipotética; não é economia realizada.');
console.log(JSON.stringify(analyzeFuel(data), null, 2));
