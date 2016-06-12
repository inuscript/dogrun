'use babel'
const React = require('react')
const ReactDom = require('react-dom')
const { Component } = React
const { branch } = require('recompose')


const Main = () => <div>Hello</div>
ReactDom.render(<Main />, document.getElementById('container'))