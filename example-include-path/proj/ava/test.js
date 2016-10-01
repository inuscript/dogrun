import baz from "foo/baz"
import test from 'ava';

test('foo', t => {
  console.log(baz())
  t.pass();
});
