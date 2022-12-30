import { Campaign } from "Entity/Campaign"
export namespace CampaignParser {
  // GETメソッド
  export const toModel = (data: any): Campaign => {

    return {
      id: data.id,
      uuid: data.uuid,
      service: data.service,
      url: data.url,
      pictureUrl: data.picture_url,
      price: data.price,
      title: data.title,
      description: data.description,
      impression: data.impression,
      click: data.click,
      clientId: data.client_id,
      createdAt: data.created_at,
    }
  }

  // POST or PUT
  export const toData = (campaign: Campaign): any => {

    return {
      id: campaign.id,
      uuid: campaign.uuid,
      service: campaign.service,
      url: campaign.url,
      picture_url: campaign.pictureUrl,
      price: campaign.price,
      title: campaign.title,
      description: campaign.description,
      impression: campaign.impression,
      click: campaign.click,
      client_id: campaign.clientId,
      created_at: campaign.createdAt,

    }
  }
}
