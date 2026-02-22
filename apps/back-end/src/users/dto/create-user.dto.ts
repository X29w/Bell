import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '用户邮箱',
    example: 'user@example.com'
  })
  @IsEmail({}, { message: '请输入有效的邮箱地址' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string;

  @ApiProperty({
    description: '用户密码',
    example: 'password123',
    minLength: 6,
    maxLength: 20
  })
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码长度至少6位' })
  @MaxLength(20, { message: '密码长度最多20位' })
  password: string;

  @ApiProperty({
    description: '用户姓名',
    example: '张三',
    required: false
  })
  @MaxLength(50, { message: '姓名长度最多50位' })
  name?: string;
}