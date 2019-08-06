"use strict";

// This file is part of react-components
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.react-components/blob/master/LICENSE
var _require = require('react'),
    h = _require.createElement,
    Children = _require.Children;

module.exports = function GeoMapLink(_ref) {
  var query = _ref.query,
      _ref$lat = _ref.lat,
      lat = _ref$lat === void 0 ? 0 : _ref$lat,
      _ref$lon = _ref.lon,
      lon = _ref$lon === void 0 ? 0 : _ref$lon,
      children = _ref.children;
  var coords = [lat, lon].join(',');
  return h('a', {
    href: window.navigator.platform.match(/iPad|iPhone|iPod/i) == null ? "geo:".concat(coords, "?q=").concat(query || coords) // TODO: The "geo:" URI scheme doesn't work on Safari yet
    // TODO: Apparently putting the coordinates in place of 0,0 doesn't work
    : "maps:0,0?q=".concat(query || coords)
  }, Children.toArray(children));
};