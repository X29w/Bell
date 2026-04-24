import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpsertReminderDto } from './dto/upsert-reminder.dto';

@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** 设置/更新提醒（upsert） */
  async upsert(dto: UpsertReminderDto, userId: string) {
    const reminder = await this.prisma.reminder.upsert({
      where: {
        commodityId_userId: {
          commodityId: dto.commodityId,
          userId,
        },
      },
      update: {
        daysBefore: dto.daysBefore,
        isEnabled: dto.isEnabled,
      },
      create: {
        commodityId: dto.commodityId,
        userId,
        daysBefore: dto.daysBefore ?? 2,
        isEnabled: dto.isEnabled ?? true,
      },
    });

    this.logger.log(`提醒设置成功: commodity=${dto.commodityId}, user=${userId}`);
    return reminder;
  }

  /** 获取物品的提醒设置 */
  async findByCommodity(commodityId: string, userId: string) {
    return this.prisma.reminder.findUnique({
      where: {
        commodityId_userId: { commodityId, userId },
      },
    });
  }
}
