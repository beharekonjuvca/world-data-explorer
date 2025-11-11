import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

function toArray(val: unknown): string[] {
  if (Array.isArray(val)) return val.map(String);
  if (typeof val === 'string') {
    return val
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export class AggregateQueryDto {
  @ApiProperty({
    example: ['weather.open-meteo', 'rest-countries'],
    type: [String],
  })
  @Transform(({ value }) => toArray(value))
  @IsArray()
  providers!: string[];

  @ApiProperty({
    required: false,
    description: 'JSON string of provider params',
  })
  @IsOptional()
  @IsString()
  params?: string;
}
