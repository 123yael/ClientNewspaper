// import { BottomNavigation, ListItemButton } from "@mui/material"
// import { Link, useNavigate } from "react-router-dom"


// export const Nav = () => {

//     const navigate = useNavigate()
//     const labels = ['Home', 'About', 'Newspaper archive', 'Advertising Order', 'Prices', 'Contact Us', 'board ad']
//     const links = ['/', 'about', 'newspaperArchive', 'advertisingOrder', 'prices', 'contact', 'boardAd']

//     // פונקציה שמעבירה לומפוננטה אחרת
//     const anotherSubject = (index) => {
//         navigate(`/responsiveDrawer/${links[index]}`)
//     }

//     return (
//         // <div className="bg-light navbar fixed-top container text-dark">
//         //     {
//         //         labels.map((l, i) => (
//         //             <div className="nav-item navbar-brand" key={i}><ListItemButton onClick={() => anotherSubject(i)}>{l}</ListItemButton></div>
//         //         ))
//         //     }
//         // </div>
//         <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
//             <div class="container-fluid">
//                 <button
//                     class="navbar-toggler"
//                     type="button"
//                     data-mdb-toggle="collapse"
//                     data-mdb-target="#navbarExample01"
//                     aria-controls="navbarExample01"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                 >
//                     <i class="fas fa-bars"></i>
//                 </button>
//                 <div class="collapse navbar-collapse" id="navbarExample01">
//                     <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                         {
//                             labels.map((l, i) => (
//                                 <li class="nav-item active">
//                                     <ListItemButton class="nav-link" aria-current="page" onClick={() => anotherSubject(i)}>{l}</ListItemButton>
//                                 </li>
//                             ))
//                         }
//                     </ul>
//                 </div>
//             </div>
//         </nav>
//     )
// }
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';
import { Footer } from './footer/footer';



export const Nav = (props) => {
    const navigate = useNavigate()
    const links = ['./', 'about', 'newspaperArchive', 'advertisingOrder', 'logIn', 'contact', 'boardAd']
    const drawerWidth = 240;
    const navItems = ['Home', 'About', 'Newspaper archive', 'Advertising Order', 'logIn', 'Contact Us', 'board ad'];
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    // פונקציה שמעבירה לומפוננטה אחרת
    const anotherSubject = (index) => {
        navigate(`/${links[index]}`)
    }

    // זהו משתנה שמכיל את התפריט שנפתח כאשר המסך קטן
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Toolbar sx={{ my: 2 }} style={{ backgroundColor: '#21262A' }} className='p-0 m-0'>
                <img src='../pic/logo.png' alt="logo" width={140} />
            </Toolbar>
            <List>
                {navItems.map((item, i) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => anotherSubject(i)}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav" className='bg-light text-dark'>
                    <Toolbar className='p-0'>
                        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' }, ml: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Toolbar sx={{ display: { xs: 'none', md: 'block' } }} style={{ backgroundColor: '#21262A' }} className='p-0'>
                            <img src='../pic/logo.png' alt="logo" width={140} />
                        </Toolbar>
                        <Box sx={{ display: { xs: 'none', md: 'block' } }} className='ms-3'>
                            {
                                navItems.map((item, i) => (
                                    <Button key={item} className='bg-light text-dark' onClick={() => anotherSubject(i)}>{item}</Button>
                                ))
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { md: 'block', lg: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Box>
            {/* <br /> */}
            <div className='pt-5 container pb-5'>
                <Outlet></Outlet>
            </div>
            {/* <div className=''>
                <Footer></Footer>
            </div> */}
        </div>
    );
}

Nav.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Nav
