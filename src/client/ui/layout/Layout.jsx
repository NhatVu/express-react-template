import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import MainSideBar from './MainSideBar.jsx'

export default class Layout extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        console.log("layout did mount")
        jQuery(window).trigger('resize');
    }

    render() {
        return (
            <div class="wrapper">
                <Header/>
                <MainSideBar/>
                <div class="app-content">{this.props.children}</div>
                <Footer/>
            </div>
        )
    }
}
