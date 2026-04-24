import { http, setToken } from '@/utils/config/request';

/** 登录 */
export const signin = async (params: User.LoginParams) => {
  const result = await http.post<User.LoginResult>('/user/signin', params as unknown as Record<string, unknown>);
  setToken(result.access_token);
  return result;
};

/** 注册 */
export const createUser = (params: User.CreateParams) =>
  http.post<User.Info>('/user', params as unknown as Record<string, unknown>);

/** 获取当前用户信息 */
export const getProfile = () => http.get<User.Info>('/user/profile');

/** 更新用户信息 */
export const updateProfile = (params: Partial<User.Info>) =>
  http.patch<User.Info>('/user/profile', params as unknown as Record<string, unknown>);
