import React from 'react'
import {Route, IndexRoute, browserHistory, Router} from 'react-router'
import routes from './routes'

export default class Routes extends React.Component {
	render() {
		return (
			<Router history={browserHistory} routes={routes}></Router>
		)
	}
}
