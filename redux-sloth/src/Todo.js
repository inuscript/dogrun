import React, { Component } from 'react';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import updeep from 'updeep'
import { createAction } from 'redux-actions'

const initialState = {
  counter: 0,
  todos: []
}

// God reducer
const reducer = (state = initialState, { payload } ) => {
  if(typeof payload !== "object"){
    return state
  }
  return updeep(payload, state)
}

let nextTodoId = 0
const creteNewTodo = (text) => ({
  text,
  id: nextTodoId++,
  completed: false
})

const addTodo = createAction('ADD_TODO', (text) => ({
  todos: (todos) => {
    return [ ...todos, creteNewTodo(text) ]
  }
}) )

const toggleTodoComplete = (todo, id ) => {
  if(todo.id !== id){
    return todo
  }
  return Object.assign({}, todo, {
    completed: !todo.completed
  })

}

const toggleTodo = createAction('TOGGLE_TODO', (id) => ({
  todos: (todos) => todos.map( todo => toggleTodoComplete(todo, id) )
}) )

const Todo = ({ onClick, completed, text, id }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none'}}
  >
    {id}: {text}
  </li>
)

const TodoList = ({ todos, dispatch }) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => dispatch(toggleTodo(todo.id))}
      />
    )}
  </ul>
)
const AddTodo = ({ dispatch }) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

const TodoListContainer = connect(state => state)(TodoList)
const AddTodoContainer = connect(state => state)(AddTodo)
const DebugContainer = connect(state => state)( (props) => {
  console.log(props)
  return null
})

class App extends Component {
  constructor(){
    super()
    this.store = createStore(reducer)
  }
  render() {
    return (
      <Provider store={this.store}>
        <div>
          <AddTodoContainer />
          <TodoListContainer />
          <DebugContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
