import * as React from 'react';
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
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setIsExistsCustomer } from '../redux/actions/CustomersActions';
import { MANAGER_EMAIL, MANAGER_PASSWODR } from '../config';
import { getFromCookies, removeFromCookies } from '../cookiesUtils';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export const Nav = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const BASELINKS = ['./', 'about', 'newspaperArchive']
    const BASENAVITEMS = ['Home', 'About', 'Newspaper archive']
    const DRAWERWIDTH = 240;

    const [links, setLinks] = useState([...BASELINKS, 'logIn', 'signUp'])
    const [nameLinks, setNameLinks] = useState([...BASENAVITEMS, 'Log In', 'Sign Up'])
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    let isChangeCustomer = useSelector(i => i.CustomersReducer.isExistsCustomer)

    useEffect(() => {
        const custFromCookies = getFromCookies("currentUser")
        if (custFromCookies !== null) {
            if (custFromCookies.custEmail === MANAGER_EMAIL && custFromCookies.custPassword === MANAGER_PASSWODR) {
                setLinks([...BASELINKS, 'advertisingOrder', 'boardAd', 'magazineClosing', 'managerDetails'])
                setNameLinks([...BASENAVITEMS, 'Advertising Order', 'board ad', 'Magazine Closing', 'Advertisments Details'])
            }
            else {
                setLinks([...BASELINKS, 'advertisingOrder', 'boardAd'])
                setNameLinks([...BASENAVITEMS, 'Advertising Order', 'board ad'])
            }
        }
        else {
            setLinks([...BASELINKS, 'logIn', 'signUp'])
            setNameLinks([...BASENAVITEMS, 'Log In', 'Sign Up'])
        }

    }, [isChangeCustomer])

    useEffect(() => {
        if (getFromCookies("currentUser") !== undefined)
            dispatch(setIsExistsCustomer(true))
    }, [])

    const handleDrawerToggle = () => {
        setIsMobileOpen((prevState) => !prevState);
    }

    const anotherSubject = (index) => {
        navigate(`/${links[index]}`)
    }

    const signOut = () => {
        removeFromCookies("currentUser")
        dispatch(setIsExistsCustomer(false))
        navigate('/')
    }

    return (
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
                            nameLinks.map((item, i) => (
                                <Button key={item} className='bg-light text-dark' onClick={() => anotherSubject(i)}>{item}</Button>
                            ))
                        }
                    </Box>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {
                        getFromCookies("currentUser") !== null &&
                        <Button sx={{ mr: 2 }} variant="outlined" onClick={() => signOut()} endIcon={<AccountCircleOutlinedIcon />}>
                            Sign out
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer variant="temporary" open={isMobileOpen} onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { md: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWERWIDTH },
                    }}
                >
                    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
                        <Toolbar sx={{ my: 2 }} style={{ backgroundColor: '#21262A' }} className='p-0 m-0'>
                            <img src='../pic/logo.png' alt="logo" width={140} />
                        </Toolbar>
                        <List>
                            {nameLinks.map((item, i) => (
                                <ListItem key={item} disablePadding>
                                    <ListItemButton sx={{ textAlign: 'center' }} onClick={() => anotherSubject(i)}>
                                        <ListItemText primary={item} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Drawer>
            </Box>
        </Box>
    );
}

export default Nav
