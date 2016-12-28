import React from 'react'
import { Provider, connect } from 'react-redux'
import { configureStore, } from './ducks'

const Input = (props) =>  <input {...props} />

const Search = ({ word, changeInput }) => {
  return <input value={word} onChange={changeInput} />
}

const SearchContainer = connect(state => state, )(Search)

export default class App extends React.Component{
  constructor(){
    super()
    this.store = configureStore()
  }
  render(){
    return (
      <Provider store={store}>
        <SearchContainer />
      </Provider>
    )
  }
}