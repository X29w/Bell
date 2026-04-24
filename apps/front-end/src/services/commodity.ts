import { http } from '@/utils/config/request';

/** 添加物品 */
export const createCommodity = (params: Commodity.CreateParams) =>
  http.post<Commodity.Info>('/commodity', params as unknown as Record<string, unknown>);

/** 查询物品列表 */
export const getCommodities = (params: Commodity.QueryParams) =>
  http.get<Commodity.Info[]>('/commodity', params as unknown as Record<string, unknown>);

/** 获取统计数据 */
export const getCommodityStatistics = (spaceId: string) =>
  http.get<Commodity.Statistics>('/commodity/statistics', { spaceId });

/** 获取物品详情 */
export const getCommodityDetail = (id: string) => http.get<Commodity.Info>(`/commodity/${id}`);

/** 更新物品 */
export const updateCommodity = (id: string, params: Commodity.UpdateParams) =>
  http.patch<Commodity.Info>(`/commodity/${id}`, params as unknown as Record<string, unknown>);

/** 删除物品 */
export const deleteCommodity = (id: string) => http.delete<void>(`/commodity/${id}`);

// ==================== 分类 ====================

/** 创建分类 */
export const createCategory = (params: Commodity.CreateCategoryParams) =>
  http.post<Commodity.Category>('/category', params as unknown as Record<string, unknown>);

/** 获取空间下的分类 */
export const getCategories = (spaceId: string) =>
  http.get<Commodity.Category[]>('/category', { spaceId });

/** 删除分类 */
export const deleteCategory = (id: string) => http.delete<void>(`/category/${id}`);

// ==================== 提醒 ====================

/** 设置/更新提醒 */
export const upsertReminder = (params: Commodity.UpsertReminderParams) =>
  http.put<Commodity.Reminder>('/reminder', params as unknown as Record<string, unknown>);

/** 获取物品的提醒设置 */
export const getReminder = (commodityId: string) =>
  http.get<Commodity.Reminder | null>('/reminder', { commodityId });
