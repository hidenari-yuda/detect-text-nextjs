import * as yup from 'yup'
import { Resolver } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// SeeAlso: https://github.com/jquense/yup
const text = {
  any: yup.string(),
  required: yup.string().required('必須項目です。'),
  username: yup.string().required('ユーザーネームを入力してください'),
  postCode: yup
    .string()
    .required('郵便番号を入力してください')
    .matches(
      /^[0-9]{3}-[0-9]{4}$/,
      '郵便番号はハイフン有りで正しく入力ください'
    ),
}

const number = {
  any: yup
    .number()
    .transform((currentValue, originalValue) => {
      return originalValue === '' ? null : currentValue
    })
    .nullable()
    .typeError('Must be a number'),
  required: yup
    .number()
    .typeError('必須項目です。')
    .required('必須項目です。')
    .nullable(),
  usageStatus: yup.number().nullable().required('利用状態を選択してください'),
  notification: yup
    .number()
    .nullable()
    .required('メール通知設定を選択してください'),
}

const multiSelect = {
  required: yup
    .array(yup.number())
    .min(1, '必須項目です。一つ以上選択してください')
    .required('必須項目です。一つ以上選択してください'),
  any: yup.array(yup.number()),
}

const email = {
  email: yup
    .string()
    .required('メールアドレスを入力してください')
    .email('形式がemailではありません。'),
}
const password = {
  password: yup
    .string()
    .required('パスワードを入力してください')
    .min(8, 'パスワードは最低8文字です。')
    .matches(
      /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
      '8文字以上の英数字で入力してください'
    ),

  confirmPassword: yup
    .string()
    .required('パスワードを再入力してください')
    .oneOf([yup.ref('password')], 'パスワードが一致しません'),

  adminPassword: yup
    .string()
    .required('パスワードを入力してください')
    .min(8, 'パスワードは最低8文字です。'),
}

const tel = {
  required: yup
    .string()
    .required('電話番号を入力してください')
    .min(11, '電話番号の形式に誤りがあります')
    .matches(/^[0-9]+$/, '電話番号の形式に誤りがあります'),
}

export type EmailAndPassInputs = {
  email: string
  password: string
}

export const emailAndPassSchema: Resolver<EmailAndPassInputs> = yupResolver(
  yup.object().shape({
    email: email.email,
    password: password.password,
  })
)

export type UserNameAndPassInputs = {
  username: string
  password: string
}

export const userNameAndPassSchema: Resolver<UserNameAndPassInputs> =
  yupResolver(
    yup.object().shape({
      username: text.username,
      password: password.adminPassword,
    })
  )

export type UserInputs = {
  name: string
  email: string
  password: string
}

export const userSchema: Resolver<UserInputs> = yupResolver(
  yup.object().shape({
    name: text.required,
    email: email.email,
    password: password.password,
  })
)
