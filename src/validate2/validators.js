export const nameValidation = ({value}) => {
  if(value.length < 4){
    return ['name least 4 char']
  }
  if(value.length > 12){
    return ['name less 12 char']
  }
  return []
}

export const passwordValidation = ({value}) => {
  if(!value){
    return ['Password is must need']
  }
  if(value.match(/^[a-z]+$/) || value.match(/^[1-9]+$/)){
    return ['Password least 1 number and alphabet']
  }
  return []
}


export default ({name, passowrd}) => {
  return {
    name: nameValidation(name),
    passowrd: passowrdValidation(password)
  }
}