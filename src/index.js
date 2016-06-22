'use babel'
import React from 'react'
import ReactDom from 'react-dom'
import Messages from './messages'
import State from './state'
import List from './list'
import Timer from './rx/timer'
import PropsExample from './props'
import TextCounter from './textcount/TextCounter'

const Main = () => {
  return (
    <div>
      <List />
      <TextCounter />
      <Timer />
      <State />
      <PropsExample />
      {/*<Messages />*/}
    </div>
  )
}
ReactDom.render(<Main />, document.getElementById('container'))