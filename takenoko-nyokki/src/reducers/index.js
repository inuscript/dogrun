import { combineReducers } from "redux"

import game from "./game"
import bot from "./bot"
import hands from "./hands"

export default combineReducers({
  game,
  hands
})