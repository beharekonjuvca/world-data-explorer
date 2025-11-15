export function normalizeOpenAQ(res: any) {
  const result = res?.results?.[0] ?? {};
  const measurements = result?.measurements ?? [];

  // Build a quick lookup by parameter name (lowercased)
  const byParam = Object.fromEntries(
    measurements.map((m: any) => [
      String(m?.parameter ?? '').toLowerCase(),
      m?.value,
    ]),
  );

  return {
    source: 'openaq',
    at: new Date().toISOString(),
    // Common pollutants; values are typically in µg/m³
    pm25: byParam['pm25'] ?? null,
    pm10: byParam['pm10'] ?? null,
    no2: byParam['no2'] ?? null,
    o3: byParam['o3'] ?? null,
    so2: byParam['so2'] ?? null,
    // optional raw for debugging
    // raw: res
  };
}
