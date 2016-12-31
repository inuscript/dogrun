import diff from 'jest-diff'

import { createAction } from 'redux-actions'
import { createReducer, createReducerAction } from './index'

const emulateState = (initialState, action) => {
  const mockReducer = createReducer()
  return mockReducer(initialState, action)
}

it("createAction", () => {
  const actionCreator = createAction('ADD_TODO', (text) => ({
    todos: (todos) => {
      return [ ...todos, text ]
    }
  }) )
  const actualState = emulateState({ todos: ["foo"] }, actionCreator("baz"))
  expect(actualState).toEqual({
    todos: ["foo", "baz"]
  })
})

it("createReduceAction", () => {
  const actionCreator = createReducerAction('ADD_TODO', 'todos', (text) => (
    (todos) => [ ...todos, text ]
  ))
  const actualState = emulateState({ todos: ["foo"] }, actionCreator("baz"))
  expect(actualState).toEqual({
    todos: ["foo", "baz"]
  })
})

it("replaceValue", () => {
  const actionCreator = createReducerAction('ADD_TODO', 'someValue')
  const actualState = emulateState({ someValue: "zoo" }, actionCreator("bee"))
  expect(actualState).toEqual({
    someValue: "bee"
  })
})