import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Example from './example';
import ReactExample, { AlertDismissible } from './reactExample';

ReactDOM.render(
  <>
    <h1>Hello, World!!!</h1>
    <Example/>
    <ReactExample/>
    <AlertDismissible/>
  </>,
  document.getElementById('root')
);