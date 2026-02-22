import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: '用户ID',
    example: 'uuid-string'
  })
  id: string;

  @ApiProperty({
    description: '用户邮箱',
    example: 'user@example.com'
  })
  email: string;

  @ApiProperty({
    description: '用户姓名',
    example: '张三'
  })
  name?: string;

  @ApiProperty({
    description: '创建时间'
  })
  createdAt: Date;

  @ApiProperty({
    description: '更新时间'
  })
  updatedAt: Date;
}