import React from 'react'
import { Provider, connect } from 'react-redux'
import { configureStore } from './store'
import { actions } from './ducks'

const Search = ({ word, changeInput }) => {
  return <input value={ word } onChange={ e => changeInput(e.target.value)} />
}

const SearchContainer = connect(state => state, actions)(Search)

export default class App extends React.Component{
  constructor(){
    super()
    this.store = configureStore()
  }
  render(){
    return (
      <Provider store={this.store} >
        <SearchContainer />
      </Provider>
    )
  }
}