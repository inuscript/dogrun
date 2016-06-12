'use babel'
const React = require('react')
const ReactDom = require('react-dom')
const { Component } = React
const { branch } = require('recompose')

const Message = ({background, color, msg}) => {
  let style = { 
    background, color,
    border: `${color} solid 1px`,
    borderRadius: 4,
    padding: 10
  }
  return <div style={style}>{msg}</div>
}

const ErrorMsgRaw = ({msg}) => (<Message msg={msg} color={"#a94442"} background={"#f2dede"}/> )

const Main = () => {
  return <ErrorMsgRaw msg={"Error!!!"} />
}
ReactDom.render(<Main />, document.getElementById('container'))