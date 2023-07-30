import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Contact } from './contact';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'yael © '}
      <Link color="inherit" href="https://github.com/123yael">
        github
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
        borderTop: (theme) => `1px solid ${theme.palette.grey[600]}`,
        boxShadow: "unset",
        backgroundColor: (theme) => theme.palette.grey[300]
            
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
          mt: 'auto'
        }}
        className="bg-secondary"
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
