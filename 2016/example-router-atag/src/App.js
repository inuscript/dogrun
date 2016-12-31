import React, { Component } from 'react';
import { BrowserRouter, Match, Link, NavigationPrompt } from 'react-router'
import logo from './logo.svg';
import './App.css';

const Header = () => (
  <div>
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>This is Header</h2>
    </div>
    <Menu />
  </div>
)

const Menu = () => (
  <ul>
    <li><Link to='/dog/1'>dog1(Link)</Link></li>
    <li><a href='/dog/1'>dog1(a)</a></li>
    <li><Link to='/cat' target="_self">cat</Link></li>
  </ul>
)

const DogPage = (props) => {
  return <ul>
    <li>This is Dog {props.params.id}</li>
    <li><Link to='/dog/2'>dog2</Link></li>
    <li><a href='/cat'>cat</a></li>
  </ul>
}

const CatPage = () => (
  <ul>
    <li>This is Cat</li>
    <li><a href='/dog/1'>dog1</a></li>
    <li><a href='/dog/2'>dog2</a></li>
    <NavigationPrompt message={"really?"} />
  </ul>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Match pattern='/dog/:id' component={DogPage} />
          <Match pattern='/cat' component={CatPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
