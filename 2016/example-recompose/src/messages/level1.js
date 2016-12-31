// 完全に Componentを継承して実装
// cons 
// - componentが肥大化
// - 単にメッセージを表示しているわりに、複雑
// - 例えば一部だけ独自の色にしたかったら・・・？

const React = require('react')
const { Component } = require('react')

class LevelMessage extends Component{
  schema(level){
    switch(level){
    case "error":
      return {color: "#a94442", background: "#f2dede"}
    case "warn":
      return {color: "#8a6d3b", background: "#fcf8e3"}
    default:
      return {color: "#31708f", background: "#d9edf7"}
    }
  }
  buildStyle({color, background}){
    return { 
      background, 
      color,
      border: `${color} solid 1px`,
      borderRadius: 4,
      padding: 10,
      marginBottom: 5
    }
  }
  render(){
    let {level, msg} = this.props
    let schema = this.schema(level)
    let style = Object.assign({},
      this.buildStyle(schema)
    )
    return <div style={style}>{msg}</div>
  }
}

module.exports = LevelMessage