// Fonte: briefing e currículo fornecidos por Rodrigo em 02/11/2026.
// Resultados corporativos confirmados por ele; nenhum dado interno é publicado.
export const profile = {
  name: "Rodrigo da Silva Pereira",
  shortName: "Rodrigo Pereira",
  positioning: "Dados e IA Aplicada | Automação e Agentes de IA",
  location: "Curitiba/PR",
  email: "2005rodrigosilva@gmail.com",
  github: "https://github.com/RodrigoSilvaPereira",
  linkedin: "https://www.linkedin.com/in/rohsilva/",
  resume: "/documents/Rodrigo_Pereira_AI_Builder_iFood.pdf",
  site: "https://datarodrigo.vercel.app",
  intro:
    "Construo automações e soluções de dados para resolver problemas de negócio. Combino Python, SQL e n8n com agentes de IA para desenvolver ferramentas de apoio à operação e à redução de custos.",
  context:
    "Analista de Banco de Dados na Gritsch Logística, com atuação na Torre de Controle.",
};

export const navigation = [
  ["inicio", "Início"],
  ["casos", "Casos"],
  ["ia-na-pratica", "IA na prática"],
  ["experiencia", "Experiência"],
  ["contato", "Contato"],
];

export const cases = [
  {
    slug: "automacao-relatorios",
    number: "01",
    category: "AUTOMAÇÃO · CAPITAL HUMANO",
    title: "Relatórios que deixam de ocupar dias.",
    shortTitle: "Automação de relatórios",
    metric: "3 dias → 3 horas",
    metricLabel: "Prazo de processamento dos relatórios",
    summary:
      "Integração ao Sistema Senior e execução assíncrona para transformar uma rotina manual em um fluxo automatizado.",
    context:
      "Na atuação em dados de Capital Humano da Gritsch, a emissão de relatórios dependia de tarefas manuais e de etapas de processamento que ocupavam dias.",
    problem:
      "Reduzir o prazo de processamento e o esforço recorrente na preparação dos relatórios.",
    contribution:
      "Desenvolvi a automação e as integrações para organizar a extração e o processamento dos dados, considerando as regras da rotina de Capital Humano.",
    solution:
      "Combinei Python, SQL, APIs e n8n com integração ao Sistema Senior. A execução assíncrona permitiu reduzir o prazo de processamento dos relatórios.",
    ai: "Usei agentes de IA como apoio ao desenvolvimento e à revisão técnica. Esse uso descreve o processo de construção; não há evidência de um LLM executando dentro do workflow de relatórios.",
    result:
      "O prazo relatado passou de três dias para três horas, com execução assíncrona.",
    evidence:
      "Resultado relatado por Rodrigo e registrado no currículo fornecido. O fluxo apresentado é uma representação abstrata das etapas, sem detalhes dos sistemas internos.",
    limits:
      "A duração da jornada de cada dia não foi definida, portanto o resultado não é convertido em percentual. Código, dados de colaboradores e relatórios corporativos não são públicos.",
    technologies: ["Python", "SQL", "APIs REST", "n8n", "Sistema Senior"],
    flow: [
      ["Origem", "Sistema Senior"],
      ["Integração", "SQL + APIs"],
      ["Processamento", "Python + n8n"],
      ["Entrega", "Relatórios"],
    ],
  },
  {
    slug: "bi-manutencao",
    number: "02",
    category: "BI · MANUTENÇÃO",
    title: "Histórico de manutenção a serviço da decisão.",
    shortTitle: "BI de manutenção",
    metric: "5% a 10%",
    metricLabel: "Economia medida nos custos de manutenção",
    summary:
      "Histórico de serviços e comparação de preços por localidade para apoiar planejamento e negociação.",
    context:
      "Na Torre de Controle da Gritsch, o histórico de manutenções e os preços dos serviços precisam apoiar decisões de planejamento e gestão de custos.",
    problem:
      "Consolidar as informações para comparar serviços por localidade e apoiar ações de redução de manutenção corretiva e negociação.",
    contribution:
      "Desenvolvi o BI de manutenção, consolidando o histórico de serviços e organizando comparações de preços por localidade para a operação.",
    solution:
      "Estruturei a leitura do histórico e das comparações em BI para apoiar o planejamento e a negociação dos serviços de manutenção.",
    ai: "Agentes de IA fazem parte do meu processo de análise e desenvolvimento, com revisão técnica. Não foi documentado um modelo preditivo ou um LLM em execução neste BI.",
    result:
      "As ações de planejamento e negociação apoiadas pelo BI contribuíram para uma economia medida de 5% a 10% nos custos de manutenção, confirmada por Rodrigo.",
    evidence:
      "Resultado realizado e confirmado por Rodrigo, também registrado no currículo. O diagrama apresenta somente a lógica geral da solução.",
    limits:
      "Período, valores em reais, método de medição e base de comparação não foram fornecidos. O caso não demonstra previsão de falhas ou modelo de machine learning em produção.",
    technologies: [
      "Consolidação de dados",
      "Histórico de serviços",
      "BI",
      "Comparação por localidade",
    ],
    flow: [
      ["Dados", "Histórico de serviços"],
      ["Análise", "Preços por localidade"],
      ["Apoio", "Planejamento"],
      ["Ação", "Negociação"],
    ],
  },
  {
    slug: "inteligencia-combustivel",
    number: "03",
    category: "BI · COMBUSTÍVEL",
    title: "Visibilidade para agir sobre o custo de combustível.",
    shortTitle: "Inteligência de combustível",
    metric: "10% a 15%",
    metricLabel: "Redução mensal medida no custo de combustível por filial",
    coverage: "Cerca de 15 filiais",
    summary:
      "Comparação de preços, variações e postos para orientar ações corretivas em cerca de 15 filiais.",
    context:
      "A gestão de combustível na Torre de Controle da Gritsch demanda acompanhar preços e suas variações em diferentes filiais e postos.",
    problem:
      "Dar visibilidade às diferenças de preço para orientar ações corretivas no custo de combustível por filial.",
    contribution:
      "Construí o dashboard de inteligência de preços de combustível, organizando as comparações por filial e posto para apoiar a operação.",
    solution:
      "Reuni preços, variações e comparações em um dashboard usado como apoio às ações corretivas em cerca de 15 filiais.",
    ai: "Utilizo agentes de IA para apoiar análises e o desenvolvimento das soluções, revisando a lógica e as entregas. Não há integração de API de IA em runtime demonstrada neste dashboard.",
    result:
      "As ações apoiadas pelo dashboard contribuíram para redução mensal medida de 10% a 15% no custo de combustível por filial, em cerca de 15 filiais, confirmada por Rodrigo.",
    evidence:
      "Resultado realizado, confirmado por Rodrigo e registrado no currículo. Não são publicados valores da operação nem dados corporativos identificáveis.",
    limits:
      "Não foram fornecidos período específico, média consolidada ou método de medição. O caso não atribui as variações a fatores nacionais ou internacionais.",
    technologies: [
      "Análise de preços",
      "BI",
      "Comparação por filial",
      "Comparação por posto",
    ],
    flow: [
      ["Dados", "Preços de combustível"],
      ["Comparação", "Filiais + postos"],
      ["Leitura", "Variações"],
      ["Ação", "Correções na operação"],
    ],
  },
];

export const workflow = [
  {
    title: "Entender",
    text: "Compreender o problema, as regras de negócio e a base de dados.",
  },
  {
    title: "Contextualizar",
    text: "Definir a tarefa e oferecer contexto relevante ao agente.",
  },
  {
    title: "Construir",
    text: "Analisar dados e desenvolver integrações com ferramentas.",
  },
  {
    title: "Revisar",
    text: "Conferir a lógica e a consistência técnica da solução.",
  },
  {
    title: "Validar",
    text: "Verificar a entrega no contexto do problema original.",
  },
];

export const skills = [
  {
    title: "Automatizar rotinas",
    text: "Conectar sistemas e reduzir etapas manuais de extração e processamento.",
    tools: ["Python", "n8n", "APIs REST"],
  },
  {
    title: "Organizar e analisar dados",
    text: "Consultar, integrar e validar informações para uma base confiável.",
    tools: ["SQL", "Pandas", "PostgreSQL", "SQL Server"],
  },
  {
    title: "Apoiar decisões da operação",
    text: "Traduzir histórico, preços e indicadores em comparações úteis para o negócio.",
    tools: ["Looker Studio", "Power BI"],
  },
  {
    title: "Desenvolver com agentes",
    text: "Combinar contexto de negócio, ferramentas e revisão técnica das entregas.",
    tools: ["Codex", "Claude Code", "MCP personalizado"],
  },
];

export const experiences = [
  {
    company: "Gritsch Logística",
    role: "Analista de Banco de Dados",
    period: "mai/2026 — atual",
    current: true,
    description:
      "Atuação inicial em dados de Capital Humano, seguida de promoção interna para a Torre de Controle. Desenvolvimento de soluções de apoio ao controle de logística, manutenção e combustível.",
    detail:
      "Os três casos selecionados apresentam as entregas e seus resultados.",
  },
  {
    company: "Kodland",
    role: "Instrutor Python",
    period: "nov/2025 — atual",
    current: true,
    description:
      "Ensino de Python e orientação de projetos práticos em turmas de até 15 alunos, com metodologias ativas e gamificação.",
    detail:
      "Engajamento de cerca de 65% para aproximadamente 90%: diferença de 25 pontos percentuais.",
  },
  {
    company: "Compass",
    role: "Engenheiro de Dados",
    period: "dez/2024 — abr/2025",
    description:
      "Pipelines ETL com SQL e Talend em projetos de migração de plataforma: integração de cinco ou mais fontes e cerca de 10 mil registros por dia.",
    detail:
      "Redução de inconsistências em cerca de 30% com rotinas de ingestão, transformação e validação.",
  },
  {
    company: "Sócio Consultorias",
    role: "Analista de Dados Freelancer",
    period: "fev/2024 — dez/2024",
    description:
      "Dashboards e organização do fluxo de dados para telemarketing e acompanhamento de contatos.",
    detail:
      "Redução de aproximadamente 30% no tempo de identificação e recontato; aumento de cerca de 10% a 20% na taxa de conversão.",
  },
  {
    company: "Compass",
    role: "Estágio de Dados em Nuvem",
    period: "fev/2024 — ago/2024",
    description:
      "Desafios práticos de ETL/ELT com Python e AWS: cinco ou mais fontes e cerca de 100 mil ou mais registros por desafio.",
    detail:
      "Redução de cerca de 30% no tempo de execução. Volumes referentes a desafios, não à produção diária de um cliente.",
  },
  {
    company: "Directa Treinamento e Soluções",
    role: "Instrutor de Informática",
    period: "set/2022 — fev/2024",
    description:
      "Planejamento e condução de aulas de informática e redes, com atividades práticas para dezenas de alunos.",
    detail:
      "Média de 90% nos indicadores de presença e formação, conforme currículo.",
  },
];

export const education = [
  {
    institution: "Faculdade Focus",
    course: "Pós-graduação em Engenharia de Dados e Inteligência Artificial",
    period: "jan/2026 — em andamento",
    status: "Em andamento",
  },
  {
    institution: "FATEC Registro",
    course: "Tecnólogo em Desenvolvimento de Software Multiplataforma",
    period: "jan/2023 — dez/2025",
    status: "Concluído",
  },
];

export const courses = [
  {
    provider: "TOTVS / DIO",
    title: "Fundamentos de Engenharia de Dados e Machine Learning",
    hours: "61h",
  },
  {
    provider: "Accenture / DIO",
    title: "Python para Análise e Automação de Dados",
    hours: "55h",
  },
  {
    provider: "NTT DATA / DIO",
    title: "Engenharia de Dados com Python e Power BI",
    hours: "91h",
  },
];

export const technicalProject = {
  title: "Pipeline AWS",
  url: "https://github.com/RodrigoSilvaPereira/Pipeline_AWS/tree/main",
  evidence:
    "https://github.com/RodrigoSilvaPereira/Pipeline_AWS/blob/main/README.md",
  description:
    "Projeto de aprendizado com dados de filmes: ingestão e transformação de CSV e JSON no S3, processamento com Lambda, Glue e PySpark e saída em Parquet para consultas e visualização com Athena e QuickSight.",
  tools: ["Python", "S3", "Lambda", "Glue", "PySpark", "Athena", "QuickSight"],
};

export function caseUrl(item) {
  return `/casos/${item.slug}/`;
}

export function getPage(pathname) {
  const path = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
  const item = cases.find((entry) => caseUrl(entry) === path);
  return { item, notFound: path !== "/" && !item };
}

export function getMetadata(pathname) {
  const { item, notFound } = getPage(pathname);
  const title = item
    ? `${item.shortTitle} | ${profile.shortName}`
    : notFound
      ? `Página não encontrada | ${profile.shortName}`
      : `${profile.shortName} | Dados e IA Aplicada`;
  const description = item
    ? `${item.summary} ${item.metricLabel}: ${item.metric}.`
    : "Rodrigo da Silva Pereira. Automações, soluções de dados e desenvolvimento com agentes de IA. Casos reais de eficiência operacional na Gritsch Logística.";
  return {
    title,
    description,
    canonical: `${profile.site}${item ? caseUrl(item) : "/"}`,
    notFound,
  };
}
