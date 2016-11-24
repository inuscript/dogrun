import React, { Component } from 'react';
import { BrowserRouter, Match, Link } from 'react-router'
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
    <li><Link to='/dog1'>dog1(Link)</Link></li>
    <li><a href='/dog1'>dog1(a)</a></li>
  </ul>
)

const DogPage1 = () => (
  <ul>
    <li>This is Dog1</li>
    <li><Link to='/dog2'>dog2</Link></li>
    <li><a href='/cat'>cat</a></li>
  </ul>
)

const DogPage2 = () => (
  <ul>
    <li>This is Dog2</li>
    <li><Link to='/dog1'>dog1</Link></li>
    <li><a href='/cat'>cat</a></li>
  </ul>
)

const CatPage = () => (
  <ul>
    <li>This is Cat</li>
    <li><a href='/dog1'>dog1</a></li>
    <li><a href='/dog2'>dog2</a></li>
  </ul>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Match pattern='/dog1' component={DogPage1} />
          <Match pattern='/dog2' component={DogPage2} />
          <Match pattern='/cat' component={CatPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
