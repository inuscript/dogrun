import { combineReducers } from "redux"

const initialDice = {0: null, 1: null, 2: null}

const dices = (state = initialDice, action) => {
  switch(action.type){
    case "ROLL_DICE":
      return {
        ...state,
        [action.payload.number] : action.payload.value
      }
    default:
      return state
  }
}

// const money = (state = 500, action) => {
//   switch(action.type){
//     case "ADD_MONEY":
//       return state + action.payload
//   }
// }

export const reducer = combineReducers({
  dices
})