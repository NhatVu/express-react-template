import React from 'react'
import {Route, IndexRoute, browserHistory, Router} from 'react-router'
// import layout component
import Footer from '../src/ui/layout/Footer.jsx'
import Header from '../src/ui/layout/Header.jsx'
import Layout from '../src/ui/layout/Layout.jsx'

// import page component'
import HomePage from '../src/ui/pages/HomePage.jsx'
import Login from '../src/ui/pages/Login.jsx'
import NotFound from '../src/ui/pages/NotFound.jsx'

export default class Routes extends React.Component {
	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={Layout}>
					<IndexRoute component={HomePage}/>
					<Route path="/login" component={Login}/>
					<Route path="*" component={NotFound}/>
				</Route>
			</Router>
		)
	}
}
