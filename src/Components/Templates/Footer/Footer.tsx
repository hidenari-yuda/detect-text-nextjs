import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useRouter } from 'next/router';

const IndexTemplate = (): JSX.Element => {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="ポイント" icon={<RestoreIcon />}
          onClick={() => router.push('/')}
        />
        <BottomNavigationAction label="画像をアップ" icon={<FavoriteIcon />}
          onClick={() => router.push('/')}
        />
        <BottomNavigationAction label="キャンペーン" icon={<LocationOnIcon />}
          onClick={() => router.push('/')}
        />
      </BottomNavigation>
    </Box >
  );
}

export default IndexTemplate;