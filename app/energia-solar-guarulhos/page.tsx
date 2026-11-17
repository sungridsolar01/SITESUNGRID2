import { CityLanding, cityMetadata } from "../_components/CityLanding";

export const metadata = cityMetadata("guarulhos");

export default function EnergiaSolarGuarulhosPage() {
  return <CityLanding slug="guarulhos" />;
}
