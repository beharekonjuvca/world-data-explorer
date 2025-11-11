export function normalizeExchangeRate(res: any) {
  return {
    source: 'exchange-rate',
    at: new Date().toISOString(),
    base: res?.base,
    date: res?.date,
    rates: res?.rates ?? {},
  };
}
