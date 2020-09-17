// This file is part of react-components
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.react-components/blob/master/LICENSE

import {createElement as h, useState, useRef} from 'react'
import Button from 'antd/lib/button'
import {PopupWindow} from './PopupWindow'


export function PopupWindowButton({
  icon, label, windowName, width, height, center, windowFeaturesObject,
  windowFeaturesString, makeContent,
}) {
  const [state, setState] = useState({
    visible: false,
    loading: false,
  })

  const externalWindow = useRef(null)

  return h(Button,
    {
      icon,
      loading: state.loading,
      onClick: (event) => {
        event.preventDefault()

        if (state.visible && externalWindow.current) {
          if (state.loading) {
            // TODO[UI]: This case is tricky, is it possible that the window
            //    gets stuck in the 'loading' state? How to handle it?
          } else if (externalWindow.current.closed) {
            // PopupWindow handles 'unload', so that should always reset
            // 'visible' to false when it's closed, and this condition should
            // never be reached, anyway handle this just for safety
            (async () => {
              await setState({
                visible: false,
                loading: false,
              })
              setState({
                visible: true,
                loading: true,
              })
            })()
          } else {
            externalWindow.current.focus()
          }
        } else {
          setState({
            visible: true,
            loading: true,
          })
        }
      },
    },
    label,
    state.visible && h(PopupWindow, {
      loading: state.loading,
      setWindowState: setState,
      externalWindow,
      windowName,
      width,
      height,
      center,
      windowFeaturesObject,
      windowFeaturesString,
      makeContent,
    }),
  )
}
