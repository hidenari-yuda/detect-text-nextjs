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

const IndexTemplate = (): JSX.Element => {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const getQueryFromUrl = async () => {
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
        // router.push('/')
        return
      }
      setUser(res)

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
          保有ポイント
        </Typography>
        <Typography variant="h1" component="div" gutterBottom textAlign={'center'} fontFamily={'monospace'} border={2} borderColor={'#000000'} borderRadius={2} padding={1}>
          10<span style={{ fontSize: '20px' }}>pt</span>
        </Typography>
      </Card>
      <Grid item sx={{ display: 'flex', flexWrap: 'wrap', paddingTop: '10px', justifyContent: 'center', textAlign: 'center' }}>
        <Card sx={{ maxWidth: 345, marginBottom: '10px' }}>
          <CardMedia
            sx={{ height: 140 }}
            image="https://img.ecnomikata.com/img_contents/ecnews/images/30006_thumbnail_24276_thumbnail_22665_thumbnail_PayPay.jpg?now=20210412155339"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              PayPayポイントに還元する
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="large" variant="contained" sx={{ width: '100%', color: '#ffffff', backgroundColor: 'red' }}
            >ギフトURL発行</Button>
          </CardActions>
        </Card>
        {/* <Card sx={{ maxWidth: 345, marginBottom: '10px' }}>
          <CardMedia
            sx={{ height: 140 }}
            image="data:image/png;base64,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"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              LINEPayポイントに還元する
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="large" variant="contained" sx={{ width: '100%', color: '#ffffff', backgroundColor: 'green' }}
            >ギフトURL発行</Button>
          </CardActions>
        </Card> */}
      </Grid>
    </Grid >
  );
}

export default IndexTemplate;