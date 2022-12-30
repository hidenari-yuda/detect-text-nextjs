import { constants } from 'buffer'
import { Campaign } from 'Entity/Campaign'
import { User } from 'Entity/User'
import { axiosInstance } from 'Infra/axios'
import { CampaignParser } from 'Infra/DataParser/CampaignParser'
import { UserParser } from 'Infra/DataParser/UserParser'

export type Response = {
  campaignList: Campaign[]
}

export const getCampaignListByUser = async (userId: number): Promise<Response> => {
  return await axiosInstance('Default')
    .get(`/api/campaign/list/user/${userId}`, {
      validateStatus: () => true,
    })
    .then((r) => {
      const list = r.data.campaign_list
      if (list == null) {
        return { campaignList: [] }
      }
      return {
        campaignList: (list as any[]).map((data: any): Campaign => {
          return CampaignParser.toModel(data)
        }),
      }
    })
    .catch((e) => {
      console.log(e.message)
      return Promise.reject('キャンペーンの取得に失敗しました')
    }
    )
}