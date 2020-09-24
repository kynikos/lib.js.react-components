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
  setWindowState, externalWindow, windowUrl, windowName, width, height, center,
  windowFeaturesObject, windowFeaturesString, makeContent,
}) {
  const containerElement = useRef(null)

  useEffect(() => {
    openWindow({
      setWindowState,
      externalWindow,
      windowUrl,
      windowName,
      width,
      height,
      center,
      windowFeaturesObject,
      windowFeaturesString,
      containerElement,
    })

    // The ref value 'externalWindow.current' may change by the time the effect
    // cleanup function runs, so always update the value here
    const currentExternalWindow = externalWindow.current

    return () => closeWindow(currentExternalWindow, setWindowState)
  }, [])

  if (!containerElement.current) return null

  return createPortal(makeContent(externalWindow), containerElement.current)
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
  setWindowState, externalWindow, windowUrl, windowName, width, height, center,
  windowFeaturesObject, windowFeaturesString, containerElement,
}) {
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

  externalWindow.current = window.open(
    windowUrl,
    windowName,
    windowFeaturesArray.join(','),
  )

  externalWindow.current.onload = () => {
    containerElement.current =
      externalWindow.current.document.createElement('div')

    externalWindow.current.document.body.style.margin = 0
    externalWindow.current.document.body.style.padding = 0
    externalWindow.current.document.body.appendChild(containerElement.current)

    setWindowState({visible: true, loading: false})

    externalWindow.current.addEventListener('unload', (event) => {
      // This is called when the user closes the window manually
      setWindowState({visible: false, loading: false})
    })
  }
}


function closeWindow(currentExternalWindow, setWindowState) {
  // This is called when the component gets unmounted, but not when the
  // user closes the window manually; for that there's the 'unload' handler
  // above
  setWindowState({visible: false, loading: false})
  currentExternalWindow.close()
}
