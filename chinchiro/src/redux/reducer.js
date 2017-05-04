import { combineReducers } from "redux"

const initialDice = [null, null, null]

const dices = (state = initialDice, action) => {
  switch(action.type){
    case "ROLL_DICE": {
      return {
        ...state,
        [action.payload.number] : action.payload.value
      }
    }
  }
}

const money = (state = 500, action) => {
  switch(action.type){
    case "ADD_MONEY":
      return state + action.payload
  }
}

export const reducer = combineReducers({
  dices
})