import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import MainSideBar from './MainSideBar.jsx'
import {connect} from 'react-redux'
import {getUserInfo} from '../../actions/authActions'

class Layout extends React.Component {
    constructor() {
        super()
    }
    componentWillMount() {
        console.log("layout component will mount");
        this.props.dispatch(getUserInfo());
    }

    componentDidMount() {
        console.log("layout did mount")
        jQuery(window).trigger('resize');
    }

    componentWillReceiveProps(props) {
        if (!props.isAuthenticated)
            props.router.push('/login');
        }

    componentDidMount() {
        if (this.props.isAuthenticated)
            this.props.router.push('/login')
    }

    render() {
        const {user, isAuthenticated} = this.props;
        console.log("layout, user:", user)
        console.log("layout, isAuthenticated", isAuthenticated);
        if (!isAuthenticated)
            return <h1>Not login</h1>
            //     this.props.router.push('/login')
        return (
            <div class="wrapper">
                <Header user={user}/>
                <MainSideBar user={user}/>
                <div class="app-content">{this.props.children}</div>
                <Footer/>
            </div>
        )
    }
}

export default connect((store) => {
    return {user: store.auth.user, isAuthenticated: store.auth.isAuthenticated, tweets: store.tweets.tweets};
})(Layout)
