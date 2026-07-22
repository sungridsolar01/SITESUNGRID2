type ContactFormProps = {
  kind: "home" | "insurance" | "utility";
};

export function ContactForm({ kind }: ContactFormProps) {
  const isHome = kind === "home";
  const isInsurance = kind === "insurance";

  return (
    <form className="contact-form" data-sungrid-form aria-busy="false">
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
      <input className="honey-field" type="text" name="_honey" tabIndex={-1} autoComplete="off" hidden aria-hidden="true" />

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

      <button className="button primary" type="submit">
        <span data-submit-label>{isHome ? "Enviar solicitação gratuita" : "Solicitar contato"}</span>
        <span aria-hidden="true">↗</span>
      </button>

      <div className="form-feedback" data-form-feedback role="status" aria-live="polite" />
      <small>{isHome
        ? "Sem compromisso. Seus dados serão enviados com segurança para o atendimento da Sungrid."
        : "Seus dados serão usados somente para o atendimento desta solicitação."}</small>
    </form>
  );
}
