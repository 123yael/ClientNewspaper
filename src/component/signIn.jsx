import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MANAGER_PASSWODR, MANAGER_EMAIL } from '../config'
import { getCustomerByEmailAndPass } from '../Axios/customerAxios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setCustomer, setManager } from '../redux/actions/CustomersActions';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const defaultTheme = createTheme();

export const SignIn = () => {

  let dispatch = useDispatch()

  // משתמש למעבר בין הקומפוננטות
  const navigate = useNavigate()
  const location = useLocation()

  // פונקציה להתחברות למערכת
  const connect = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    let email = data.get('email') !== "" ? data.get('email') : "null"
    let password = data.get('password') !== "" ? data.get('password') : "null"
    if (email === MANAGER_EMAIL && password === MANAGER_PASSWODR) {
      dispatch(setManager(true))
      navigate('/')
      return
    }
    getCustomerByEmailAndPass(email, password).then(res => {
      if (res.data !== "") {
        Cookies.set("currentUser", JSON.stringify(res.data), { expires: 2 }) // 7 המידע נשמר 7 ימים בעוגיה
        dispatch(setCustomer(res.data))
        dispatch(setManager(false))
        navigate('/')
      }
      else {
        let res = window.confirm('אינך קיים במערכת, אשר עבור מעבר להרשמה')
        if (res)
          navigate('/signUp')
      }
    })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar className='bg-primary p-4'>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={connect} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signUp">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
