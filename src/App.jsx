import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Icon from "./components/Icon";
import Laboratory from "./components/Laboratory";
import { labPath } from "./lab/content";
import {
  Flow,
  Footer,
  ResumeLink,
  SectionHeading,
  Tags,
} from "./components/Shared";
import {
  cases,
  caseUrl,
  courses,
  education,
  experiences,
  getPage,
  profile,
  operationalUse,
  skills,
  technicalProject,
  workflow,
} from "./content";

function Hero() {
  return (
    <section
      className="hero"
      id="inicio"
      tabIndex={-1}
      aria-labelledby="hero-title"
    >
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="small-line" />
              AUTOMAÇÃO E AGENTES DE IA
            </p>
            <p className="hero-name">Rodrigo da Silva Pereira</p>
            <h1 id="hero-title">
              Dados e IA aplicada
              <span>
                para mover
                <br className="desktop-break" /> o negócio.
              </span>
            </h1>
            <p className="hero-description">{profile.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#casos">
                Ver casos reais <Icon size={18} />
              </a>
              <ResumeLink />
            </div>
            <div className="hero-socials">
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub <Icon name="external" size={14} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Icon name="external" size={14} />
              </a>
              <a href="#contato">
                Contato <Icon name="mail" size={15} />
              </a>
            </div>
          </div>
          <aside className="hero-aside" aria-label="Minha atuação atual">
            <div className="aside-top">
              <span className="eyebrow">NA PRÁTICA</span>
              <span className="location">
                <Icon name="pin" size={14} /> Curitiba, PR
              </span>
            </div>
            <h2>
              Da operação
              <br />à decisão.
            </h2>
            <p className="aside-description">
              Dados conectados. Rotinas automatizadas. Contexto para agir.
            </p>
            <ol className="hero-pipeline">
              <li>
                <span className="pipeline-icon">
                  <Icon name="database" />
                </span>
                <div>
                  <span>01 / DADOS</span>
                  <strong>Entender e conectar</strong>
                  <p>Bancos de dados e sistemas</p>
                </div>
              </li>
              <li>
                <span className="pipeline-icon">
                  <Icon name="flow" />
                </span>
                <div>
                  <span>02 / CONSTRUÇÃO</span>
                  <strong>Desenvolver com agentes</strong>
                  <p>Automação e revisão técnica</p>
                </div>
              </li>
              <li>
                <span className="pipeline-icon">
                  <Icon name="chart" />
                </span>
                <div>
                  <span>03 / NEGÓCIO</span>
                  <strong>Apoiar a operação</strong>
                  <p>Eficiência e gestão de custos</p>
                </div>
              </li>
            </ol>
            <div className="current-role">
              <span className="status-dot" />
              <p>{profile.context}</p>
            </div>
            <p className="diagram-caption">Síntese da atuação profissional</p>
          </aside>
        </div>
        <div className="impact" aria-label="Resultados selecionados na Gritsch">
          <div className="impact-label">
            <span className="eyebrow">IMPACTO EM CONTEXTO</span>
            <p>
              Entregas na
              <br />
              Gritsch Logística
            </p>
          </div>
          {cases.map((item) => (
            <a className="impact-item" href={caseUrl(item)} key={item.slug}>
              <strong>{item.metric}</strong>
              <span>{item.metricLabel}</span>
              {item.coverage && <small>{item.coverage}</small>}
            </a>
          ))}
        </div>
        <p className="impact-source">
          Resultados confirmados por Rodrigo. Escopo e limites da medição em
          cada caso.
        </p>
      </div>
    </section>
  );
}

function Cases() {
  return (
    <section className="section cases-section" id="casos" tabIndex={-1}>
      <div className="container">
        <span id="work" className="legacy-anchor" />
        <SectionHeading
          number="01"
          eyebrow="CASOS SELECIONADOS"
          title={
            <>
              Problemas reais.
              <br />
              Entregas com contexto.
            </>
          }
        >
          Da rotina manual à leitura de custos: três soluções construídas na
          Gritsch Logística.
        </SectionHeading>
        <div className="case-grid">
          {cases.map((item, index) => (
            <article
              className={`case-card ${index === 0 ? "case-featured" : ""}`}
              key={item.slug}
            >
              <div className="case-copy">
                <div className="case-top">
                  <p className="eyebrow">{item.category}</p>
                  <span className="case-number">/{item.number}</span>
                </div>
                <h3>
                  <a href={caseUrl(item)}>{item.title}</a>
                </h3>
                <p className="case-summary">{item.summary}</p>
                <Tags items={item.technologies} />
                <a className="text-link" href={caseUrl(item)}>
                  Conhecer o caso <Icon size={17} />
                </a>
              </div>
              <div className="case-outcome">
                <span className="outcome-label">RESULTADO REALIZADO</span>
                <strong>{item.metric}</strong>
                <p>{item.metricLabel}</p>
                {item.coverage && (
                  <span className="coverage">{item.coverage}</span>
                )}
                {index === 0 && (
                  <div className="mini-flow">
                    <span>Senior</span>
                    <Icon size={16} />
                    <span>Python + n8n</span>
                    <Icon size={16} />
                    <span>Relatórios</span>
                  </div>
                )}
                {index === 0 && (
                  <span className="mini-caption">
                    Fluxo abstrato da automação
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
        <p className="section-footnote">
          <Icon name="check" size={17} /> Casos corporativos descritos sem
          código, telas ou dados internos. Cada página explica contribuição,
          evidência e limitações.
        </p>
        <p className="operational-use">
          <strong>{operationalUse.status}.</strong> {operationalUse.statement}
        </p>
      </div>
    </section>
  );
}

function AIPractice() {
  return (
    <section className="section ai-section" id="ia-na-pratica" tabIndex={-1}>
      <div className="container">
        <span id="about" className="legacy-anchor" />
        <SectionHeading
          number="02"
          eyebrow="IA NA PRÁTICA"
          title={
            <>
              Agentes no processo.
              <br />
              Revisão em cada entrega.
            </>
          }
        >
          Uso Codex, Claude Code e MCP personalizado para analisar bancos,
          construir integrações e desenvolver soluções com contexto de negócio.
        </SectionHeading>
        <div className="ai-intro">
          <p>
            Combino conhecimento técnico com agentes de IA para aumentar a
            produtividade na análise e no desenvolvimento. A lógica e a
            validação das entregas passam pela minha revisão.
          </p>
          <p>
            <strong>MCP, em poucas palavras:</strong> é um mecanismo para
            integrar agentes a ferramentas e contexto. Uso essa conexão no
            trabalho de análise e construção das soluções.
          </p>
        </div>
        <figure className="workflow-figure">
          <figcaption className="eyebrow">MEU FLUXO DE TRABALHO</figcaption>
          <ol className="workflow">
            {workflow.map((step, i) => (
              <li key={step.title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {i < workflow.length - 1 && <Icon size={18} />}
              </li>
            ))}
          </ol>
        </figure>
        <div className="ai-distinction">
          <div>
            <span className="mini-label">COMO A IA PARTICIPA</span>
            <h3>Cada uso tem um papel.</h3>
          </div>
          <dl>
            <div>
              <dt>Desenvolvimento assistido por IA</dt>
              <dd>
                Uso documentado no meu processo: apoio à análise e à construção,
                com revisão técnica.
              </dd>
            </div>
            <div>
              <dt>Agentes usando ferramentas</dt>
              <dd>
                Uso de Codex, Claude Code e MCP personalizado na análise de
                bancos e no desenvolvimento de integrações.
              </dd>
            </div>
            <div>
              <dt>API de IA dentro da solução</dt>
              <dd>
                É quando a aplicação chama um serviço de IA durante a execução.
                Essa integração não foi demonstrada nos casos apresentados.
              </dd>
            </div>
          </dl>
        </div>
        <div className="ai-lab-link">
          <div>
            <h3>Explore o laboratório de IA aplicada.</h3>
            <p>
              Prompts estruturados, respostas registradas e uma ferramenta
              interativa com dados sintéticos. Código e critérios de validação
              disponíveis.
            </p>
          </div>
          <a className="button button-primary" href={labPath}>
            Abrir laboratório <Icon size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills-section">
      <div className="container">
        <SectionHeading
          number="03"
          eyebrow="COMPETÊNCIAS APLICADAS"
          title="Ferramentas a serviço do problema."
        />
        <div className="skills-grid">
          {skills.map((item, index) => (
            <article key={item.title}>
              <span className="skill-icon">
                <Icon
                  name={["flow", "database", "chart", "code"][index]}
                  size={24}
                />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Tags items={item.tools} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section
      className="section experience-section"
      id="experiencia"
      tabIndex={-1}
    >
      <div className="container">
        <SectionHeading
          number="04"
          eyebrow="TRAJETÓRIA & FORMAÇÃO"
          title="Construção técnica. Visão de negócio."
        >
          Experiência em dados, automação e ensino. Dois vínculos atuais, com
          atuações complementares.
        </SectionHeading>
        <div className="career-layout">
          <div>
            <h3 className="column-heading">Experiência profissional</h3>
            <ol className="timeline">
              {experiences.map((item) => (
                <li key={`${item.company}-${item.role}`}>
                  <div className="timeline-meta">
                    <span>{item.period}</span>
                    {item.current && (
                      <span className="current-badge">Atual</span>
                    )}
                  </div>
                  <h4>{item.role}</h4>
                  <p className="company-name">{item.company}</p>
                  <p>{item.description}</p>
                  <p className="experience-detail">{item.detail}</p>
                </li>
              ))}
            </ol>
          </div>
          <aside className="education" id="formacao">
            <h3 className="column-heading">Formação acadêmica</h3>
            {education.map((item) => (
              <article className="education-item" key={item.institution}>
                <p className="education-period">{item.period}</p>
                <h4>{item.course}</h4>
                <p>{item.institution}</p>
                <span className="education-status">{item.status}</span>
              </article>
            ))}
            <div className="courses">
              <h3>Cursos selecionados</h3>
              <ul>
                {courses.map((item) => (
                  <li key={item.provider}>
                    <span>
                      {item.provider} <span aria-hidden="true">·</span>{" "}
                      {item.hours}
                    </span>
                    <p>{item.title}</p>
                  </li>
                ))}
              </ul>
              <p className="language">
                <strong>Idiomas</strong>
                <br />
                Português nativo · Inglês intermediário
              </p>
            </div>
            <ResumeLink className="text-link" />
          </aside>
        </div>
      </div>
    </section>
  );
}

function TechnicalProject() {
  return (
    <section className="section technical-section">
      <div className="container technical-layout">
        <div>
          <p className="eyebrow">
            <span>05</span> PROJETO TÉCNICO COMPLEMENTAR
          </p>
          <h2>
            Uma base que também
            <br />
            pode ser explorada.
          </h2>
          <p>Projeto de aprendizado com código e documentação públicos.</p>
        </div>
        <article className="technical-card">
          <div className="technical-top">
            <Icon name="database" size={27} />
            <span>ESTUDO PRÁTICO · AWS</span>
          </div>
          <h3>{technicalProject.title}</h3>
          <p>{technicalProject.description}</p>
          <Tags items={technicalProject.tools} />
          <div className="technical-links">
            <a
              className="text-link"
              href={technicalProject.url}
              target="_blank"
              rel="noreferrer"
            >
              Explorar repositório <Icon name="external" size={16} />
            </a>
            <a
              href={technicalProject.evidence}
              target="_blank"
              rel="noreferrer"
            >
              Ler documentação
            </a>
          </div>
          <p className="technical-note">
            Contexto de formação técnica; não é uma solução de cliente em
            produção.
          </p>
        </article>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contato" tabIndex={-1}>
      <div className="container">
        <span id="contact" className="legacy-anchor" />
        <div className="contact-layout">
          <div className="contact-copy">
            <p className="eyebrow">
              <span>06</span> CONTATO
            </p>
            <h2>
              Vamos conversar
              <br />
              sobre o próximo
              <br />
              <span>problema a resolver.</span>
            </h2>
            <p>
              Para oportunidades em Dados, Automação e IA Aplicada, entre em
              contato.
            </p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              <Icon name="mail" />
              {profile.email}
            </a>
            <div className="contact-socials">
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Icon name="external" size={16} />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub <Icon name="external" size={16} />
              </a>
            </div>
            <ResumeLink />
            <p className="contact-location">
              <Icon name="pin" size={16} />
              {profile.location}
            </p>
          </div>
          <Contact />
        </div>
      </div>
    </section>
  );
}

function CasePage({ item }) {
  const next = cases[(cases.indexOf(item) + 1) % cases.length];
  return (
    <>
      <main id="conteudo" tabIndex={-1} className="case-page">
        <div className="container">
          <nav className="breadcrumb" aria-label="Caminho de navegação">
            <a href="/">Início</a>
            <span aria-hidden="true">/</span>
            <a href="/#casos">Casos</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{item.shortTitle}</span>
          </nav>
          <header className="case-page-heading">
            <p className="eyebrow">
              GRITSCH LOGÍSTICA <span aria-hidden="true">/</span>{" "}
              {item.category}
            </p>
            <h1>{item.title}</h1>
            <p>{item.summary}</p>
            <Tags items={item.technologies} />
          </header>
          <div className="case-page-layout">
            <article className="case-narrative">
              <section>
                <h2>O contexto e o problema</h2>
                <p>{item.context}</p>
                <p>{item.problem}</p>
              </section>
              <section>
                <h2>Minha contribuição</h2>
                <p>{item.contribution}</p>
              </section>
              <section>
                <h2>A solução</h2>
                <p>{item.solution}</p>
                <Flow items={item.flow} />
              </section>
              <section>
                <h2>Onde a IA participa</h2>
                <p>{item.ai}</p>
              </section>
              <section>
                <h2>Resultado e evidência</h2>
                <p>{item.result}</p>
                <p>{item.evidence}</p>
                <p>{operationalUse.statement}</p>
              </section>
              <section>
                <h2>Escopo e limites</h2>
                <p>{item.limits}</p>
              </section>
              <SyntheticExample item={item} />
            </article>
            <aside className="case-summary-panel">
              <span className="eyebrow">RESULTADO EM CONTEXTO</span>
              <strong>{item.metric}</strong>
              <p>{item.metricLabel}</p>
              {item.coverage && (
                <span className="coverage">{item.coverage}</span>
              )}
              <hr />
              <h2>Sobre a entrega</h2>
              <dl>
                <div>
                  <dt>Empresa</dt>
                  <dd>Gritsch Logística</dd>
                </div>
                <div>
                  <dt>Atuação</dt>
                  <dd>Analista de Banco de Dados</dd>
                </div>
                <div>
                  <dt>Evidência</dt>
                  <dd>{operationalUse.evidence}</dd>
                </div>
                <div>
                  <dt>{operationalUse.status}</dt>
                  <dd className="adoption-dd">{operationalUse.audience}</dd>
                </div>
              </dl>
              <ResumeLink className="text-link" />
              <a className="button button-primary" href="/#contato">
                Conversar sobre o caso <Icon size={16} />
              </a>
            </aside>
          </div>
          <nav className="case-bottom-nav" aria-label="Outros casos">
            <a href="/#casos" className="text-link">
              Todos os casos
            </a>
            <a href={caseUrl(next)}>
              Próximo: {next.shortTitle} <Icon size={17} />
            </a>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SyntheticExample({ item }) {
  // Deliberately static and separate from every reported business result.
  const examples = {
    "automacao-relatorios": [
      ["Origem", "Registro de exemplo no sistema"],
      ["Processamento", "Rotina Python orquestrada pelo n8n"],
      ["Saída", "Relatório de exemplo"],
    ],
    "bi-manutencao": [
      ["Localidade A", "Serviço de exemplo: R$ 400"],
      ["Localidade B", "Mesmo serviço de exemplo: R$ 460"],
    ],
    "inteligencia-combustivel": [
      ["Filial A / Posto A", "Preço de exemplo: R$ 6,20/L"],
      ["Filial A / Posto B", "Preço de exemplo: R$ 6,45/L"],
    ],
  };
  return (
    <section className="synthetic-example">
      <p className="eyebrow">EXEMPLO ESTÁTICO · DADOS SINTÉTICOS</p>
      <h2>Uma leitura da lógica do caso</h2>
      <p>
        Conteúdo fictício apenas para ilustrar a organização das informações.
        Não é uma tela do sistema nem evidência dos resultados relatados.
      </p>
      <table>
        <caption>Exemplo sintético de {item.shortTitle.toLowerCase()}</caption>
        <thead>
          <tr>
            <th scope="col">Etapa ou referência</th>
            <th scope="col">Informação ilustrativa</th>
          </tr>
        </thead>
        <tbody>
          {examples[item.slug].map(([label, value]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {item.slug === "inteligencia-combustivel" && (
        <a className="text-link" href={`${labPath}#demonstracao`}>
          Explorar a ferramenta com dados sintéticos <Icon size={16} />
        </a>
      )}
    </section>
  );
}

export default function App({ path = "/" }) {
  const { item, laboratory, notFound } = getPage(path);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Navbar home={!item && !laboratory && !notFound} />
      {item ? (
        <CasePage item={item} />
      ) : laboratory ? (
        <Laboratory />
      ) : notFound ? (
        <>
          <main id="conteudo" tabIndex={-1} className="container not-found">
            <p className="eyebrow">404</p>
            <h1>Página não encontrada.</h1>
            <p>Explore os casos e a trajetória no portfólio.</p>
            <a className="button button-primary" href="/">
              Ir para o início <Icon />
            </a>
          </main>
          <Footer />
        </>
      ) : (
        <>
          <main id="conteudo" tabIndex={-1}>
            <Hero />
            <Cases />
            <AIPractice />
            <Skills />
            <Experience />
            <TechnicalProject />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
