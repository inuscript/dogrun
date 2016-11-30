
console.log([].pop) // [Function: pop]
console.log(Array.pop) // undefined

///////////////
const target = []
if(!target["pop"]){
  return
}
if(Array["pop"]){
  return
}

Object.defineProperty(Array, "pop", {
  writable:     true,
  configurable: true,
  value:        Function.call.bind(target["pop"])
});
///////////////

console.log([].pop) // [Function: pop]
console.log(Array.pop) // [Function: bound call]
