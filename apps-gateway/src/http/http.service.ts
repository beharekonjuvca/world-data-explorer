import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'undici';

@Injectable()
export class HttpService implements OnModuleDestroy {
  private pools = new Map<string, Pool>();

  private pool(origin: string) {
    if (!this.pools.has(origin)) {
      this.pools.set(
        origin,
        new Pool(origin, {
          connections: 8,
          pipelining: 1,
          bodyTimeout: 15_000,
          headersTimeout: 15_000,
        }),
      );
    }
    return this.pools.get(origin)!;
  }

  async get(origin: string, path: string) {
    const res = await this.pool(origin).request({ method: 'GET', path });
    const json = await res.body.json();
    return { statusCode: res.statusCode, headers: res.headers, body: json };
  }

  async onModuleDestroy() {
    await Promise.all([...this.pools.values()].map((p) => p.close()));
  }
}
