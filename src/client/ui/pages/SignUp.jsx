import React from 'react'

export default class SignUp extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-md-offset-3">
                        <h1 class="text-center">
                            <span class="glyphicon glyphicon-share"></span>
                            Signup
                        </h1>
                        <form action="/users" method="post">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" name="email" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="text" name="password" class="form-control"/>
                            </div>
                            <button type="submit" name="Login" class="btn btn-warning btn-lg">Signup</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
