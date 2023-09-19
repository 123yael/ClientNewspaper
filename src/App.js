import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './bootstrap.min.css'
import { Routings } from './component/routings';
import store from './redux/store';
import { PALLETE } from './config';
import { ThemeProvider, createTheme } from '@mui/material';
import { GlobalAxios } from './Axios/globalAxios';
import { Loading } from './component/loading/loading';


function App() {
  return (
    <div className="App">
      <GlobalAxios></GlobalAxios>
      <Loading></Loading>
      <BrowserRouter>
        <Routings></Routings>
      </BrowserRouter>
    </div>
  )
}


export default App;
