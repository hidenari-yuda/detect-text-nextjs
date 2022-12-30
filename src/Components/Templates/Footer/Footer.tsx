import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

const IndexTemplate = (): JSX.Element => {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: "5vh" }}>
      </Grid>
      <Box sx={{
        flexGrow: 1, position: "fixed", bottom: "0", width: "100%", backgroundColor: "#fff", boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.25)",
        selectedColor: "#58bb9a", hoverColor: "#58bb9a", display: 'block'
      }}>
        <BottomNavigation
          showLabels
          color="#58bb9a"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="ポイント" sx={{ actionColor: "#58bb9a", hoverColor: "#58bb9a" }} icon={<RestoreIcon sx={{ color: '#58bb9a' }} />}
            onClick={() => router.push('/point')}
          />
          < BottomNavigationAction label="画像をアップ" icon={< FavoriteIcon sx={{ color: '#58bb9a' }} />}
            // <input id="upload" type="file" name="image" accept="image/*" capture></input>
            onClick={() => router.push('/')}
          />
          < BottomNavigationAction label="キャンペーン" icon={< LocationOnIcon sx={{ color: '#58bb9a' }} />}
            onClick={() => router.push('/campaign')}
          />
        </BottomNavigation >
      </Box >
    </>
  );
}

export default IndexTemplate;