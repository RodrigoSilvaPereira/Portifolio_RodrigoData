import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { cases, caseUrl, profile } from "../src/content";

// Never allow a real EmailJS request in any automated test.
test.beforeEach(async ({ page }) => {
  await page.route("https://api.emailjs.com/**", (route) =>
    route.abort("blockedbyclient"),
  );
});

for (const width of [360, 768, 1440]) {
  test(`home and case pages are readable and accessible at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    for (const path of ["/", ...cases.map(caseUrl)]) {
      const response = await page.goto(path);
      expect(response.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      expect(await page.locator("canvas").count()).toBe(0);
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        axe.violations,
        JSON.stringify(
          axe.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        ),
      ).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test("keyboard menu supports Escape, focus return and anchor offsets", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Pular para o conteúdo" }),
  ).toBeFocused();
  const menu = page.locator(".menu-toggle");
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("navigation", { name: "Navegação principal" })
      .getByRole("link", { name: "Início", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Navegação principal" })
    .getByRole("link", { name: "Casos", exact: true })
    .click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#casos")).toBeFocused();
  await expect
    .poll(() =>
      page
        .locator("#casos")
        .evaluate((node) => node.getBoundingClientRect().top),
    )
    .toBeGreaterThan(67);
  await expect(page.locator("#navigation")).toBeHidden();
  await menu.click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.setViewportSize({ width: 360, height: 800 });
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("essential content is server rendered, links resolve and PDF downloads intact", async ({
  page,
  request,
}) => {
  for (const route of ["/", ...cases.map(caseUrl)]) {
    const response = await request.get(route);
    const html = await response.text();
    expect(html).toContain("<h1");
    expect(html).toContain("application/ld+json");
    expect(html).toContain('rel="canonical"');
    expect(html).not.toContain('<div id="root"></div>');
  }
  await page.goto("/");
  const links = await page
    .locator("a")
    .evaluateAll((nodes) => nodes.map((a) => a.getAttribute("href")));
  for (const href of new Set(links)) {
    if (href.startsWith("#"))
      await expect(page.locator(`[id="${href.slice(1)}"]`)).toHaveCount(1);
    if (href.startsWith("/"))
      expect((await request.get(href.split("#")[0])).ok()).toBe(true);
    expect(href).not.toBe("https://github.com/");
  }
  await expect(page.locator(".current-badge")).toHaveCount(2);
  for (const forbidden of [
    "SQL Specialist",
    "Pipeline GCP",
    "DeepSeek",
    "Jumper",
    "Trainee",
    "três semanas",
  ])
    await expect(page.locator("body")).not.toContainText(forbidden);
  const pdf = await request.get(profile.resume);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  const download = page.waitForEvent("download");
  await page
    .locator(".hero-actions")
    .getByRole("link", { name: /Baixar currículo/ })
    .click();
  expect((await download).suggestedFilename()).toBe(
    "Rodrigo_Pereira_Curriculo.pdf",
  );
});

test("reduced motion removes smooth scrolling and page content survives without JS", async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => window.getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 360, height: 800 },
  });
  const staticPage = await context.newPage();
  await staticPage.goto("/");
  await expect(staticPage.locator("h1")).toBeVisible();
  await expect(
    staticPage.getByRole("link", { name: "Ver casos reais" }),
  ).toBeVisible();
  await staticPage.goto(caseUrl(cases[0]));
  await expect(
    staticPage.getByRole("heading", { name: "Minha contribuição" }),
  ).toBeVisible();
  await context.close();
});

test("contact validates, submits to a mock, prevents duplicates and reports success", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4175/tests/fixtures/contact.html");
  await page.getByRole("button", { name: "Enviar mensagem" }).click();
  await expect(page.getByLabel("Seu nome")).toBeFocused();
  await expect(page.getByLabel("Seu nome")).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  await page.getByLabel("Seu nome").fill("Teste automatizado");
  await page.getByLabel("Seu e-mail").fill("invalid");
  await page
    .getByLabel("Mensagem", { exact: true })
    .fill("Teste local, não enviar.");
  await page.getByRole("button", { name: "Enviar mensagem" }).click();
  await expect(page.getByText("Informe um e-mail válido.")).toBeVisible();
  await page.getByLabel("Seu e-mail").fill("teste@example.com");
  let calls = 0;
  await page.route("https://api.emailjs.com/**", async (route) => {
    calls++;
    expect(route.request().postDataJSON().template_params.from_email).toBe(
      "teste@example.com",
    );
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.fulfill({ status: 200, body: "OK" });
  });
  await page.locator("form").evaluate((form) => {
    form.requestSubmit();
    form.requestSubmit();
  });
  await expect(page.getByRole("status")).toContainText("Mensagem enviada");
  await expect(page.getByLabel("Mensagem", { exact: true })).toHaveValue("");
  expect(calls).toBe(1);
});

test("contact preserves message after mocked network failure and permits retry", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4175/tests/fixtures/contact.html");
  await page.getByLabel("Seu nome").fill("Teste");
  await page.getByLabel("Seu e-mail").fill("teste@example.com");
  await page
    .getByLabel("Mensagem", { exact: true })
    .fill("Mensagem a preservar");
  await page.route("https://api.emailjs.com/**", (route) =>
    route.fulfill({ status: 500, body: "Mock error" }),
  );
  await page.getByRole("button", { name: "Enviar mensagem" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Não foi possível enviar",
  );
  await expect(page.getByLabel("Mensagem", { exact: true })).toHaveValue(
    "Mensagem a preservar",
  );
  await expect(
    page.getByRole("button", { name: "Enviar mensagem" }),
  ).toBeEnabled();
});
