const someFn = (foo, baz) => {
    return () => {
        return {
            foo, baz
        };
    };
};
const a = someFn(10, "hoge")();
const foo = { foo: 1, baz: 2 };
const someFn2 = (obj) => {
    return Object.values(obj).map((item) => {
        return item;
    });
};
const someFn2_another = (obj) => {
    return Object.values(obj).map((item) => {
        return item;
    });
};
someFn2({ foo: 1 }); // ok
// someFn2({foo: "bee"}) // error
