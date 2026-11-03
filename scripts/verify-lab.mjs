import { trials, lab } from "../src/lab/content.js";
import { verifyTrial } from "../src/lab/verify.js";

console.log(lab.provenance);
let failures = 0;
for (const trial of trials) {
  const checks = verifyTrial(trial);
  console.log(JSON.stringify({ id: trial.id, checks }));
  failures += checks.filter((check) => !check.passed).length;
}
if (failures) process.exitCode = 1;
