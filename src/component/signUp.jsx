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
import { Link, useNavigate } from 'react-router-dom';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { signUp } from '../Axios/customerAxios';
import { useDispatch } from 'react-redux';
import { setIsExistsCustomer } from '../redux/actions/CustomersActions';
import { saveToCookies } from '../cookiesUtils';
import * as yup from 'yup';
import { useFormik } from 'formik';

const defaultTheme = createTheme();

const validationSchema = yup.object({
  firstName: yup
    .string('Enter your firstName')
    .max(20, 'You cannot enter more than 20 letters')
    .required('Email is required'),
  lastName: yup
    .string('Enter your lastName')
    .max(20, 'You cannot enter more than 20 letters')
    .required('Email is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .string('Enter your phone')
    .min(7, 'Phone should be of minimum 7 characters length')
    .max(10, 'You cannot enter more than 10 letters')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .max(20, 'You cannot enter more than 20 letters')
    .required('Password is required'),
});

export const SignUp = () => {

  const formik = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', phone: '', password: '', },
    validationSchema: validationSchema,
    onSubmit: (values) => { handleSubmit(values) },
  });

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    let newCust = {
      custFirstName: values.firstName,
      custLastName: values.lastName,
      custEmail: values.email,
      custPhone: values.phone,
      custPassword: values.password,
    }

    signUp(newCust).then(res => {
      dispatch(setIsExistsCustomer(true))
      saveToCookies("currentUser", res.data, 2)
      navigate('/')
    }).catch(err => {
      if (err.response.status === 409)
        alert("Email already exists")
      else if (err.response.status === 500)
        alert("Server error");
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
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
            <SensorOccupiedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}

                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  value={formik.values.phone}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  fullWidth
                  name="phone"
                  label="phone"
                  type="tel"
                  id="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                Already have an account? {" "}
                <Link to='/signIn'>
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
