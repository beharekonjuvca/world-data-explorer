export function normalizeRestCountries(res: any) {
  const c = Array.isArray(res) ? res[0] : res;
  return {
    source: 'rest-countries',
    name: c?.name?.common,
    cca2: c?.cca2,
    population: c?.population,
    currencies: c?.currencies ? Object.keys(c.currencies) : [],
  };
}
