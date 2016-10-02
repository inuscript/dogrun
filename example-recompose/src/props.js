// jsxを最小限に抑えて書けるというサンプル
import React from 'react'
import withProps from 'recompose/withProps'

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

const Before = () => (
  <Message 
    background={"#ff0000"} 
    color={"#00ff00"} 
    msg="赤と緑"
  />
)

const Before2 = () => {
  const props = {
    background: "#ff0000",
    color: "#00ff00",
    msg: "赤と緑"
  }
  return <Message {...props} />
}

const After = withProps( {
  background: "#ff0000",
  color: "#00ff00",
  msg: "赤と緑"
})(Message)

export default () => {
  return <div>
    <Before/>
    <Before2/>
    <After/>
  </div>
}