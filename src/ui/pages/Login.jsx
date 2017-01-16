import React from 'react'

export default class Login extends React.Component {
	constructor() {
		super()
	}

	componentWillMount() {
		console.log("Mount component reset");
		// alert("mount");
	}

	render() {
		console.log("login")
		return (
			<h1>Login</h1>
		)
	}
}
