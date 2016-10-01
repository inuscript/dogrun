import React from 'react'
const PostTitle = ({children}) => (children)
const PostBody = ({children}) => (children)

const Post = ({children, ...rest}) => {
  if (typeof children == 'function') {
    return children(rest)
  }
  return <div>
    {children}
  </div>
}

const MyPost = () => (
  <Post author="bob" title="foo" body="hoge">{ ({author, title, body}) => {
    return <div>
      <div>{title}</div>
      <div>{author}</div>
      <div>{body}</div>
    </div>
  } }
  </Post>
)

export default () => {
  return <div>
    <MyPost />
  </div>
}