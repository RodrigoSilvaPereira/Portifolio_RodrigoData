# Reformulação do portfólio — validação local

Entrega de 02/11/2026. Implementação local; nenhuma publicação, push ou envio de e-mail real foi executado.

## Resultado implementado

- React 18 + Vite 4 preservados, com CSS e componentes simples. Não houve migração de framework nem criação de backend.
- Posicionamento em Dados e IA Aplicada, com automação, agentes e contexto de negócio. Azul, fundo neutro, fontes do sistema e interface sem animação permanente.
- Três páginas de casos profissionais, com contexto, problema, contribuição, solução, papel da IA, resultado, evidência e limites. Diagramas abstratos e exemplos estáticos explicitamente sintéticos.
- Gritsch e Kodland como vínculos atuais; experiências e formação corrigidas conforme briefing e currículo. Datas simultâneas não são somadas em anos de carreira.
- Métricas preservadas: três dias para três horas sem conversão em percentual; manutenção de 5% a 10%; combustível com redução mensal de 10% a 15% por filial, em cerca de 15 filiais.
- Pipeline AWS mantido como aprendizado complementar, após leitura do [README público](https://github.com/RodrigoSilvaPereira/Pipeline_AWS/blob/main/README.md). Não é apresentado como produção de cliente.
- SQL Specialist, Pipeline GCP, depoimentos de template e conteúdo antigo conflitante removidos. DeepSeek não foi incluído.
- Removidos Three.js, React Three Fiber/Drei, maath, tilt, Framer Motion, componente de timeline, roteamento sem uso e Tailwind. Assets obsoletos arquivados localmente em `.qa/removed-assets/`, fora de `public/`, do build e do Git.
- Menu móvel com botão, estado expandido, Escape, retorno de foco e navegação por teclado. Links semânticos, foco visível, compensação de âncoras e redução de movimento.
- EmailJS preservado com os mesmos nomes de variáveis, carregamento do SDK apenas no envio, validação, estados acessíveis, bloqueio de submissão duplicada e preservação da mensagem em erro.
- PDF atualizado disponível para download. SHA-256 igual ao arquivo original: `5AB36524F8A9463DFDFE744F0CD7DD72C715A33CB66FE835DFC2320DF4F6B303`.
- HTML de produção pré-renderizado para home e casos, hidratado por React. Metadados por página, canonical, Open Graph, cartão social, JSON-LD, sitemap, robots e página 404. A home mantém os antigos fragmentos `#about`, `#work` e `#contact`.

## Verificações executadas

- `npm run build`: passou; gera home, três casos e 404, além de sitemap e robots.
- `npm run lint`: passou, sem erros ou avisos de lint.
- `npm test`: 8 testes passaram na execução final, em 13,7 s.
- Home e três casos testados em 360, 768 e 1440 px: sem rolagem horizontal, sem canvas e sem erros de console ou de execução.
- axe-core com WCAG 2 A/AA e 2.1 AA: nenhuma violação automatizada detectada nas 12 combinações de página/largura. Isso não substitui uma auditoria humana completa.
- Teclado: skip link, menu, Escape, retorno de foco, fechamento ao navegar e compensação do header fixo verificados.
- `prefers-reduced-motion` e conteúdo essencial sem JavaScript verificados.
- Links internos e âncoras verificados; repositório AWS e currículo têm destinos reais.
- Download do PDF confirmado em navegador, com cabeçalho PDF e nome de download correto.
- Contato testado em fixture local isolada: campos inválidos, sucesso, submissão duplicada e falha com manutenção do texto. Todas as chamadas EmailJS foram interceptadas; nenhuma mensagem real foi enviada. A fixture não integra `dist/`.
- Capturas inspecionadas nas três larguras, com página de caso em desktop. Capturas finais em [previews/](previews/).
- `git diff --check`: passou. O Git informou apenas a normalização habitual LF/CRLF na cópia de trabalho Windows.

## Bundles em condições equivalentes

Build original preservado antes das alterações em `.qa/baseline/`; build final em `dist/`. Ambos gerados localmente com Vite 4.1.4 e Node 22.14.0. Bytes brutos medidos a partir dos arquivos, gzip e Brotli calculados com os mesmos padrões do `node:zlib`. Não são tamanhos de transferência observados em produção.

| Artefato         | Antes, bytes brutos | Depois, bytes brutos | Antes, gzip | Depois, gzip | Antes, Brotli | Depois, Brotli |
| ---------------- | ------------------: | -------------------: | ----------: | -----------: | ------------: | -------------: |
| JavaScript total |           1.125.756 |              180.588 |     327.231 |       58.272 |       264.984 |         50.971 |
| CSS total        |              22.816 |               32.739 |       5.165 |        7.019 |         4.500 |          6.045 |

Redução de aproximadamente 84,0% no JavaScript bruto e 82,2% no gzip. O total final inclui o chunk EmailJS de 1.518 bytes brutos (782 gzip), carregado somente ao enviar o formulário. A folha CSS aumentou para cobrir as novas páginas, a navegação e os formulários acessíveis.

Medições detalhadas: [antes](bundle-before.json) e [depois](bundle-after.json).

## Lighthouse: laboratório local

Windows, Node 22.14.0, Lighthouse 12.8.2 e Headless Chrome 156.0.0.0. Ambos os builds servidos pelo mesmo tipo de servidor: Python 3.13.2 `http.server`, loopback, sem compressão HTTP. Portas 4174 (original) e 4176 (final). Execuções sequenciais; não simultâneas aos testes de navegador. URLs locais e ausência de CDN/cache de produção limitam a generalização.

Configuração móvel padrão do Lighthouse, throttling simulado: RTT 150 ms, throughput 1.638,4 Kbps e CPU 4×. Execuções observadas em 02/11/2026, aproximadamente 17:37 e 17:40, horário de Brasília. Não é medição de Core Web Vitals de campo.

| Medição        |    Antes | Depois |
| -------------- | -------: | -----: |
| Performance    |       29 |     97 |
| Acessibilidade |       92 |    100 |
| Boas práticas  |       96 |    100 |
| SEO            |       91 |    100 |
| FCP            |   6,92 s | 2,11 s |
| LCP            |  13,31 s | 2,11 s |
| CLS            |   0,0117 |      0 |
| TBT            | 2.354 ms |   0 ms |

Sem avisos de execução nos dois relatórios. A execução final atende aos alvos locais de LCP ≤ 2,5 s e CLS ≤ 0,1 sob essas condições. Uma execução não garante o desempenho futuro nem resultados de campo.

Relatórios completos: [antes](lighthouse/before.html) e [depois](lighthouse/after.html). Dados: [resumo anterior](lighthouse/before-summary.json) e [resumo final](lighthouse/after-summary.json).

## Pendências e limites concretos

1. Não há variáveis EmailJS disponíveis neste checkout. O formulário de produção fica desabilitado com alternativas diretas de e-mail e LinkedIn. Para habilitar, preencher os valores válidos da conta existente conforme `.env.example`, ou conservar os já configurados na Vercel, e reconstruir. A configuração da Vercel não foi lida nem alterada remotamente.
2. Períodos, bases de comparação e métodos de medição dos resultados corporativos não foram fornecidos; esses limites estão nas páginas. Ferramentas específicas dos dois BIs não foram inventadas. As métricas são confirmadas por Rodrigo e pelo currículo, sem auditoria independente de dados internos.
3. A página oficial da vaga respondeu HTTP 403 à leitura automática. O alinhamento de conteúdo segue o briefing fornecido, sem afirmar elegibilidade, contratação ou vínculo com o iFood.
4. Publicação permanece pendente de instrução explícita. Não houve push, commit ou alteração remota na Vercel.

Preview de produção: `npm run preview -- --host 127.0.0.1 --port 4173`, após `npm run build`. Endereço local: `http://127.0.0.1:4173/`.
