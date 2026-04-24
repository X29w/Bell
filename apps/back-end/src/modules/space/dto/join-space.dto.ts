import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class JoinSpaceDto {
  @ApiProperty({ description: '邀请码', example: 'HEM-829-X' })
  @IsString()
  @MinLength(1)
  inviteCode: string;
}
