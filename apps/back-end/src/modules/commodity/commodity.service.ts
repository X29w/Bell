import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommodityDto } from './dto/create-commodity.dto';
import { UpdateCommodityDto } from './dto/update-commodity.dto';
import { QueryCommodityDto, CommodityStatus, CommoditySortBy } from './dto/query-commodity.dto';

/** 即将过期的天数阈值 */
const SOON_DAYS = 7;

@Injectable()
export class CommodityService {
  private readonly logger = new Logger(CommodityService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** 添加物品 */
  async create(dto: CreateCommodityDto, userId: string) {
    const commodity = await this.prisma.commodity.create({
      data: {
        ...dto,
        expiryDate: new Date(dto.expiryDate),
        createdById: userId,
      },
      include: { category: true },
    });

    this.logger.log(`物品添加成功: ${commodity.name}`);
    return commodity;
  }

  /** 查询物品列表（支持筛选/排序/搜索） */
  async findAll(query: QueryCommodityDto) {
    const where = this.buildWhereClause(query);
    const orderBy = this.buildOrderBy(query.sortBy);

    return this.prisma.commodity.findMany({
      where,
      orderBy,
      include: { category: true },
    });
  }

  /** 获取统计数据：expired / soon / total */
  async getStatistics(spaceId: string) {
    const now = new Date();
    const soonDate = new Date();
    soonDate.setDate(soonDate.getDate() + SOON_DAYS);

    const baseWhere = { spaceId, isUsed: false };

    const [expired, soon, total] = await Promise.all([
      this.prisma.commodity.count({ where: { ...baseWhere, expiryDate: { lt: now } } }),
      this.prisma.commodity.count({ where: { ...baseWhere, expiryDate: { gte: now, lte: soonDate } } }),
      this.prisma.commodity.count({ where: baseWhere }),
    ]);

    return { expired, soon, total };
  }

  /** 获取物品详情 */
  async findOne(id: string) {
    const commodity = await this.prisma.commodity.findUnique({
      where: { id },
      include: { category: true, reminders: true },
    });

    if (!commodity) {
      throw new NotFoundException(`物品 ${id} 不存在`);
    }

    return commodity;
  }

  /** 更新物品 */
  async update(id: string, dto: UpdateCommodityDto) {
    await this.findOne(id);

    const data: Record<string, unknown> = { ...dto };
    if (dto.expiryDate) {
      data.expiryDate = new Date(dto.expiryDate);
    }
    if (dto.isUsed) {
      data.usedAt = new Date();
    }

    return this.prisma.commodity.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  /** 删除物品 */
  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.commodity.delete({ where: { id } });
    this.logger.log(`物品删除成功: ${id}`);
  }

  /** 构建查询条件 */
  private buildWhereClause(query: QueryCommodityDto) {
    const now = new Date();
    const soonDate = new Date();
    soonDate.setDate(soonDate.getDate() + SOON_DAYS);

    const where: Record<string, unknown> = {
      spaceId: query.spaceId,
      isUsed: false,
    };

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.keyword) {
      where.name = { contains: query.keyword };
    }

    switch (query.status) {
      case CommodityStatus.EXPIRED:
        where.expiryDate = { lt: now };
        break;
      case CommodityStatus.SOON:
        where.expiryDate = { gte: now, lte: soonDate };
        break;
      case CommodityStatus.FRESH:
        where.expiryDate = { gt: soonDate };
        break;
    }

    return where;
  }

  /** 构建排序 */
  private buildOrderBy(sortBy?: CommoditySortBy) {
    switch (sortBy) {
      case CommoditySortBy.EXPIRY_ASC:
        return { expiryDate: 'asc' as const };
      case CommoditySortBy.EXPIRY_DESC:
        return { expiryDate: 'desc' as const };
      default:
        return { createdAt: 'desc' as const };
    }
  }
}
