// This file is part of react-components
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.react-components/blob/master/LICENSE

import {useRef, useEffect, memo} from 'react'
import {createPortal} from 'react-dom'

// https://reactjs.org/docs/portals.html
// https://stackoverflow.com/a/47574660


export const PopupWindow = memo(function PopupWindow({
  // Do keep 'loading' here, even if it's not explicitly used, because I need
  // the component to react to its change in value
  loading, // Keep 'loading' here
  setWindowState, externalWindow, nameToOpenWindowRef, windowUrl,
  windowInitialHtml, beforeMakingContent, windowName, windowTitle,
  width, height, center, windowFeaturesObject, windowFeaturesString,
  makeReactContent, handleUnload,
}) {
  const containerElement = useRef(null)

  useEffect(() => {
    if (externalWindow.current) {
      // BUG: For some reason, when closing the window explicitly with
      //    window.close() (for example with a Cancel/Close button), the
      //    component is remounted, and thus useEffect() recalled
      return
    }

    openWindow({
      setWindowState,
      externalWindow,
      nameToOpenWindowRef,
      windowUrl,
      windowInitialHtml,
      beforeMakingContent,
      windowName,
      windowTitle,
      width,
      height,
      center,
      windowFeaturesObject,
      windowFeaturesString,
      containerElement,
      handleUnload,
    })

    // The ref value 'externalWindow.current' may change by the time the effect
    // cleanup function runs, so just use externalWindow here
    return () => closeWindow(externalWindow)
  }, [])

  if (!containerElement.current) return null

  return createPortal(
    makeReactContent(externalWindow),
    containerElement.current,
  )
})


// https://stackoverflow.com/a/32261263
function makeCenteredCoordinates(parentWindow, width, height) {
  return {
    top: parentWindow.top.outerHeight / 2 +
      parentWindow.top.screenY - (height / 2),
    left: parentWindow.top.outerWidth / 2 +
      parentWindow.top.screenX - (width / 2),
  }
}


function makeWindowFeatures(object) {
  return Object.entries(object).map((entry) => {
    return entry.join('=')
  }).join(',')
}


function openWindow({
  setWindowState, externalWindow, nameToOpenWindowRef, windowUrl,
  windowInitialHtml, beforeMakingContent, windowName, windowTitle,
  width, height, center, windowFeaturesObject, windowFeaturesString,
  containerElement, handleUnload,
}) {
  if (nameToOpenWindowRef && windowName in nameToOpenWindowRef) {
    // It's not easy to handle the case whereby a window with the same name may
    // already be open
    throw new Error(`A window name ${windowName} is already open`)
  }

  let windowFeaturesObjectMerged = {}

  if (windowFeaturesObject) {
    windowFeaturesObjectMerged = {
      ...windowFeaturesObjectMerged,
      ...windowFeaturesObject,
    }
  }
  if (width != null) windowFeaturesObjectMerged.width = width
  if (height != null) windowFeaturesObjectMerged.height = height
  if (center) {
    windowFeaturesObjectMerged = {
      ...windowFeaturesObjectMerged,
      ...makeCenteredCoordinates(window, width, height),
    }
  }

  const windowFeaturesArray = []

  if (Object.keys(windowFeaturesObjectMerged).length) {
    windowFeaturesArray.push(makeWindowFeatures(windowFeaturesObjectMerged))
  }
  if (windowFeaturesString) {
    windowFeaturesArray.push(windowFeaturesString)
  }

  const windowObj = window.open(
    windowUrl,
    windowName,
    windowFeaturesArray.join(','),
  )

  if (!windowObj) {
    // The window couldn't be opened but no native error was raised
    throw new WindowOpenError()
  }

  externalWindow.current = windowObj

  if (nameToOpenWindowRef) {
    nameToOpenWindowRef[windowName] = externalWindow
  }

  externalWindow.current.onload = () => {
    if (windowTitle) {
      externalWindow.current.document.title = windowTitle
    }

    windowInitialHtml &&
      externalWindow.current.document.write(windowInitialHtml)

    beforeMakingContent && beforeMakingContent(externalWindow)

    containerElement.current =
      externalWindow.current.document.createElement('div')

    externalWindow.current.document.body.style.margin = 0
    externalWindow.current.document.body.style.padding = 0
    externalWindow.current.document.body.appendChild(containerElement.current)

    setWindowState({visible: true, loading: false})

    externalWindow.current.addEventListener('unload', (event) => {
      externalWindow.current = null
      if (nameToOpenWindowRef && windowName in nameToOpenWindowRef) {
        delete nameToOpenWindowRef[windowName]
      }
      setWindowState({visible: false, loading: false})
      handleUnload && handleUnload()
    })
  }
}


function closeWindow(externalWindow) {
  // This is called when the component gets unmounted, but not when the
  // user closes the window manually; for that there's the 'unload' handler
  // above
  // window.close() triggers the 'unload' event
  externalWindow.current && externalWindow.current.close()
}


export class WindowOpenError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}
