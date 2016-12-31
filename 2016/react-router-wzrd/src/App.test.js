import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import assert from 'assert';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

it('assert', () => {
  assert.deepEqual({a: "b"}, {a: "c"})
})

it('expect', () => {
  expect({a: "b"}).toEqual({a: "c"})
})
