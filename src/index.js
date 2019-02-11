import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import './styles/style.scss';
import AppRoute from './Routes/Router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import store from './store/store';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
const AppRendere = () => (
    <MuiThemeProvider>
        <AppRoute />
    </MuiThemeProvider>
);
const App = () => (
    <Provider store={store}>
        <AppRendere />
    </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
