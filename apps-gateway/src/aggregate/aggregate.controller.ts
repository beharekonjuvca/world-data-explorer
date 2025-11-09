import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AggregateService } from './aggregate.service';
import { AggregateQueryDto } from './dto/aggregate.dto';

@ApiTags('aggregate')
@Controller('aggregate')
export class AggregateController {
  constructor(private svc: AggregateService) {}
  @Get()
  async aggregate(@Query() q: AggregateQueryDto) {
    const params = q.params ? JSON.parse(q.params) : {};
    return this.svc.aggregate(q.providers, params);
  }
}
