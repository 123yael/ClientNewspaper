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
import { Footer } from './footer';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCustomer, setManager } from '../redux/actions/CustomersActions';



export const Nav = () => {

    const BASELINKS = ['./', 'about', 'newspaperArchive', 'signIn', 'signUp']
    const BASENAVITEMS = ['Home', 'About', 'Newspaper archive', 'Sign In', 'Sign Up']

    // משתמש למעבר בין הקומפוננטות
    const navigate = useNavigate()
    // מערך שמכיל את קישורי הקומפוננטות שאליהם נעבור דרת ה nav
    const [links, setLinks] = useState(BASELINKS)
    // מערך שמכיל את השמות שיוצגו בתפריט הראשי nav
    const [navItems, setNavItems] = useState(BASENAVITEMS)
    // קבוע שמציין אתה גודל הרוחב של התפריט הצדדי שיפתח במצב של מסך קטן
    const DRAWERWIDTH = 240;
    // משתנה שמכיל את התשובה האם לפתוח תפריט צדדי
    const [mobileOpen, setMobileOpen] = useState(false)

    let isManager = useSelector(i => i.CustomersReducer.isManager)
    let customer = useSelector(i => i.CustomersReducer.customer)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isManager) {
            setLinks([...BASELINKS, 'advertisingOrder', 'boardAd', 'magazineClosing', 'managerDetails'])
            setNavItems([...BASENAVITEMS, 'Advertising Order', 'board ad', 'Magazine Closing', 'All Advertisments Details'])
        }
    }, [isManager])


    useEffect(() => {
        debugger
        const value = Cookies.get("currentUser")
        const value2 = (value !== undefined) ? JSON.parse(value) : ""
        if (customer.custId !== undefined || value2.custId !== undefined) {
            setLinks([...BASELINKS, 'advertisingOrder', 'boardAd'])
            setNavItems([...BASENAVITEMS, 'Advertising Order', 'board ad'])
        }
    }, [customer])

    // פונקציה שמשנה את מצב המשתנה שאומר האם לפתוח תפריט צדדי
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    // פונקציה שמעבירה לקומפוננטה אחרת
    const anotherSubject = (index) => {
        navigate(`/${links[index]}`)
    }

    const signOut = () => {
        // Cookies.set("currentUser", {})
        Cookies.remove("currentUser")
        dispatch(setManager(false))
        dispatch(setCustomer({}))
        setLinks([...BASELINKS])
        setNavItems([...BASENAVITEMS])
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
                        <Box sx={{ flex: '1 1 auto' }} />
                        {links.length > BASELINKS.length && <Button sx={{ mr: 2 }} variant="outlined" color="secondary" onClick={() => signOut()}>Sign out</Button>}
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { md: 'block', lg: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWERWIDTH },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Box>
            <div className='py-5 container'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
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
