'use babel'
const React = require('react')
const ReactDom = require('react-dom')
const Messages = require('./messages')
const State = require('./state')

const Main = () => {
  return (
    <div>
      <State />
      <Messages />
    </div>
  )
}
ReactDom.render(<Main />, document.getElementById('container'))