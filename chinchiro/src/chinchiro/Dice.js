import React, { Component } from 'react'
import styled from "styled-components"

const DiceItem = styled.div`
  display: inline-block;
  border-radius: 20px;
  background: red;
  color: white;
  margin: 0.2em;
  padding: 10px;
  min-width: 2em;
`
const DiceValue = ({value}) => (value !== null) ? value : "-"

export class Dice extends Component {
  render(){
    const { value } = this.props
    return <DiceItem>
      <DiceValue value={value} />
    </DiceItem>
  }
}