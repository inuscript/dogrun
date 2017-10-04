import { lib } from "./index"

type Foo = {
  baz: string
}

lib<Foo>().then( r => {
})