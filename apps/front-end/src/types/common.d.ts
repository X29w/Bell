/** 后端统一响应格式 */
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/** 分页参数（预留） */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}
