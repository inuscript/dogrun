
export const startRoll = () => ({
  type: "START_ROLL",
})

export const stopRoll = () => ({
  type: "STOP_ROLL",
})

export const rollDice = (number, value) => ({
  type: "ROLL_DICE",
  payload: {
    number, value
  }
})

export const addMoney = ( value) => ({
  type: "CACL_MONEY",
  payload: value
})

export const betMoney = (value) => ({
  type: "CACL_MONEY",
  payload: -1 * value
})