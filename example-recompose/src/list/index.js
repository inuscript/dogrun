import React from 'react'
import createEagerElement from 'recompose/createEagerElement'
import createEagerFactory from 'recompose/createEagerFactory'
import renderComponent from 'recompose/renderComponent'
import compose from 'recompose/compose'
import withProps from 'recompose/withProps'
import nest from 'recompose/nest'
const Item = ({name ,key}) => <li key={key}>{name}</li>
const itemFn = createEagerFactory(Item)


const List = ({items}) => {
  let li = items.map((name, key) => itemFn({name, key}))
  return createEagerElement("ul", {}, li)
}

export default function(){
  let items = ["a", "b", "c"]
  return <List items={items} />
}