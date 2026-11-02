import { useEffect, useRef, useState } from "react";
import { navigation, profile } from "../content";
import Icon from "./Icon";

export default function Navbar({ home }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  const trigger = useRef(null);
  const menu = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const outside = (event) => {
      if (
        !menu.current?.contains(event.target) &&
        !trigger.current?.contains(event.target)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 900px)");
    const close = () => setOpen(false);
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  useEffect(() => {
    if (!home) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    navigation.forEach(([id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [home]);
  function navigate(_event, id) {
    setOpen(false);
    if (home) {
      setActive(id);
      document.getElementById(id)?.focus({ preventScroll: true });
    }
  }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          className="brand"
          href={home ? "#inicio" : "/"}
          aria-label={`${profile.shortName}, início`}
        >
          <span className="brand-symbol" aria-hidden="true">
            r<span>.</span>
          </span>
          <span>
            Rodrigo Pereira
            <span className="brand-subtitle">DADOS & IA APLICADA</span>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="navigation"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
          ref={trigger}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <nav
          id="navigation"
          aria-label="Navegação principal"
          className={open ? "navigation is-open" : "navigation"}
          ref={menu}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget) &&
              event.relatedTarget !== trigger.current
            )
              setOpen(false);
          }}
        >
          {navigation.map(([id, title]) => (
            <a
              key={id}
              href={`${home ? "" : "/"}#${id}`}
              aria-current={home && active === id ? "location" : undefined}
              onClick={(event) => navigate(event, id)}
            >
              {title}
            </a>
          ))}
          <a
            className="nav-linkedin"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <Icon name="external" size={14} />
          </a>
        </nav>
      </div>
    </header>
  );
}
