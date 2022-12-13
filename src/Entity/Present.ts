export interface Present {
  /** プレゼントID */
  id: number

  /** UUID */
  uuid: string

  /** ユーザーID */
  user_id: number

  /** LineユーザーID */
  line_user_id: string

  /** レシート画像ID */
  receipt_picture_id: number

  /** 支払サービス */
  payment_service: number

  /** ポイント */
  point: number

  /** 画像URL */
  url: string

}