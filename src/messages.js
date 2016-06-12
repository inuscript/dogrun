const React = require('react')
const { defaultProps, withProps } = require('recompose')

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

const messageEnhancer = defaultProps({color: "#31708f", background: "#d9edf7"})
const DefaultMessage = messageEnhancer(Message)

// const ErrorMsgRaw = ({msg}) => (<Message msg={msg} color={"#a94442"} background={"#f2dede"} /> )

const errorEnhance = withProps({color: "#a94442", background: "#f2dede"})
const ErrorMsg = errorEnhance(Message)

const warnEnhance = withProps({color: "#8a6d3b", background: "#fcf8e3"})
const WarnMsg = warnEnhance(Message)

const Main = () => {
  return (<div>
    <DefaultMessage msg={"Default"} />
    <DefaultMessage msg={"Default with green"} color={"orange"} background={"purple"} />
    <ErrorMsg msg={"Error!!!"} />
    <WarnMsg msg={"Warn!!!"} />
  </div>)
}

module.exports = Main