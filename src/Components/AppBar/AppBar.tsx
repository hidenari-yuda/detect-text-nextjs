import React, { useCallback, useEffect, useState } from 'react'
import {
  Theme,
  CSSObject,
  styled as materialStyled,
} from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer'
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Divider,
  Link,
  IconButton,
  ListItem,
  ListItemIcon,
  useMediaQuery,
  Menu,
  MenuItem,
} from '@mui/material'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Constant, Color, TextColor, FontWeight } from 'styles/Enums'
import styled from 'styled-components'
import { authrizedUserAtom } from 'Context/userAtom'
import { useRecoilValue } from 'recoil'
import { RowContainer, Text } from 'Components/Atomic'
import { signOut } from 'Infra/UserSession/Signout'
import { AppBarListItem } from './Internal/AppBarListItem'

type Props = {
  children: React.ReactNode
}

export const AppBarAndDrawer: React.FC<Props> = ({ children }) => {
  /*********************************************/
  // ドロワー関連
  //
  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = (): void => {
    setOpen(true)
  }

  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  /*********************************************/
  // ログインユーザー情報関連
  //
  const user = useRecoilValue(authrizedUserAtom)
  // const [user, setUser] = useRecoilState(authrizedUserAtom)

  /*********************************************/
  // 画面サイズ
  //
  const matches = useMediaQuery('(max-width:600px)')

  // 画面幅に合わせてドロワーの表示有無を更新
  useEffect(() => {
    if (matches) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [matches])
  /*********************************************/
  // メニューの表示有無
  //
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openMenu = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  /*********************************************/
  // AppBarのリスト
  //
  const appBarList = [
    { label: '求人管理', link: '#' },
    { label: '企業管理', link: '/search/enterprise' },
    { label: '求職者管理', link: '/search/job_seeker' },
    { label: 'タスク', link: '#' },
  ]

  return (
    <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: 'end', position: 'relative' }}>
          <RowContainer justifyContent={'end'} style={{ textAlign: 'right' }}>
            <ListItemIcon sx={{ color: TextColor.Black }}>
              <UserInfo>
                {user?.name}
                <br />
                <UserName>{user?.name}</UserName>
              </UserInfo>
              <IconButton
                id="basic-button"
                aria-controls={openMenu ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            </ListItemIcon>
          </RowContainer>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{ 'aria-labelledby': 'basic-button' }}
            sx={{ top: `15px` }}
          >
            <MenuItem onClick={handleClose}>アカウント設定</MenuItem>
            <MenuItem onClick={() => signOut()}>ログアウト</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
      >
        <FlexBox>
          <div>
            <DrawerHeader>
              <Link href="/">
                {open ? (
                  <Img open={open} src="/image/LogoWhite.png" />
                ) : (
                  <Img open={open} src="/image/LogoWhiteSmall.png" />
                )}
              </Link>
            </DrawerHeader>
            <List>
              {appBarList.map((item, index) => (
                <AppBarListItem
                  key={`list-item${index}`}
                  itemIndex={index}
                  appBarItem={item}
                  drawerOpen={open}
                />
              ))}
            </List>
          </div>
          <FooterArea>
            {open && (
              <>
                <MaterialDivider />
                <ListItem
                  disablePadding
                  sx={{ display: 'block', padding: '8px 16px' }}
                >
                  <Link
                    href={'#'}
                    // target={'_blank'}
                    underline={'none'}
                    color={'inherit'}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    使い方
                    <LaunchOutlinedIcon sx={{ fontSize: '16px' }} />
                  </Link>
                </ListItem>
                <ListItem
                  disablePadding
                  sx={{ display: 'block', padding: '8px 16px' }}
                >
                  <Link
                    href={'#'}
                    // target={'_blank'}
                    underline={'none'}
                    color={'inherit'}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    利用規約
                    <LaunchOutlinedIcon sx={{ fontSize: '16px' }} />
                  </Link>
                </ListItem>
              </>
            )}
            <MaterialDivider />
            <ButtonBlock open={open}>
              {open ? (
                <IconButton
                  onClick={handleDrawerClose}
                  sx={{ color: TextColor.White }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => !matches && handleDrawerOpen()}
                  sx={{ color: TextColor.White }}
                >
                  <ChevronRightIcon />
                </IconButton>
              )}
            </ButtonBlock>
          </FooterArea>
        </FlexBox>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        style={{ marginTop: Constant.NavigationHeight, padding: 0 }}
      >
        {children}
      </Box>
    </Box>
  )
}

const Img = styled.img<{ open: boolean }>`
  height: ${(props) => (props.open ? '40px' : '50px')};
  border: none;
  cursor: pointer;
  outline: none;
  background: transparent;
`

const UserInfo = styled(Text)`
  font-size: 12px;
  text-align: right;
  margin-right: 0.5rem;
`

const UserName = styled.span`
  font-weight: ${FontWeight.Bold};
`

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`

const FooterArea = styled.div`
  width: 100%;
`

const ButtonBlock = styled.div<{ open: boolean }>`
  width: fit-content;
  margin: ${(props) => (props.open ? '0 10px 0 auto' : '0 auto')};
  padding: 8px;
`

const drawerWidth = 200

const openedMixin = (
  theme: Theme,
): CSSObject => ({
  color: TextColor.White,
  width: drawerWidth,
  backgroundColor: Color.Main,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (
  theme: Theme,
): CSSObject => ({
  color: TextColor.White,
  backgroundColor: Color.Main,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = materialStyled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = materialStyled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  minHeight: Constant.NavigationHeight,
  background: Color.Base,
  boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%)',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    color: TextColor.Black,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(!open && {
    width: `calc(100% - ${theme.spacing(7)} + 1px)`,
  }),
}))

interface DrawerProps extends MuiDrawerProps {
  open?: boolean
}

const Drawer = materialStyled(MuiDrawer)<DrawerProps>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const MaterialDivider = materialStyled(Divider)(() => ({
  borderColor: 'rgba(255,255,255,0.5)',
}))
