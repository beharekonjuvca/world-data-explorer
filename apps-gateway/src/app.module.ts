import { Module } from '@nestjs/common';
import { HttpModule } from './http/http.module';
import { ProvidersModule } from './providers/providers.module';
import { CacheModule } from './cache/cache.module';
import { AggregateModule } from './aggregate/aggregate.module';

@Module({
  imports: [HttpModule, ProvidersModule, CacheModule, AggregateModule],
})
export class AppModule {}
