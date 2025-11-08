import { Module } from '@nestjs/common';
import { AggregateModule } from './aggregate/aggregate.module';
import { ProvidersModule } from './providers/providers.module';
import { CacheModule } from './cache/cache.module';
import { HttpModule } from './http/http.module';
import { ObservabilityModule } from './observability/observability.module';
import { PrismaModule } from './persistence/prisma.module';
import { SseModule } from './sse/sse.module';
import { AuthModule } from './common/auth.module';

@Module({
  imports: [
    PrismaModule,
    HttpModule,
    CacheModule,
    ProvidersModule,
    AggregateModule,
    SseModule,
    ObservabilityModule,
    AuthModule,
  ],
})
export class AppModule {}
