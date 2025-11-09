export function normalizeOpenMeteo(res: any) {
  return {
    source: 'open-meteo',
    at: new Date().toISOString(),
    temperatureC: res?.current_weather?.temperature,
    windKph: res?.current_weather?.windspeed,
  };
}
