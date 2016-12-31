import React from 'react'
const Item = ({name}) => <li>{name}</li>

const List = ({items}) => {
  return <ul>
    {items.map( (item, i) => (<Item name={item} key={i} />) ) }
  </ul>
}
export default function(){
  let items = ["a", "b", "c"]
  return <List items={items} />
}