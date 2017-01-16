import React from "react"

export default class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <footer class="main-footer">
                <div class="pull-right hidden-xs">
                    <b>Version</b>
                    2.3.8
                </div>
                <strong>Copyright &copy; 2014-2016
                    <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong>
                All rights reserved.
            </footer>
        )
    }
}
