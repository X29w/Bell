import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';

@Injectable()
export class SpaceService {
  private readonly logger = new Logger(SpaceService.name);

  constructor(private readonly prisma: PrismaService) {}

  /** 创建空间，自动生成邀请码，创建者成为 owner */
  async create(dto: CreateSpaceDto, userId: string) {
    const inviteCode = this.generateInviteCode();

    const space = await this.prisma.space.create({
      data: {
        ...dto,
        inviteCode,
        ownerId: userId,
        members: {
          create: { userId, role: 'owner' },
        },
      },
    });

    this.logger.log(`空间创建成功: ${space.name} (${space.inviteCode})`);
    return space;
  }

  /** 获取用户加入的所有空间 */
  async findAllByUser(userId: string) {
    return this.prisma.space.findMany({
      where: { members: { some: { userId } } },
      include: {
        _count: { select: { commodities: true, members: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /** 获取空间详情（含成员列表） */
  async findOne(id: string, userId: string) {
    const space = await this.prisma.space.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: { select: { id: true, name: true, email: true, avatarUrl: true } },
          },
        },
        _count: { select: { commodities: true } },
      },
    });

    if (!space) {
      throw new NotFoundException(`空间 ${id} 不存在`);
    }

    this.checkMembership(space.members, userId);
    return space;
  }

  /** 更新空间信息（仅 owner/admin） */
  async update(id: string, dto: UpdateSpaceDto, userId: string) {
    const space = await this.findOne(id, userId);
    this.checkAdminRole(space.members, userId);

    return this.prisma.space.update({
      where: { id },
      data: dto,
    });
  }

  /** 删除空间（仅 owner） */
  async remove(id: string, userId: string) {
    const space = await this.findOne(id, userId);

    if (space.ownerId !== userId) {
      throw new ForbiddenException('只有空间拥有者才能删除空间');
    }

    await this.prisma.space.delete({ where: { id } });
    this.logger.log(`空间删除成功: ${id}`);
  }

  /** 通过邀请码加入空间 */
  async join(inviteCode: string, userId: string) {
    const space = await this.prisma.space.findUnique({
      where: { inviteCode },
    });

    if (!space) {
      throw new NotFoundException('邀请码无效');
    }

    const existing = await this.prisma.spaceMember.findUnique({
      where: { userId_spaceId: { userId, spaceId: space.id } },
    });

    if (existing) {
      throw new ConflictException('你已经是该空间的成员');
    }

    await this.prisma.spaceMember.create({
      data: { userId, spaceId: space.id, role: 'member' },
    });

    this.logger.log(`用户 ${userId} 加入空间 ${space.name}`);
    return space;
  }

  /** 移除成员（owner/admin 可操作，不能移除 owner） */
  async removeMember(spaceId: string, targetUserId: string, operatorId: string) {
    const space = await this.findOne(spaceId, operatorId);
    this.checkAdminRole(space.members, operatorId);

    const target = space.members.find((m) => m.userId === targetUserId);
    if (!target) {
      throw new NotFoundException('该用户不是空间成员');
    }
    if (target.role === 'owner') {
      throw new ForbiddenException('不能移除空间拥有者');
    }

    await this.prisma.spaceMember.delete({
      where: { userId_spaceId: { userId: targetUserId, spaceId } },
    });
  }

  /** 生成 XXX-XXX-X 格式的邀请码 */
  private generateInviteCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const pick = (n: number) =>
      Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${pick(3)}-${pick(3)}-${pick(1)}`;
  }

  /** 检查用户是否为空间成员 */
  private checkMembership(members: { userId: string }[], userId: string) {
    if (!members.some((m) => m.userId === userId)) {
      throw new ForbiddenException('你不是该空间的成员');
    }
  }

  /** 检查用户是否为 owner 或 admin */
  private checkAdminRole(members: { userId: string; role: string }[], userId: string) {
    const member = members.find((m) => m.userId === userId);
    if (!member || !['owner', 'admin'].includes(member.role)) {
      throw new ForbiddenException('权限不足');
    }
  }
}
