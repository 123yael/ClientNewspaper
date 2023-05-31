import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import RoundaboutLeftRoundedIcon from '@mui/icons-material/RoundaboutLeftRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import ContactPageRoundedIcon from '@mui/icons-material/ContactPageRounded';
import MarkUnreadChatAltRoundedIcon from '@mui/icons-material/MarkUnreadChatAltRounded';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

// משתנה שמגדיר באיזה גודל יהיה ה nav הצדדי
const drawerWidth = 240;

export const ResponsiveDrawer = (props) => {
  const navigate = useNavigate()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // משתנה שאומר על איזה לחצן לחצו כעת בתפריט הראשי
  const [numOfSubject, setNumOfSubject] = React.useState(0)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  // מערך שמכיל את שמות האיכונים של ה nav הצדדי
  const icons = [<HomeRoundedIcon />, <RoundaboutLeftRoundedIcon />, <NewspaperRoundedIcon />, <ViewListRoundedIcon />, <SellRoundedIcon />, <ContactPageRoundedIcon />, <MarkUnreadChatAltRoundedIcon />]
  const labels = ['Home', 'About', 'Newspaper archive', 'Advertising Order', 'Prices', 'Contact Us', 'Board Ad']
  const links = ['/', 'about', 'newspaperArchive', 'advertisingOrder', 'prices', 'contact', 'boardAd']

  // פונקציה שמעבירה לקומפוננטה אחרת
  const anotherSubject = (index) => {
    navigate(links[index])
    setNumOfSubject(index)
    handleDrawerToggle()
  }
  // משתנה שמכיל את ה nav הצדדי
  const drawer = (
    <div>
      <Toolbar style={{ backgroundColor: '#21262A' }}>
        <img src='../pic/logo.png' alt="logo" width={140} className="m-0 p-0" />
      </Toolbar>
      <Divider />
      <List>
        {labels.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => anotherSubject(index)}>
              <ListItemIcon className='col-1'>
                {icons[index]}
              </ListItemIcon>
              <ListItemText primary={text} className='col-2' />
            </ListItemButton>
            <NavLink to="/"></NavLink>
          </ListItem>
        ))
        }
      </List >
      <Divider />
    </div >
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          {/* הכפתור שיוצד במסך קטן לפתיחת התפריט הצדדי */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">{labels[numOfSubject]}</Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` } }} >
        <Toolbar />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}

