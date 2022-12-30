import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { signInByLine } from 'Infra/UserSession/SignInByLine';
import { User } from 'Entity/User';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Campaign } from 'Entity/Campaign';
import { getCampaignListByUser } from 'Infra/Campaign/GetCampaignListByUser';

interface Props {
  currentUser: User | null
}

const IndexTemplate: React.FC<Props> = ({ currentUser }): JSX.Element => {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);
  const [campaignList, setCampaignList] = React.useState<Campaign[] | null>(null);

  React.useEffect(() => {
    const getQueryFromUrl = async () => {
      if (currentUser) {
        setUser(currentUser)
        return
      } else {

        const url = window.location.href

        console.log(url)

        const code = getParam('code', url)
        const state = getParam('state', url)

        console.log(code)
        console.log(state)

        if (state !== 'as2lb3nx32oih' || !code || code === '' || code === 'undefined' || code === 'null') {
          // router.push('/')
          return
        }

        // ここでcodeとstateを使って、ユーザーを取得する
        const res = await signInByLine(code)
        if (!res) {
          console.log('ログインに失敗しました')
          router.push('/')
          return
        }
        setUser(res)
        console.log(user)
      }

      if (!user) {
        console.log('ユーザーが取得できませんでした')
        return
      }

      const campaignRes = await getCampaignListByUser(user.id)
      if (!campaignRes) {
        console.log('キャンペーンの取得に失敗しました')
        return
      }

      setCampaignList(campaignRes.campaignList)


    }
    getQueryFromUrl()
  }, []);


  /**
   * Get the URL parameter value
   *
   * param  name {string} パラメータのキー文字列
   * return  url {url} 対象のURL文字列（任意）
   */
  const getParam = (name: string, url: string) => {
    if (!url) url = window.location.href

    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, " "))
  }

  return (
    <Grid sx={{ display: 'flex', flexWrap: 'wrap', padding: '10px', paddingTop: '10px', justifyContent: 'center', textAlign: 'center' }}>
      <Card sx={{ width: 325, padding: '10px' }}>
        <Typography variant="h5" component="div" gutterBottom textAlign={'center'} fontFamily={'monospace'} border={2} borderColor={'#000000'} borderRadius={2} padding={1}>
          開催中のキャンペーン
        </Typography>
      </Card>
      <Grid item sx={{ display: 'flex', flexWrap: 'wrap', paddingTop: '10px', justifyContent: 'center', textAlign: 'center' }}>
        <Card sx={{ maxWidth: 345, marginBottom: '10px' }}>
          <CardMedia
            sx={{ height: 140 }}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              ボールペン
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Amazonで対象商品の購入をすると、50ポイントをプレゼント！
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        {campaignList && campaignList.map((campaign) => {
          return (
            <Card sx={{ maxWidth: 345, marginBottom: '10px' }}>
              <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {campaign.title}
                  {campaign.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {campaign.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="large">チャレンジ</Button>
              </CardActions>
            </Card>
          )
        })
        }
      </Grid>
    </Grid >
  );
}

export default IndexTemplate;