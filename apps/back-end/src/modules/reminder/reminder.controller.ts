import { Controller, Get, Put, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ReminderService } from './reminder.service';
import { UpsertReminderDto } from './dto/upsert-reminder.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Reminder')
@ApiBearerAuth('Authorization')
@UseGuards(JwtAuthGuard)
@Controller('reminder')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Put()
  @ApiOperation({ summary: '设置/更新提醒' })
  @ApiResponse({ status: 200, description: '提醒设置成功' })
  upsert(@Body() dto: UpsertReminderDto, @CurrentUser('id') userId: string) {
    return this.reminderService.upsert(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: '获取物品的提醒设置' })
  @ApiQuery({ name: 'commodityId', description: '物品 ID' })
  @ApiResponse({ status: 200, description: '返回提醒设置' })
  findByCommodity(
    @Query('commodityId') commodityId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.reminderService.findByCommodity(commodityId, userId);
  }
}
