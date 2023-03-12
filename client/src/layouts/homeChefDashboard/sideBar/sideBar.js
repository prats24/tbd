import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useRoutes } from 'react-router-dom';
import HomeChefRoutes from '../../../routes/HomeChefRoutes';
import HomeChefNotificationRoute from '../../../routes/HomeChefNotificationsRoute';
import {userContext} from '../../../context/AuthContext';
import Api from '../../../helpers/api'
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

const drawerWidth = 240;

// const icons = [DashboardIcon,PersonIcon]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);

export default function MiniDrawer({activeMenuItem, onMenuClick}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const [myKitchen,setMyKitchen] = React.useState([])

  const navigate = useNavigate();
  const {userDetail} = React.useContext(userContext);
  console.log(userDetail);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(async()=>{
    console.log(userDetail.kitchen)
    let res = await Api.getMyKitchen(userDetail.kitchen)
    console.log(res.data.data)
    setMyKitchen(res.data.data)
    },[])

  console.log(activeMenuItem,onMenuClick)
  const links = []
  HomeChefRoutes.map((elem)=>{links.push([elem.name,elem.icon])})
  console.log(links)
  const notificationlinks = []
  HomeChefNotificationRoute.map((elem)=>{notificationlinks.push([elem.name,elem.icon])})
  console.log(notificationlinks)
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="successs"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              padding: '1rem' 
            }}
            >
          <Typography variant="h6" noWrap component="div" style={{marginLeft:50}}>
            {myKitchen.kitchenName || undefined} 
          </Typography>
          <Typography display={"flex"} flexDirection={"row"}>
      
          <Typography variant="h6" noWrap component="div" style={{marginTop:12}}>
            {userDetail.firstName + ' ' + userDetail.lastName || undefined}
          </Typography>
          <IconButton onClick={handleClick}>
            <Avatar 
              alt="Profile picture"
              src="/path/to/profile/picture"
              onClick={handleClick}
              style={{ cursor: 'pointer' }}
            />
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open1={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
            </Menu>
          </IconButton>

        </Typography>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {links.map((text, index) => (
            <ListItem key={text[0]} disablePadding sx={{ display: 'block' } }>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => {
                  if(window.location.pathname != '/homechefdashboard'){
                    console.log('moving');
                    navigate('/homechefdashboard');
                  }
                  onMenuClick(text[0]);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {text[1]}
                  {/* {index % 2 === 0 ? <DashboardIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary={text[0]} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {notificationlinks.map((text, index) => (
            <ListItem key={text[0]} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => {
                  if(window.location.pathname != '/homechefdashboard'){
                    console.log('moving');
                    navigate('/homechefdashboard');
                  }
                  onMenuClick(text[0]);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {text[1]}
                </ListItemIcon>
                <ListItemText primary={text[0]} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}