import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// 
const ReactDom = require('react-dom')
const ReactInstrumentation = require('react-dom/lib/ReactInstrumentation.js');
const ReactComponentTreeHook  = require('react/lib/ReactComponentTreeHook.js');

window.ReactComponentTreeHook = ReactComponentTreeHook


// こんな感じで、対象の親の名前とれるはず
// ReactComponentTreeHook.getDisplayName( ReactComponentTreeHook.getOwnerID(debugId) )


const myHook = {
  onMountComponent(debugId ) {
    const element = ReactComponentTreeHook.getElement(debugId)
    console.log(ReactDom.findDOMNode(element))
    // console.log(debugId, element, element.ref)
    // element.onclick = (e) => {
    //   console.log(debugID)
    // }
  },
  // onBeforeUpdateComponent(debugID, element) {
  //   console.log(debugID, element);
  // },
};
ReactInstrumentation.debugTool.addHook(myHook)

const Header = () => (
  <div>
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
  </div>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
