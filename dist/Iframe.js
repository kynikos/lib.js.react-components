"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// This file is part of react-components
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.react-components/blob/master/LICENSE
var _require = require('react'),
    Component = _require.Component,
    createElement = _require.createElement;

var ReactDOM = require('react-dom');

var ReactDOMServer = require('react-dom/server');

module.exports =
/*#__PURE__*/
function (_Component) {
  _inherits(Iframe, _Component);

  function Iframe() {
    _classCallCheck(this, Iframe);

    return _possibleConstructorReturn(this, _getPrototypeOf(Iframe).apply(this, arguments));
  }

  _createClass(Iframe, [{
    key: "render",
    value: function render() {
      return createElement('iframe', {
        // Setting display:none makes it unprintable in Chrome
        style: {
          width: '0',
          height: '0',
          border: 'none',
          margin: '0'
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.componentDidUpdate();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      // TODO: Use the following if browsers stop supporting document.write()
      //       The problem is that this won't render any external images
      //       embedded with <img> elements
      // iframe = ReactDOM.findDOMNode(this)
      // if iframe
      //     iframe.src = URL.createObjectURL(new Blob([
      //         ReactDOMServer.renderToString(@props.html)
      //     ], {type: 'text/html'}))
      var iframe = ReactDOM.findDOMNode(this);
      var doc = iframe.contentDocument;

      if (doc) {
        doc.open();
        doc.write("<!doctype html>\n".concat(ReactDOMServer.renderToString(this.props.html)));
        doc.close();
      }
    }
  }, {
    key: "print",
    value: function print() {
      var iframe = ReactDOM.findDOMNode(this);
      var win = iframe.contentWindow;

      if (win) {
        win.print();
      }
    }
  }]);

  return Iframe;
}(Component);