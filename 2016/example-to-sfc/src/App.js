import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const SfcInput = (props) => <input {...props} />
const SfcInput2 = ({value, onChange}) => <input value={value} onChange={onChange} />
const SfcInput3 = ({value, onChange}) => <input defaultValue={value} onChange={onChange} />
const SfcInput4 = ({value, onChange}) => <input value={value} />

class InputTest extends Component {
  constructor(){
    super()
    this.state = {
      inputVal: "hoge"
    }
  }
  handleChange = (e) => {
    this.setState({
      inputVal: e.target.value
    })
  }
  render(){
    return <div>
      {this.state.inputVal}
      <SfcInput
        value={this.state.inputVal}
        onChange={this.handleChange}
      />
      <SfcInput2
        value={this.state.inputVal}
        onChange={this.handleChange}
      />
      <SfcInput3
        value={this.state.inputVal}
        onChange={this.handleChange}
      />
      <SfcInput4
        value={this.state.inputVal}
      />
    </div>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <InputTest />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
