// This file is part of react-components
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.react-components/blob/master/LICENSE

import {createElement as h, Children, useState, useRef} from 'react'
import {Iframe} from './Iframe'


export function PrintHtml({
  makeHtml, disabled, children, AntdButton, buttonIcon,
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const iFrame = useRef(null)

  return h(AntdButton,
    {
      icon: buttonIcon,
      disabled,
      onClick: async (event) => {
        await setDialogOpen(true)
        iFrame.current.print()
        // print() is synchronous :)
        setDialogOpen(false)
      },
    },
    ...Children.toArray(children),
    // Keeping the iframe as the last children lets Ant Design properly
    // apply a margin between the icon and the label text
    dialogOpen && h(Iframe, {html: makeHtml(), ref: iFrame}),
  )
}
