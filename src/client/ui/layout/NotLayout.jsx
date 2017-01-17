import React from 'react'

export default class NotLayout extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        jQuery(window).trigger('resize');
    }

    render() {
        return (
            <div>{this.props.children}</div>
        )
    }
}
