'use babel'
const React = require('react')
const ReactDom = require('react-dom')
const Messages = require('./messages')
const State = require('./state')
const Timer = require('./timer')

const Main = () => {
  return (
    <div>
      <Timer />
      <State />
      <Messages />
    </div>
  )
}
ReactDom.render(<Main />, document.getElementById('container'))