import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Contact } from './contact';
import { PALLETE } from '../config';
import { RegisterForTheNewsletter } from './registerForTheNewsletter';
import { Link } from '@mui/material';

const Copyright = () => {
  return (
    <Typography variant="body2" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:3000/">
        Y ads
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '70vh',
        boxShadow: "unset",
        backgroundColor: PALLETE.LIGHT_GRAY
      }}
      color="text.secondary"
      boxShadow={true}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        <Contact></Contact>
      </Container>
      <Box sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: PALLETE.DARK_GRAY
      }}>
        <RegisterForTheNewsletter></RegisterForTheNewsletter>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
