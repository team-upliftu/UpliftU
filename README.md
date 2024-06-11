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
    receiver receiver_id FK "receiverID"
    bigint hobbies_id PK "hobby ID"
    string hobby "hobby"
  }

  receiver {
    project project_id FK "project ID"
    bigint receiver_id PK "receiver ID"
    bigint hobbies_id "hobby ID"
    bigint age "age"
    bool gender "sex"
    string relationship "relationship"
    bigint gift_history_id "git ID"
  }

  project {
    user user_id FK "user ID"
    bigint project_id PK "project ID"
    bigint question_amount "question amount"
    bigint receiver_id "receiver ID"
    string genre "genre of present"
    string gift_purchase_date "date of purchasing gift"
  }

  message {
    project project_id FK "project ID"
    bigint message_id PK "message ID"
    string question "question"
    string answer "answer of the question"
  }

  gift_history {
     receiver receiver_id FK"受け取り手ID"
     bigint gift_history_id PK "ギフト履歴ID"
     string gift "ギフトの内容"
  }
```