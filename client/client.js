import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './AppRoutes.jsx';
import Routes from './routes'

window.onload = () => {
	ReactDOM.render(
		<Routes/>, document.getElementById('render-target'));
};
