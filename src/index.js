'use babel'
const React = require('react')
const ReactDom = require('react-dom')
const Messages = require('./messages')
const State = require('./state')
const Timer = require('./timer')
import PropsExample from './props'
import TextCounter from './textcount/TextCounter'

const Main = () => {
  return (
    <div>
      <TextCounter />
      <Timer />
      <State />
      <PropsExample />
      {/*<Messages />*/}
    </div>
  )
}
ReactDom.render(<Main />, document.getElementById('container'))