import { createAction } from 'redux-act'

export const resetGame = createAction("RESET_GAME")
export const start = createAction("START")
export const stop = createAction("STOP")

export const incrementTime = createAction("GAME_TICK")
export const handsUp = createAction("HANDS_UP")


export const sink = createAction("NULL_ACTION")

export const setupBots = createAction("SETUP_BOTS")
