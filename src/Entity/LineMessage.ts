
export interface LineMessage {
  /** メッセージID */
  id: number

  /** UUID */
  uuid: string

  /** ユーザーID */
  user_id: number

  /** LINEユーザーID */
  line_user_id: string

  /** LINEメッセージID */
  message_id: string

  /** メッセージタイプ */
  message_type: number

  /** テキストメッセージ */
  text_message: string

  /** スタンプの表示に使用するID */
  package_id: string

  /** スタンプの表示に使用するID */
  sticker_id: string

  /** 画像ファイル or 動画ファイル or 音声ファイルのUrl */
  original_content_url: string

  /** 画像ファイル or 動画ファイルのプレビュー表示用のファイルUrl */
  preview_image_url: string

  /** 音声ファイルに使用する値 */
  duration: number

}