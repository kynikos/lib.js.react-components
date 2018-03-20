'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  // This file is part of react-components
  // Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
  // Licensed under MIT
  // https://github.com/kynikos/lib.js.react-components/blob/master/LICENSE
  var Component, ReactDOM, ReactDOMServer, createElement;

  var _require = require('react');

  Component = _require.Component;
  createElement = _require.createElement;


  ReactDOM = require('react-dom');

  ReactDOMServer = require('react-dom/server');

  module.exports = function (_Component) {
    _inherits(exports, _Component);

    function exports() {
      _classCallCheck(this, exports);

      return _possibleConstructorReturn(this, (exports.__proto__ || Object.getPrototypeOf(exports)).apply(this, arguments));
    }

    _createClass(exports, [{
      key: 'render',
      value: function render() {
        return createElement('iframe', {
          style: {
            display: 'none'
          }
        });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        return this.componentDidUpdate();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var iframe;
        iframe = ReactDOM.findDOMNode(this);
        if (iframe.contentWindow) {
          iframe.contentWindow.document.open();
          iframe.contentWindow.document.write("<!doctype html>\n" + ReactDOMServer.renderToString(this.props.html));
          return iframe.contentWindow.document.close();
        }
      }
    }, {
      key: 'print',
      value: function print() {
        var iframe;
        iframe = ReactDOM.findDOMNode(this);
        if (iframe.contentWindow) {
          return iframe.contentWindow.print();
        }
      }
    }]);

    return exports;
  }(Component);
}).call(undefined);