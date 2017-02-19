/*eslint no-console: 0*/
import React from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'

const initialLocation = { pathname: '/', search: '', hash: '' }
const locationReducer = (state = initialLocation, action) => {
  console.log(state, action)
  return action.type === 'LOCATION_CHANGE' ?
    action.location : state
}


////////////////////////////////////////////////////////////
// normal redux stuff
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const store = applyMiddleware(logger)(createStore)(
  combineReducers({ location: locationReducer })
)

const mapStateToAppProps = (state) => ({
  location: state.location
})


// const AsyncLink = ( ({conditiion, onClick, to, ...rest}) => {
//   return (conditiion) 
//     ? <Redirect to={to} /> 
//     : <Link to={to}
//        onClick={ () => {
//          onClick(to)
//       }
//     } {...rest} />
// })
class Lazy extends React.Component {
  state = {
    val: "C"
  }
  render(){
    const { to, ...rest } = this.props
    switch(this.state.val){
      case "A":
        return <div></div>
      case "B":
        return <Redirect to={to} />
      default:
        return <Link to={to} {...rest} />
    }
  }
}

////////////////////////////////////////////////////////////

const App = connect(mapStateToAppProps)((props) => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to="/one">One</Link></li>
        <li><Link to="/two">Two</Link></li>
        <li><Link to="/three">Three</Link></li>
        <li><Link to="/four">Four</Link></li>
        <li><Link to="/five">Five</Link></li>
        <li><Lazy to="/five">Five</Lazy></li>
      </ul>
      <Switch>
        <Route path="/" exact render={() => (
          <div>
            <p>Open the console to see the logger middleware.</p>
          </div>
        )}/>
        <Route path="/one" render={() => <h3>One</h3>}/>
        <Route path="/two" render={() => <h3>Two</h3>}/>
        <Route path="/three" render={() => <h3>Three</h3>}/>
        <Route path="/four" render={() => <h3>Four</h3>}/>
        <Route path="/five" render={() => <h3>Five</h3>}/>
      </Switch>
    </div>
  </BrowserRouter>
))


////////////////////////////////////////////////////////////
// you don't need this history, it's passed in for the fake
// browser window.
const ReduxExample = ({ history }) => {
  return <Provider store={store}>
    <App history={history}/>
  </Provider>
}

export default ReduxExample