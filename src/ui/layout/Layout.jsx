import React from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default class Layout extends React.Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div>
				<Header/>
				<div className="app-content">{this.props.children}</div>
				<Footer/>
			</div>
		)
	}
}
