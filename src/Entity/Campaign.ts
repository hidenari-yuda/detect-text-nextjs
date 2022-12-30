export interface Campaign {
  /** ユーザーID */
  id: number

  /** UUID */
  uuid: string

  /** サービス */
  service: number

  /** URL */
  url: string

  /** 画像URL */
  pictureUrl: string

  /** 価格 */
  price: number

  /** タイトル */
  title: string

  /** 説明 */
  description: string

  /** インプレッション */
  impression: number

  /** クリック */
  click: number

  /** クライアントID */
  clientId: number

  /** 作成日 */
  createdAt: string

}
