import axios, { AxiosResponse } from "axios"

const instance = axios.create()


instance.interceptors.response.use( (v: AxiosResponse) => {
  return 
})

interface Fn<V> {
  (value: V): V
}

let foo : Fn<number> = function (val:number) {
  // return 10 + val
  return undefined
}
