import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Contact } from './contact';
import { PALLETE } from '../config';
import { getDateNow } from '../shared-functions/shared-functions';

const Copyright = () => {
  return (
    <Typography variant="body2" sx={{color: PALLETE.WHITE}}>
      {'Yael © '}
      <Link color="inherit" href="https://github.com/123yael">
        github
      </Link>{' '}{getDateNow().getFullYear()}
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

      boxShadow={true}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        <Contact></Contact>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: PALLETE.DARK_GRAY
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
