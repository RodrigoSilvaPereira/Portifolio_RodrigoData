# Rodrigo Pereira — Dados e IA Aplicada

Portfólio em português brasileiro com casos profissionais de automação, BI e desenvolvimento assistido por agentes de IA. React 18 e Vite 4, com CSS e componentes sem dependências de animação ou WebGL.

## Executar localmente

Requer Node.js 22 e npm. No PowerShell com scripts desabilitados, use `npm.cmd` no lugar de `npm`.

```sh
npm ci
npm run dev
```

Para conferir a entrega de produção, incluindo o HTML indexável das páginas:

```sh
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

O build gera a home, três páginas de casos, o laboratório de IA, `404.html`, `robots.txt` e `sitemap.xml` em `dist/`. O build SSR em `dist-ssr/` é usado somente para gerar o HTML; a hospedagem continua estática, sem backend. O navegador hidrata esse conteúdo com React.

## Conteúdo e rotas

`src/content.js` concentra perfil, links, currículo, métricas, casos, experiências, cursos e metadados. O conteúdo usa os fatos do briefing e do PDF fornecidos em 02/11/2026. As ferramentas específicas dos dois BIs não foram inferidas a partir da lista geral de competências.

- `/`
- `/casos/automacao-relatorios/`
- `/casos/bi-manutencao/`
- `/casos/inteligencia-combustivel/`
- `/laboratorio-ia/`

Os antigos fragmentos `#about`, `#work` e `#contact` continuam funcionando. As novas seções usam `#inicio`, `#casos`, `#ia-na-pratica`, `#experiencia`, `#formacao` e `#contato`.

O PDF em `public/documents/` é a cópia integral do currículo atualizado fornecido por Rodrigo. Não foi reescrito. `public/social-card.png` é uma composição tipográfica local para compartilhamento, exportada com `node scripts/social-card.mjs`.

## Laboratório de IA

`src/lab/` reúne dados sintéticos, três prompts públicos, respostas do assistente registradas nesta sessão e funções de cálculo e validação. A confirmação de Rodrigo sobre uso pela Torre de Controle e diretoria está centralizada em `operationalUse`, em `src/content.js`.

O experimento documenta respostas produzidas com assistência do Codex e confere critérios por código. Não usa API de LLM, não compara modelos e não mede produtividade. O comparador de preços é uma ferramenta funcional de demonstração desenvolvida com assistência de IA; executa cálculos determinísticos no navegador. Diferença de custo hipotética nunca é apresentada como economia realizada.

```sh
npm run lab:verify
node public/laboratorio/reproduzir.mjs
```

`scripts/build-lab-artifacts.mjs` gera os downloads em `public/laboratorio/` antes de cada build, a partir das fontes em `src/lab/`. Não edite os artefatos gerados diretamente. São fornecidos prompts em Markdown, dados CSV/JSON, respostas e critérios em JSON, a função de análise e um script Node sem dependências. Para reproduzir em outra pasta, baixe `analisar-combustivel.mjs`, `dados-sinteticos.json` e `reproduzir.mjs` juntos e execute `node reproduzir.mjs`.

Cobertura das opções da candidatura e limites de evidência: [reports/LABORATORIO-IA.md](reports/LABORATORIO-IA.md).

## Contato

As três variáveis EmailJS existentes foram preservadas. Copie `.env.example` para `.env` e preencha os valores válidos, ou mantenha-os nas variáveis de build da Vercel. O formulário não é habilitado sem a configuração completa; e-mail e LinkedIn permanecem disponíveis.

Não inclua chaves privadas no frontend. As variáveis `VITE_*` são públicas e incorporadas ao build. Os testes interceptam todas as chamadas a `api.emailjs.com`; nenhuma mensagem real é enviada.

## Verificações

```sh
npm run lint
npm run build
npm test
npm run measure
```

Os testes usam o Google Chrome instalado (`channel: 'chrome'` no Playwright), um preview de produção na porta 4173 e um servidor Vite temporário na porta 4175 para o formulário isolado. A fixture do formulário não faz parte de `dist/`. A suíte cobre home, casos e laboratório em 360, 768 e 1440 px, axe WCAG A/AA, ausência de overflow e erros de console, menu por teclado, âncoras, redução de movimento, HTML sem JS, download do PDF, comparação editável e respostas simuladas de contato. Há testes com `node:test` para cálculo, dados ausentes e validação das respostas registradas.

`node scripts/capture-preview.mjs` salva capturas em `reports/previews/` com o preview aberto. `node scripts/performance.mjs <URL> <rótulo>` executa Lighthouse e salva relatório HTML, JSON e resumo. `scripts/measure-bundle.mjs` mede bytes brutos, gzip e Brotli com Node, sem confundir compressão local com transferência de rede.

Resultados, ambiente e pendências: [reports/VALIDACAO.md](reports/VALIDACAO.md).

## Publicação

Nenhuma publicação foi executada. `vercel.json` aponta o build para `dist/`, com URLs limpas. Antes de uma publicação autorizada, confira as variáveis EmailJS na Vercel e mantenha o domínio canônico em `src/content.js` e os endereços da imagem social em `index.html` coerentes com o domínio final.

Os assets antigos foram arquivados localmente em `.qa/removed-assets/`, fora do controle de versão e do build. As dependências Three.js, React Three Fiber/Drei, maath, tilt, Framer Motion, timeline, roteamento sem uso e Tailwind foram retiradas. O histórico Git também preserva a versão anterior.
