import { Injectable } from '@nestjs/common';
import { LRUCache } from 'lru-cache';

@Injectable()
export class CacheService {
  private lru = new LRUCache<string, any>({
    max: 1000,
    ttl: Number(process.env.CACHE_DEFAULT_TTL || 60) * 1000,
  });

  async get<T = any>(key: string) {
    return this.lru.get(key) as T | undefined;
  }
  async set(key: string, value: any, ttlSec = 60, swr = true) {
    this.lru.set(key, value, { ttl: ttlSec * 1000 });
    if (swr) {
      const delay = Math.max(0, (ttlSec - 5) * 1000);
      setTimeout(() => this.lru.delete(key), delay);
    }
  }
}
