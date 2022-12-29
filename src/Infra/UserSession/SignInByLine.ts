import { User } from 'Entity/User'
import { axiosInstance } from 'Infra/axios'
import { UserParser } from 'Infra/DataParser/UserParser'

export const signInByLine = async (code: string): Promise<User> => {
  return await axiosInstance('Default')
    .post(`/api/signin/line/${code}`, {
      validateStatus: () => true,
    })
    .then((r) => {
      const data = r.data.user
      const user: User = UserParser.toModel(data)
      return Promise.resolve(user)
    })
    .catch((e) => {
      console.log(e.message)
      return Promise.reject('ユーザーの取得に失敗しました')
    })
}