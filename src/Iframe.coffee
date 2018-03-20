# This file is part of react-components
# Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
# Licensed under MIT
# https://github.com/kynikos/lib.js.react-components/blob/master/LICENSE

{Component, createElement} = require('react')
ReactDOM = require('react-dom')
ReactDOMServer = require('react-dom/server')


class module.exports extends Component
    render: ->
        createElement('iframe', {
            style: {display: 'none'}
        })

    componentDidMount: ->
        @componentDidUpdate()

    componentDidUpdate: ->
        iframe = ReactDOM.findDOMNode(this)
        if iframe.contentWindow
            iframe.contentWindow.document.open()
            iframe.contentWindow.document.write(
                "<!doctype html>\n" +
                ReactDOMServer.renderToString(@props.html)
            )
            iframe.contentWindow.document.close()

    print: ->
        iframe = ReactDOM.findDOMNode(this)
        if iframe.contentWindow
            iframe.contentWindow.print()
