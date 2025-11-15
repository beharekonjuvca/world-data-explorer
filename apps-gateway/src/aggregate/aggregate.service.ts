import { Injectable } from '@nestjs/common';
import pLimit from 'p-limit';
import { HttpService } from '../http/http.service';
import { ProviderRegistryService } from '../providers/provider-registry.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class AggregateService {
  constructor(
    private http: HttpService,
    private reg: ProviderRegistryService,
    private cache: CacheService,
  ) {}

  async aggregate(ids: string[], params: Record<string, any>) {
    const limit = pLimit(6);
    const results = await Promise.all(
      ids.map((id) => limit(() => this.fetchOne(id, params[id] ?? params))),
    );
    return { results };
  }

  private async fetchOne(id: string, p: Record<string, any>) {
    const spec = this.reg.get(id);
    const key = `prov:${id}:${JSON.stringify(p || {})}`;
    const cached = await this.cache.get(key);
    if (cached) return { id, data: cached, cache: true };

    const url = new URL(spec.endpoint, spec.baseUrl);
    Object.entries(p || {}).forEach(([k, v]) =>
      url.searchParams.set(k, String(v)),
    );

    const { body } = await this.http.get(
      url.origin,
      url.pathname + '?' + url.searchParams.toString(),
    );

    let data = body;
    if (id === 'weather.open-meteo') {
      data = (
        await import('../providers/transforms/weather.transform.js')
      ).normalizeOpenMeteo(body);
    }
    if (id === 'rest-countries') {
      data = (
        await import('../providers/transforms/restcountries.transform.js')
      ).normalizeRestCountries(body);
    }
    if (id === 'exchange-rate') {
      data = (
        await import('../providers/transforms/exchange-rate.transform.js')
      ).normalizeExchangeRate(body);
    }
    if (id === 'openaq') {
      data = (
        await import('../providers/transforms/openaq.transform.js')
      ).normalizeOpenAQ(body);
    }

    await this.cache.set(key, data, spec.cache?.ttl ?? 60, true);
    return { id, data, cache: false };
  }
}
