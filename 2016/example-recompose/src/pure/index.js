import React, {createElement, createClass} from 'react'
import pure from 'recompose/pure'

const Elm1 = createElement("div", null, "hoge")
const wrap = () => <Elm1 />
const elm2 = createElement("div", null, Elm1)
const StaticPure = <div>I'm StaticPure</div>

const ImPure = () => <div>pure</div>


const Page = () => {
  return StaticPure 
}

export default Page