import React from 'react'
class Foo extends React{
  baz = "bee"
  handleHoge = () => {
    Object.assing({}, {a: "b"})
    const b = {...a, ...c}
    console.log(this)
  }
  render(){
    return <div>Hello</div>
  }
}

Object.keys({"r":"b"})
Object.defineProperties({}, "foo", "zzz")
export const foo = 'bar'