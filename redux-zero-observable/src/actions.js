
const actions = store => ({
  pow: state => ({ count: state.count * state.count}),
  increment: state => ({ count: state.count + 1 }),
  decrement: state => ({ count: state.count - 1 })
});

export default actions;
