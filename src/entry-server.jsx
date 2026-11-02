import { renderToString } from "react-dom/server";
import App from "./App";
import { cases, caseUrl, getMetadata, profile } from "./content";

export const routes = ["/", ...cases.map(caseUrl), "/404/"];
export function render(path) {
  const meta = getMetadata(path);
  const person = {
    "@type": "Person",
    "@id": `${profile.site}/#rodrigo`,
    name: profile.name,
    url: profile.site,
    jobTitle: "Analista de Banco de Dados",
    sameAs: [profile.github, profile.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Curitiba",
      addressRegion: "PR",
      addressCountry: "BR",
    },
  };
  return {
    html: renderToString(<App path={path} />),
    meta,
    structured: {
      "@context": "https://schema.org",
      "@graph": [
        person,
        {
          "@type": "WebPage",
          "@id": meta.canonical,
          url: meta.canonical,
          name: meta.title,
          description: meta.description,
          inLanguage: "pt-BR",
          about: { "@id": `${profile.site}/#rodrigo` },
        },
      ],
    },
  };
}
