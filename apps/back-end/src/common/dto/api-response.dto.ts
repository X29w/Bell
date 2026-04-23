import { ApiProperty } from '@nestjs/swagger';

/**
 * 统一响应 DTO，用于 Swagger 文档展示包装后的响应结构
 * 使用方式：@ApiResponse({ type: ApiResponseDto })
 */
export class ApiResponseDto<T = any> {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number;

  @ApiProperty({ description: '响应消息', example: 'success' })
  message: string;

  @ApiProperty({ description: '响应数据' })
  data: T;
}

/**
 * 错误响应 DTO
 */
export class ApiErrorResponseDto {
  @ApiProperty({ description: '错误状态码', example: 400 })
  code: number;

  @ApiProperty({ description: '错误信息', example: '请求参数校验失败' })
  message: string;

  @ApiProperty({ description: '数据为空', example: null, nullable: true })
  data: null;
}
