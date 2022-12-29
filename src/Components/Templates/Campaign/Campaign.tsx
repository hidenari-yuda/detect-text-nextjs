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

const IndexTemplate = (): JSX.Element => {
  const router = useRouter();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const getQueryFromUrl = async () => {
      const url = window.location.href

      const code = getParam('code', url)
      const state = getParam('state', url)

      console.log(code)
      console.log(state)

      if (state !== 'as2lb3nx32oih' || !code || code === '' || code === 'undefined' || code === 'null') {
        router.push('/')
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
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default IndexTemplate;