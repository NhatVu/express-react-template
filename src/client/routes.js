import React from 'react'
import {Route, IndexRoute, browserHistory, Router} from 'react-router'
// import layout component
import Footer from './ui/layout/Footer.jsx'
import Header from './ui/layout/Header.jsx'
import Layout from './ui/layout/Layout.jsx'
import NotLayout from './ui/layout/NotLayout.jsx'

// import page component'
import HomePage from './ui/pages/HomePage.jsx'
import Login from './ui/pages/Login.jsx'
import NotFound from './ui/pages/NotFound.jsx'
import SignUp from './ui/pages/SignUp.jsx'
import UserHomePage from './ui/pages/UserHomePage.jsx'
import Redux from './ui/pages/Redux.jsx'
//
const AdminRoute = (
    <Route path="admin" component={Layout}>
        <IndexRoute component={HomePage}/>
        <Route path="index.html" component={HomePage}/>
        <Route path="*" component={NotFound}/>
    </Route>
)
//
// export const NotLayoutRoute = (
//     <Route path="user" component={NotLayout}>
//         <IndexRoute component={UserHomePage}/>
//         <Route path="login" component={Login}></Route>
//         <Route path="signup" component={SignUp}></Route>
//         <Route path="*" component={NotFound}/>
//     </Route>
// )
export const ReactRoutes = (
    <Route path="/" component={NotLayout}>
        <IndexRoute component={UserHomePage}/>
        <Route path="login" component={Login}></Route>
        <Route path="signup" component={SignUp}></Route>
        <Route path="redux" component={Redux}/> {/* <Route path="admin" component={Layout}>
            <IndexRoute component={HomePage}/>
            <Route path="index.html" component={HomePage}/>
            <Route path="*" component={NotFound}/>
        </Route> */}
        {AdminRoute}
        <Route path="*" component={NotFound}/>
    </Route>
)
