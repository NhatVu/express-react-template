import React from 'react'
import {Link} from 'react-router'

export default class NotFound extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="content-wrapper">
                <div className="content">
                    <h1>Return to homepage</h1>
                    <Link to='/'>Home</Link>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 col-sm-offset-2">
                                <img class="img-responsive" src="/img/pageNotFound.jpg" alt="Page not found"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
