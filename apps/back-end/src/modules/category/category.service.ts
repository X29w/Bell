import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** 创建分类 */
  async create(dto: CreateCategoryDto) {
    const category = await this.prisma.category.create({ data: dto });
    this.logger.log(`分类创建成功: ${category.name}`);
    return category;
  }

  /** 获取空间下的所有分类 */
  async findBySpace(spaceId: string) {
    return this.prisma.category.findMany({
      where: { spaceId },
      include: { _count: { select: { commodities: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  /** 删除分类 */
  async remove(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`分类 ${id} 不存在`);
    }

    await this.prisma.category.delete({ where: { id } });
    this.logger.log(`分类删除成功: ${id}`);
  }
}
