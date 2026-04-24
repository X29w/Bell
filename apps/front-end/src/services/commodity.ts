import { http } from '@/utils/config/request';
import type {
  Commodity, Category, CommodityStatistics,
  CreateCommodityParams, UpdateCommodityParams, QueryCommodityParams,
  Reminder, UpsertReminderParams,
} from '@/types/commodity';

/** 添加物品 */
export const createCommodity = (params: CreateCommodityParams) =>
  http.post<Commodity>('/commodity', params as unknown as Record<string, unknown>);

/** 查询物品列表 */
export const getCommodities = (params: QueryCommodityParams) =>
  http.get<Commodity[]>('/commodity', params as unknown as Record<string, unknown>);

/** 获取统计数据 */
export const getCommodityStatistics = (spaceId: string) =>
  http.get<CommodityStatistics>('/commodity/statistics', { spaceId });

/** 获取物品详情 */
export const getCommodityDetail = (id: string) => http.get<Commodity>(`/commodity/${id}`);

/** 更新物品 */
export const updateCommodity = (id: string, params: UpdateCommodityParams) =>
  http.patch<Commodity>(`/commodity/${id}`, params as unknown as Record<string, unknown>);

/** 删除物品 */
export const deleteCommodity = (id: string) => http.delete<void>(`/commodity/${id}`);

// ==================== 分类 ====================

/** 创建分类 */
export const createCategory = (params: { name: string; spaceId: string; iconUrl?: string }) =>
  http.post<Category>('/category', params as unknown as Record<string, unknown>);

/** 获取空间下的分类 */
export const getCategories = (spaceId: string) =>
  http.get<Category[]>('/category', { spaceId });

/** 删除分类 */
export const deleteCategory = (id: string) => http.delete<void>(`/category/${id}`);

// ==================== 提醒 ====================

/** 设置/更新提醒 */
export const upsertReminder = (params: UpsertReminderParams) =>
  http.put<Reminder>('/reminder', params as unknown as Record<string, unknown>);

/** 获取物品的提醒设置 */
export const getReminder = (commodityId: string) =>
  http.get<Reminder | null>('/reminder', { commodityId });
