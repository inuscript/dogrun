import React, { Component } from 'react';
import { SendButton, CancelButton } from './Button'
class App extends Component {
  render() {
    return (
      <div className="App">
        <SendButton>Send</SendButton>
        <CancelButton>Cancel</CancelButton>
      </div>
    );
  }
}

export default App;
