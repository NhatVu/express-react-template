import React from 'react'
import {Link} from 'react-router'

export default class UserHomePage extends React.Component {
    constructor() {
        super()
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

                    <Link to="/login" class="btn btn-default">
                        <span class="glyphicon glyphicon-user"></span>Login</Link>
                    <Link to="/signup" class="btn btn-default">
                        <span class="glyphicon glyphicon-user"></span>Signup</Link>
                </div>
            </div>
        )
    }
}
