import React from 'react'

export default class HomePage extends React.Component {
	constructor() {
		super()
	}

	componentDidMount() {
		console.log("component did mount");
	}

	render() {
		return (
			<div class="container">
				<div class="jumbotron text-center">
					<h1>
						<span class="glyphicon glyphicon-lock"></span>
						Node Authentication
					</h1>
					<p>Login or Register with:
					</p>

					<a href="/login.html" class="btn btn-default">
						<span class="glyphicon glyphicon-user"></span>Login</a>
					<a href="/signup.html" class="btn btn-default">
						<span class="glyphicon glyphicon-user"></span>Signup</a>
				</div>
			</div>
		)
	}
}
