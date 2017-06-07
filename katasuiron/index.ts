interface Result<T, U> {
  foo: T, baz: U
}

const someFn = <T, U>(foo: T, baz: U) => {
  return () /* : Result<T, U> */=> {
    return {
      foo, baz
    }
  }
}

const a = someFn(10, "hoge")()

const foo = {foo: 1, baz: 2}

interface NumberValueObject {
  [key: string]: number
}

const someFn2 = (obj: NumberValueObject) => {
  return Object.values(obj).map( (item : number) => {
    return item
  })
}

const someFn2_another = (obj) => {
  return Object.values<number>(obj).map( (item ) => {
    return item
  })
}

someFn2({foo: 1}) // ok
// someFn2({foo: "bee"}) // error
