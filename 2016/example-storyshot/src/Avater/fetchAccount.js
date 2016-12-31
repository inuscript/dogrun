// Mock fetch request
export default (name) => {
  return new Promise( (res, rej ) => {
    setTimeout( () => {
      res({name,
        description: "おはようございます",
        thumbUrl: "https://pbs.twimg.com/profile_images/622925791416881152/gDKsJVcW_bigger.png"})
    },1000)
  })
}