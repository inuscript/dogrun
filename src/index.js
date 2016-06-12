'use babel'
const React = require('react')
const ReactDom = require('react-dom')
const { Component } = React
const { branch, withProps } = require('recompose')

const Message = ({background, color, msg}) => {
  let style = { 
    background, color,
    border: `${color} solid 1px`,
    borderRadius: 4,
    padding: 10,
    marginBottom: 5
  }
  return <div style={style}>{msg}</div>
}

// const ErrorMsgRaw = ({msg}) => (<Message msg={msg} color={"#a94442"} background={"#f2dede"} /> )

const errorEnhance = withProps({color: "#a94442", background: "#f2dede"})
const ErrorMsg = errorEnhance(Message)

const warnEnhance = withProps({color: "#8a6d3b", background: "#fcf8e3"})
const WarnMsg = warnEnhance(Message)

const Main = () => {
  return (<div>
    <ErrorMsg msg={"Error!!!"} />
    <WarnMsg msg={"Warn!!!"} />
  </div>)
}
ReactDom.render(<Main />, document.getElementById('container'))