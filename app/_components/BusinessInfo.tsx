export const businessInfo = {
  name: "SunGrid Solar - Energia solar e manutenção",
  alternateName: "Sungrid",
  telephone: "+55 12 99188-6006",
  displayTelephone: "(12) 99188-6006",
  streetAddress: "R. Cel. José Domingues de Vasconcelos, 181",
  addressLocality: "São José dos Campos",
  addressRegion: "SP",
  postalCode: "12243-840",
  addressCountry: "BR",
  formattedAddress: "R. Cel. José Domingues de Vasconcelos, 181 - Vila Adyana, São José dos Campos - SP, 12243-840",
} as const;

export function FooterNap() {
  return (
    <address className="footer-nap">
      <strong>{businessInfo.name}</strong>
      <span>{businessInfo.formattedAddress}</span>
      <a href={`tel:${businessInfo.telephone.replace(/\s/g, "")}`}>{businessInfo.displayTelephone}</a>
    </address>
  );
}
