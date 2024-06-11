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
  project ||--o{ massages : "プロジェクトとメッセージズは一対0以上"
  receiver ||--o{ hobbies : "レシーバーとホビーズは一対0以上"
  receiver ||--o{ gift_history : "レシーバーとギフトヒストリーは一対0以上"
  user {
  }
  hobbies {
    bigint receiver_id "受け取り手のID"
    string hobby "趣味"
    receiver hobbies_id "趣味のID"
  }
  receiver {
    project project_id "プロジェクトのID"
    bigint receiver_id "受け取り手のID"
    bigint hobbies_id "趣味のID"
    bigint age "年齢"
    bool gender "性別"
    string relationship "関係性"
    bigint gift_history_id "ギフト履歴のID"
  }
  project {
    bigint project_id "プロジェクトID"
    user user_id "ユーザID"
    bigint question_amount "目標質問数"
    bigint receiver_id "受け取り手のID"
    string genre "プレゼントのジャンル"
    string gift_purchase_date "プレゼントを渡す日付"
  }
  messages {
    string question "質問"
    string answer "質問の答え"
    project project_id "プロジェクトのID"
    bigint message_id "メッセージのID"
  }
  gift_history {
     bigint gift_history_id "ギフト履歴のID"
     receiver receiver_id "受け取り手のID"
     string gift "ギフトの内容"
  }
```