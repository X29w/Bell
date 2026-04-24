import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, Query, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CommodityService } from './commodity.service';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';
import { QueryCommodityDto } from './dto/query-commodity.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Commodity')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@Controller('commodity')
export class CommodityController {
  constructor(private readonly commodityService: CommodityService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '添加物品' })
  @ApiResponse({ status: 201, description: '物品添加成功' })
  create(@Body() dto: CreateCommodityDto, @CurrentUser('id') userId: string) {
    return this.commodityService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: '查询物品列表（支持筛选/排序）' })
  @ApiResponse({ status: 200, description: '返回物品列表' })
  findAll(@Query() query: QueryCommodityDto) {
    return this.commodityService.findAll(query);
  }

  @Get('statistics')
  @ApiOperation({ summary: '获取统计数据' })
  @ApiQuery({ name: 'spaceId', description: '空间 ID' })
  @ApiResponse({ status: 200, description: '返回 expired/soon/total 统计' })
  getStatistics(@Query('spaceId') spaceId: string) {
    return this.commodityService.getStatistics(spaceId);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取物品详情' })
  @ApiParam({ name: 'id', description: '物品 ID' })
  @ApiResponse({ status: 200, description: '返回物品详情' })
  findOne(@Param('id') id: string) {
    return this.commodityService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新物品' })
  @ApiParam({ name: 'id', description: '物品 ID' })
  @ApiResponse({ status: 200, description: '物品更新成功' })
  update(@Param('id') id: string, @Body() dto: UpdateCommodityDto) {
    return this.commodityService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除物品' })
  @ApiParam({ name: 'id', description: '物品 ID' })
  @ApiResponse({ status: 200, description: '物品删除成功' })
  remove(@Param('id') id: string) {
    return this.commodityService.remove(id);
  }
}
