import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export enum CommodityStatus {
  ALL = 'all',
  EXPIRED = 'expired',
  SOON = 'soon',
  FRESH = 'fresh',
}

export enum CommoditySortBy {
  EXPIRY_ASC = 'expiry_asc',
  EXPIRY_DESC = 'expiry_desc',
  CREATED_DESC = 'created_desc',
}

export class QueryCommodityDto {
  @ApiProperty({ description: '空间 ID' })
  @IsUUID()
  spaceId: string;

  @ApiPropertyOptional({ description: '状态筛选', enum: CommodityStatus })
  @IsOptional()
  @IsEnum(CommodityStatus)
  status?: CommodityStatus;

  @ApiPropertyOptional({ description: '分类 ID' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ description: '搜索关键词' })
  @IsOptional()
  @IsString()
  keyword?: string;

  @ApiPropertyOptional({ description: '排序方式', enum: CommoditySortBy })
  @IsOptional()
  @IsEnum(CommoditySortBy)
  sortBy?: CommoditySortBy;
}
