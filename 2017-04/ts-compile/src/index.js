import mod from "./module"

// arrow function
const a = () => {
    mod()
}

// spread
const b = {
    foo: "baz", bee: "boo", ree: "zoo"
}

const { foo, bee, ...rest } = b

// classes
class Animal {
    bark()
}
class Dog extends Animal {

}

new Dog()

// template string
const name = "bob"
const d = `hello ${name}`

const tmpl = (val) => val
const e = tmpl`hello ${name}`

// for of
const f = [1,2,3]

for( i of f ){
    console.log(i)
}

var fibonacci = {
  // このまま吐き出されちゃう。まだgeneratorは使えなそう
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}

// Sets
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;

// Maps
var m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined

// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });