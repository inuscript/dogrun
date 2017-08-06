import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import YouTube from "react-youtube"
// https://developers.google.com/youtube/player_parameters?playerVersion=HTML5
const Part1 = (props) => (
  <YouTube videoId="4GK1NDTWbkY" 
    {...props}
  />
)
class App extends Component {
  render() {
    return (
      <div className="App">
        <Part1 opts={{
          playerVars: {
            start: 35,
            end: 58,
            rel: 0,
            showinfo: 0,
            controls: 2
          }}}
          onEnd={(e) => {
            console.log(e)
          } }
        />
        
      </div>
    );
  }
}

export default App;
