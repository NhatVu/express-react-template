import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {logout} from '../../actions/authActions'

class Header extends React.Component {
    constructor() {
        super()
    }

    logout() {
        this.props.logout();
        // this.props.router.push('/login')
    }

    render() {
        const {user} = this.props;
        return (

            <header class="main-header">
                <a href="/index.html" class="logo">
                    <span class="logo-mini">
                        <b>A</b>LT</span>
                    <span class="logo-lg">
                        <b>Admin</b>LTE</span>
                </a>
                {/* <!-- Header Navbar: style can be found in header.less --> */}
                <nav class="navbar navbar-static-top">
                    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>

                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li class="dropdown user user-menu">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="/dist/img/user2-160x160.jpg" class="user-image" alt="User Image"/>
                                    <span class="hidden-xs">{user.email}</span>
                                </a>
                                <ul class="dropdown-menu">
                                    {/* <!-- User image --> */}
                                    <li class="user-header">
                                        <img src="/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image"/>
                                        <p>
                                            {user.email}- Web Developer
                                            <small>Member since Nov. 2012</small>
                                        </p>
                                    </li>
                                    <li class="user-body">
                                        <div class="row">
                                            <div class="col-xs-4 text-center">
                                                <a href="#">Followers</a>
                                            </div>
                                            <div class="col-xs-4 text-center">
                                                <a href="#">Sales</a>
                                            </div>
                                            <div class="col-xs-4 text-center">
                                                <a href="#">Friends</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li class="user-footer">
                                        <div class="pull-left">
                                            <a href="#" class="btn btn-default btn-flat">Profile</a>
                                        </div>
                                        <div class="pull-right">
                                            <a href="#" class="btn btn-default btn-flat" onClick={this.logout.bind(this)}>Sign out</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

Header.propTypes = {
    user: React.PropTypes.object.isRequired
}

export default connect(null, {logout})(Header)
