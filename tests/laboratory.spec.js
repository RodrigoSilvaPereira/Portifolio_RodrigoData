import { test, expect } from "@playwright/test";
import { fuelRows, labPath } from "../src/lab/content";

test("interactive synthetic analysis filters, recalculates, stops on invalid data and resets", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto(`${labPath}#demonstracao`);
  await expect(page.locator(".demo-results article")).toHaveCount(3);
  await page.getByLabel("Filtrar filial").selectOption("Filial A");
  await expect(page.locator(".demo-table tbody tr")).toHaveCount(2);
  await expect(page.locator(".demo-results article")).toHaveCount(1);
  await expect(page.locator(".hypothetical dd")).toHaveText("R$ 125,00");
  const price = page.getByLabel("Preço por litro: Filial A, Posto A2", {
    exact: true,
  });
  await price.fill("6.20");
  await expect(page.locator(".hypothetical dd")).toHaveText("R$ 0,00");
  const liters = page.getByLabel("Volume em litros: Filial A, Posto A1", {
    exact: true,
  });
  await liters.fill("");
  await expect(
    page.getByText("Análise pausada. Confira os dados:"),
  ).toBeVisible();
  await expect(page.locator(".demo-results")).toHaveCount(0);
  await page.getByRole("button", { name: "Restaurar exemplo" }).click();
  await expect(page.getByLabel("Filtrar filial")).toHaveValue("Todas");
  await expect(page.locator(".demo-table tbody tr")).toHaveCount(6);
  await expect(page.locator(".demo-results article")).toHaveCount(3);
  await expect(page.locator('.demo-filter [role="status"]')).toHaveText(
    "Exemplo sintético original.",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("prompts copy their actual content and artifacts are downloadable and verifiable", async ({
  page,
  request,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(labPath);
  await page.getByRole("button", { name: "Copiar prompt" }).first().click();
  await expect(
    page.getByText("Prompt copiado.", { exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(() => window.navigator.clipboard.readText()),
  ).toContain("média simples");
  for (const file of [
    "prompts.md",
    "dados-sinteticos.csv",
    "dados-sinteticos.json",
    "analisar-combustivel.mjs",
    "reproduzir.mjs",
    "experimento.json",
  ]) {
    const response = await request.get(`/laboratorio/${file}`);
    expect(response.status(), file).toBe(200);
    expect((await response.text()).length).toBeGreaterThan(100);
  }
  const rows = await (
    await request.get("/laboratorio/dados-sinteticos.json")
  ).json();
  expect(rows).toEqual(fuelRows);
  const record = await (
    await request.get("/laboratorio/experimento.json")
  ).json();
  expect(record.provenance).toContain("assistência do Codex");
  expect(record.trials).toHaveLength(3);
  expect(
    record.trials.every((trial) =>
      trial.validation.every((check) => check.passed),
    ),
  ).toBe(true);
  const downloaded = page.waitForEvent("download");
  await page
    .getByRole("link", { name: "Baixar os prompts (Markdown)" })
    .click();
  expect((await downloaded).suggestedFilename()).toBe("prompts.md");
});

test("laboratory is linked from home, has static content, and never calls an LLM API", async ({
  page,
  request,
}) => {
  const remoteCalls = [];
  page.on("request", (req) => {
    if (!req.url().startsWith("http://127.0.0.1:4173"))
      remoteCalls.push(req.url());
  });
  await page.goto("/");
  await page.getByRole("link", { name: "Abrir laboratório" }).click();
  await expect(page).toHaveURL(/laboratorio-ia/);
  await expect(
    page.getByRole("heading", { name: "Do prompt à validação." }),
  ).toBeVisible();
  const html = await (await request.get(labPath)).text();
  expect(html).toContain("Dados sintéticos");
  expect(html).toContain("Torre de Controle");
  expect(html).toContain("diretoria");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain(labPath);
  expect(remoteCalls).toEqual([]);
});
