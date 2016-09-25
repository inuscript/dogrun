
import React, { Component } from 'react';

const PrivatePost = ({title, author, children, titleRender}) => {
  return <div>
    <div>{ titleRender({title, author}) }</div>
    <div>{ children }</div>
  </div>
}

export const FooPost = (props) => {
  return <PrivatePost {...props}
    titleRender={ ({title, author}) => (<div>Title: {title} Author: {author}</div>)} />
}
export const BazPost = (props) => {
  return <PrivatePost {...props}
    titleRender={ ({title, author}) => (<div> {title} ( {author} )</div>) } />
}