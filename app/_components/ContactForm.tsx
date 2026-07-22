"use client";

import { FormEvent, useState } from "react";

type ContactFormProps = {
  kind: "home" | "insurance" | "utility";
};

const destination = [115, 117, 110, 103, 114, 105, 100, 109, 114, 111, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109]
  .map((code) => String.fromCharCode(code))
  .join("");

export function ContactForm({ kind }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const isHome = kind === "home";
  const isInsurance = kind === "insurance";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${destination}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!response.ok) throw new Error("Falha no envio");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-busy={status === "sending"}>
      <input
        type="hidden"
        name="_subject"
        value={isHome
          ? "Nova solicitação de avaliação — Site Sungrid"
          : `Nova solicitação — ${isInsurance ? "Seguro Fotovoltaico" : "Manutenção de Grandes Usinas"}`}
      />
      <input type="hidden" name="_template" value="table" />
      {!isHome && (
        <input
          type="hidden"
          name="Interesse"
          value={isInsurance ? "Seguro de sistema fotovoltaico" : "Manutenção para grandes usinas"}
        />
      )}
      <input className="honey-field" type="text" name="_honey" tabIndex={-1} autoComplete="off" />

      {isHome ? (
        <>
          <label>Seu nome<input type="text" name="Nome" placeholder="Como podemos chamar você?" autoComplete="name" required /></label>
          <label>E-mail<input type="email" name="Email" placeholder="seuemail@exemplo.com" autoComplete="email" required /></label>
          <label>Telefone / WhatsApp<input type="tel" name="Telefone" placeholder="(12) 99999-9999" autoComplete="tel" inputMode="tel" required /></label>
          <label>Cidade / Estado<input type="text" name="Cidade" placeholder="Onde está o sistema?" autoComplete="address-level2" required /></label>
          <label>Tipo de sistema<select name="Tipo de sistema" defaultValue="Residencial"><option>Residencial</option><option>Comercial</option><option>Industrial</option><option>Rural</option></select></label>
        </>
      ) : (
        <>
          <label>Nome / Empresa<input type="text" name="Nome ou empresa" placeholder="Como devemos chamar você?" autoComplete="organization" required /></label>
          <div className="form-row">
            <label>E-mail<input type="email" name="Email" placeholder="seuemail@empresa.com" autoComplete="email" required /></label>
            <label>Telefone / WhatsApp<input type="tel" name="Telefone" placeholder="(12) 99999-9999" autoComplete="tel" inputMode="tel" required /></label>
          </div>
          <label>{isInsurance ? "Potência aproximada do sistema" : "Potência instalada da usina"}<input type="text" name="Potência do sistema" placeholder={isInsurance ? "Ex.: 10 kWp, 75 kWp..." : "Ex.: 1 MWp, 5 MWp..."} required /></label>
        </>
      )}

      <button className="button primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : isHome ? "Enviar solicitação gratuita" : "Solicitar contato"}
        <span aria-hidden="true">↗</span>
      </button>

      <div className={`form-feedback ${status}`} role="status" aria-live="polite">
        {status === "success" && "Solicitação enviada. A equipe Sungrid entrará em contato em breve."}
        {status === "error" && "Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp."}
      </div>
      <small>{isHome
        ? "Sem compromisso. Seus dados serão enviados com segurança para o atendimento da Sungrid."
        : "Seus dados serão usados somente para o atendimento desta solicitação."}</small>
    </form>
  );
}
