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

# バックエンドの実行
```
cd project/backend/backend
python manage.py runserver
```

# ER図
```mermaid
erDiagram
  user ||--o{ project : "ユーザとプロジェクトは一対0以上"
  project ||--|| receiver : "プロジェクトと受け取り手は一対1"
  project ||--o{ message : "プロジェクトとメッセージは一対0以上"
  receiver ||--o{ giftHistory : "受け取り手とギフト履歴は一対0以上"

  user {
    string user_id PK "ユーザID"
    string password "パスワード"
  }


  receiver {
    bigint receiver_id PK "受け取り手ID"
    string receiver_name "受け取り手の名前"
    bigint age "年齢"
    bool gender "性別"
    string relationship "関係性"
    string hobbies "趣味"
  }

  project {
    bigint project_id PK "プロジェクトID"
    string project_name "プロジェクト名"
    bigint question_amount "目標質問数"
    bigint frequency "頻度"
    string present_purpose "プレゼントの目的"
    bigint budget "予算"
    string genre "プレゼントのジャンル"
    string giftPurchaseDate "プレゼントを買う日付"
    string giftGivingDate "プレゼントを渡す日付"
    user user_id FK "ユーザID"
    receiver receiver_id FK "受け取り手のID"

  }

  message {
    bigint message_id PK "メッセージID"
    string question "質問"
    string answer "質問の答え"
    project project_id FK "プロジェクトID"  
  }

  giftHistory {
    bigint gift_history_id PK "ギフト履歴ID"  
    string gift "ギフトの内容"
    receiver receiver_id FK "受け取り手ID"
  }
```

# エンドポイントの定義
```
- user
POST /users
GET, PUT, PATCH, DELETE /users/{user_id}

- project
POST /projects
GET /projects
GET, PUT, PATCH, DELETE /projects/{project_id}

- receiver
POST /receivers
GET /receivers
GET, PUT, PATCH, DELETE /receivers/{receiver_id}

- hobby
POST /hobbies
GET /hobbies
GET, PUT, PATCH, DELETE /hobbies/{hobby_id}

- gift_history
POST /gift_histories
GET /gift_histories
GET, PUT, PATCH, DELETE /gift_histories/{gift_history_id}

- message
POST /messages
GET /messages (& project={project_id})
GET, PUT, PATCH, DELETE /messages/{message_id}
```