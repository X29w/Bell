/**
 * @description_zh 使用者模組
 * @description_ja ユーザーモジュール
 * @description_en User module
 */
declare namespace User {
  /**
   * @description_zh 使用者資訊
   * @description_ja ユーザー情報
   * @description_en User information
   */
  interface Info {
    /**
     * @description_zh 使用者 ID
     * @description_ja ユーザーID
     * @description_en User ID
     */
    id: string;

    /**
     * @description_zh 電子郵件
     * @description_ja メールアドレス
     * @description_en Email address
     */
    email: string;

    /**
     * @description_zh 使用者名稱
     * @description_ja ユーザー名
     * @description_en User name
     */
    name: string | null;

    /**
     * @description_zh 頭像 URL
     * @description_ja アバターURL
     * @description_en Avatar URL
     */
    avatarUrl: string | null;

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
  }

  /**
   * @description_zh 登入參數
   * @description_ja ログインパラメータ
   * @description_en Login parameters
   */
  interface LoginParams {
    /**
     * @description_zh 電子郵件
     * @description_ja メールアドレス
     * @description_en Email address
     */
    email: string;

    /**
     * @description_zh 密碼
     * @description_ja パスワード
     * @description_en Password
     */
    password: string;
  }

  /**
   * @description_zh 登入回傳結果
   * @description_ja ログインレスポンス
   * @description_en Login response
   */
  interface LoginResult {
    /**
     * @description_zh JWT 存取令牌
     * @description_ja JWTアクセストークン
     * @description_en JWT access token
     */
    access_token: string;
  }

  /**
   * @description_zh 建立使用者參數
   * @description_ja ユーザー作成パラメータ
   * @description_en Create user parameters
   */
  interface CreateParams {
    /**
     * @description_zh 電子郵件
     * @description_ja メールアドレス
     * @description_en Email address
     */
    email: string;

    /**
     * @description_zh 密碼
     * @description_ja パスワード
     * @description_en Password
     */
    password: string;

    /**
     * @description_zh 使用者名稱（可選）
     * @description_ja ユーザー名（任意）
     * @description_en User name (optional)
     */
    name?: string;
  }
}
