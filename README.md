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
  project ||--|| receiver : "プロジェクトとレシーバーは一対1"
  project ||--o{ message : "プロジェクトとメッセージズは一対0以上"
  receiver ||--o{ hobby : "レシーバーとホビーズは一対0以上"
  receiver ||--o{ gift_history : "レシーバーとギフトヒストリーは一対0以上"

  user {
  }

  hobby {
    bigint receiver_id "受け取り手ID"
    string hobby "趣味"
    receiver hobbies_id "趣味ID"
  }

  receiver {
    project project_id "プロジェクトID"
    bigint receiver_id "受け取り手ID"
    bigint hobbies_id "趣味ID"
    bigint age "年齢"
    bool gender "性別"
    string relationship "関係性"
    bigint gift_history_id "ギフト履歴ID"
  }

  project {
    user user_id "ユーザID"
    bigint project_id "プロジェクトID"
    bigint question_amount "目標質問数"
    bigint receiver_id "受け取り手のID"
    string genre "プレゼントのジャンル"
    string gift_purchase_date "プレゼントを渡す日付"
  }

  message {
    project project_id "プロジェクトID"
    bigint message_id "メッセージID"
    string question "質問"
    string answer "質問の答え"
  }

  gift_history {
     bigint gift_history_id "ギフト履歴ID"
     receiver receiver_id "受け取り手ID"
     string gift "ギフトの内容"
  }
```