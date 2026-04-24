import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';

export class UpsertReminderDto {
  @ApiProperty({ description: '物品 ID' })
  @IsUUID()
  commodityId: string;

  @ApiPropertyOptional({ description: '提前几天提醒', example: 2, default: 2 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(30)
  daysBefore?: number;

  @ApiPropertyOptional({ description: '是否启用', default: true })
  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}
