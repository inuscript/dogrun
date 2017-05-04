
export const startRoll = () => ({
  type: "START_ROLL",
})

export const rollDice = (number, value) => ({
  type: "ROLL_DICE",
  payload: {
    number, value
  }
})

export const addMoney = ( value) => ({
  type: "ADD_MONEY",
  payload: value
})