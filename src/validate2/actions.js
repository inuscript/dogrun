export const changeName = (name) => ({
  type: 'CHANGE_NAME',
  payload: name
})

export const changePassword = (password) => ({
  type: 'CHANGE_PASSWORD',
  payload: password
})

export const send = (name) => ({
  type: 'SEND',
})