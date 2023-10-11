import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './bootstrap.min.css'
import { Routings } from './component/routings';
import store from './redux/store';
import { PALLETE, SERVER_NAME } from './config';
import { ThemeProvider, createTheme } from '@mui/material';
import { GlobalAxios } from './Axios/globalAxios';
import { Loading } from './component/loading/loading';
import { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { addMessage, createConnection } from './redux/actions/MessageActions';

function App() {

  let dispatch = useDispatch()

  const joinRoom = async (user, room) => {

    try {
      const connection = new HubConnectionBuilder()
        .withUrl(`${SERVER_NAME}/chat`, {
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets
        })
        .configureLogging(LogLevel.Information)
        .build()

      connection.on("ReceiveMessage", (user, message) => {
        dispatch(addMessage({ user, message }))
        // setMessages(messages => [...messages, { user, message }])
      })

      await connection.start()
      await connection.invoke("JoinRoom", { user, room })

      dispatch(createConnection(connection))
      // setConnection(connection)

    } catch (e) {
      console.log(e);
    }
  }

  joinRoom("yaeel", "malkin")

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
