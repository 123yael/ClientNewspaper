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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCustomerByEmailAndPass } from '../Axios/customerAxios';
import { useDispatch } from 'react-redux';
import { setIsExistsCustomer } from '../redux/actions/CustomersActions';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { saveToCookies } from '../cookiesUtils';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { PALLETE } from '../config';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .max(20, 'You cannot enter more than 20 letters')
    .required('Password is required'),
});

export const SignIn = () => {

  const formik = useFormik({
    initialValues: { email: '', password: '', },
    validationSchema: validationSchema,
    onSubmit: (values) => { handleSignIn(values) },
  });

  let dispatch = useDispatch()

  const navigate = useNavigate()
  const location = useLocation()

  const handleSignIn = (values) => {

    getCustomerByEmailAndPass(values.email, values.password).then(res => {
      if (res.data !== "") {
        dispatch(setIsExistsCustomer(true))
        saveToCookies("currentUser", res.data, 2)
        navigate('/')
      }
      else {
        let res = window.confirm('You do not exist in the system, please proceed to registration')
        if (res)
          navigate('/signUp')
      }
    })
  }


  return (
    <div className='py-5 container'>
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
          <Avatar className='p-4' sx={{ backgroundColor: PALLETE.PURPLE }}>
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
            <TextField
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              margin="normal"
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
                Don't have an account? {" "}
                <Link to="/signUp" style={{ color: PALLETE.PURPLE }}>
                  Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
