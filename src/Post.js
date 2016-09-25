
import React, { Component } from 'react';

const PrivatePost = ({title, author, children, titleRender}) => {
  return <div>
    <div>{ titleRender({title, author}) }</div>
    <div>{ children }</div>
  </div>
}

const postItem = (titleRender) => {
  return ({title, author, children}) => {
    return <div>
      <div>{ titleRender({title, author}) }</div>
      <div>{ children }</div>
    </div>
  }
}

const FooTitle = ({title, author}) => (<div>Title: {title} Author: {author}</div>)
export const FooPost = postItem(FooTitle)

const BazTitle = ({title, author}) => (<div> {title} ( {author} )</div>)
export const BazPost = postItem(BazTitle)