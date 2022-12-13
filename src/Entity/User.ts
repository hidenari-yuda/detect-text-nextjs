export interface User {
  /** ユーザーID */
  id: number

  /** UUID */
  uuid: string

  /** FirebaseID */
  firebase_id: string

  /** LINEユーザーID */
  line_user_id: string

  /** LINEユーザー名 */
  line_name: string

  /** プロフィール画像URL */
  picture_url: string

  /** ステータスメッセージ */
  status_message: string

  /** 言語 */
  language: string

  /** ポイント */
  point: number

  /** 名前 */
  name: string

  /** メールアドレス */
  email: string

  /** パスワード */
  password: string
}
