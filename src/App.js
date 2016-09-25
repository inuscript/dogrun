import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const FooDecorate = ({children}) => {
  return <div style={{
    color: "red"
  }}>{children}</div>
}
const BazDecorate = ({children}) => {
  return <div style={{
    color: "blue"
  }}>{children}</div>
}
const GoodLabel = ({children}) => {
  return <div>{children}</div>
}
const BadLabel = ({label}) => {
  return <div>{label}</div>
}
const Post1 = ({title, children}) => {
  const titleNode = (typeof title === "function") ? title() : title
  return <div>
    <div>{titleNode}</div>
    <div>{children}</div>
  </div>
}
// Post.propTypes = {
//   children: React.PropTypes.node,
// }
const Post = ({ children: [title, body] }) => {
  return <div>
    <div>{title}</div>
    <div>{body}</div>
  </div>
}
Post.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.node),
}

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <GoodLabel children="foo" />
        <GoodLabel>foo</GoodLabel>
        <BadLabel>foo</BadLabel>
        <BadLabel label="foo" /> */}
        {/* <Post title={"aaa"} >
          <FooDecorate>ほげ</FooDecorate>
        </Post>
        <Post title={() => {
          return <BazDecorate>Titleですよ</BazDecorate>
        }} >
          <FooDecorate>ほげ</FooDecorate>
        </Post> */}
        <Post>
          <BazDecorate>Titleですよ</BazDecorate>
          <FooDecorate>ほげ</FooDecorate>
        </Post>
      </div>
    );
  }
}

export default App;
