import { createStore, combineReducers } from "redux"

const CHANGE_INPUT = "CHANGE_INPUT"
const LOAD_RESULT = "LOAD_RESULT"

export const changeInput = (input) => ({
  type: CHANGE_INPUT
  payload: input
})

const word = (state = "", action ) => {
  switch(action.type){
  case CHANGE_INPUT:
    return action.payload
  }
}

const result = (state = "", action ) => {
  switch(action.type){
  case LOAD_RESULT:
    return action.payload
  }
}

const rootReducer = combineReducers({ word, result })

export const configureStore = () => {
  createStore(rootReducer)
}



