export interface User {
  /** ユーザーID */
  id: number

  /** UUID */
  uuid: string

  /** FirebaseID */
  firebaseId: string

  /** LINEユーザーID */
  lineUserId: string

  /** 回答進捗 */
  questionProgress: number

  /** 都道府県 */
  prefecture: number

  /** 年齢 */
  age: number

  /** 性別 */
  gender: number

  /** 職業 */
  occupation: number

  /** 業種 */
  industry: number

  /** 住まい */
  livingWith: number

  /** 結婚 */
  marriage: number

  /** 子供 */
  child: number

  /** 子供の年齢 */
  childAge: number

  /** 年収 */
  annualIncome: number

  /** LINEユーザー名 */
  lineName: string

  /** プロフィール画像URL */
  pictureUrl: string

  /** ステータスメッセージ */
  statusMessage: string

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

  /** 作成日 */
  createdAt: string
}
