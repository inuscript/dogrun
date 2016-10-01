import React from 'react'
import { StyleSheet, css  } from 'aphrodite'

const baseButton = {
  color: "white",
  fontWeight: "bold",
  padding: "1em",
  borderRadius: 30,
  fontSize: 20,
  border: "none",
  outline: "none",
  cursor: "pointer",
  ":hover":{
    opacity: 0.8
  }
}
const style = StyleSheet.create({
  send: {
    ...baseButton,
    background: "rgb(40, 97, 173)"
  },
  cancel: {
    ...baseButton,
    background: "rgb(173, 40, 79)"
  }
})

const Button = ({className, children, onClick}) => {
  return <button className={className}>
    {children}
  </button>
}

export const SendButton = (props) => {
  return <Button { ...props } className={css(style.send)} />
}

export const CancelButton = (props) => {
  return <Button { ...props} className={css(style.cancel)} />
}