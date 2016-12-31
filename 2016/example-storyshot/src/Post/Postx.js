import React from 'react'
const PostTitle = ({children}) => (children)
const PostBody = ({children}) => (children)

const Post = ({children}) => {
  const title = children.find( (item) => item.key === "title")
  const body = children.find( (item) => item.key === "body")
  return <div>
    <div>{title}</div>
    <div>{body}</div>
  </div>
}
const MyPost = () => (
  <Post>
    <div key="title">title</div>
    <div key="body">body</div>
  </Post>
)

export default () => {
  return <div>
    <MyPost />
  </div>
}