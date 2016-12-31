import React from 'react'
import ReactDom from 'react-dom'
import Main from './src/'

ReactDom.render(
  <Main />,
  document.body.appendChild(document.createElement('div'))
)