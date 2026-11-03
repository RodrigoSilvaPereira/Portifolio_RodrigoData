// Análise determinística: não chama modelos, serviços ou bancos externos.
// Preços em centavos; os exemplos usam litros inteiros para evitar falsa precisão.
export function analyzeFuel(rows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return {
      status: "invalid",
      errors: ["Inclua pelo menos um registro."],
      branches: [],
    };
  }
  const errors = [];
  rows.forEach((row, index) => {
    if (!row || typeof row !== "object") {
      errors.push(`Registro ${index + 1}: formato inválido.`);
      return;
    }
    if (
      typeof row.branch !== "string" ||
      !row.branch.trim() ||
      typeof row.station !== "string" ||
      !row.station.trim()
    )
      errors.push(`Registro ${index + 1}: filial e posto são obrigatórios.`);
    if (!Number.isFinite(row.price) || row.price <= 0 || row.price > 100)
      errors.push(
        `Registro ${index + 1}: informe um preço entre 0 e 100 reais, maior que zero.`,
      );
    else if (Math.abs(row.price * 100 - Math.round(row.price * 100)) > 0.000001)
      errors.push(
        `Registro ${index + 1}: use no máximo duas casas decimais no preço.`,
      );
    if (
      !Number.isSafeInteger(row.liters) ||
      row.liters <= 0 ||
      row.liters > 1000000
    )
      errors.push(
        `Registro ${index + 1}: informe um volume inteiro entre 1 e 1.000.000 de litros.`,
      );
  });
  if (errors.length) return { status: "invalid", errors, branches: [] };
  const groups = new Map();
  for (const row of rows) {
    const key = row.branch.trim();
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  const branches = [...groups].map(([branch, entries]) => {
    const cents = entries.map((row) => Math.round(row.price * 100));
    const liters = entries.reduce((sum, row) => sum + row.liters, 0);
    const totalCents = entries.reduce(
      (sum, row, i) => sum + cents[i] * row.liters,
      0,
    );
    const minimum = Math.min(...cents);
    const maximum = Math.max(...cents);
    return {
      branch,
      liters,
      total: totalCents / 100,
      weightedPrice: totalCents / liters / 100,
      minimum: minimum / 100,
      maximum: maximum / 100,
      spread: (maximum - minimum) / 100,
      hypotheticalDifference: (totalCents - minimum * liters) / 100,
    };
  });
  return { status: "ok", errors: [], branches };
}

export function rowsToCsv(rows) {
  const escape = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return (
    [
      "filial;posto;preco_litro;litros",
      ...rows.map((row) =>
        [row.branch, row.station, row.price, row.liters].map(escape).join(";"),
      ),
    ].join("\n") + "\n"
  );
}
