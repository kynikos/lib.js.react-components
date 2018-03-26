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
            # Setting display:none makes it unprintable in Chrome
            style: {
                width: '0'
                height: '0'
                border: 'none'
                margin: '0'
            }
        })

    componentDidMount: ->
        @componentDidUpdate()

    componentDidUpdate: ->
        # TODO: Use the following if browsers stop supporting document.write()
        #       The problem is that this won't render any external images
        #       embedded with <img> elements
        # iframe = ReactDOM.findDOMNode(this)
        # if iframe
        #     iframe.src = URL.createObjectURL(new Blob([
        #         ReactDOMServer.renderToString(@props.html)
        #     ], {type: 'text/html'}))

        iframe = ReactDOM.findDOMNode(this)
        doc = iframe.contentDocument
        if doc
            doc.open()
            doc.write(
                "<!doctype html>\n" +
                ReactDOMServer.renderToString(@props.html)
            )
            doc.close()

    print: ->
        iframe = ReactDOM.findDOMNode(this)
        win = iframe.contentWindow
        if win
            win.print()
