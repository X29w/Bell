import { http } from '@/utils/config/request';

/** 创建空间 */
export const createSpace = (params: Space.CreateParams) =>
  http.post<Space.Info>('/space', params as unknown as Record<string, unknown>);

/** 获取我的空间列表 */
export const getMySpaces = () => http.get<Space.Info[]>('/space');

/** 获取空间详情 */
export const getSpaceDetail = (id: string) => http.get<Space.Detail>(`/space/${id}`);

/** 更新空间 */
export const updateSpace = (id: string, params: Partial<Space.CreateParams>) =>
  http.patch<Space.Info>(`/space/${id}`, params as unknown as Record<string, unknown>);

/** 删除空间 */
export const deleteSpace = (id: string) => http.delete<void>(`/space/${id}`);

/** 通过邀请码加入空间 */
export const joinSpace = (params: Space.JoinParams) =>
  http.post<Space.Info>('/space/join', params as unknown as Record<string, unknown>);

/** 移除成员 */
export const removeMember = (spaceId: string, userId: string) =>
  http.delete<void>(`/space/${spaceId}/member/${userId}`);
