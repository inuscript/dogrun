'use babel'
const React = require('react')
const ReactDom = require('react-dom')
const Messages = require('./messages')

const Main = () => {
  return (
    <div>
      <Messages />
    </div>
  )
}
ReactDom.render(<Main />, document.getElementById('container'))