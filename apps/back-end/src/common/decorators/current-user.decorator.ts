import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * 从请求上下文中提取当前登录用户信息
 * @example @CurrentUser() user  获取完整用户对象
 * @example @CurrentUser('id') userId  获取用户 ID
 */
export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
