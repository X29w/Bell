import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from "class-validator";

export class CreateCommodityDto {
  @ApiProperty({ description: "物品名称", example: "Organic Whole Milk" })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiPropertyOptional({ description: "图片 URL" })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ description: "过期日期", example: "2026-05-01T00:00:00.000Z" })
  @IsDateString()
  expiryDate: string;

  @ApiPropertyOptional({ description: "存放位置", example: "Refrigerator" })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: "数量", example: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  quantity?: number;

  @ApiProperty({ description: "所属空间 ID" })
  @IsUUID()
  spaceId: string;

  @ApiPropertyOptional({ description: "分类 ID" })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
