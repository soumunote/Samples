import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Stepper from 'bs-stepper';
import 'bs-stepper/dist/css/bs-stepper.min.css';

import Example from './example';
import ReactExample, { AlertDismissible } from './reactExample';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      Animation: true,
    })
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <div id="stepper1" className="bs-stepper">
          <div className="bs-stepper-header" role="tablist">
            <div className="step" data-target="#example">
              <button type="button" className="step-trigger" role="tab" id="example-trigger">
                <span className="bs-stepper-circle">1</span>
                <span className="bs-stepper-label">Example</span>
              </button>
            </div>
            <div className="line"></div>
            <div className="step" data-target="#react-example">
              <button type="button" className="step-trigger" role="tab" id="react-example-trigger">
                <span className="bs-stepper-circle">2</span>
                <span className="bs-stepper-label">ReactExample</span>
              </button>
            </div>
            <div className="line"></div>
            <div className="step" data-target="#alert-dismissible">
              <button type="button" className="step-trigger" role="tab" id="alert-dismissible-triger">
                <span className="bs-stepper-circle">3</span>
                <span className="bs-stepper-label">AlertDismissible</span>
              </button>
            </div>
          </div>
          <div className="bs-stepper-content">
            <div id="example" className="content">
              <Example/>
            </div>
            <div id="react-example" className="content">
              <ReactExample/>
            </div>
            <div id="alert-dismissible" className="content">
              <AlertDismissible/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <>
    <h1>Hello, World!!!</h1>
    <App/>
  </>,
  document.getElementById('root')
);