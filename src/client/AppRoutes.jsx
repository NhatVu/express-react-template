import React from 'react'
import {Route, IndexRoute, browserHistory, Router} from 'react-router'
// import {LayoutRoute, NotLayoutRoute} from './routes'
import {ReactRoutes} from './routes'

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                {/* {LayoutRoute} */}
                {/* {NotLayoutRoute} */}
                {ReactRoutes}
            </Router>
        )
    }
}
