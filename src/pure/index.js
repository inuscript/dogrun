import React, {createElement } from 'react'
import pure from 'recompose/pure'

const Elm1 = createElement("div", null, "hoge")
const wrap = () => <Elm1 />
const elm2 = createElement("div", null, Elm1)
const StaticPure = <div>pure</div>
const ImPure = () => <div>pure</div>

export default wrap