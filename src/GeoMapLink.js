// This file is part of react-components
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.react-components/blob/master/LICENSE

import {createElement as h, Children} from 'react'


export function GeoMapLink({
  query,
  lat = 0,
  lon = 0,
  children,
}) {
  const coords = [lat, lon].join(',')

  return h('a', {
    href: window.navigator.platform.match(/iPad|iPhone|iPod/ui) == null
      ? `geo:${coords}?q=${query || coords}`
      // TODO: The "geo:" URI scheme doesn't work on Safari yet
      // TODO: Apparently putting the coordinates in place of 0,0 doesn't work
      : `maps:0,0?q=${query || coords}`,
  }, Children.toArray(children))
}
