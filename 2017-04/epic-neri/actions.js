const uuid = require("uuid")

const startConnection = (uuid) => {
  return {
    type: "START_CONNECTION",
    uuid
  }  
}

const finishConnection = (uuid) => {
  return {
    type: "FINISH_CONNECTION",
    uuid
  }  
}

const patchAction = () => {
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