// This file is part of react-components
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.react-components/blob/master/LICENSE

const {Component, createElement} = require('react')
const ReactDOM = require('react-dom')
const ReactDOMServer = require('react-dom/server')


module.exports = class Iframe extends Component {
  render() {
    return createElement('iframe', {
      // Setting display:none makes it unprintable in Chrome
      style: {
        width: '0',
        height: '0',
        border: 'none',
        margin: '0',
      }
    })
  }

  componentDidMount() {
    this.componentDidUpdate()
  }

  componentDidUpdate() {
    // TODO: Use the following if browsers stop supporting document.write()
    //       The problem is that this won't render any external images
    //       embedded with <img> elements
    // iframe = ReactDOM.findDOMNode(this)
    // if iframe
    //     iframe.src = URL.createObjectURL(new Blob([
    //         ReactDOMServer.renderToString(@props.html)
    //     ], {type: 'text/html'}))

    const iframe = ReactDOM.findDOMNode(this)
    const doc = iframe.contentDocument

    if (doc) {
      doc.open()
      doc.write(
        `<!doctype html>\n${ReactDOMServer.renderToString(this.props.html)}`
      )
      doc.close()
    }
  }

  print() {
    const iframe = ReactDOM.findDOMNode(this)
    const win = iframe.contentWindow

    if (win) {
      win.print()
    }
  }
}
