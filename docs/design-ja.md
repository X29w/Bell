# Bell — 家物リスト システム設計書

## 1. プロジェクト概要

Bell（家物リスト）は、家庭用品の賞味期限を管理するWeChatミニプログラムです。ユーザーは「スペース」（キッチン、冷蔵庫など）を作成し、スペース内にアイテムを追加して期限切れ状態を追跡できます。複数人での共同管理に対応しています。

| 項目 | 技術選定 |
|------|---------|
| フロントエンド | Taro 4 + React 18 + Redux Toolkit + TailwindCSS |
| バックエンド | NestJS 11 + Prisma 7 + SQLite |
| プラットフォーム | WeChatミニプログラム |
| 認証 | WeChatログイン + JWT |

## 2. コアビジネスフロー

### 2.1 ユーザー認証フロー

```mermaid
flowchart TD
    A[ミニプログラム起動] --> B{ログイン済み?}
    B -->|はい| C[ホーム画面へ]
    B -->|いいえ| D[ログイン画面表示]
    D --> E[「WeChat一括ログイン」をタップ]
    D --> F[「Skip」をタップ]
    E --> G[WeChat認証でcodeを取得]
    G --> H[POST /api/user/signin<br/>codeをバックエンドに送信]
    H --> I[バックエンドがcodeでopenIdを取得]
    I --> J{ユーザーは存在する?}
    J -->|はい| K[JWT Tokenを生成]
    J -->|いいえ| L[ユーザーを自動作成]
    L --> K
    K --> C
    F --> C
```

### 2.2 スペース管理フロー

```mermaid
flowchart TD
    A[設定画面 — My Spaces] --> B[Manageをタップ]
    B --> C[スペース一覧画面]
    C --> D[「Create New Space」をタップ]
    D --> E[スペース名を入力]
    E --> F[POST /api/space]
    F --> G[招待コードを生成]
    G --> H[スペース作成完了画面<br/>招待コードを表示]
    H --> I[コードをコピー/共有]

    C --> J[スペースをタップ]
    J --> K[スペース詳細画面]
    K --> L[メンバー一覧を表示]
    K --> M[新メンバーを招待]
    K --> N[このスペースに切替]
    K --> O[スペースを削除]

    M --> P[相手が招待コードを入力]
    P --> Q[POST /api/space/join]
    Q --> R[スペース参加完了]
```

### 2.3 アイテム管理フロー

```mermaid
flowchart TD
    A[ホーム画面] --> B[下部のスキャンボタンをタップ]
    B --> C[スキャン/撮影画面]
    C --> D[撮影または画像を選択]
    D --> E[アイテム情報を入力<br/>名前/カテゴリ/期限日]
    E --> F[POST /api/commodity]
    F --> G[アイテム追加完了]
    G --> H[ホーム画面に戻る]

    A --> I[アイテムカードをタップ]
    I --> J[アイテム詳細画面]
    J --> K[期限カウントダウンを表示]
    J --> L[リマインダー日数を設定]
    J --> M[使用済みとしてマーク]
    J --> N[アイテムを編集]
    J --> O[アイテムを削除]

    M --> P[PATCH /api/commodity/:id<br/>isUsed = true]
```

### 2.4 ホーム画面データ読み込みフロー

```mermaid
flowchart TD
    A[ホーム画面に入る] --> B[現在のスペースIDを取得]
    B --> C[並列リクエスト]
    C --> D[GET /api/commodity/statistics<br/>統計データを取得]
    C --> E[GET /api/commodity?status=soon<br/>期限間近リストを取得]
    D --> F[統計カードを描画<br/>Expired / Soon / Total]
    E --> G[Expiring Soonリストを描画]
```

## 3. 画面構成

| 画面 | パス | 説明 | 認証 |
|------|------|------|------|
| ホーム | `/pages/tabs/home` | 統計ダッシュボード + 期限間近リスト + スキャン入口 | 任意 |
| リスト | `/pages/tabs/list` | 全アイテム一覧、検索/フィルター/ソート対応 | 任意 |
| 設定 | `/pages/tabs/settings` | ログイン/ログアウト、スペース管理、アプリ設定 | 任意 |
| ログイン | `/pages/inner/signin` | WeChat一括ログイン | 不要 |
| スキャン追加 | `/pages/inner/scanner` | 撮影 + アイテム情報入力 | 必要 |
| アイテム詳細 | `/pages/inner/commodity` | 期限カウントダウン、リマインダー設定、使用済みマーク | 必要 |
| スペース一覧 | `/pages/inner/spaces` | 全スペースの管理 | 必要 |
| スペース詳細 | `/pages/inner/space-detail` | 招待コード、メンバー、切替/削除 | 必要 |
| スペース作成完了 | `/pages/inner/space-created` | 招待コード表示、コピー/共有 | 必要 |

## 4. APIエンドポイント設計

### 4.1 認証

| メソッド | パス | 説明 | 認証 |
|---------|------|------|------|
| POST | `/api/user/signin` | WeChatログイン（code → token） | 不要 |

### 4.2 ユーザー

| メソッド | パス | 説明 | 認証 |
|---------|------|------|------|
| GET | `/api/user/profile` | 現在のユーザー情報を取得 | 必要 |
| PATCH | `/api/user/profile` | ユーザー情報を更新 | 必要 |

### 4.3 スペース

| メソッド | パス | 説明 | 認証 |
|---------|------|------|------|
| POST | `/api/space` | スペースを作成 | 必要 |
| GET | `/api/space` | 自分のスペース一覧を取得 | 必要 |
| GET | `/api/space/:id` | スペース詳細を取得（メンバー含む） | 必要 |
| PATCH | `/api/space/:id` | スペース情報を更新 | 必要 |
| DELETE | `/api/space/:id` | スペースを削除（オーナーのみ） | 必要 |
| POST | `/api/space/join` | 招待コードでスペースに参加 | 必要 |
| DELETE | `/api/space/:id/member/:userId` | メンバーを削除 | 必要 |

### 4.4 カテゴリ

| メソッド | パス | 説明 | 認証 |
|---------|------|------|------|
| POST | `/api/category` | カテゴリを作成 | 必要 |
| GET | `/api/category?spaceId=xxx` | スペース内のカテゴリを取得 | 必要 |
| DELETE | `/api/category/:id` | カテゴリを削除 | 必要 |

### 4.5 アイテム

| メソッド | パス | 説明 | 認証 |
|---------|------|------|------|
| POST | `/api/commodity` | アイテムを追加 | 必要 |
| GET | `/api/commodity` | アイテム一覧を取得（フィルター/ソート対応） | 必要 |
| GET | `/api/commodity/statistics` | 統計データを取得 | 必要 |
| GET | `/api/commodity/:id` | アイテム詳細を取得 | 必要 |
| PATCH | `/api/commodity/:id` | アイテムを更新 | 必要 |
| DELETE | `/api/commodity/:id` | アイテムを削除 | 必要 |

### 4.6 リマインダー

| メソッド | パス | 説明 | 認証 |
|---------|------|------|------|
| PUT | `/api/reminder` | リマインダーを設定/更新 | 必要 |
| GET | `/api/reminder?commodityId=xxx` | アイテムのリマインダー設定を取得 | 必要 |

### 4.7 統一レスポンス形式

成功：
```json
{ "code": 200, "message": "success", "data": { ... } }
```

失敗：
```json
{ "code": 400, "message": "具体的なエラーメッセージ", "data": null }
```

## 5. データモデル

### 5.1 ER関係図

```mermaid
erDiagram
    User ||--o{ Space : "所有(owner)"
    User ||--o{ SpaceMember : "参加"
    User ||--o{ Commodity : "作成"
    User ||--o{ Reminder : "設定"

    Space ||--o{ SpaceMember : "メンバーを含む"
    Space ||--o{ Category : "カテゴリを含む"
    Space ||--o{ Commodity : "アイテムを含む"

    Category ||--o{ Commodity : "分類"
    Commodity ||--o{ Reminder : "リマインダー設定"

    User {
        string id PK
        string email UK
        string password
        string name
        string avatarUrl
        string openId UK
        datetime createdAt
        datetime updatedAt
    }

    Space {
        string id PK
        string name
        string iconUrl
        string inviteCode UK
        string ownerId FK
        datetime createdAt
        datetime updatedAt
    }

    SpaceMember {
        string id PK
        string userId FK
        string spaceId FK
        string role "owner|admin|member"
        datetime joinedAt
    }

    Category {
        string id PK
        string name
        string iconUrl
        string spaceId FK
        datetime createdAt
    }

    Commodity {
        string id PK
        string name
        string imageUrl
        datetime expiryDate
        string location
        int quantity
        boolean isUsed
        datetime usedAt
        string spaceId FK
        string categoryId FK
        string createdById FK
        datetime createdAt
        datetime updatedAt
    }

    Reminder {
        string id PK
        int daysBefore
        boolean isEnabled
        string commodityId FK
        string userId FK
        datetime createdAt
    }
```

### 5.2 テーブルフィールド説明

#### User（ユーザー）

| フィールド | 型 | 制約 | 説明 |
|-----------|------|------|------|
| id | String | PK, UUID | 主キー |
| email | String | UNIQUE | メールアドレス |
| password | String | | パスワード（bcryptハッシュ） |
| name | String? | | ユーザー名 |
| avatarUrl | String? | | アバターURL |
| openId | String? | UNIQUE | WeChat OpenID |
| createdAt | DateTime | | 作成日時 |
| updatedAt | DateTime | | 更新日時 |

#### Space（スペース）

| フィールド | 型 | 制約 | 説明 |
|-----------|------|------|------|
| id | String | PK, UUID | 主キー |
| name | String | | スペース名 |
| iconUrl | String? | | アイコンURL |
| inviteCode | String | UNIQUE | 招待コード（例：HEM-829-X） |
| ownerId | String | FK → User | オーナー |
| createdAt | DateTime | | 作成日時 |
| updatedAt | DateTime | | 更新日時 |

#### SpaceMember（スペースメンバー）

| フィールド | 型 | 制約 | 説明 |
|-----------|------|------|------|
| id | String | PK, UUID | 主キー |
| userId | String | FK → User | ユーザー |
| spaceId | String | FK → Space | スペース |
| role | String | デフォルト "member" | 役割：owner / admin / member |
| joinedAt | DateTime | | 参加日時 |

> ユニーク制約：(userId, spaceId)

#### Category（カテゴリ）

| フィールド | 型 | 制約 | 説明 |
|-----------|------|------|------|
| id | String | PK, UUID | 主キー |
| name | String | | カテゴリ名 |
| iconUrl | String? | | アイコンURL |
| spaceId | String | FK → Space | 所属スペース |
| createdAt | DateTime | | 作成日時 |

> ユニーク制約：(name, spaceId)

#### Commodity（アイテム）

| フィールド | 型 | 制約 | 説明 |
|-----------|------|------|------|
| id | String | PK, UUID | 主キー |
| name | String | | アイテム名 |
| imageUrl | String? | | 画像URL |
| expiryDate | DateTime | | 期限日 |
| location | String? | | 保管場所 |
| quantity | Int | デフォルト 1 | 数量 |
| isUsed | Boolean | デフォルト false | 使用済みか |
| usedAt | DateTime? | | 使用済みマーク日時 |
| spaceId | String | FK → Space | 所属スペース |
| categoryId | String? | FK → Category | 所属カテゴリ |
| createdById | String | FK → User | 作成者 |
| createdAt | DateTime | | 作成日時 |
| updatedAt | DateTime | | 更新日時 |

#### Reminder（リマインダー）

| フィールド | 型 | 制約 | 説明 |
|-----------|------|------|------|
| id | String | PK, UUID | 主キー |
| daysBefore | Int | デフォルト 2 | 何日前にリマインド |
| isEnabled | Boolean | デフォルト true | 有効か |
| commodityId | String | FK → Commodity | アイテム |
| userId | String | FK → User | ユーザー |
| createdAt | DateTime | | 作成日時 |

> ユニーク制約：(commodityId, userId)

## 6. バックエンドモジュール構成

```mermaid
graph TB
    subgraph AppModule
        direction TB
        ConfigModule
        PrismaModule
        UserModule
        SpaceModule
        CategoryModule
        CommodityModule
        ReminderModule
    end

    subgraph Common
        HttpExceptionFilter
        ResponseInterceptor
        JwtAuthGuard
        ValidationPipe
    end

    UserModule --> PrismaModule
    UserModule --> AuthModule
    SpaceModule --> PrismaModule
    CategoryModule --> PrismaModule
    CommodityModule --> PrismaModule
    ReminderModule --> PrismaModule
    AuthModule --> PrismaModule

    Common --> AppModule
```

```
apps/back-end/src/
├── common/                  # 共通モジュール
│   ├── decorators/          # カスタムデコレータ
│   ├── dto/                 # 共通DTO
│   ├── filters/             # 例外フィルター
│   ├── guards/              # 認証ガード
│   ├── interceptors/        # レスポンスインターセプター
│   └── interfaces/          # 共通インターフェース
├── config/                  # 設定
│   ├── api-doc.ts
│   └── logger.ts
├── modules/                 # ビジネスモジュール
│   ├── auth/                # 認証（JWT戦略、独立ルートなし）
│   ├── user/                # ユーザー（ログインエンドポイント含む）
│   ├── space/               # スペース管理
│   ├── category/            # カテゴリ管理
│   ├── commodity/           # アイテム管理
│   └── reminder/            # リマインダー管理
├── prisma/                  # Prismaサービス
├── app.module.ts
└── main.ts
```
