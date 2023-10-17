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
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setIsExistsCustomer } from '../redux/actions/CustomersActions';
import { MANAGER_EMAIL, MANAGER_PASSWODR, PALLETE } from '../config';
import { getFromCookies, removeFromCookies } from '../shared-functions/cookiesUtils';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';

export const Nav = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const BASELINKS = ['./', 'about', 'newspaperArchive']
    const BASENAVITEMS = ['Home', 'About', 'Newspaper archive']
    const DRAWERWIDTH = 240;

    const [links, setLinks] = useState([...BASELINKS, 'logIn', 'signUp'])
    const [nameLinks, setNameLinks] = useState([...BASENAVITEMS, 'Log In', 'Sign Up'])
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [value, setValue] = useState(0);


    let isChangeCustomer = useSelector(i => i.CustomersReducer.isExistsCustomer)

    useEffect(() => {
        const custFromCookies = getFromCookies("currentUser")
        let arr = []
        if (custFromCookies !== null) {
            if (custFromCookies.custEmail === MANAGER_EMAIL && custFromCookies.custPassword === MANAGER_PASSWODR) {
                arr = [...BASELINKS, 'advertisingOrder', 'boardAd', 'magazineClosing', 'managerDetails']
                setLinks(arr)
                setNameLinks([...BASENAVITEMS, 'Advertising Order', 'board ad', 'Magazine Closing', 'Advertisments Details'])
            }
            else {
                arr = [...BASELINKS, 'advertisingOrder', 'boardAd']
                setLinks(arr)
                setNameLinks([...BASENAVITEMS, 'Advertising Order', 'board ad'])
            }
        }
        else {
            arr = [...BASELINKS, 'logIn', 'signUp']
            setLinks(arr)
            setNameLinks([...BASENAVITEMS, 'Log In', 'Sign Up'])
        }
        let l = location.pathname.slice(1)
        setValue(arr.indexOf(l === "" ? "./" : l))
    }, [isChangeCustomer])

    useEffect(() => {
        if (getFromCookies("currentUser") !== undefined)
            dispatch(setIsExistsCustomer(true))
    }, [])

    useEffect(() => {
        let l = location.pathname.slice(1)
        setValue(links.indexOf(l === "" ? "./" : l))
    }, [location.pathname])

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

    const handleChange = (event, index) => {
        setValue(index);
        navigate(`/${links[index]}`)
    };

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
                    <Toolbar sx={{ display: { xs: 'none', md: 'block', m: 0 }, backgroundColor: '#21262A' }} className='p-0'>
                        <img src='../pic/logo.png' alt="logo" width={140} />
                    </Toolbar>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }} className='ms-3 p-0'>
                        <TabContext value={value}>
                            <TabList onChange={handleChange} >
                                {
                                    nameLinks.map((item, i) => (
                                        <Tab variant="contained" key={item} label={item} value={i} />
                                    ))
                                }
                            </TabList>
                        </TabContext>
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
                            <TabContext value={value}>
                                <TabList onChange={handleChange} orientation="vertical">
                                    {
                                        nameLinks.map((item, i) => (
                                            <Tab key={item} label={item} value={i} />
                                        ))
                                    }
                                </TabList>
                            </TabContext>
                        </List>
                    </Box>
                </Drawer>
            </Box>
        </Box>
    );
}

export default Nav
