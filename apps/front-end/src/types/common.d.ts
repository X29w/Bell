/**
 * @description_zh 後端統一回應格式
 * @description_ja バックエンド統一レスポンス形式
 * @description_en Unified API response format from backend
 */
declare namespace Common {
  interface ApiResponse<T = unknown> {
    /**
     * @description_zh 狀態碼
     * @description_ja ステータスコード
     * @description_en Status code
     */
    code: number;

    /**
     * @description_zh 回應訊息
     * @description_ja レスポンスメッセージ
     * @description_en Response message
     */
    message: string;

    /**
     * @description_zh 回應資料
     * @description_ja レスポンスデータ
     * @description_en Response data
     */
    data: T;
  }
}
