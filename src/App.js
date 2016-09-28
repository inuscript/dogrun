import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Avater from './Avater'
import Postx from './Posty'
import {FooPost, BazPost} from './Post'

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
GoodLabel.propTypes = {
  children : React.PropTypes.node
}
const BadLabel = ({label}) => {
  return <div>{label}</div>
}
// const Post = ({title, author, children, titleComponent}) => {
//   const TitleComponent = titleComponent
//   return <div>
//     <div><TitleComponent {...{title, author}} /></div>
//     <div>{children}</div>
//   </div>
// }
// const Post2 = ({title, author, children, titleRender}) => {
//   return <div>
//     <div>{ titleRender({title, author}) }</div>
//     <div>{ children }</div>
//   </div>
// }
// Post2.defaultProps = {
//   titleRender : ({title, author}) => (<div>{title} {author}</div>)
// }
// 
// 
{/* Post.propTypes = {
  children: React.PropTypes.node,
} */}
// const Post2 = ({ children: [title, body] }) => {
//   return <div>
//     <div>{title}</div>
//     <div>{body}</div>
//   </div>
// }
// Post2.propTypes = {
//   children: React.PropTypes.arrayOf(React.PropTypes.node),
// }
// const Title = ({children}) => (<div>children</div>)
// const Body = ({children}) => (<div>children</div>)
// const Post = ({children}) => {
//   console.log(Array.isArray(children))
//   children.map( ( value) => {
//     console.log(value.type)
//   })
//   return <div>
//     <div>{children}</div>
//   </div>
// }

// const Avater = ({name, profile, tweet}) => {
//   <div>
//     <div>{name}</div>
//     <div>{profile}</div>
//     <div>{tweet}</div>
//   </div>
// }
const Post = ({title, author, children}) => {
  return <div>
    <div>{title} : {author}</div>
    <div>{children}</div>
  </div>
}




const MyPost = () => {
  const titleNode = (<BazDecorate>Titleですよ</BazDecorate>)
  return <Post title={titleNode} author="bob">
    <FooDecorate>ほげ</FooDecorate>
  </Post>
}


const SomeTitle = ({title, author}) => {
  return <div>{title} (author: {author})</div>
}
class SomeTitleClassCmp extends Component{
  render(){
    const {title, author} = this.props
    return <div>{title} (author: {author})</div>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Postx />
        {/* <GoodLabel children="foo" />
        <GoodLabel>foo</GoodLabel> */}
        {/* <BadLabel>foo</BadLabel> */}
        {/* <BadLabel label="foo" />
        <BadLabel label={<div>hoge</div>} />
        <Post author="myname"
          title="hoge"
          titleComponent={SomeTitleClassCmp} >
          <FooDecorate>ほげ</FooDecorate>
        </Post> */}
        {/* <FooPost author="myname"
          title="hoge">
          <FooDecorate>ほげ</FooDecorate>
        </FooPost>
        <BazPost author="myname"
          title="hoge">
          <FooDecorate>ほげ</FooDecorate>
        </BazPost> */}
        {/* <Post2 author="myname"
          title="hoge">
          <FooDecorate>ほげ</FooDecorate>
        </Post2>
        <Post2 author="myname"
          title="hoge"
          titleRender={({author, title}) => <div>{title} ({author})</div>} >
          <FooDecorate>ほげ</FooDecorate>
        </Post2>
        <Post2 author="myname"
          title="hoge"
          titleRender={SomeTitle} >
          <FooDecorate>ほげ</FooDecorate>
        </Post2> */}
        {/* <Post title={() => {
          return <BazDecorate>Titleですよ</BazDecorate>
        }} >
          <FooDecorate>ほげ</FooDecorate>
        </Post> */}
        {/* <Post>
          <BazDecorate>Titleですよ</BazDecorate>
          <FooDecorate>ほげ</FooDecorate>
        </Post> */}
        {/* <Post>
          <Title>hoge</Title>
          <Body>hoge</Body>
        </Post> */}
        <Avater account="inuscript"/>
      </div>
    );
  }
}

export default App;
