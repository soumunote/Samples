const { createStore } = require('redux');
const { createActions, handleActions } = require('redux-actions');

const defaultState = { counter: 0 };
const { increment, decrement } = createActions('INCREMENT', 'DECREMENT');

const reducer = handleActions(
  {
    [increment]: state => ({ ...state, counter: state + 1 }),
    [decrement]: state => ({ ...state, counter: state - 1 }),
  },
  defaultState
);

const store = createStore(reducer, defaultState);

const content = document.getElementById('content');
const render = () => {
  content.innerHTML = store.getState().counter;
}
store.subscribe(render);

document.getElementById('increment').addEventListener('click', () => {
  store.dispatch(increment());
});

document.getElementById('decrement').addEventListener('click', () => {
  store.dispatch(decrement());
});

