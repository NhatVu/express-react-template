import React from 'react'
import {Route, IndexRoute, browserHistory, Router} from 'react-router'
// import layout component
import Footer from '../ui/layout/Footer.jsx'
import Header from '../ui/layout/Header.jsx'
import Layout from '../ui/layout/Layout.jsx'

// import page component'
import HomePage from '../ui/pages/HomePage.jsx'
import Login from '../ui/pages/Login.jsx'
import NotFound from '../ui/pages/NotFound.jsx'

const routes = (
	<Route path="/" component={Layout}>
		<IndexRoute component={HomePage}/>
		<Route path="login" component={Login}/> {/* <Route path="*" component={NotFound}/> */}
	</Route>
)

export default routes
