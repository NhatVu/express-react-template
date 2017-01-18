import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './AppRoutes.jsx'
import {Provider} from 'react-redux'
import store from "./store"

ReactDOM.render(
    <Provider store={store}>
    <AppRoutes/>
</Provider>, document.getElementById('render'));
