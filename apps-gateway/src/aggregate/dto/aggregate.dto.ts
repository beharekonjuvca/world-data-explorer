import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class AggregateQueryDto {
  @ApiProperty({ example: ['weather.open-meteo', 'rest-countries'] })
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
