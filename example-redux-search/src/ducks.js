
const LOAD_RESULT = "LOAD_RESULT"

const result = (state = [], action ) => {
  switch(action.type){
  case LOAD_RESULT:
    return action.payload
  default:
    return state
  }
}

const CHANGE_INPUT = "CHANGE_INPUT"

const word = (state = "", action ) => {
  switch(action.type){
  case CHANGE_INPUT:
    return action.payload
  default:
    return state
  }
}

const changeInput = (input) => ({
  type: CHANGE_INPUT,
  payload: input
})
const loadResult = (result) => ({
  type: LOAD_RESULT,
  payload: result
})

export const actions = {
  LOAD_RESULT,
  CHANGE_INPUT
}
export const actionCreators = { changeInput, loadResult }
export const reducers = { result, word }