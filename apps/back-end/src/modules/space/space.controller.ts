import {
  Controller, Get, Post, Patch, Delete,
  Body, Param, UseGuards, HttpCode, HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { SpaceService } from './space.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { JoinSpaceDto } from './dto/join-space.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Space')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@Controller('space')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '创建空间' })
  @ApiResponse({ status: 201, description: '空间创建成功' })
  create(@Body() dto: CreateSpaceDto, @CurrentUser('id') userId: string) {
    return this.spaceService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: '获取我的空间列表' })
  @ApiResponse({ status: 200, description: '返回空间列表' })
  findAll(@CurrentUser('id') userId: string) {
    return this.spaceService.findAllByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取空间详情（含成员）' })
  @ApiParam({ name: 'id', description: '空间 ID' })
  @ApiResponse({ status: 200, description: '返回空间详情' })
  findOne(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.spaceService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新空间信息' })
  @ApiParam({ name: 'id', description: '空间 ID' })
  @ApiResponse({ status: 200, description: '空间更新成功' })
  update(@Param('id') id: string, @Body() dto: UpdateSpaceDto, @CurrentUser('id') userId: string) {
    return this.spaceService.update(id, dto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除空间（仅拥有者）' })
  @ApiParam({ name: 'id', description: '空间 ID' })
  @ApiResponse({ status: 200, description: '空间删除成功' })
  remove(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.spaceService.remove(id, userId);
  }

  @Post('join')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '通过邀请码加入空间' })
  @ApiResponse({ status: 200, description: '加入成功' })
  join(@Body() dto: JoinSpaceDto, @CurrentUser('id') userId: string) {
    return this.spaceService.join(dto.inviteCode, userId);
  }

  @Delete(':id/member/:userId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '移除空间成员' })
  @ApiParam({ name: 'id', description: '空间 ID' })
  @ApiParam({ name: 'userId', description: '要移除的用户 ID' })
  @ApiResponse({ status: 200, description: '成员移除成功' })
  removeMember(
    @Param('id') spaceId: string,
    @Param('userId') targetUserId: string,
    @CurrentUser('id') operatorId: string,
  ) {
    return this.spaceService.removeMember(spaceId, targetUserId, operatorId);
  }
}
