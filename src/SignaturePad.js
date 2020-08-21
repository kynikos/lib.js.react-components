// This file is part of react-components
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.react-components/blob/master/LICENSE

import {createElement as h, useRef, useEffect} from 'react'
import SignaturePad_ from 'signature_pad'


export default function SignaturePad({
  defaultData, padRef, size, scale, style, readOnly, onBegin,
}) {
  const canvas = useRef(null)

  useEffect(() => {
    if (!padRef.current) {
      if (scale) {
        const context = canvas.current.getContext('2d')
        context.scale(...scale)
      }

      const pad = new SignaturePad_(canvas.current, {
        onBegin,
      })

      if (defaultData) pad.fromData(defaultData)

      padRef.current = pad
    }
  }, [size, scale])

  useEffect(() => {
    if (readOnly) padRef.current.off()
    else padRef.current.on()
  }, [readOnly])

  return h('canvas', {
    ref: canvas,
    width: size[0],
    height: size[1],
    style,
  })
}
