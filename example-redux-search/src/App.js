import React from 'react'
import { Provider, connect } from 'react-redux'
import { configureStore } from './store'
import { actionCreators } from './ducks'

const Search = ({ word, changeInput }) => {
  return <input value={ word } onChange={ e => changeInput(e.target.value)} />
}
const SearchContainer = connect(state => state, actionCreators)(Search)

const Result = ({ result }) => {
  return <ul>
    {result.map( r => <li>{r}</li>)}
  </ul>
}
const ResultContainer = connect(state => state)(Result)

export default class App extends React.Component{
  constructor(){
    super()
    this.store = configureStore()
  }
  render(){
    return (
      <Provider store={this.store} >
        <div>
          <SearchContainer />
          <ResultContainer />
        </div>
      </Provider>
    )
  }
}