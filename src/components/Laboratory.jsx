import { useState } from "react";
import { cases, caseUrl, operationalUse } from "../content";
import { fuelRows, lab, prompts, trials } from "../lab/content";
import { analyzeFuel } from "../lab/analysis";
import { verifyTrial } from "../lab/verify";
import { Footer, Tags } from "./Shared";
import Icon from "./Icon";
import "../lab/styles.css";

const money = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
const number = (value) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 4 }).format(value);

function Prompt({ item, first }) {
  const [feedback, setFeedback] = useState("");
  async function copy() {
    try {
      await window.navigator.clipboard.writeText(item.text);
      setFeedback("Prompt copiado.");
    } catch {
      setFeedback("Selecione o texto do prompt e copie com o teclado.");
    }
  }
  return (
    <article className="prompt-card">
      <p className="eyebrow">{item.category}</p>
      <h3>{item.title}</h3>
      <p>{item.goal}</p>
      <details open={first}>
        <summary>Ver prompt completo</summary>
        <pre
          className="lab-code"
          tabIndex={0}
          aria-label={`Prompt completo: ${item.title}`}
        >
          {item.text}
        </pre>
      </details>
      <div className="prompt-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={copy}
        >
          Copiar prompt <Icon name="code" size={16} />
        </button>
        <span role="status" aria-live="polite">
          {feedback}
        </span>
      </div>
    </article>
  );
}

function Experiment() {
  return (
    <section
      className="lab-section"
      id="experimento"
      aria-labelledby="experiment-heading"
    >
      <div className="lab-section-heading">
        <p className="eyebrow">02 / EXPERIMENTO DOCUMENTADO</p>
        <h2 id="experiment-heading">
          Uma resposta só é útil quando pode ser conferida.
        </h2>
        <p>
          O mesmo prompt de análise, três entradas sintéticas e critérios
          explícitos. As respostas registradas ficam disponíveis; a verificação
          automática confere formato, aritmética e limites declarados.
        </p>
      </div>
      <div className="lab-provenance">
        <Icon name="code" size={20} />
        <p>{lab.provenance}</p>
      </div>
      <ol className="experiment-method">
        <li>
          <span>01</span> Prompt e entrada definidos
        </li>
        <li>
          <span>02</span> Resposta do assistente registrada
        </li>
        <li>
          <span>03</span> Números conferidos por função
        </li>
        <li>
          <span>04</span> Limites e resultado inspecionáveis
        </li>
      </ol>
      <div className="trial-list">
        {trials.map((trial) => (
          <article className="trial" key={trial.id}>
            <div className="trial-heading">
              <h3>{trial.title}</h3>
              <span className="lab-badge">DADOS SINTÉTICOS</span>
            </div>
            <p>{trial.purpose}</p>
            <ul className="trial-checks">
              {verifyTrial(trial).map((check) => (
                <li key={check.label}>
                  <Icon name={check.passed ? "check" : "close"} size={16} />
                  <span>
                    {check.label}: {check.passed ? "verificado" : "rever"}
                  </span>
                </li>
              ))}
            </ul>
            <details>
              <summary>Inspecionar entrada e resposta registrada</summary>
              <h4>Entrada sintética</h4>
              <pre
                className="lab-code"
                tabIndex={0}
                aria-label={`Entrada sintética: ${trial.title}`}
              >
                {JSON.stringify(trial.input, null, 2)}
              </pre>
              <h4>Resposta do assistente de IA</h4>
              <pre
                className="lab-code"
                tabIndex={0}
                aria-label={`Resposta registrada: ${trial.title}`}
              >
                {JSON.stringify(trial.response, null, 2)}
              </pre>
            </details>
          </article>
        ))}
      </div>
      <p className="lab-note">
        Esta é uma verificação de exemplos registrados, não um benchmark de
        modelos nem uma garantia de resistência a instruções maliciosas. As
        validações textuais são simples e não substituem revisão humana. Nenhuma
        consulta a um LLM ocorre ao abrir esta página.
      </p>
      <a className="text-link" href="/laboratorio/experimento.json" download>
        Baixar entradas, respostas e validações (JSON){" "}
        <Icon name="download" size={16} />
      </a>
    </section>
  );
}

function FuelDemo() {
  const [rows, setRows] = useState(() => fuelRows.map((row) => ({ ...row })));
  const [branch, setBranch] = useState("Todas");
  const [edited, setEdited] = useState(false);
  const selected = rows.filter(
    (row) => branch === "Todas" || row.branch === branch,
  );
  const result = analyzeFuel(selected);
  function update(id, field, value) {
    setEdited(true);
    setRows((current) =>
      current.map((row) =>
        row.id === id
          ? { ...row, [field]: value === "" ? null : Number(value) }
          : row,
      ),
    );
  }
  function reset() {
    setRows(fuelRows.map((row) => ({ ...row })));
    setBranch("Todas");
    setEdited(false);
  }
  return (
    <section
      className="lab-section"
      id="demonstracao"
      aria-labelledby="demo-heading"
    >
      <div className="lab-section-heading">
        <p className="eyebrow">03 / FERRAMENTA INTERATIVA</p>
        <h2 id="demo-heading">Compare preços. Confira os cálculos.</h2>
        <p>
          Uma demonstração pública desenvolvida com assistência de IA. Altere
          preços e volumes para explorar a análise por filial. Dados
          inteiramente sintéticos; cálculos locais, sem API de IA ou envio de
          dados.
        </p>
      </div>
      <div className="demo-panel">
        <div className="demo-toolbar">
          <div>
            <span className="lab-badge">
              DADOS SINTÉTICOS · MESMO COMBUSTÍVEL
            </span>
            <p>
              Filiais e postos fictícios, sem relação com a operação da Gritsch.
            </p>
          </div>
          <button type="button" className="text-link" onClick={reset}>
            Restaurar exemplo
          </button>
        </div>
        <div className="demo-filter">
          <label htmlFor="demo-branch">Filtrar filial</label>
          <select
            id="demo-branch"
            value={branch}
            onChange={(event) => setBranch(event.target.value)}
          >
            {["Todas", ...new Set(fuelRows.map((row) => row.branch))].map(
              (value) => (
                <option key={value}>{value}</option>
              ),
            )}
          </select>
          <span role="status" aria-live="polite">
            {edited
              ? "Exemplo sintético editado."
              : "Exemplo sintético original."}
          </span>
        </div>
        <div className="demo-table-wrap">
          <table className="demo-table">
            <caption>Registros sintéticos editáveis de abastecimento</caption>
            <thead>
              <tr>
                <th scope="col">Filial / posto</th>
                <th scope="col">Preço (R$/L)</th>
                <th scope="col">Volume (L)</th>
              </tr>
            </thead>
            <tbody>
              {selected.map((row) => (
                <tr key={row.id}>
                  <th scope="row">
                    {row.branch}
                    <span>{row.station}</span>
                  </th>
                  <td>
                    <label className="sr-only" htmlFor={`price-${row.id}`}>
                      Preço por litro: {row.branch}, {row.station}
                    </label>
                    <input
                      id={`price-${row.id}`}
                      type="number"
                      inputMode="decimal"
                      min="0.01"
                      max="100"
                      step="0.01"
                      required
                      value={row.price ?? ""}
                      onChange={(event) =>
                        update(row.id, "price", event.target.value)
                      }
                    />
                  </td>
                  <td>
                    <label className="sr-only" htmlFor={`liters-${row.id}`}>
                      Volume em litros: {row.branch}, {row.station}
                    </label>
                    <input
                      id={`liters-${row.id}`}
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max="1000000"
                      step="1"
                      required
                      value={row.liters ?? ""}
                      onChange={(event) =>
                        update(row.id, "liters", event.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {result.status === "invalid" ? (
          <div className="demo-errors" role="status">
            <strong>Análise pausada. Confira os dados:</strong>
            <ul>
              {result.errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div
            className="demo-results"
            aria-label="Resultados da simulação sintética"
          >
            {result.branches.map((item) => (
              <article key={item.branch}>
                <h3>{item.branch}</h3>
                <dl>
                  <div>
                    <dt>Volume sintético</dt>
                    <dd>{number(item.liters)} L</dd>
                  </div>
                  <div>
                    <dt>Custo sintético</dt>
                    <dd>{money(item.total)}</dd>
                  </div>
                  <div>
                    <dt>Média ponderada por litro</dt>
                    <dd>R$ {number(item.weightedPrice)}</dd>
                  </div>
                  <div>
                    <dt>Faixa observada por litro</dt>
                    <dd>
                      {money(item.minimum)} a {money(item.maximum)}
                    </dd>
                  </div>
                  <div className="hypothetical">
                    <dt>Diferença hipotética, não realizada</dt>
                    <dd>{money(item.hypotheticalDifference)}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        )}
        <p className="demo-limit">
          <strong>Como interpretar:</strong> a diferença hipotética compara o
          custo dos registros com o custo ao menor preço da mesma filial,
          mantendo o volume. Ela não representa economia realizada nem uma
          recomendação de compra: distância, disponibilidade e condições
          comerciais não foram consideradas.
        </p>
      </div>
      <details className="demo-formulas">
        <summary>Ver fórmulas e como reproduzir</summary>
        <dl>
          <div>
            <dt>Custo</dt>
            <dd>Soma de preço por litro × volume.</dd>
          </div>
          <div>
            <dt>Média ponderada</dt>
            <dd>Custo total ÷ volume total da mesma filial.</dd>
          </div>
          <div>
            <dt>Diferença hipotética</dt>
            <dd>Custo total − (menor preço da filial × volume total).</dd>
          </div>
        </dl>
        <p>
          Baixe os três arquivos para a mesma pasta e execute{" "}
          <code>node reproduzir.mjs</code>. O script usa apenas Node.js, sem
          dependências ou chamadas de rede. Reproduz o exemplo original.
        </p>
        <div className="lab-downloads">
          <a href="/laboratorio/analisar-combustivel.mjs" download>
            Função de análise (.mjs)
          </a>
          <a href="/laboratorio/dados-sinteticos.json" download>
            Dados sintéticos (.json)
          </a>
          <a href="/laboratorio/reproduzir.mjs" download>
            Script de reprodução (.mjs)
          </a>
          <a href="/laboratorio/dados-sinteticos.csv" download>
            Dados em CSV
          </a>
        </div>
      </details>
      <a className="text-link" href={caseUrl(cases[2])}>
        Ler o caso profissional de combustível <Icon size={16} />
      </a>
    </section>
  );
}

export default function Laboratory() {
  return (
    <>
      <main id="conteudo" tabIndex={-1} className="lab-page">
        <div className="container">
          <nav className="breadcrumb" aria-label="Caminho de navegação">
            <a href="/">Início</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Laboratório de IA</span>
          </nav>
          <header className="lab-hero">
            <p className="eyebrow">
              PROMPTS, EXPERIMENTOS E UMA FERRAMENTA PÚBLICA
            </p>
            <h1>
              Do prompt
              <br />
              <span>à validação.</span>
            </h1>
            <p>{lab.description}</p>
            <Tags
              items={[
                "Desenvolvimento assistido por IA",
                "Dados sintéticos",
                "Código reproduzível",
              ]}
            />
            <nav
              className="lab-jump-links"
              aria-label="Conteúdo do laboratório"
            >
              <a href="#prompts">
                Explorar prompts <Icon size={16} />
              </a>
              <a href="#experimento">
                Inspecionar experimento <Icon size={16} />
              </a>
              <a href="#demonstracao">
                Testar ferramenta <Icon size={16} />
              </a>
            </nav>
          </header>
          <aside className="lab-professional">
            <div>
              <p className="eyebrow">EXPERIÊNCIA PROFISSIONAL</p>
              <h2>Soluções já usadas na operação.</h2>
              <p>
                {operationalUse.statement} Os casos profissionais registram os
                resultados relatados; os exemplos deste laboratório usam dados
                sintéticos.
              </p>
            </div>
            <a className="text-link" href="/#casos">
              Ver casos e resultados <Icon size={16} />
            </a>
          </aside>
          <section
            className="lab-section"
            id="prompts"
            aria-labelledby="prompts-heading"
          >
            <div className="lab-section-heading">
              <p className="eyebrow">01 / PROMPTS ESTRUTURADOS</p>
              <h2 id="prompts-heading">
                Contexto, restrições e um resultado verificável.
              </h2>
              <p>
                Exemplos públicos preparados para este laboratório. Não são
                cópias dos prompts ou das configurações corporativas.
              </p>
            </div>
            <div className="prompts-grid">
              {prompts.map((item, index) => (
                <Prompt key={item.id} item={item} first={index === 0} />
              ))}
            </div>
            <a className="text-link" href="/laboratorio/prompts.md" download>
              Baixar os prompts (Markdown) <Icon name="download" size={16} />
            </a>
          </section>
          <Experiment />
          <FuelDemo />
          <div className="lab-closing">
            <h2>Contexto real, demonstração aberta.</h2>
            <p>
              Os resultados profissionais pertencem aos casos relatados na
              Gritsch. Este laboratório permite inspecionar o raciocínio, os
              limites e o código de exemplos públicos.
            </p>
            <a className="button button-primary" href="/#contato">
              Conversar sobre uma oportunidade <Icon size={16} />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
