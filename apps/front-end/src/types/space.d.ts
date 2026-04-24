/**
 * @description_zh 空間模組
 * @description_ja スペースモジュール
 * @description_en Space module
 */
declare namespace Space {
  /**
   * @description_zh 空間資訊
   * @description_ja スペース情報
   * @description_en Space information
   */
  interface Info {
    /**
     * @description_zh 空間 ID
     * @description_ja スペースID
     * @description_en Space ID
     */
    id: string;

    /**
     * @description_zh 空間名稱
     * @description_ja スペース名
     * @description_en Space name
     */
    name: string;

    /**
     * @description_zh 圖示 URL
     * @description_ja アイコンURL
     * @description_en Icon URL
     */
    iconUrl: string | null;

    /**
     * @description_zh 邀請碼
     * @description_ja 招待コード
     * @description_en Invite code
     */
    inviteCode: string;

    /**
     * @description_zh 擁有者 ID
     * @description_ja オーナーID
     * @description_en Owner ID
     */
    ownerId: string;

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
     * @description_zh 統計數量
     * @description_ja カウント統計
     * @description_en Count statistics
     */
    _count?: Count;
  }

  /**
   * @description_zh 空間統計數量
   * @description_ja スペースカウント統計
   * @description_en Space count statistics
   */
  interface Count {
    /**
     * @description_zh 物品數量
     * @description_ja アイテム数
     * @description_en Commodity count
     */
    commodities: number;

    /**
     * @description_zh 成員數量
     * @description_ja メンバー数
     * @description_en Member count
     */
    members: number;
  }

  /**
   * @description_zh 空間成員資訊
   * @description_ja スペースメンバー情報
   * @description_en Space member information
   */
  interface Member {
    /**
     * @description_zh 成員記錄 ID
     * @description_ja メンバーレコードID
     * @description_en Member record ID
     */
    id: string;

    /**
     * @description_zh 使用者 ID
     * @description_ja ユーザーID
     * @description_en User ID
     */
    userId: string;

    /**
     * @description_zh 空間 ID
     * @description_ja スペースID
     * @description_en Space ID
     */
    spaceId: string;

    /**
     * @description_zh 角色：owner / admin / member
     * @description_ja 役割：owner / admin / member
     * @description_en Role: owner / admin / member
     */
    role: 'owner' | 'admin' | 'member';

    /**
     * @description_zh 加入時間
     * @description_ja 参加日時
     * @description_en Joined at
     */
    joinedAt: string;

    /**
     * @description_zh 使用者簡要資訊
     * @description_ja ユーザー概要情報
     * @description_en User brief info
     */
    user: MemberUser;
  }

  /**
   * @description_zh 空間成員中的使用者簡要資訊
   * @description_ja スペースメンバーのユーザー概要
   * @description_en Brief user info within space member
   */
  interface MemberUser {
    /**
     * @description_zh 使用者 ID
     * @description_ja ユーザーID
     * @description_en User ID
     */
    id: string;

    /**
     * @description_zh 使用者名稱
     * @description_ja ユーザー名
     * @description_en User name
     */
    name: string | null;

    /**
     * @description_zh 電子郵件
     * @description_ja メールアドレス
     * @description_en Email address
     */
    email: string;

    /**
     * @description_zh 頭像 URL
     * @description_ja アバターURL
     * @description_en Avatar URL
     */
    avatarUrl: string | null;
  }

  /**
   * @description_zh 空間詳情（含成員列表）
   * @description_ja スペース詳細（メンバーリスト含む）
   * @description_en Space detail with member list
   */
  interface Detail extends Info {
    /**
     * @description_zh 成員列表
     * @description_ja メンバーリスト
     * @description_en Member list
     */
    members: Member[];
  }

  /**
   * @description_zh 建立空間參數
   * @description_ja スペース作成パラメータ
   * @description_en Create space parameters
   */
  interface CreateParams {
    /**
     * @description_zh 空間名稱
     * @description_ja スペース名
     * @description_en Space name
     */
    name: string;

    /**
     * @description_zh 圖示 URL（可選）
     * @description_ja アイコンURL（任意）
     * @description_en Icon URL (optional)
     */
    iconUrl?: string;
  }

  /**
   * @description_zh 加入空間參數
   * @description_ja スペース参加パラメータ
   * @description_en Join space parameters
   */
  interface JoinParams {
    /**
     * @description_zh 邀請碼
     * @description_ja 招待コード
     * @description_en Invite code
     */
    inviteCode: string;
  }
}
