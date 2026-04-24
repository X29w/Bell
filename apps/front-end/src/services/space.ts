import { http } from '@/utils/config/request';
import type { Space, SpaceDetail, CreateSpaceParams, JoinSpaceParams } from '@/types/space';

/** 创建空间 */
export const createSpace = (params: CreateSpaceParams) =>
  http.post<Space>('/space', params as unknown as Record<string, unknown>);

/** 获取我的空间列表 */
export const getMySpaces = () => http.get<Space[]>('/space');

/** 获取空间详情 */
export const getSpaceDetail = (id: string) => http.get<SpaceDetail>(`/space/${id}`);

/** 更新空间 */
export const updateSpace = (id: string, params: Partial<CreateSpaceParams>) =>
  http.patch<Space>(`/space/${id}`, params as unknown as Record<string, unknown>);

/** 删除空间 */
export const deleteSpace = (id: string) => http.delete<void>(`/space/${id}`);

/** 通过邀请码加入空间 */
export const joinSpace = (params: JoinSpaceParams) =>
  http.post<Space>('/space/join', params as unknown as Record<string, unknown>);

/** 移除成员 */
export const removeMember = (spaceId: string, userId: string) =>
  http.delete<void>(`/space/${spaceId}/member/${userId}`);
