const React = require('react')
const { Component } = require('react')

const schemas = (level) => {
  switch(level){
  case "error":
    return {color: "#a94442", background: "#f2dede"}
  case "warn":
    return {color: "#8a6d3b", background: "#fcf8e3"}
  default:
    return {color: "#31708f", background: "#d9edf7"}
  }  
}

const buildStyle = (schema) => {
  return { 
    background, 
    color,
    border: `${color} solid 1px`,
    borderRadius: 4,
    padding: 10,
    marginBottom: 5
  }
}

const LevelMessage = ({level, msg}) => {
  let schema = schema(level)
  let style = Object.assign({},
    buildStyle(schema)
  )
  return <div style={style}>{msg}</div>
}

module.exports = LevelMessage