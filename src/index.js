import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PALLETE } from './config';
import { ThemeProvider, createTheme } from '@mui/material';
import { Provider } from 'react-redux';
import store from './redux/store';

const defaultTheme = createTheme({
  palette: {
    primary: {
      light: PALLETE.PINK,
      main: PALLETE.PURPLE,
      dark: PALLETE.BLUE,
      contrastText: PALLETE.WHITE,
    },
    white: {
      light: PALLETE.WHITE,
      main: PALLETE.WHITE,
      dark: PALLETE.WHITE,
      contrastText: PALLETE.WHITE,
    },
    success: {
      light: "#2e7d32",
      main: "#4caf50",
      dark: "#1b5e20",
      contrastText: PALLETE.WHITE,
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
