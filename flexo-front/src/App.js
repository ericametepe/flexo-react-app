import React, {Component} from 'react';
import BrowserRouter from "react-router-dom/BrowserRouter";
import './App.css';
import Main from "./components/MainComponent";
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore';

const store = ConfigureStore();
class App extends Component{

    render() {
        return(
            <Provider store={store}>
            <BrowserRouter>
            <div className="App">
                <Main />
            </div>
            </BrowserRouter>
            </Provider>
        );
    }
}
export default App;
