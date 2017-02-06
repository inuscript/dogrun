var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import mod from "./module";
// arrow function
var a = function () {
    mod();
};
// spread
var b = {
    foo: "baz", bee: "boo", ree: "zoo"
};
var foo = b.foo, bee = b.bee, rest = __rest(b, ["foo", "bee"]);
// classes
var Animal = (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Dog;
}(Animal));
new Dog();
// template string
var name = "bob";
var d = "hello " + name;
var tmpl = function (val) { return val; };
var e = (_a = ["hello ", ""], _a.raw = ["hello ", ""], tmpl(_a, name));
// for of
var f = [1, 2, 3];
for (var _i = 0, f_1 = f; _i < f_1.length; _i++) {
    i = f_1[_i];
    console.log(i);
}
var fibonacci = (_b = {},
    // このまま吐き出されちゃう。まだgeneratorは使えなそう
    _b[Symbol.iterator] = function* () {
        var pre = 0, cur = 1;
        for (;;) {
            var temp = pre;
            pre = cur;
            cur += temp;
            yield cur;
        }
    },
    _b);
for (var _c = 0, fibonacci_1 = fibonacci; _c < fibonacci_1.length; _c++) {
    var n = fibonacci_1[_c];
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
wm.size === undefined;
// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });
var _a, _b;
