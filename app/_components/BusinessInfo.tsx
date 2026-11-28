export const businessInfo = {
  name: "Sungrid Solar",
  alternateName: "Sungrid",
  telephone: "+55 12 99188-6006",
  displayTelephone: "(12) 99188-6006",
  email: "sungridmro@gmail.com",
  streetAddress: "R. Cel. José Domingues de Vasconcelos, 181",
  neighborhood: "Vila Adyana",
  addressLocality: "São José dos Campos",
  addressRegion: "SP",
  postalCode: "12243-840",
  addressCountry: "BR",
  formattedAddress: "R. Cel. José Domingues de Vasconcelos, 181, Vila Adyana, São José dos Campos - SP, 12243-840",
  latitude: -23.1960634,
  longitude: -45.8927814,
  hasMap: "https://www.google.com/maps/place/SunGrid+Solar+-+Energia+solar+e+manuten%C3%A7%C3%A3o/@-23.1960634,-45.8927814,17z",
  sameAs: [
    "https://www.instagram.com/sungridmro/",
    "https://www.linkedin.com/company/sungridmro/",
    "https://share.google/t0oRwIjyjMxfyupJK",
  ],
} as const;

export function FooterNap() {
  return (
    <address className="footer-nap">
      <strong>{businessInfo.name}</strong>
      <span>{businessInfo.formattedAddress}</span>
      <a href={`tel:${businessInfo.telephone.replace(/[^\d+]/g, "")}`}>{businessInfo.displayTelephone}</a>
      <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>
    </address>
  );
}
