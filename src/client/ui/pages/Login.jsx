import React from 'react'

export default class Login extends React.Component {
    constructor() {
        super()
    }

    componentWillMount() {
        // alert("mount");
    }
    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                        <h1 class="text-center">
                            <span class="glyphicon glyphicon-share"></span>
                            Login
                        </h1>
                        <form action="/users/login" method="post">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" name="email" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="text" name="password" class="form-control"/>
                            </div>
                            <button type="submit" name="Login" class="btn btn-warning btn-lg">Login</button>
                        </form>
                        <br/>
                        <a href="/oauth/facebook" class="btn btn-primary">Login via Facebook</a>
                        <a href="/oauth/google" class="btn btn-danger">Login via Google</a>
                        <a href="" class="btn btn-primary">Login via Twitter</a>
                    </div>
                </div>
            </div>
        )
    }
}
