import { profile } from "../content";
import Icon from "./Icon";

export function ResumeLink({ className = "button button-secondary" }) {
  return (
    <a
      className={className}
      href={profile.resume}
      download="Rodrigo_Pereira_Curriculo.pdf"
    >
      <Icon name="download" size={18} /> Baixar currículo{" "}
      <span className="sr-only">(PDF)</span>
    </a>
  );
}
export function Tags({ items }) {
  return (
    <ul className="tags" aria-label="Tecnologias e aplicações">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
export function SectionHeading({ number, eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}
export function Flow({
  items,
  caption = "Representação abstrata do fluxo da solução. Sem dados corporativos.",
}) {
  return (
    <figure className="flow-figure">
      <ol className="solution-flow">
        {items.map(([label, value], i) => (
          <li key={label}>
            <span className="flow-index">0{i + 1}</span>
            <span className="flow-label">{label}</span>
            <strong>{value}</strong>
            {i < items.length - 1 && <Icon size={16} />}
          </li>
        ))}
      </ol>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="footer-name" href="/">
          {profile.shortName}
          <span>Dados, automação e IA aplicada.</span>
        </a>
        <p>
          {profile.location} <span aria-hidden="true">·</span> Português e
          inglês intermediário
        </p>
        <a href="/#inicio">
          Voltar ao início <Icon size={16} />
        </a>
      </div>
    </footer>
  );
}
