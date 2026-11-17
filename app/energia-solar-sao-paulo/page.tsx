import { CityLanding, cityMetadata } from "../_components/CityLanding";

export const metadata = cityMetadata("sao-paulo");

export default function EnergiaSolarSaoPauloPage() {
  return <CityLanding slug="sao-paulo" />;
}
