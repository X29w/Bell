import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateSpaceDto {
  @ApiProperty({ description: '空间名称', example: 'Kitchen Inventory' })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiPropertyOptional({ description: '图标 URL' })
  @IsOptional()
  @IsString()
  iconUrl?: string;
}
