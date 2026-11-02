import { useRef, useState } from "react";
import { profile } from "../content";
import Icon from "./Icon";

const emailConfig = {
  serviceId: import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
};

export default function Contact({ config = emailConfig }) {
  const [state, setState] = useState({ type: "idle", message: "" });
  const [errors, setErrors] = useState({});
  const submitting = useRef(false);
  const configured = Boolean(
    config.serviceId && config.templateId && config.publicKey,
  );

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new window.FormData(form));
    const nextErrors = {};
    if (!fields.name.trim()) nextErrors.name = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
      nextErrors.email = "Informe um e-mail válido.";
    if (!fields.message.trim()) nextErrors.message = "Escreva uma mensagem.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.elements.namedItem(Object.keys(nextErrors)[0]).focus();
      setState({
        type: "error",
        message: "Confira os campos indicados antes de enviar.",
      });
      return;
    }
    if (!configured) {
      setState({
        type: "error",
        message:
          "O formulário está indisponível. Entre em contato por e-mail ou LinkedIn.",
      });
      return;
    }
    submitting.current = true;
    setState({ type: "sending", message: "Enviando sua mensagem…" });
    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        config.serviceId,
        config.templateId,
        {
          from_name: fields.name.trim(),
          to_name: profile.shortName,
          from_email: fields.email.trim(),
          to_email: profile.email,
          message: fields.message.trim(),
          reply_to: fields.email.trim(),
        },
        config.publicKey,
      );
      form.reset();
      setState({
        type: "success",
        message:
          "Mensagem enviada. Obrigado pelo contato! Responderei assim que possível.",
      });
    } catch {
      setState({
        type: "error",
        message:
          "Não foi possível enviar. Tente novamente ou use o e-mail ao lado. Sua mensagem foi mantida.",
      });
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      noValidate
      aria-label="Formulário de contato"
      aria-busy={state.type === "sending"}
    >
      <div className="form-topline">
        <h3>Envie uma mensagem</h3>
        <span>Todos os campos são obrigatórios</span>
      </div>
      {!configured && (
        <p className="form-notice">
          O formulário está indisponível nesta versão. Fale comigo por{" "}
          <a href={`mailto:${profile.email}`}>e-mail</a> ou{" "}
          <a href={profile.linkedin}>LinkedIn</a>.
        </p>
      )}
      <fieldset disabled={state.type === "sending" || !configured}>
        <div className="form-row">
          <div className="field">
            <label htmlFor="contact-name">Seu nome</label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={120}
              placeholder="Como posso chamar você?"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "error-name" : undefined}
            />
            {errors.name && (
              <p className="field-error" id="error-name">
                {errors.name}
              </p>
            )}
          </div>
          <div className="field">
            <label htmlFor="contact-email">Seu e-mail</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="voce@empresa.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "error-email" : undefined}
            />
            {errors.email && (
              <p className="field-error" id="error-email">
                {errors.email}
              </p>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="contact-message">Mensagem</label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            required
            maxLength={5000}
            placeholder="Conte sobre a oportunidade ou o problema que quer resolver."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "error-message" : undefined}
          />
          {errors.message && (
            <p className="field-error" id="error-message">
              {errors.message}
            </p>
          )}
        </div>
        <button
          className="button button-primary"
          type="submit"
          disabled={!configured}
        >
          {state.type === "sending" ? "Enviando…" : "Enviar mensagem"}
          <Icon name="arrow" size={18} />
        </button>
      </fieldset>
      <p
        className={`form-status ${state.type}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.message}
      </p>
      <p className="form-privacy">
        Ao enviar, seu nome, e-mail e mensagem serão encaminhados a Rodrigo via
        EmailJS para responder ao contato.
      </p>
    </form>
  );
}
