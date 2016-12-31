import { createAction } from 'redux-actions'
import { createReducer, createReducerAction } from './index'

const calcMockReducer = (initialState, action) => {
  const mockReducer = createReducer()
  return mockReducer(initialState, action)
}

const assertAction = (initialState, expectAction, actualAction) => {
  const expectReducer = calcMockReducer(initialState, expectAction)
  const actualReducer = calcMockReducer(initialState, actualAction)
  return expect(actualReducer).toEqual(expectReducer)
}

it("createReduceAction", () => {
  const initialState = { todos: ["foo"] }
  const expectAction = createAction('ADD_TODO', (text) => ({
    todos: (todos) => {
      return [ ...todos, text ]
    }
  }) )
  const actualAction = createReducerAction('ADD_TODO', 'todos', (text) => (
    (todos) => [ ...todos, text ]
  ))

  assertAction(initialState, expectAction("hoge"), actualAction("hoge"))
})