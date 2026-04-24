import {
  Controller, Get, Post, Delete,
  Body, Param, Query, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Category')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '创建分类' })
  @ApiResponse({ status: 201, description: '分类创建成功' })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '获取空间下的分类' })
  @ApiQuery({ name: 'spaceId', description: '空间 ID' })
  @ApiResponse({ status: 200, description: '返回分类列表' })
  findBySpace(@Query('spaceId') spaceId: string) {
    return this.categoryService.findBySpace(spaceId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除分类' })
  @ApiParam({ name: 'id', description: '分类 ID' })
  @ApiResponse({ status: 200, description: '分类删除成功' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
