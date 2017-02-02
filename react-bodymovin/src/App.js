import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import bodymovin from 'bodymovin'
import axios from "axios"
// const data = require('./data.json')

class BodyMovinContainer extends Component{
  componentDidMount(){
    const sample = "https://raw.githubusercontent.com/bodymovin/bodymovin/master/demo/bodymovin/data.json"
    axios.get(sample, {
      responseType: 'json'
    }).then( ({data}) => {
      console.log(data)
      bodymovin.loadAnimation({
        container: this.container, // the dom element
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: data
      })
    })

  }
  render(){
    return <div ref={n => this.container = n}/>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <BodyMovinContainer />
      </div>
    );
  }
}

export default App;
