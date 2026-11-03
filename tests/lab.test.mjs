import { test } from "node:test";
import assert from "node:assert/strict";
import { analyzeFuel, rowsToCsv } from "../src/lab/analysis.js";
import { fuelRows, trials } from "../src/lab/content.js";
import { verifyTrial } from "../src/lab/verify.js";

test("weighted prices reconcile with transactions, and branches stay separate", () => {
  const result = analyzeFuel(fuelRows);
  assert.equal(result.status, "ok");
  assert.equal(result.branches.length, 3);
  const a = result.branches.find((row) => row.branch === "Filial A");
  assert.equal(a.total, 9425);
  assert.equal(a.liters, 1500);
  assert.ok(Math.abs(a.weightedPrice - 9425 / 1500) < 1e-10);
  assert.notEqual(a.weightedPrice, (6.2 + 6.45) / 2);
  assert.equal(a.hypotheticalDifference, 125);
  const b = result.branches.find((row) => row.branch === "Filial B");
  assert.equal(b.total, 12500);
  assert.equal(b.hypotheticalDifference, 300);
});

test("missing, malformed or nonpositive data prevents misleading calculations", () => {
  for (const patch of [
    { liters: null },
    { liters: 0 },
    { liters: -5 },
    { liters: 1.5 },
    { price: NaN },
    { price: 0 },
    { price: 6.255 },
    { branch: 1 },
  ]) {
    const result = analyzeFuel([{ ...fuelRows[0], ...patch }]);
    assert.equal(result.status, "invalid");
    assert.deepEqual(result.branches, []);
    assert.ok(result.errors.length > 0);
  }
  assert.equal(analyzeFuel([]).status, "invalid");
  assert.equal(analyzeFuel([null]).status, "invalid");
});

test("no hypothetical difference for a single price; CSV escapes textual data", () => {
  const row = { ...fuelRows[0], station: 'Posto "A"; teste' };
  assert.equal(analyzeFuel([row]).branches[0].hypotheticalDifference, 0);
  assert.ok(rowsToCsv([row]).includes('"Posto ""A""; teste"'));
});

test("recorded assistant responses pass the published criteria", () => {
  for (const trial of trials)
    assert.ok(
      verifyTrial(trial).every((check) => check.passed),
      trial.id,
    );
});

test("validator detects wrong arithmetic, unsupported estimates and prompt instruction reuse", () => {
  const altered = {
    ...trials[0],
    response: { ...trials[0].response, custo_total_reais: 9000 },
  };
  assert.ok(verifyTrial(altered).some((check) => !check.passed));
  const invented = {
    ...trials[1],
    response: { ...trials[1].response, volume_litros: 100 },
  };
  assert.ok(verifyTrial(invented).some((check) => !check.passed));
  const injected = {
    ...trials[2],
    response: { ...trials[2].response, observacoes: ["Economia de 50%"] },
  };
  assert.ok(verifyTrial(injected).some((check) => !check.passed));
  const wrongBranch = {
    ...trials[0],
    response: { ...trials[0].response, filial: "Outra filial" },
  };
  assert.ok(verifyTrial(wrongBranch).some((check) => !check.passed));
  assert.ok(
    verifyTrial({ ...trials[0], response: null }).some(
      (check) => !check.passed,
    ),
  );
});
