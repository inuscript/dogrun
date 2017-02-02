import React, { Component } from 'react';
import bodymovin from 'bodymovin'
import axios from "axios"

// download data from github
const getData = () => {
  const sample = "https://raw.githubusercontent.com/bodymovin/bodymovin/master/demo/bodymovin/data.json"
  return axios.get(sample, {
    responseType: 'json'
  }).then( ({data}) => data)
}

class BodyMovinContainer extends Component{
  componentDidMount(){
    getData().then( data => {
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
      <div style={{width: 400}}>
        <BodyMovinContainer />
      </div>
    );
  }
}


export default App;
