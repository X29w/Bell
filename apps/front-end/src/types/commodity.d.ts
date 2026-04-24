/**
 * @description_zh 物品模組
 * @description_ja アイテムモジュール
 * @description_en Commodity module
 */
declare namespace Commodity {
  /**
   * @description_zh 物品分類
   * @description_ja アイテムカテゴリ
   * @description_en Item category
   */
  interface Category {
    /**
     * @description_zh 分類 ID
     * @description_ja カテゴリID
     * @description_en Category ID
     */
    id: string;

    /**
     * @description_zh 分類名稱
     * @description_ja カテゴリ名
     * @description_en Category name
     */
    name: string;

    /**
     * @description_zh 圖示 URL
     * @description_ja アイコンURL
     * @description_en Icon URL
     */
    iconUrl: string | null;

    /**
     * @description_zh 所屬空間 ID
     * @description_ja 所属スペースID
     * @description_en Belongs to space ID
     */
    spaceId: string;

    /**
     * @description_zh 統計數量
     * @description_ja カウント統計
     * @description_en Count statistics
     */
    _count?: CategoryCount;
  }

  /**
   * @description_zh 分類統計數量
   * @description_ja カテゴリカウント統計
   * @description_en Category count statistics
   */
  interface CategoryCount {
    /**
     * @description_zh 物品數量
     * @description_ja アイテム数
     * @description_en Commodity count
     */
    commodities: number;
  }

  /**
   * @description_zh 物品資訊
   * @description_ja アイテム情報
   * @description_en Commodity information
   */
  interface Info {
    /**
     * @description_zh 物品 ID
     * @description_ja アイテムID
     * @description_en Commodity ID
     */
    id: string;

    /**
     * @description_zh 物品名稱
     * @description_ja アイテム名
     * @description_en Commodity name
     */
    name: string;

    /**
     * @description_zh 圖片 URL
     * @description_ja 画像URL
     * @description_en Image URL
     */
    imageUrl: string | null;

    /**
     * @description_zh 過期日期
     * @description_ja 期限日
     * @description_en Expiry date
     */
    expiryDate: string;

    /**
     * @description_zh 存放位置
     * @description_ja 保管場所
     * @description_en Storage location
     */
    location: string | null;

    /**
     * @description_zh 數量
     * @description_ja 数量
     * @description_en Quantity
     */
    quantity: number;

    /**
     * @description_zh 是否已使用
     * @description_ja 使用済みか
     * @description_en Whether marked as used
     */
    isUsed: boolean;

    /**
     * @description_zh 標記使用時間
     * @description_ja 使用済みマーク日時
     * @description_en Marked used at
     */
    usedAt: string | null;

    /**
     * @description_zh 所屬空間 ID
     * @description_ja 所属スペースID
     * @description_en Belongs to space ID
     */
    spaceId: string;

    /**
     * @description_zh 分類 ID
     * @description_ja カテゴリID
     * @description_en Category ID
     */
    categoryId: string | null;

    /**
     * @description_zh 建立者 ID
     * @description_ja 作成者ID
     * @description_en Created by user ID
     */
    createdById: string;

    /**
     * @description_zh 建立時間
     * @description_ja 作成日時
     * @description_en Created at
     */
    createdAt: string;

    /**
     * @description_zh 更新時間
     * @description_ja 更新日時
     * @description_en Updated at
     */
    updatedAt: string;

    /**
     * @description_zh 所屬分類
     * @description_ja 所属カテゴリ
     * @description_en Belongs to category
     */
    category: Category | null;
  }

  /**
   * @description_zh 物品統計數據
   * @description_ja アイテム統計データ
   * @description_en Commodity statistics
   */
  interface Statistics {
    /**
     * @description_zh 已過期數量
     * @description_ja 期限切れ数
     * @description_en Expired count
     */
    expired: number;

    /**
     * @description_zh 即將過期數量
     * @description_ja 期限間近数
     * @description_en Expiring soon count
     */
    soon: number;

    /**
     * @description_zh 總數量
     * @description_ja 合計数
     * @description_en Total count
     */
    total: number;
  }

  /**
   * @description_zh 新增物品參數
   * @description_ja アイテム追加パラメータ
   * @description_en Create commodity parameters
   */
  interface CreateParams {
    /**
     * @description_zh 物品名稱
     * @description_ja アイテム名
     * @description_en Commodity name
     */
    name: string;

    /**
     * @description_zh 圖片 URL（可選）
     * @description_ja 画像URL（任意）
     * @description_en Image URL (optional)
     */
    imageUrl?: string;

    /**
     * @description_zh 過期日期
     * @description_ja 期限日
     * @description_en Expiry date
     */
    expiryDate: string;

    /**
     * @description_zh 存放位置（可選）
     * @description_ja 保管場所（任意）
     * @description_en Storage location (optional)
     */
    location?: string;

    /**
     * @description_zh 數量（可選，預設 1）
     * @description_ja 数量（任意、デフォルト1）
     * @description_en Quantity (optional, default 1)
     */
    quantity?: number;

    /**
     * @description_zh 所屬空間 ID
     * @description_ja 所属スペースID
     * @description_en Belongs to space ID
     */
    spaceId: string;

    /**
     * @description_zh 分類 ID（可選）
     * @description_ja カテゴリID（任意）
     * @description_en Category ID (optional)
     */
    categoryId?: string;
  }

  /**
   * @description_zh 更新物品參數
   * @description_ja アイテム更新パラメータ
   * @description_en Update commodity parameters
   */
  interface UpdateParams {
    /**
     * @description_zh 物品名稱
     * @description_ja アイテム名
     * @description_en Commodity name
     */
    name?: string;

    /**
     * @description_zh 圖片 URL
     * @description_ja 画像URL
     * @description_en Image URL
     */
    imageUrl?: string;

    /**
     * @description_zh 過期日期
     * @description_ja 期限日
     * @description_en Expiry date
     */
    expiryDate?: string;

    /**
     * @description_zh 存放位置
     * @description_ja 保管場所
     * @description_en Storage location
     */
    location?: string;

    /**
     * @description_zh 數量
     * @description_ja 数量
     * @description_en Quantity
     */
    quantity?: number;

    /**
     * @description_zh 是否已使用
     * @description_ja 使用済みか
     * @description_en Whether marked as used
     */
    isUsed?: boolean;

    /**
     * @description_zh 分類 ID
     * @description_ja カテゴリID
     * @description_en Category ID
     */
    categoryId?: string;
  }

  /**
   * @description_zh 查詢物品參數
   * @description_ja アイテム検索パラメータ
   * @description_en Query commodity parameters
   */
  interface QueryParams {
    /**
     * @description_zh 空間 ID
     * @description_ja スペースID
     * @description_en Space ID
     */
    spaceId: string;

    /**
     * @description_zh 狀態篩選：all / expired / soon / fresh
     * @description_ja ステータスフィルター：all / expired / soon / fresh
     * @description_en Status filter: all / expired / soon / fresh
     */
    status?: 'all' | 'expired' | 'soon' | 'fresh';

    /**
     * @description_zh 分類 ID
     * @description_ja カテゴリID
     * @description_en Category ID
     */
    categoryId?: string;

    /**
     * @description_zh 搜尋關鍵字
     * @description_ja 検索キーワード
     * @description_en Search keyword
     */
    keyword?: string;

    /**
     * @description_zh 排序方式
     * @description_ja ソート方式
     * @description_en Sort by
     */
    sortBy?: 'expiry_asc' | 'expiry_desc' | 'created_desc';
  }

  /**
   * @description_zh 提醒設定
   * @description_ja リマインダー設定
   * @description_en Reminder settings
   */
  interface Reminder {
    /**
     * @description_zh 提醒 ID
     * @description_ja リマインダーID
     * @description_en Reminder ID
     */
    id: string;

    /**
     * @description_zh 提前幾天提醒
     * @description_ja 何日前にリマインド
     * @description_en Days before expiry to remind
     */
    daysBefore: number;

    /**
     * @description_zh 是否啟用
     * @description_ja 有効か
     * @description_en Whether enabled
     */
    isEnabled: boolean;

    /**
     * @description_zh 物品 ID
     * @description_ja アイテムID
     * @description_en Commodity ID
     */
    commodityId: string;

    /**
     * @description_zh 使用者 ID
     * @description_ja ユーザーID
     * @description_en User ID
     */
    userId: string;
  }

  /**
   * @description_zh 設定/更新提醒參數
   * @description_ja リマインダー設定/更新パラメータ
   * @description_en Upsert reminder parameters
   */
  interface UpsertReminderParams {
    /**
     * @description_zh 物品 ID
     * @description_ja アイテムID
     * @description_en Commodity ID
     */
    commodityId: string;

    /**
     * @description_zh 提前幾天提醒（可選，預設 2）
     * @description_ja 何日前にリマインド（任意、デフォルト2）
     * @description_en Days before expiry (optional, default 2)
     */
    daysBefore?: number;

    /**
     * @description_zh 是否啟用（可選，預設 true）
     * @description_ja 有効か（任意、デフォルトtrue）
     * @description_en Whether enabled (optional, default true)
     */
    isEnabled?: boolean;
  }

  /**
   * @description_zh 建立分類參數
   * @description_ja カテゴリ作成パラメータ
   * @description_en Create category parameters
   */
  interface CreateCategoryParams {
    /**
     * @description_zh 分類名稱
     * @description_ja カテゴリ名
     * @description_en Category name
     */
    name: string;

    /**
     * @description_zh 所屬空間 ID
     * @description_ja 所属スペースID
     * @description_en Belongs to space ID
     */
    spaceId: string;

    /**
     * @description_zh 圖示 URL（可選）
     * @description_ja アイコンURL（任意）
     * @description_en Icon URL (optional)
     */
    iconUrl?: string;
  }
}
