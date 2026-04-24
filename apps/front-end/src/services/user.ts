import { http, setToken } from '@/utils/config/request';
import type { User, LoginParams, LoginResult, CreateUserParams } from '@/types/user';

/** 登录 */
export const signin = async (params: LoginParams) => {
  const result = await http.post<LoginResult>('/user/signin', params as unknown as Record<string, unknown>);
  setToken(result.access_token);
  return result;
};

/** 注册 */
export const createUser = (params: CreateUserParams) =>
  http.post<User>('/user', params as unknown as Record<string, unknown>);

/** 获取当前用户信息 */
export const getProfile = () => http.get<User>('/user/profile');

/** 更新用户信息 */
export const updateProfile = (params: Partial<User>) =>
  http.patch<User>('/user/profile', params as unknown as Record<string, unknown>);
