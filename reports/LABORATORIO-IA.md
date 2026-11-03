# Evidências de IA aplicada — auditoria e entrega

02/11/2026. Ampliação local do portfólio, sem publicação automática, push, chamada de API de LLM ou envio de e-mail real.

## O que as opções da candidatura sustentam

| Opção                                                                         | Situação e evidência                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ainda não tenho portfólio, mas construo com IA no dia a dia                   | Não se aplica: Rodrigo já possui portfólio com casos profissionais. Essa opção impede interpretar “todas as opções” literalmente.                                                                                                                                                                         |
| Exemplos de prompts bem estruturados e experimentações com LLMs               | Acrescentados três prompts públicos e um registro de respostas do assistente de IA para três entradas sintéticas, com critérios e validação determinística. A origem e os limites do registro estão explícitos; não é uma comparação de modelos nem uma API de LLM em execução no site.                   |
| Automações que economizaram horas reais em processos                          | O caso de relatórios registra redução do prazo de processamento de três dias para três horas. Existe uma automação real com efeito no prazo, mas não foi informado o número de horas de trabalho manual poupadas. Não converter dias em horas de jornada nem tratar prazo decorrido como esforço manual.  |
| Ferramentas internas deployadas, dashboards ou agentes que resolvem problemas | Os casos documentam relatórios e dashboards. Rodrigo confirmou nesta conversa que as soluções estão em uso pela equipe da Torre de Controle e pela diretoria. Não se afirma que há um agente autônomo implantado.                                                                                         |
| Soluções em produção, usadas por outras pessoas, com resultados mensuráveis   | A confirmação de uso operacional pela equipe e diretoria foi adicionada aos casos. Os resultados relatados já incluem prazo de relatórios, economia de manutenção e redução mensal de combustível por filial. Evidência: relato de Rodrigo e currículo, sem auditoria independente dos sistemas internos. |
| Todas as opções acima                                                         | Não é a seleção literal adequada, pois contradiz a primeira alternativa. A opção mais forte sustentada pelo relato atual é “Soluções em produção, usadas por outras pessoas, com resultados mensuráveis”.                                                                                                 |

O portfólio demonstra as categorias positivas com graus distintos de evidência: casos corporativos relatados e confirmados por Rodrigo; exemplos públicos reproduzíveis com dados sintéticos. Uma demonstração nova não constitui histórico de uso por terceiros nem economia realizada.

## O que foi implementado

- Página `/laboratorio-ia/`, com HTML estático no build, metadados próprios, canonical e inclusão no sitemap.
- Chamada na seção “IA na prática” e ligação do caso de combustível para a ferramenta pública.
- Três prompts com papel, contexto, entradas, restrições, saída esperada e validação: análise de preços, revisão de SQL e planejamento de automação.
- Prompts copiáveis e disponíveis para download em Markdown. São exemplos preparados para o laboratório; não expõem configurações ou prompts corporativos.
- Experimento documentado: dados completos; volume ausente; instrução indevida em um campo de dados. Respostas produzidas pelo assistente de IA nesta sessão, sem API externa, registradas em JSON e conferidas por código. Não é benchmark ou teste geral de segurança de modelos.
- Validador com conferência de formato e filial, aritmética, abstenção por volume ausente, rótulo sintético e distinção entre cenário e economia realizada. As verificações textuais são simples e seus limites estão na página.
- Comparador funcional de preços: filtro por filial, edição de preços/volumes, média ponderada, custo, faixa de preços, cenário hipotético e restauração do exemplo. Entradas inválidas interrompem a exibição dos resultados.
- Todas as filiais, postos, preços e volumes do laboratório são sintéticos. A ferramenta calcula no navegador; não chama LLM, banco ou serviço externo e não é apresentada como cópia do dashboard corporativo.
- Materiais reproduzíveis sem dependências: dados JSON/CSV, função de análise `.mjs`, script Node e respostas/validações JSON. Gerados a partir de `src/lab/` antes do build.
- Uso operacional pela equipe da Torre de Controle e diretoria centralizado em `operationalUse`, conforme nova confirmação de Rodrigo. Nenhuma data adicional de implantação ou adoção foi inventada.

## Reproduzir

Na raiz do projeto:

```sh
npm run build
npm run lab:verify
node public/laboratorio/reproduzir.mjs
npm run preview -- --host 127.0.0.1 --port 4173
```

Preview: `http://127.0.0.1:4173/laboratorio-ia/`.

Para reprodução isolada, baixe `analisar-combustivel.mjs`, `dados-sinteticos.json` e `reproduzir.mjs` para a mesma pasta e execute `node reproduzir.mjs`. Não precisa instalar pacotes nem fornecer credenciais. O resultado é a análise do exemplo sintético original, não uma execução de modelo.

## Verificações da entrega final

- Build e lint passaram. O build gera seis documentos HTML: home, três casos, laboratório e 404.
- Cinco testes `node:test` passaram: médias ponderadas e separação por filial; dados inválidos; cenário sem diferença e CSV; respostas registradas; detecção de aritmética incorreta, volume inventado, filial incorreta, formato inválido e instrução indevida reproduzida.
- Onze testes Playwright passaram na execução final, em 17,9 s.
- Home, três casos e laboratório em 360, 768 e 1440 px: sem overflow horizontal, canvas, violações automatizadas axe WCAG A/AA ou erros de console/execução detectados.
- Testados filtro, recálculo, entrada ausente, restauração, cópia de prompt, downloads e presença dos dados/validações no JSON.
- Confirmado que o laboratório não efetua chamadas externas. Os testes de contato continuam usando interceptação de EmailJS, sem envio real.
- Navegação de teclado preservada. Blocos roláveis de prompt/JSON têm foco por teclado e indicação visível.
- `node public/laboratorio/reproduzir.mjs` executado: dados sintéticos e cálculos reconciliados com os testes.
- Inspeção visual e capturas em 360, 768 e 1440 px em [previews/](previews/). Nas capturas isoladas da ferramenta, header e skip link foram ocultados apenas durante a captura para evitar sobreposição do header sticky; as capturas completas mantêm a página original.
- `git diff --check` passou, com avisos usuais de normalização LF/CRLF no Windows.

## Performance observada

Lighthouse 12.8.2, Chrome Headless 156.0.0.0, Windows e Node 22.14.0, servidor local Vite Preview. Perfil móvel com throttling simulado: RTT 150 ms, throughput 1.638,4 Kbps, CPU 4×. Execução final do laboratório em 02/11/2026, aproximadamente 20:32, horário de Brasília, sem testes de navegador simultâneos.

| Medição do laboratório | Valor observado |
| ---------------------- | --------------: |
| Performance            |             100 |
| Acessibilidade         |             100 |
| Boas práticas          |             100 |
| SEO                    |             100 |
| LCP                    |          1,21 s |
| CLS                    |               0 |
| TBT                    |            0 ms |

Sem avisos de execução. Estes são resultados locais de uma execução de laboratório; não garantem desempenho de campo nem substituem revisão humana de acessibilidade. O servidor difere do usado na comparação histórica da primeira reformulação, portanto não se atribui uma melhoria comparativa a esses números.

Relatórios: [Lighthouse HTML](lighthouse/laboratorio.html) e [resumo JSON](lighthouse/laboratorio-summary.json).

JavaScript final: 203.160 bytes brutos no total, incluindo 1.518 bytes do chunk EmailJS carregado no envio; 65.346 bytes gzip e 57.118 bytes Brotli, calculados localmente com `node:zlib`. CSS: 42.895 bytes brutos, 8.658 gzip e 7.525 Brotli. Compressão medida em arquivo não é transferência de produção.

## Limites e publicação

Esta ampliação está pronta no checkout local. Não foram criados usuários, depoimentos, provas de adoção, integrações corporativas ou resultados de negócio novos. A adoção informada por Rodrigo foi registrada como relato confirmado. Datas, período de medição e método dos resultados corporativos continuam sem detalhes adicionais.

A publicação requer novo deploy do código atualizado na Vercel. A configuração de EmailJS e o erro de envio relatado anteriormente não foram alterados nesta tarefa; a causa daquele erro continua dependendo da resposta original da API. Os novos materiais não dependem do serviço de e-mail.
