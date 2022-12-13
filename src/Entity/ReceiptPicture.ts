export interface ReceiptPicture {
  /** レシート画像ID */
  id: number

  /** UUID */
  uuid: string

  /** ユーザーID */
  user_id: number

  /** LINEユーザーID */
  line_user_id: string

  /** 画像URL */
  url: string

  /** 検出テキスト */
  detected_text: string

  /** サービス */
  service: number

  /** 支払サービス */

  payment_service: number

  /** ポイント */
  point: number

  /** 合計金額 */
  total_price: number

  /** レシート内容 */
  receipts: Receipt[]
}

export interface Receipt {
  /** レシートID */
  id: number

  /** UUID */
  uuid: string

  /** レシート画像ID */
  receipt_picture_id: number

  /** 店舗名 */
  store_name: string

  /** 合計金額 */
  total_price: number

  /** 購入日時 */
  purchased_at: string

  /** 商品 */
  parchased_items: PurchasedItem[]
}

export interface PurchasedItem {
  /** 購入商品ID */
  id: number

  /** UUID */
  uuid: string

  /** レシートID */
  receipt_id: number

  /** 商品名 */
  name: string

  /** 金額 */
  price: number

  /** 個数 */
  number: number
}