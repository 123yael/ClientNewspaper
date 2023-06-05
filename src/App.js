import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import './bootstrap.min.css'
import { Routings } from './component/routings';
import store from './redux/store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routings></Routings>
        </BrowserRouter>
      </Provider>
    </div>
  )
}


export default App;
