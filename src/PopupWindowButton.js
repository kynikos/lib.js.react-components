// This file is part of react-components
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.react-components/blob/master/LICENSE

import {createElement as h, useState, useRef} from 'react'
import {PopupWindow} from './PopupWindow'


export function PopupWindowButton({
  Button, icon, label, title, size, loading, windowUrl, windowInitialHtml,
  beforeMakingContent, windowName, windowTitle, windowWidth, windowHeight,
  windowCenter, windowFeaturesObject, windowFeaturesString, nameToOpenWindowRef,
  beforeOpenAlways, beforeOpenIfNotAlready, makeWindowReactContent,
  handleWindowUnload,
}) {
  const [state, setState] = useState({
    visible: false,
    loading: false,
  })

  const externalWindow = useRef(null)

  return h(Button,
    {
      icon,
      title,
      size,
      loading: loading || state.loading,
      onClick: async () => {
        setState({
          visible: state.visible,
          loading: true,
        })

        beforeOpenAlways && await beforeOpenAlways()

        if (state.visible && externalWindow.current) {
          if (state.loading) {
            // TODO[UI]: This case is tricky, is it possible that the window
            //    gets stuck in the 'loading' state? How to handle it?
          } else if (externalWindow.current.closed) {
            // PopupWindow handles 'unload', so that should always reset
            // 'visible' to false when it's closed, and this condition should
            // never be reached, anyway handle this just for safety
            await setState({
              visible: false,
              loading: false,
            })
            setState({
              visible: true,
              loading: true,
            })
          } else {
            await setState({
              visible: true,
              loading: false,
            })
            externalWindow.current.focus()
          }
        } else if (nameToOpenWindowRef && windowName in nameToOpenWindowRef) {
          // A window with the same name may have been opened by another button
          nameToOpenWindowRef[windowName].current.focus()
          setState({
            visible: state.visible,
            loading: false,
          })
        } else {
          beforeOpenIfNotAlready && await beforeOpenIfNotAlready()
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
      nameToOpenWindowRef,
      windowUrl,
      windowInitialHtml,
      beforeMakingContent,
      windowName,
      windowTitle,
      width: windowWidth,
      height: windowHeight,
      center: windowCenter,
      windowFeaturesObject,
      windowFeaturesString,
      makeReactContent: makeWindowReactContent,
      handleUnload: handleWindowUnload,
    }),
  )
}
