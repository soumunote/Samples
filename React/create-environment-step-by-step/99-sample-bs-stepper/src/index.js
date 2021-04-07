import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return React.createElement('div', '', "Hello React!");
}

const domApp = document.querySelector('#app');
ReactDOM.render(React.createElement(App), domApp);