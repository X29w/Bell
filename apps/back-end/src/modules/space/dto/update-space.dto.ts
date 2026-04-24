import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateSpaceDto {
  @ApiPropertyOptional({ description: '空间名称', example: 'Kitchen Inventory' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string;

  @ApiPropertyOptional({ description: '图标 URL' })
  @IsOptional()
  @IsString()
  iconUrl?: string;
}
