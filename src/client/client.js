import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './AppRoutes.jsx'
import {Provider} from 'react-redux'
import store from "./store"

// $(document).ready(function() {
ReactDOM.render(
    <Provider store={store}>
    <AppRoutes/>
</Provider>, document.getElementById('render'));
// })
// window.onload = () => {
// 	ReactDOM.render(
// 		<AppRoutes/>, document.getElementById('render'));
// };
