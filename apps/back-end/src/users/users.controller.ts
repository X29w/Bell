import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from '../common/auth.service';
import { LoggerService } from '../common/logger.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private users: User[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {}

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({ 
    status: HttpStatus.CREATED, 
    description: '用户创建成功',
    type: User 
  })
  @ApiResponse({ 
    status: HttpStatus.BAD_REQUEST, 
    description: '请求参数错误' 
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      // 检查邮箱是否已存在
      const existingUser = this.users.find(u => u.email === createUserDto.email);
      if (existingUser) {
        throw new HttpException('邮箱已被注册', HttpStatus.BAD_REQUEST);
      }

      // 创建新用户
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: createUserDto.email,
        name: createUserDto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.users.push(newUser);
      
      this.logger.log(`用户创建成功: ${newUser.email}`, { userId: newUser.id });
      
      return newUser;
    } catch (error) {
      this.logger.error('创建用户失败', error.stack, { email: createUserDto.email });
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取用户' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: '获取用户成功',
    type: User 
  })
  @ApiResponse({ 
    status: HttpStatus.NOT_FOUND, 
    description: '用户不存在' 
  })
  findOne(@Param('id') id: string): User {
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: '获取用户列表成功',
    type: [User] 
  })
  findAll(): User[] {
    return this.users;
  }
}