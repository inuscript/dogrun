const uuid = require("uuid")

const startConnection = (id) => {
  return {
    type: "START_CONNECTION",
    id: id
  }  
}

const finishConnection = (id) => {
  return {
    type: "FINISH_CONNECTION",
    id: id
  }  
}

const patchAction = (id) => {
  return {
    type: "PATCH",
    meta: {
      uuid: uuid.v4()
    }
  }
}

const fullfiledAction = (data) => {
  return {
    type: "FULFILLED",
    data: data
  }
}

module.exports = {
  startConnection ,
  finishConnection,
  patchAction,
  fullfiledAction
}