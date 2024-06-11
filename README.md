# upliftu
AIを活用して、相手の趣味や嗜好を自然に聞き出し、最適なプレゼントを提案します！

# 環境構築
プロジェクトをcloneする
```
git clone https://github.com/team-upliftu/UpliftU.git
```

# テストアプリの実行
```
cd sandbox/practice
npm install
npm run dev
```

# ER図
```mermaid
erDiagram
  user ||--o{ project : "ユーザとプロジェクトは一対0以上"
  project ||--|| receiver : "プロジェクトと受け取り手は一対1"
  project ||--o{ message : "プロジェクトとメッセージは一対0以上"
  receiver ||--o{ hobby : "受け取り手と趣味は一対0以上"
  receiver ||--o{ gift_history : "受け取り手とギフト履歴は一対0以上"

  user {
    string user_id PK "ユーザID"
    string password "パスワード

  }

  hobby {
    receiver receiver_id FK "受け取り手ID"
    bigint hobbies_id PK 趣味ID"
    string hobby "趣味"
  }

  receiver {
    project project_id FK "プロジェクトID"
    bigint receiver_id PK "受け取り手ID"
    bigint hobbies_id "趣味ID"
    bigint age "年齢"
    bool gender "性別"
    string relationship "関係性"
    bigint gift_history_id "ギフト履歴ID"
  }

  project {
    user user_id FK "ユーザID"
    bigint project_id PK "プロジェクトID"
    bigint question_amount "目標質問数"
    bigint receiver_id "受け取り手のID"
    string genre "プレゼントのジャンル"
    string gift_purchase_date "プレゼントを渡す日付"
  }

  message {
    project project_id FK "プロジェクトID"
    bigint message_id PK "メッセージID"
    string question "質問"
    string answer "質問の答え"
  }

  gift_history {
     receiver receiver_id FK"受け取り手ID"
     bigint gift_history_id PK "ギフト履歴ID"
     string gift "ギフトの内容"
  }
```